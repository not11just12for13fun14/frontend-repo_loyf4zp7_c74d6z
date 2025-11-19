import { useEffect, useState } from 'react'
import { ShoppingCart, Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Menu({ onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`${API_BASE}/menu`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-white/80">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Loading menu...
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <div key={item.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur hover:border-green-400/40 transition">
          {item.image_url && (
            <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover"/>
          )}
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-white font-semibold">{item.name}</h3>
                <p className="text-white/70 text-sm line-clamp-2">{item.description}</p>
              </div>
              <span className="text-green-400 font-semibold">${item.price.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-white/60 px-2 py-1 rounded bg-white/5 border border-white/10">{item.category}</span>
              <button
                disabled={!item.is_available}
                onClick={() => onAdd(item)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-slate-900 font-medium disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4"/>
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
