// ==========================================
// БЛОК 7: ПОДВАЛ САЙТА (FOOTER)
// ==========================================
export function Footer({activePage, setActivePage}) {
  return (
    <footer className="mt-auto py-12 px-6 bg-zinc-955 border-t border-zinc-900/60 text-center text-sm text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
  
        {activePage === 'cashflow' ? (
          <>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-zinc-950 font-black text-sm">
            $
          </div>
          <span className="font-bold text-base tracking-tight text-white">CASHFLOW CLUB POLAND</span>
        </div>
           <p className="text-xs text-zinc-600">
          © 2026 Cashflow Club. Все права защищены.
        </p>
          <div className="flex gap-4 text-xs font-semibold text-zinc-400">
            <a
              href="https://t.me/CashFlow_Katowice"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-400 cursor-pointer transition-colors"
            >
              Telegram
            </a>
            <a
              href="https://www.instagram.com/cashflowkatowice/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-400 cursor-pointer transition-colors"
            >
              Instagram
            </a>
          </div>
          </>
        ) : (
            
            <>
               <p className="text-xs text-zinc-600">
          © 2026 WoodIQ. Все права защищены.
        </p>
          <div className="flex gap-4 text-xs font-semibold text-zinc-400">
       
            <a
              href="https://www.instagram.com/woodiq.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-400 cursor-pointer transition-colors"
            >
              Instagram
            </a>
          </div> 
            </>
        )}
      </div>
    </footer>
  );
}
