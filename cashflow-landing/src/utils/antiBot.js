// Захист від спаму, ботів та порожніх заявок

const LAST_SUBMIT_KEY = 'last_order_submission_ts';
const SUBMISSION_COOLDOWN_MS = 10000; // 10 секунд кулдаун між заявками з одного пристрою
const MIN_FILL_TIME_MS = 1800; // Людина не може заповнити форму швидше ніж за 1.8 секунди

// Перевірка на очевидно фейкові номери
const FAKE_PHONE_PATTERNS = [
  '000000000',
  '111111111',
  '222222222',
  '333333333',
  '444444444',
  '555555555',
  '666666666',
  '777777777',
  '888888888',
  '999999999',
  '123456789',
  '987654321',
  '012345678',
];

export function validateBotSafety({
  honeypotValue,
  openedAt,
  name,
  phoneDigits,
  messengerHandle,
}) {
  // 1. Перевірка Honeypot (прихована пастка для ботів)
  if (honeypotValue && honeypotValue.trim().length > 0) {
    console.warn('[AntiBot] Honeypot triggered by automated bot');
    return { isBot: true, silentReject: true, error: null };
  }

  // 2. Перевірка швидкості заповнення (боти надсилають форму за 50-300 мс)
  const timeTaken = Date.now() - (openedAt || Date.now());
  if (timeTaken < MIN_FILL_TIME_MS) {
    console.warn('[AntiBot] Form filled abnormally fast:', timeTaken, 'ms');
    return {
      isBot: true,
      silentReject: false,
      error: 'Будь ласка, зачекайте 2 секунди перед надсиланням',
    };
  }

  // 3. Перевірка кулдауну (Rate Limiting проти спам-лупів)
  try {
    const lastSubmit = localStorage.getItem(LAST_SUBMIT_KEY);
    if (lastSubmit) {
      const diff = Date.now() - Number(lastSubmit);
      if (diff < SUBMISSION_COOLDOWN_MS) {
        const waitSec = Math.ceil((SUBMISSION_COOLDOWN_MS - diff) / 1000);
        return {
          isBot: true,
          silentReject: false,
          error: `Зачекайте ще ${waitSec} сек. перед повторною відправкою`,
        };
      }
    }
  } catch (e) {
    // ігноруємо помилки localStorage
  }

  // 4. Перевірка імені (має містити хоча б літери)
  const cleanName = (name || '').trim();
  const hasLetters = /[a-zA-Zа-яА-ЯёЁіІїЇєЄąĄćĆęĘłŁńŃóÓśŚźŹżŻ]/.test(cleanName);
  if (!hasLetters || cleanName.length < 2) {
    return {
      isBot: true,
      silentReject: false,
      error: 'Введіть коректне ім’я (мінімум 2 літери)',
    };
  }

  // 5. Перевірка номера телефону на фейкові шаблони
  const cleanDigits = (phoneDigits || '').slice(-9);
  if (FAKE_PHONE_PATTERNS.includes(cleanDigits)) {
    return {
      isBot: true,
      silentReject: false,
      error: 'Введіть дійсний номер телефону',
    };
  }

  // 6. Перевірка месенджера
  const cleanMessenger = (messengerHandle || '').trim();
  if (cleanMessenger.length < 2) {
    return {
      isBot: true,
      silentReject: false,
      error: 'Вкажіть ваш нікнейм або номер соцмережі',
    };
  }

  return { isBot: false, silentReject: false, error: null };
}

export function recordSuccessfulSubmission() {
  try {
    localStorage.setItem(LAST_SUBMIT_KEY, Date.now().toString());
  } catch (e) {}
}
