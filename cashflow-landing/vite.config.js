import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Локальный обработчик API Stripe для Vite Dev Server (npm run dev) и Preview (npm run preview)
function stripeDevApiPlugin() {
  const handleApiRequest = (req, res, next) => {
    const urlPath = req.url.split('?')[0];

    if (urlPath === '/api/create-checkout-session' || urlPath === '/api/stripe-webhook') {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ message: 'Method Not Allowed' }));
      }

      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        try {
          req.rawBody = body;
          req.body = JSON.parse(body || '{}');
          if (urlPath === '/api/create-checkout-session') {
            const { default: handler } = await import('./api/create-checkout-session.js');
            await handler(req, res);
          } else {
            const { default: webhookHandler } = await import('./api/stripe-webhook.js');
            await webhookHandler(req, res);
          }
        } catch (err) {
          console.error(`Ошибка в API [${urlPath}]:`, err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: err.message }));
        }
      });
      return;
    }

    if (next) next();
  };

  return {
    name: 'stripe-dev-api',
    configureServer(server) {
      server.middlewares.use(handleApiRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleApiRequest);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.STRIPE_SECRET_KEY) {
    process.env.STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      stripeDevApiPlugin(),
    ],
  };
});
