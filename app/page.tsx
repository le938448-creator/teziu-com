'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Bell, Bookmark, CalendarDays, ChevronRight, CircleUserRound, Compass, Heart, House, MapPin, Menu, Search, Sparkles, Star, Tag, Utensils, X, Play, Navigation } from 'lucide-react'

const places = [
  { name: 'Centro Histórico', type: 'Caminar · arquitectura', image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=85', tag: 'Imperdible', likes: '1.2k' },
  { name: 'Santuario del Carmen', type: 'Historia · fotos', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=85', tag: 'Cultura', likes: '834' },
  { name: 'Cerro de Chignautla', type: 'Naturaleza · aventura', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85', tag: 'A 20 min', likes: '2.1k' },
  { name: 'Cascada de Altotonga', type: 'Escapada · agua', image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1000&q=85', tag: 'Fin de semana', likes: '967' },
]

const categories = [['Comer', Utensils], ['Explorar', Compass], ['Promos', Tag], ['Eventos', CalendarDays]] as const
const heroImage = '/teziutlan-hero.png'

export default function Page() {
  const [active, setActive] = useState('Inicio')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState<string[]>([])
  const [menu, setMenu] = useState(false)
  const [liked, setLiked] = useState<string[]>([])
  const results = useMemo(() => places.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())), [query])
  const toggle = (list: string[], setList: (value: string[]) => void, value: string) => setList(list.includes(value) ? list.filter((x) => x !== value) : [...list, value])

  return (
    <main className="min-h-screen bg-niebla pb-24 text-grano selection:bg-granizo/20">
      <header className="sticky top-0 z-40 border-b border-grano/10 bg-niebla/90 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button onClick={() => setActive('Inicio')} className="flex items-center gap-2.5" aria-label="Inicio">
            <span className="grid size-9 place-items-center rounded-xl bg-cerro font-serif text-lg text-perla shadow-sm">H</span>
            <span className="text-left leading-none"><strong className="block font-serif text-lg tracking-tight text-cerro">HOYTEZIU</strong><small className="font-mono text-[8px] uppercase tracking-[.16em] text-granizo">La Perla de la Sierra</small></span>
          </button>
          <div className="flex items-center gap-2"><button className="grid size-9 place-items-center rounded-full border border-grano/15 bg-perla text-grano" aria-label="Notificaciones"><Bell className="size-4" /></button><button className="grid size-9 place-items-center rounded-full bg-cerro text-perla lg:hidden" onClick={() => setMenu(!menu)} aria-label="Menú">{menu ? <X className="size-4" /> : <Menu className="size-4" />}</button><button onClick={() => setActive('Cuenta')} className="hidden rounded-full bg-granizo px-4 py-2 font-sans text-xs font-bold text-perla lg:block">Entrar</button></div>
        </div>
        <AnimatePresence>{menu && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mx-auto flex max-w-5xl flex-col gap-3 overflow-hidden pt-4 font-sans text-sm font-bold lg:hidden">{['Explorar', 'Promos', 'Eventos', 'Favoritos', 'Cuenta'].map((item) => <button key={item} className="border-t border-grano/10 pt-3 text-left" onClick={() => { setActive(item); setMenu(false) }}>{item}</button>)}</motion.nav>}</AnimatePresence>
      </header>

      <section className="relative mx-auto max-w-5xl overflow-hidden px-4 pb-5 pt-5 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="relative h-[380px] overflow-hidden rounded-[28px] bg-cerro shadow-xl shadow-cerro/15 sm:h-[440px]">
          <motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.4 }} src={heroImage} alt="Paisaje montañoso de Teziutlán" className="absolute inset-0 size-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-cerro via-cerro/35 to-transparent" />
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-perla/30 bg-cerro/35 px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-perla backdrop-blur-md"><span className="size-1.5 animate-pulse rounded-full bg-alerta" /> Teziutlán, Puebla</div>
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8"><p className="mb-2 font-mono text-[10px] uppercase tracking-[.22em] text-perla/65">Tu plan empieza aquí</p><h1 className="max-w-lg font-serif text-5xl leading-[.92] tracking-tight text-perla sm:text-7xl">Hay mucho<br /><em className="text-granizo">qué vivir.</em></h1><p className="mt-4 max-w-sm font-sans text-xs leading-5 text-perla/75">Lugares, sabores y planes para descubrir la sierra como alguien de aquí.</p>
            <div className="mt-5 flex max-w-md items-center gap-2 rounded-2xl border border-perla/25 bg-perla/95 px-3 py-2.5 text-grano shadow-lg"><Search className="size-4 shrink-0 text-granizo" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent font-sans text-xs outline-none placeholder:text-grano/45" placeholder="¿Qué se te antoja hoy?" aria-label="Buscar en Teziutlán" />{query && <button onClick={() => setQuery('')} aria-label="Limpiar"><X className="size-4" /></button>}</div>
            {query && <div className="absolute bottom-[-4px] left-0 right-0 z-10 translate-y-full rounded-2xl border border-grano/10 bg-perla p-2 text-grano shadow-2xl">{results.map((p) => <button key={p.name} onClick={() => setQuery(p.name)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-niebla"><img src={p.image} alt="" className="size-9 rounded-lg object-cover" /><span className="font-sans text-xs font-bold">{p.name}<small className="block font-mono text-[9px] font-normal text-grano/50">{p.type}</small></span></button>)}</div>}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-3 sm:px-6"><div className="grid grid-cols-4 gap-2">{categories.map(([label, Icon], i) => <motion.button whileTap={{ scale: .94 }} key={label} onClick={() => setActive(label)} className="flex flex-col items-center gap-2 rounded-2xl border border-grano/10 bg-perla py-3 shadow-sm"><span className={`grid size-9 place-items-center rounded-full ${i === 0 ? 'bg-granizo text-perla' : 'bg-niebla text-granizo'}`}><Icon className="size-4" /></span><span className="font-sans text-[10px] font-bold">{label}</span></motion.button>)}</div></section>

      <section className="mx-auto max-w-5xl px-4 py-7 sm:px-6"><div className="mb-4 flex items-end justify-between"><div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-granizo">La gente está guardando</p><h2 className="mt-1 font-serif text-3xl leading-none text-cerro">Planes de hoy</h2></div><button className="flex items-center gap-1 font-sans text-xs font-bold text-granizo">Ver todo <ArrowRight className="size-3" /></button></div><div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">{places.map((place, index) => <motion.article initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} key={place.name} className="min-w-[235px] overflow-hidden rounded-2xl border border-grano/10 bg-perla shadow-sm sm:min-w-0 sm:flex-1"><div className="relative aspect-[1.18] overflow-hidden"><img src={place.image} alt={place.name} loading="lazy" className="size-full object-cover transition duration-700 hover:scale-110" /><span className="absolute left-2.5 top-2.5 rounded-full bg-perla/90 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wide text-granizo">{place.tag}</span><button onClick={() => toggle(saved, setSaved, place.name)} aria-label="Guardar lugar" className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-cerro/55 text-perla backdrop-blur-sm"><Bookmark className={saved.includes(place.name) ? 'fill-perla' : ''} /></button></div><div className="p-3"><h3 className="font-serif text-lg leading-tight text-cerro">{place.name}</h3><p className="mt-1 font-sans text-[10px] text-grano/55">{place.type}</p><div className="mt-3 flex items-center justify-between"><span className="flex items-center gap-1 font-mono text-[9px] text-grano/50"><Heart className="size-3 fill-alerta text-alerta" /> {place.likes}</span><button onClick={() => toggle(liked, setLiked, place.name)} className="font-mono text-[9px] font-bold text-granizo">{liked.includes(place.name) ? 'Te gusta' : 'Me gusta'}</button></div></div></motion.article>)}</div></section>

      <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6"><div className="relative overflow-hidden rounded-3xl bg-granizo p-5 text-perla"><div className="absolute -right-10 -top-12 size-40 rounded-full border-[18px] border-perla/10" /><div className="relative flex items-center gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-perla/15"><Navigation className="size-5" /></div><div><p className="font-mono text-[9px] uppercase tracking-widest text-perla/65">Cerca de ti</p><h2 className="font-serif text-2xl">12 promos activas</h2></div></div><button className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-perla py-3 font-sans text-xs font-bold text-cerro">Explorar mapa <ChevronRight className="size-4" /></button></div></section>

      <footer className="mx-auto flex max-w-5xl items-center justify-between border-t border-grano/10 px-4 py-7 sm:px-6"><span className="font-serif text-lg text-cerro">HOYTEZIU</span><span className="font-mono text-[9px] text-grano/45">Hecho con orgullo serrano</span></footer>
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-grano/10 bg-perla/95 px-4 py-2.5 backdrop-blur-xl lg:hidden"><div className="mx-auto flex max-w-md items-center justify-between">{[['Inicio', House], ['Explorar', Compass], ['Promos', Tag], ['Favoritos', Bookmark], ['Cuenta', CircleUserRound]].map(([label, Icon]) => <button key={label as string} onClick={() => setActive(label as string)} className={`flex min-w-12 flex-col items-center gap-1 font-mono text-[8px] ${active === label ? 'text-granizo' : 'text-grano/45'}`}><Icon className="size-[18px]" /><span>{label as string}</span></button>)}</div></nav>
    </main>
  )
}

