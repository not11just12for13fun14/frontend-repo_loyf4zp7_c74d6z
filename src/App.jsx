import { useMemo, useState } from 'react'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Cart from './components/Cart'

function App() {
  const [started, setStarted] = useState(true)
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id)
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }
  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id))

  const [submitting, setSubmitting] = useState(false)
  const placeOrder = async () => {
    if (cart.length === 0) return
    setSubmitting(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || ''
      const payload = {
        customer_name: 'Guest',
        customer_phone: 'N/A',
        customer_address: 'N/A',
        items: cart.map(c => ({ menu_item_id: c.id, quantity: c.quantity }))
      }
      const res = await fetch(`${base}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to place order')
      alert(`Order placed! Total $${data.total}`)
      setCart([])
    } catch (e) {
      alert(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.06),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.06),transparent_40%)]"></div>
      <div className="relative">
        {!started && <Hero onStart={() => setStarted(true)} />}
        <Menu onAdd={addToCart} />
        <Cart items={cart} onRemove={removeFromCart} onCheckout={placeOrder} submitting={submitting} />
        <footer className="text-center text-white/60 py-6">Built with Flames Blue</footer>
      </div>
    </div>
  )
}

export default App
