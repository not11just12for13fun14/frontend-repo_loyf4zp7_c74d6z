import { Utensils, ShoppingCart } from "lucide-react";

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.15),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.15),transparent_35%)]" />
      <div className="relative max-w-5xl mx-auto text-center py-16 px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/10 backdrop-blur text-white mb-6">
          <Utensils />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Fresh. Fast. Delicious.
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          Browse a curated menu of tasty dishes and add your favorites to the cart. Place an order in seconds.
        </p>
        <button onClick={onStart} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-slate-900 font-semibold shadow-lg transition">
          <ShoppingCart className="w-5 h-5" /> Explore Menu
        </button>
      </div>
    </section>
  )
}
