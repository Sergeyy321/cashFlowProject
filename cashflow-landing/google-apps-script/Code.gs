/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: Сбор заявок в Google Таблицу + Email-уведомления
 * =========================================================================
 */

// 1. УКАЖИТЕ ВАШ EMAIL ДЛЯ ПОЛУЧЕНИЯ УВЕДОМЛЕНИЙ:
var ADMIN_EMAIL = 'your-email@gmail.com'; 

// Вспомогательная функция безопасного получения email (автоматический fallback)
function getAdminEmail() {
  try {
    if (typeof ADMIN_EMAIL !== 'undefined' && ADMIN_EMAIL && ADMIN_EMAIL !== 'your-email@gmail.com') {
      return ADMIN_EMAIL;
    }
  } catch (e) {}

  // Автоматически берем email владельца Google Таблицы, если переменная не задана
  try {
    var ownerEmail = Session.getEffectiveUser().getEmail() || Session.getActiveUser().getEmail();
    if (ownerEmail) return ownerEmail;
  } catch (e) {}

  return '';
}

// =========================================================================
// ТЕСТОВАЯ ФУНКЦИЯ ДЛЯ ПРОВЕРКИ И АКТИВАЦИИ ПРАВ (НАЖМИТЕ «ВЫПОЛНИТЬ»):
// =========================================================================
function testEmail() {
  var recipient = getAdminEmail();
  Logger.log('Отправка тестового письма на: ' + recipient);
  
  if (!recipient) {
    throw new Error('Пожалуйста, укажите ваш email в переменной ADMIN_EMAIL в строке 8!');
  }

  var subject = '✅ Тестовое уведомление: Cashflow & WoodIQ';
  var html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #10b981; border-radius: 10px; max-width: 500px;">
      <h2 style="color: #10b981; margin-top: 0;">✅ Почта успешно подключена!</h2>
      <p>Google Apps Script авторизован и готов присылать вам уведомления о каждой новой заявке с сайта.</p>
      <p style="color: #71717a; font-size: 12px;">Получатель: ${recipient}</p>
      <p style="color: #71717a; font-size: 12px;">Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Warsaw' })}</p>
    </div>
  `;

  try {
    GmailApp.sendEmail(recipient, subject, '', {
      name: 'Cashflow & WoodIQ',
      htmlBody: html
    });
  } catch (e) {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: html
    });
  }

  Logger.log('Тестовое письмо успешно отправлено на: ' + recipient);
}

// ==========================================
// 1. ОБРАБОТКА GET-ЗАПРОСА (Загрузка настроек)
// ==========================================
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var settingsSheet = ss.getSheetByName('Settings') || ss.getSheetByName('Настройки');

    var settings = {
      event_city: 'Warszawa',
      event_date: 'Суббота, 18:00',
      event_time: '18:00',
      event_place: 'Business Hub Warsaw',
      event_spots: 6,
      price_test: 120,
      price_combo: 150,
      site_title: 'Cashflow Club Poland',
      site_subtitle: 'Финансовая игра-тренинг'
    };

    if (settingsSheet) {
      var data = settingsSheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        var key = data[i][0];
        var val = data[i][1];
        if (key) {
          settings[key] = val;
        }
      }
    }

    var placesLeft = Number(settings.event_spots) || 6;
    var leadsSheet = ss.getSheetByName('Заявки Cashflow') || ss.getSheetByName('Leads');
    if (leadsSheet) {
      var rows = leadsSheet.getLastRow();
      if (rows > 1) {
        var tiers = leadsSheet.getRange(2, 6, rows - 1, 1).getValues();
        var booked = 0;
        tiers.forEach(function(r) {
          booked += Number(r[0]) || 1;
        });
        placesLeft = Math.max(0, placesLeft - booked);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      settings: settings,
      placesLeft: placesLeft
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// 2. ОБРАБОТКА POST-ЗАПРОСА (Новая заявка)
// ==========================================
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var p = (e && e.parameter) ? e.parameter : {
      name: 'Тестовый Клиент',
      phone: '+48 123 456 789',
      messenger: 'Telegram',
      city: 'Warszawa',
      tier: '1',
      price: '120'
    };
    var dateNow = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Warsaw' });

    var isWoodIQ = p.orderType === 'woodiq';

    if (isWoodIQ) {
      // ----------------------------------------------------
      // ВЕТКА WOODIQ
      // ----------------------------------------------------
      var sheet = ss.getSheetByName('Заявки WoodIQ');
      if (!sheet) {
        sheet = ss.insertSheet('Заявки WoodIQ');
        sheet.appendRow([
          'Дата и время',
          'Формат',
          'Имя',
          'Телефон',
          'Мессенджер',
          'Город',
          'Выбранные игры',
          'Дней аренды',
          'Доставка',
          'Цена',
          'Итого',
          'Комментарий'
        ]);
        sheet.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#f5efe4');
      }

      sheet.appendRow([
        dateNow,
        p.type === 'purchase' ? 'Покупка' : 'Аренда',
        p.name || '',
        p.phone || '',
        p.messenger || '',
        p.city || '',
        p.games || '',
        p.days || '0',
        p.delivery === 'true' ? 'Да (+100 zł)' : 'Нет',
        p.price || '',
        p.total || '',
        p.comment || ''
      ]);

      // Отправка Email-уведомления
      sendWoodIQEmailNotification(p, dateNow);

    } else {
      // ----------------------------------------------------
      // ВЕТКА CASHFLOW CLUB
      // ----------------------------------------------------
      var sheetCashflow = ss.getSheetByName('Заявки Cashflow');
      if (!sheetCashflow) {
        sheetCashflow = ss.insertSheet('Заявки Cashflow');
        sheetCashflow.appendRow([
          'Дата и время',
          'Имя',
          'Телефон',
          'Мессенджер',
          'Город',
          'Кол-во участников',
          'Стоимость'
        ]);
        sheetCashflow.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#e6f4ea');
      }

      sheetCashflow.appendRow([
        dateNow,
        p.name || '',
        p.phone || '',
        p.messenger || '',
        p.city || '',
        p.tier || '1',
        (p.price || '') + ' PLN'
      ]);

      // Отправка Email-уведомления
      sendCashflowEmailNotification(p, dateNow);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Заявка успешно сохранена'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// 3. ОТПРАВКА EMAIL ДЛЯ CASHFLOW CLUB
// ==========================================
function sendCashflowEmailNotification(p, dateNow) {
  var recipient = getAdminEmail();
  if (!recipient) return;

  // Защита от запуска вручную из редактора без параметров
  p = p || {
    name: 'Тестовый Игрок',
    phone: '+48 123 456 789',
    messenger: 'Telegram',
    city: 'Katowice',
    tier: '1',
    price: '120'
  };
  dateNow = dateNow || new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Warsaw' });

  var subject = `🔥 Новая заявка на Cashflow: ${p.name || 'Клиент'} (${p.city || ''})`;

  var htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #10b981, #84cc16); padding: 24px; color: #09090b;">
        <h2 style="margin: 0; font-size: 22px;">🎲 Новая заявка: CASHFLOW CLUB</h2>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Поступила новая бронь места на игру</p>
      </div>

      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a; width: 40%;">📅 Дата заявки:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${dateNow}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">👤 Имя клиента:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.name || '—'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">📞 Телефон:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #0284c7;"><a href="tel:${p.phone}">${p.phone || '—'}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">💬 Способ связи:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.messenger || 'Telegram'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">📍 Город:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.city || '—'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">🎟️ Участников:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.tier === '2' ? '2 (Комбо на двоих)' : '1 (Тест-Драйв)'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #71717a; font-size: 16px;">💰 Сумма:</td>
            <td style="padding: 12px 0; font-weight: bold; font-size: 18px; color: #16a34a;">${p.price || '0'} PLN</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f4f4f5; padding: 16px; text-align: center; font-size: 12px; color: #71717a;">
        Заявка сохранена в Google Таблицу («Заявки Cashflow»).
      </div>
    </div>
  `;

  try {
    GmailApp.sendEmail(recipient, subject, '', {
      name: 'Cashflow Club',
      htmlBody: htmlBody
    });
  } catch (e) {
    try {
      MailApp.sendEmail({
        to: recipient,
        subject: subject,
        htmlBody: htmlBody
      });
    } catch (err) {
      Logger.log('Ошибка отправки email: ' + err.toString());
    }
  }
}

// ==========================================
// 4. ОТПРАВКА EMAIL ДЛЯ WOODIQ
// ==========================================
function sendWoodIQEmailNotification(p, dateNow) {
  var recipient = getAdminEmail();
  if (!recipient) return;

  // Защита от запуска вручную из редактора без параметров
  p = p || {
    type: 'rental',
    name: 'Тестовый Заказчик',
    phone: '+48 987 654 321',
    messenger: 'Telegram',
    city: 'Warszawa',
    games: 'Mega Jenga (2 игры)',
    days: '1',
    delivery: 'true',
    price: '100 zł',
    total: '200 zł',
    comment: 'Доставка к 14:00'
  };
  dateNow = dateNow || new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Warsaw' });

  var isPurchase = p.type === 'purchase';
  var typeLabel = isPurchase ? '🛒 Покупка игр' : '🎪 Аренда на мероприятие';
  var subject = `🪵 Новая заявка WoodIQ (${typeLabel}): ${p.name || 'Клиент'}`;

  var htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 24px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 22px;">🪵 Новая заявка: WOOD IQ</h2>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.95;">${typeLabel}</p>
      </div>

      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a; width: 40%;">📅 Дата заявки:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${dateNow}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">👤 Имя клиента:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.name || '—'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">📞 Телефон:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #0284c7;"><a href="tel:${p.phone}">${p.phone || '—'}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">💬 Способ связи:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.messenger || 'Telegram'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">📍 Город:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.city || '—'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">🎲 Количество игр:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.games || '—'}</td>
          </tr>
          ${!isPurchase ? `
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">⏱️ Срок аренды:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.days} дн.</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">🚚 Доставка и монтаж:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.delivery === 'true' ? 'Да (+100 zł)' : 'Нет'}</td>
          </tr>
          ` : ''}
          ${p.comment ? `
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">📝 Комментарий / Игра:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.comment}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 12px 0; color: #71717a; font-size: 16px;">💰 Итого:</td>
            <td style="padding: 12px 0; font-weight: bold; font-size: 18px; color: #d97706;">${p.total || p.price}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f4f4f5; padding: 16px; text-align: center; font-size: 12px; color: #71717a;">
        Заявка сохранена в Google Таблицу («Заявки WoodIQ»).
      </div>
    </div>
  `;

  try {
    GmailApp.sendEmail(recipient, subject, '', {
      name: 'WoodIQ',
      htmlBody: htmlBody
    });
  } catch (e) {
    try {
      MailApp.sendEmail({
        to: recipient,
        subject: subject,
        htmlBody: htmlBody
      });
    } catch (err) {
      Logger.log('Ошибка отправки email: ' + err.toString());
    }
  }
}
