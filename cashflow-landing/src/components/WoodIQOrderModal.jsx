import React, { useEffect, useMemo, useState } from 'react'

const rentalPrices = {
  1: { day1: 50, day2: 100 },
  2: { day1: 100, day2: 150 },
  3: { day1: 150, day2: 200 },
  4: { day1: 200, day2: 300 },
  5: { day1: 250, day2: 400 },
  7: { day1: 300, day2: 500 },
  10: { day1: 400, day2: 600 },
  20: { day1: 1000, day2: 1500 },
}

const purchasePrices = {
  1: 250,
  2: 450,
  3: 650,
  4: 800,
  5: 950,
  7: 1250,
  10: 1700,
  20: 3000,
}

const cities = [
  'Katowice',
  'Kraków',
  'Wrocław',
  'Warszawa',
  'Gdańsk',
  'Poznań',
  'Другой город',
]

export function WoodIQOrderModal({
  isOpen,
  onClose,
  initialOrder,
}) {
  const [type, setType] = useState('rental')
  const [city, setCity] = useState('Katowice')
  const [games, setGames] = useState(3)
  const [days, setDays] = useState(1)
  const [delivery, setDelivery] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+48 ')
  const [messenger, setMessenger] = useState('telegram')
  const [comment, setComment] = useState('')

  const [status, setStatus] = useState({
    type: null,
    message: '',
  })

  const [loading, setLoading] = useState(false)


  /*
   * При открытии формы
   */
  useEffect(() => {
    if (!isOpen) return

    setName('')
    setPhone('+48 ')
    setMessenger('telegram')
    setComment('')

    setStatus({
      type: null,
      message: '',
    })

    /*
     * Если пришли из конкретной кнопки
     * "Забронировать 3 игры"
     */
    if (initialOrder) {
      setType(initialOrder.type || 'rental')
      setGames(initialOrder.games || 3)
      setDays(initialOrder.days || 1)
    } else {
      setType('rental')
      setGames(3)
      setDays(1)
    }

    setDelivery(false)
  }, [isOpen, initialOrder])


  /*
   * Расчёт цены
   */
  const price = useMemo(() => {
    if (type === 'purchase') {
      return purchasePrices[games] || 0
    }

    return (
      rentalPrices[games]?.[
        days === 1 ? 'day1' : 'day2'
      ] || 0
    )
  }, [type, games, days])


  const deliveryPrice = delivery ? 100 : 0

  const total = price + deliveryPrice


  /*
   * Телефон
   */
  const handlePhoneChange = (e) => {
    let value = e.target.value

    if (!value.startsWith('+48 ')) {
      value = '+48 '
    }

    const numbers = value
      .replace('+48 ', '')
      .replace(/\D/g, '')
      .slice(0, 9)

    let formatted = '+48 '

    if (numbers.length > 0) {
      formatted += numbers.substring(0, 3)
    }

    if (numbers.length > 3) {
      formatted += ' ' + numbers.substring(3, 6)
    }

    if (numbers.length > 6) {
      formatted += ' ' + numbers.substring(6, 9)
    }

    setPhone(formatted)
  }


  /*
   * Отправка
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    const digits = phone.replace(/\D/g, '')

    if (digits.length !== 11) {
      setStatus({
        type: 'error',
        message: 'Введите корректный польский номер телефона.',
      })

      return
    }

    if (!city) {
      setStatus({
        type: 'error',
        message: 'Выберите город.',
      })

      return
    }

    if (!games) {
      setStatus({
        type: 'error',
        message: 'Выберите количество игр.',
      })

      return
    }

    setLoading(true)

    try {
      const formData = new URLSearchParams()

      /*
       * Очень важно:
       * этот параметр говорит Apps Script,
       * что заявка относится к WoodIQ.
       */
      formData.append(
        'orderType',
        'woodiq'
      )

      formData.append(
        'name',
        name
      )

      formData.append(
        'phone',
        '+' + digits
      )

      formData.append(
        'messenger',
        messenger
      )

      formData.append(
        'city',
        city
      )

      formData.append(
        'type',
        type
      )

      formData.append(
        'games',
        games
      )

      formData.append(
        'days',
        type === 'rental'
          ? days
          : 0
      )

      formData.append(
        'delivery',
        delivery
          ? 'true'
          : 'false'
      )

      formData.append(
        'price',
        price
      )

      formData.append(
        'deliveryPrice',
        deliveryPrice
      )

      formData.append(
        'total',
        total
      )

      formData.append(
        'comment',
        comment
      )


      const url = import.meta.env.VITE_URL
const response = await fetch(url, {
  method: 'POST',
  body: formData,
})

if (!response.ok) {
  throw new Error('Ошибка сервера')
}

      setStatus({
        type: 'success',
        message: 'Заявка успешно отправлена.',
      })


      setTimeout(() => {
        handleCloseAndReset()
      }, 3000)


    } catch (err) {

      console.error(err)

      setStatus({
        type: 'error',
        message: 'Не удалось отправить заявку.',
      })

    } finally {

      setLoading(false)

    }
  }


  const handleCloseAndReset = () => {
    setStatus({
      type: null,
      message: '',
    })

    setName('')
    setPhone('+48 ')
    setMessenger('telegram')
    setComment('')

    setType('rental')
    setGames(3)
    setDays(1)
    setDelivery(false)

    onClose()
  }


  if (!isOpen) return null


  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseAndReset()
        }
      }}
    >

      <div className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-[#f5efe4] text-[#302b26] shadow-2xl">

        {/* CLOSE */}
        <button
          type="button"
          onClick={handleCloseAndReset}
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#3d362e] text-xl text-white transition hover:bg-[#51473c]"
        >
          ×
        </button>


        <div className="p-6 sm:p-8">

          {status.type === 'success' ? (

            <div className="py-10 text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#c6ab84]/30 text-3xl">
                ✅
              </div>

              <h3 className="text-2xl font-bold">
                Заявка отправлена
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756b5e]">
                Спасибо! Мы получили вашу заявку.
                Свяжемся с вами для подтверждения
                заказа и деталей мероприятия.
              </p>

              <button
                type="button"
                onClick={handleCloseAndReset}
                className="mt-7 w-full rounded-xl bg-[#3d362e] px-6 py-3.5 font-bold text-[#f7f0e5] transition hover:bg-[#51473c]"
              >
                Закрыть
              </button>

            </div>

          ) : (

            <>
              {/* HEADER */}

              <div className="mb-7 pr-12">

                <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#96764d]">
                    WOOD IQ  Заказать игры
                </div>

              
                <p className="mt-2 text-sm leading-6 text-[#756b5e]">
                  Выберите формат, количество игр и
                  город. Стоимость рассчитывается автоматически.
                </p>

              </div>


              {/* ERROR */}

              {status.type === 'error' && (
                <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700">
                  {status.message}
                </div>
              )}


              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* АРЕНДА / ПОКУПКА */}

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Формат заказа
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={() => setType('rental')}
                      className={`rounded-2xl border px-5 py-4 text-left transition ${
                        type === 'rental'
                          ? 'border-[#3d362e] bg-[#3d362e] text-white'
                          : 'border-[#d5c4aa] bg-white'
                      }`}
                    >
                      <div className="text-lg font-black">
                        Аренда
                      </div>

                      <div className="mt-1 text-xs opacity-70">
                        На мероприятие
                      </div>
                    </button>


                    <button
                      type="button"
                      onClick={() => setType('purchase')}
                      className={`rounded-2xl border px-5 py-4 text-left transition ${
                        type === 'purchase'
                          ? 'border-[#3d362e] bg-[#3d362e] text-white'
                          : 'border-[#d5c4aa] bg-white'
                      }`}
                    >
                      <div className="text-lg font-black">
                        Покупка
                      </div>

                      <div className="mt-1 text-xs opacity-70">
                        Игры навсегда
                      </div>
                    </button>

                  </div>

                </div>


                {/* ГОРОД */}

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Город
                  </label>

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-[#d5c4aa] bg-white px-4 py-3.5 outline-none focus:border-[#96764d]"
                  >

                    {cities.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>

                </div>


                {/* КОЛИЧЕСТВО ИГР */}

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Количество игр
                  </label>

                  <select
                    value={games}
                    onChange={(e) =>
                      setGames(Number(e.target.value))
                    }
                    className="w-full rounded-xl border border-[#d5c4aa] bg-white px-4 py-3.5 outline-none focus:border-[#96764d]"
                  >

                    <option value={1}>
                      1 игра
                    </option>

                    <option value={2}>
                      2 игры
                    </option>

                    <option value={3}>
                      3 игры
                    </option>

                    <option value={4}>
                      4 игры
                    </option>

                    <option value={5}>
                      5 игр
                    </option>

                    <option value={7}>
                      7 игр
                    </option>

                    <option value={10}>
                      10 игр
                    </option>

                    <option value={20}>
                      20+ игр
                    </option>

                  </select>

                </div>


                {/* ДНИ */}

                {type === 'rental' && (

                  <div>

                    <label className="mb-2 block text-sm font-bold">
                      Срок аренды
                    </label>

                    <div className="grid grid-cols-2 gap-3">

                      <button
                        type="button"
                        onClick={() => setDays(1)}
                        className={`rounded-xl border px-4 py-3.5 font-bold ${
                          days === 1
                            ? 'border-[#3d362e] bg-[#3d362e] text-white'
                            : 'border-[#d5c4aa] bg-white'
                        }`}
                      >
                        1 день
                      </button>

                      <button
                        type="button"
                        onClick={() => setDays(2)}
                        className={`rounded-xl border px-4 py-3.5 font-bold ${
                          days === 2
                            ? 'border-[#3d362e] bg-[#3d362e] text-white'
                            : 'border-[#d5c4aa] bg-white'
                        }`}
                      >
                        2 дня
                      </button>

                    </div>

                  </div>

                )}


                {/* ДОСТАВКА */}

                <label className="flex cursor-pointer gap-3 rounded-2xl border border-[#d5c4aa] bg-white p-4">

                  <input
                    type="checkbox"
                    checked={delivery}
                    onChange={(e) =>
                      setDelivery(e.target.checked)
                    }
                    className="mt-1 h-5 w-5 accent-[#3d362e]"
                  />

                  <div>

                    <div className="font-bold">
                      🚚 Доставка и монтаж
                    </div>

                    <div className="mt-1 text-sm text-[#817669]">
                      Привезём, установим и подготовим игры
                    </div>

                    <div className="mt-1 font-bold text-[#8b6d47]">
                      +100 zł
                    </div>

                  </div>

                </label>


                {/* КОНТАКТЫ */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-bold">
                      Имя
                    </label>

                    <input
                      required
                      value={name}
                      maxLength={50}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Александр"
                      className="w-full rounded-xl border border-[#d5c4aa] bg-white px-4 py-3.5 outline-none focus:border-[#96764d]"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-sm font-bold">
                      Телефон
                    </label>

                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full rounded-xl border border-[#d5c4aa] bg-white px-4 py-3.5 outline-none focus:border-[#96764d]"
                    />

                  </div>

                </div>


                {/* МЕССЕНДЖЕР */}

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Связь
                  </label>

                  <select
                    value={messenger}
                    onChange={(e) =>
                      setMessenger(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#d5c4aa] bg-white px-4 py-3.5 outline-none"
                  >

                    <option value="telegram">
                      Telegram
                    </option>

                    <option value="instagram">
                      Instagram
                    </option>

                    <option value="whatsapp">
                      WhatsApp
                    </option>

                    <option value="call">
                      Звонок
                    </option>

                  </select>

                </div>


                {/* КОММЕНТАРИЙ */}

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Комментарий
                  </label>

                  <textarea
                    value={comment}
                    onChange={(e) =>
                      setComment(e.target.value)
                    }
                    rows={3}
                    placeholder="Дата мероприятия, адрес, дополнительные пожелания..."
                    className="w-full resize-none rounded-xl border border-[#d5c4aa] bg-white px-4 py-3.5 outline-none focus:border-[#96764d]"
                  />

                </div>


                {/* ИТОГ */}

                <div className="rounded-2xl bg-[#3d362e] p-5 text-[#f7f0e5]">

                  <div className="flex justify-between text-sm text-[#d7cabb]">

                    <span>
                      {type === 'rental'
                        ? 'Аренда'
                        : 'Покупка'}
                    </span>

                    <span>
                      {games} игр
                    </span>

                  </div>


                  {type === 'rental' && (
                    <div className="mt-2 flex justify-between text-sm text-[#d7cabb]">

                      <span>
                        Срок
                      </span>

                      <span>
                        {days === 1
                          ? '1 день'
                          : '2 дня'}
                      </span>

                    </div>
                  )}


                  <div className="mt-2 flex justify-between text-sm text-[#d7cabb]">

                    <span>
                      Игры
                    </span>

                    <span>
                      {price} zł
                    </span>

                  </div>


                  {delivery && (
                    <div className="mt-2 flex justify-between text-sm text-[#d7cabb]">

                      <span>
                        Доставка
                      </span>

                      <span>
                        {deliveryPrice} zł
                      </span>

                    </div>
                  )}


                  <div className="my-4 border-t border-white/10" />


                  <div className="flex items-center justify-between">

                    <span className="text-lg font-bold">
                      Итого
                    </span>

                    <span className="text-3xl font-black text-[#c6ab84]">
                      {total} zł
                    </span>

                  </div>

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#3d362e] px-6 py-4 font-bold text-[#f7f0e5] transition hover:bg-[#51473c] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading
                    ? 'Отправка...'
                    : 'Отправить заявку'}

                </button>


              </form>

            </>

          )}

        </div>

      </div>

    </div>
  )
}