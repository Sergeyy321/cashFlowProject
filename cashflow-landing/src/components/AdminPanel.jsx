import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  auth,
  db,
  signInWithEmailAndPassword,
  signOut,
  doc,
  setDoc
} from '../firebase/FireBase';

export function AdminPanel({ eventDetails, prices }) {
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(null)

  const [email, setEmail] = useState('admin@cashflow.pl')
  const [password, setPassword] = useState('')

  const [form, setForm] = useState({ event: eventDetails, prices })

  React.useEffect(() => {
    setForm({ event: eventDetails, prices })
  }, [eventDetails, prices])

  const login = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      setUser(result.user)
      setShowLogin(false)
      toast.success('Вход выполнен')
    } catch (e) {
      toast.error('Неверный email или пароль')
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    toast.success('Вы вышли из панели')
  }

  const saveChanges = async () => {
    try {
      await setDoc(doc(db, 'settings', 'main'), form)
      toast.success('Изменения сохранены')
    } catch (e) {
      toast.error('Ошибка сохранения')
    }
  }

  return (
    <>
      {!user && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setShowLogin(true)}
            className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-lime-400 hover:text-lime-400 transition"
          >
            ⚙
          </button>
        </div>
      )}

      {showLogin && !user && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-lime-400/10 flex items-center justify-center text-3xl">🔒</div>
            </div>

            <h2 className="text-2xl font-bold text-center text-white">Вход в админ-панель</h2>
            <p className="text-zinc-400 text-center mt-2 mb-6">
              Управление встречами и ценами
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-lime-400"
            />

            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-lime-400"
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLogin(false)}
                className="flex-1 rounded-xl border border-zinc-700 py-3 text-zinc-300 hover:bg-zinc-800"
              >
                Отмена
              </button>

              <button
                onClick={login}
                className="flex-1 rounded-xl bg-lime-400 py-3 font-bold text-zinc-950 hover:bg-lime-300"
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      )}

      {user && (
        <section className="py-16 px-6 border-t border-zinc-800">
          <div className="max-w-3xl mx-auto bg-zinc-900 rounded-3xl border border-zinc-800 p-8">
            <div className="flex items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Панель управления</h2>
                <p className="text-zinc-400 text-sm">Изменения публикуются сразу после сохранения</p>
              </div>
              <button
                onClick={logout}
                className="ml-auto px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Выйти
              </button>
            </div>

            <div className="grid gap-4">
              <input
                value={form.event.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    event: { ...form.event, date: e.target.value }
                  })
                }
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
              />

              <input
                value={form.event.place}
                onChange={(e) =>
                  setForm({
                    ...form,
                    event: { ...form.event, place: e.target.value }
                  })
                }
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
              />

              <input
                type="number"
                value={form.event.spots}
                onChange={(e) =>
                  setForm({
                    ...form,
                    event: { ...form.event, spots: Number(e.target.value) }
                  })
                }
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  type="number"
                  value={form.prices.test}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      prices: { ...form.prices, test: Number(e.target.value) }
                    })
                  }
                  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
                />

                <input
                  type="number"
                  value={form.prices.combo}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      prices: { ...form.prices, combo: Number(e.target.value) }
                    })
                  }
                  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
                />
              </div>

              <button
                onClick={saveChanges}
                className="mt-6 w-full rounded-xl bg-lime-400 py-3 font-bold text-zinc-950 hover:bg-lime-300 transition"
              >
                Сохранить изменения
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}