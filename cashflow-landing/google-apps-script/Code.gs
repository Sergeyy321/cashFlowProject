/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: Сбор заявок в Google Таблицу + Email-уведомления v3
 * =========================================================================
 */

// 1. УКАЖИТЕ ВАШ EMAIL ДЛЯ ПОЛУЧЕНИЯ УВЕДОМЛЕНИЙ:
var ADMIN_EMAIL = 'your-email@gmail.com'; // <-- Замените на ваш реальный email!

// Безопасное получение email получателя
function getAdminEmail() {
  try {
    if (typeof ADMIN_EMAIL !== 'undefined' && ADMIN_EMAIL && ADMIN_EMAIL !== 'your-email@gmail.com') {
      return ADMIN_EMAIL.trim();
    }
  } catch (e) {}

  // Автоматически берем email владельца Google Таблицы, если переменная не задана
  try {
    var ownerEmail = Session.getEffectiveUser().getEmail() || Session.getActiveUser().getEmail();
    if (ownerEmail) return ownerEmail.trim();
  } catch (e) {}

  return '';
}

// =========================================================================
// ТЕСТОВАЯ ФУНКЦИЯ ДЛЯ ПРОВЕРКИ И АКТИВАЦИИ ПРАВ (НАЖМИТЕ «ВЫПОЛНИТЬ» В APPS SCRIPT):
// =========================================================================
function testEmail() {
  var recipient = getAdminEmail();
  Logger.log('Проверка отправки на: ' + recipient);
  
  if (!recipient || recipient === 'your-email@gmail.com') {
    throw new Error('Пожалуйста, укажите ваш настоящий email в переменной ADMIN_EMAIL в строке 8!');
  }

  var remaining = MailApp.getRemainingDailyEmails();
  Logger.log('Остаток доступных писем на сегодня: ' + remaining);

  var subject = '✅ Тестовое уведомление: Cashflow & WoodIQ';
  var html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #10b981; border-radius: 10px; max-width: 500px;">
      <h2 style="color: #10b981; margin-top: 0;">✅ Почта успешно подключена!</h2>
      <p>Google Apps Script авторизован и готов присылать вам уведомления о каждой новой заявке с сайта.</p>
      <p style="color: #71717a; font-size: 13px;"><b>Получатель:</b> ${recipient}</p>
      <p style="color: #71717a; font-size: 13px;"><b>Доступно писем сегодня:</b> ${remaining}</p>
      <p style="color: #71717a; font-size: 13px;"><b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Warsaw' })}</p>
    </div>
  `;

  var sendResult = sendRawEmail(recipient, subject, html, 'Cashflow & WoodIQ');
  if (!sendResult.success) {
    throw new Error('Ошибка отправки: ' + sendResult.error);
  }

  Logger.log('Тестовое письмо успешно отправлено на: ' + recipient);
}

// Универсальная функция отправки email с возвратом точного статуса ошибки
function sendRawEmail(recipient, subject, htmlBody, senderName) {
  if (!recipient || recipient === 'your-email@gmail.com') {
    return { success: false, error: 'Email не настроен в строке 8 (ADMIN_EMAIL)' };
  }

  try {
    GmailApp.sendEmail(recipient, subject, '', {
      name: senderName || 'Cashflow & WoodIQ',
      htmlBody: htmlBody
    });
    return { success: true };
  } catch (e1) {
    try {
      MailApp.sendEmail({
        to: recipient,
        subject: subject,
        htmlBody: htmlBody,
        name: senderName || 'Cashflow & WoodIQ'
      });
      return { success: true };
    } catch (e2) {
      return { success: false, error: e2.toString() };
    }
  }
}

// ==========================================
// 1. ОБРАБОТКА GET-ЗАПРОСА (Загрузка настроек + Диагностика)
// ==========================================
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : '';

    // Режим онлайн-диагностики доступности скрипта и квот
    if (action === 'diagnose' || action === 'check') {
      var adminEmail = getAdminEmail();
      var quota = 0;
      try { quota = MailApp.getRemainingDailyEmails(); } catch (err) {}

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        status: 'online',
        configuredEmail: adminEmail || 'НЕ_УКАЗАН',
        dailyEmailsLeft: quota,
        effectiveUser: Session.getEffectiveUser().getEmail() || 'anonymous',
        serverTime: new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Warsaw' })
      })).setMimeType(ContentService.MimeType.JSON);
    }

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
// 2. ОБРАБОТКА POST-ЗАПРОСА (Новая заявка с сайта)
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
    var emailStatus = 'Ожидание';

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
          'Комментарий',
          'Email статус'
        ]);
        sheet.getRange(1, 1, 1, 13).setFontWeight('bold').setBackground('#f5efe4');
      }

      var isStripePaid = p.paymentStatus && (p.paymentStatus.indexOf('ОПЛАЧЕНО') !== -1 || p.paymentStatus.indexOf('STRIPE') !== -1);
      var updatedExisting = false;
      var targetRow = 0;

      if (isStripePaid && p.orderId) {
        var lastRow = sheet.getLastRow();
        if (lastRow > 1) {
          var data = sheet.getRange(2, 1, lastRow - 1, 13).getValues();
          for (var r = data.length - 1; r >= 0; r--) {
            var rowComment = String(data[r][11] || '');
            var rowPhone = String(data[r][3] || '').replace(/\D/g, '');
            var pPhone = String(p.phone || '').replace(/\D/g, '');
            if ((p.orderId && rowComment.indexOf(p.orderId) !== -1) || (pPhone && pPhone.length > 7 && rowPhone === pPhone)) {
              targetRow = r + 2;
              sheet.getRange(targetRow, 2).setValue('✅ ОПЛАЧЕНО (STRIPE)');
              if (p.delivery) sheet.getRange(targetRow, 9).setValue(p.delivery);
              if (p.total) sheet.getRange(targetRow, 11).setValue(p.total);
              sheet.getRange(targetRow, 12).setValue(p.comment || rowComment);
              updatedExisting = true;
              break;
            }
          }
        }
      }

      // Отправка Email-уведомления
      var emailRes = sendWoodIQEmailNotification(p, dateNow);
      emailStatus = emailRes.success ? '✅ Отправлено (' + dateNow + ')' : '❌ Ошибка: ' + emailRes.error;

      if (!updatedExisting) {
        sheet.appendRow([
          dateNow,
          p.paymentStatus || (p.type === 'purchase' ? 'Покупка' : 'Аренда'),
          p.name || '',
          p.phone || '',
          p.messenger || '',
          p.city || '',
          p.games || '',
          p.days || '—',
          p.delivery || (p.delivery === 'true' ? 'Да (+100 zł)' : 'Нет'),
          p.price || '',
          p.total || '',
          p.comment || '',
          emailStatus
        ]);
      } else {
        sheet.getRange(targetRow, 13).setValue(emailStatus);
      }

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
          'Стоимость',
          'Email статус'
        ]);
        sheetCashflow.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#e6f4ea');
      }

      // Отправка Email-уведомления
      var emailResCf = sendCashflowEmailNotification(p, dateNow);
      emailStatus = emailResCf.success ? '✅ Отправлено (' + dateNow + ')' : '❌ Ошибка: ' + emailResCf.error;

      sheetCashflow.appendRow([
        dateNow,
        p.name || '',
        p.phone || '',
        p.messenger || '',
        p.city || '',
        p.tier || '1',
        (p.price || '') + ' PLN',
        emailStatus
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Заявка успешно сохранена',
      emailStatus: emailStatus
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
  if (!recipient || recipient === 'your-email@gmail.com') {
    return { success: false, error: 'Email администратора не настроен (строка 8)' };
  }

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

  return sendRawEmail(recipient, subject, htmlBody, 'Cashflow Club');
}

// ==========================================
// 4. ОТПРАВКА EMAIL ДЛЯ WOODIQ
// ==========================================
function sendWoodIQEmailNotification(p, dateNow) {
  var recipient = getAdminEmail();
  if (!recipient || recipient === 'your-email@gmail.com') {
    return { success: false, error: 'Email администратора не настроен (строка 8)' };
  }

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

  var isPurchase = p.type === 'purchase' || (p.type && p.type.indexOf('Куп') !== -1);
  var isPaid = p.paymentStatus && (p.paymentStatus.indexOf('ОПЛАЧЕНО') !== -1 || p.paymentStatus.indexOf('STRIPE') !== -1);
  var typeLabel = isPaid 
    ? '💳 ОПЛАЧЕНО ЧЕРЕЗ STRIPE' 
    : (isPurchase ? '🛒 Покупка игр' : '🎪 Аренда на мероприятие');
  
  var subject = isPaid
    ? `💳 ОПЛАЧЕН заказ WoodIQ: ${p.name || 'Клиент'} (${p.total || p.price || ''})`
    : `🪵 Новая заявка WoodIQ (${typeLabel}): ${p.name || 'Клиент'}`;

  var headerBg = isPaid 
    ? 'linear-gradient(135deg, #10b981, #059669)' 
    : 'linear-gradient(135deg, #f59e0b, #d97706)';

  var htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
      <div style="background: ${headerBg}; padding: 24px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 22px;">${isPaid ? '💳 ЗАКАЗ ОПЛАЧЕН ОНЛАЙН' : '🪵 Новая заявка: WOOD IQ'}</h2>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.95;">${typeLabel}</p>
      </div>

      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a; width: 40%;">📅 Дата:</td>
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
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.messenger || 'Telegram / Stripe'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">📍 Город:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.city || '—'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">🎲 Выбранные товары:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.games || '—'}</td>
          </tr>
          ${p.paczkomat && p.paczkomat !== '—' ? `
          <tr style="border-bottom: 1px solid #f0f0f0; background-color: #ecfdf5;">
            <td style="padding: 10px; color: #047857; font-weight: bold;">📦 Paczkomat InPost:</td>
            <td style="padding: 10px; font-weight: bold; color: #047857; font-size: 15px;">${p.paczkomat}</td>
          </tr>
          ` : ''}
          ${p.address && p.address !== 'Адрес не указан' ? `
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">🏠 Адрес доставки:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.address}</td>
          </tr>
          ` : ''}
          ${!isPurchase && !isPaid ? `
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">⏱️ Срок аренды:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.days} дн.</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">🚚 Доставка и монтаж:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.delivery === 'true' ? 'Да (+100 zł)' : (p.delivery || 'Нет')}</td>
          </tr>
          ` : ''}
          ${p.comment ? `
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #71717a;">📝 Комментарий / Детали:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #18181b;">${p.comment}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 12px 0; color: #71717a; font-size: 16px;">💰 Сумма:</td>
            <td style="padding: 12px 0; font-weight: bold; font-size: 18px; color: ${isPaid ? '#059669' : '#d97706'};">${p.total || p.price}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f4f4f5; padding: 16px; text-align: center; font-size: 12px; color: #71717a;">
        ${isPaid ? '✅ Заказ автоматически синхронизирован и отмечен оплаченным в Google Таблице («Заявки WoodIQ»).' : 'Заявка сохранена в Google Таблицу («Заявки WoodIQ»).'}
      </div>
    </div>
  `;

  return sendRawEmail(recipient, subject, htmlBody, 'WoodIQ');
}

// =========================================================================
// 5. ТРИГГЕР НА РУЧНЫЕ ИЗМЕНЕНИЯ В ТАБЛИЦЕ (если нужно уведомлять о правках)
// =========================================================================
// Чтобы активировать: в меню Apps Script выберите Триггеры (значок будильника) ->
// Добавить триггер -> функция onSheetEdit -> Выбор источника: Из таблицы -> Тип события: При редактировании
function onSheetEdit(e) {
  try {
    if (!e || !e.range) return;
    var sheet = e.range.getSheet();
    var sheetName = sheet.getName();

    // Не отправлять письма при технических листах
    if (sheetName === 'Settings' || sheetName === 'Настройки') return;

    var row = e.range.getRow();
    if (row === 1) return; // Заголовки игнорируем

    var recipient = getAdminEmail();
    if (!recipient || recipient === 'your-email@gmail.com') return;

    var user = e.user ? e.user.getEmail() : 'Пользователь';
    var oldValue = e.oldValue || '—';
    var newValue = e.value || '—';
    var cellA1 = e.range.getA1Notation();

    var subject = `📝 Изменение в таблице [${sheetName}] ячейка ${cellA1}`;
    var htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #d4d4d8; border-radius: 8px;">
        <h3 style="color: #3f3f46; margin-top: 0;">Изменение в Google Таблице</h3>
        <p><b>Лист:</b> ${sheetName}</p>
        <p><b>Ячейка:</b> ${cellA1} (Строка ${row})</p>
        <p><b>Старое значение:</b> ${oldValue}</p>
        <p><b>Новое значение:</b> ${newValue}</p>
        <p><b>Кем изменено:</b> ${user}</p>
        <p><b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Warsaw' })}</p>
      </div>
    `;

    sendRawEmail(recipient, subject, htmlBody, 'Google Sheets Monitor');
  } catch (err) {
    Logger.log('Ошибка триггера onSheetEdit: ' + err.toString());
  }
}
