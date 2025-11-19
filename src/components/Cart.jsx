import { useMemo } from 'react'
import { Trash2 } from 'lucide-react'

export default function Cart({ items, onQty, onRemove, onCheckout, placing }) {
  const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.quantity, 0), [items])

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sticky top-6">
      <h3 className="text-white font-semibold mb-3">Your Cart</h3>
      {items.length === 0 ? (
        <p className="text-white/60 text-sm">No items yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map(ci => (
            <div key={ci.id} className="flex items-start justify-between gap-3">
              <div>
                <p className="text-white font-medium">{ci.name}</p>
                <p className="text-white/60 text-xs">${ci.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded bg-white/10 text-white" onClick={() => onQty(ci.id, Math.max(1, ci.quantity - 1))}>-</button>
                <span className="text-white w-6 text-center">{ci.quantity}</span>
                <button className="px-2 py-1 rounded bg-white/10 text-white" onClick={() => onQty(ci.id, ci.quantity + 1)}>+</button>
                <button className="ml-2 text-red-400 hover:text-red-300" onClick={() => onRemove(ci.id)}>
                  <Trash2 className="w-4 h-4"/>
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-white/80">Total</span>
            <span className="text-green-400 font-semibold">${total.toFixed(2)}</span>
          </div>

          <button disabled={placing} onClick={() => onCheckout(total)} className="w-full mt-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-slate-900 font-semibold disabled:opacity-50">
            {placing ? 'Placing...' : 'Place Order'}
          </button>
        </div>
      )}
    </div>
  )
}
