'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  Coffee,
  Compass,
  Heart,
  Home,
  House,
  MapPin,
  Menu,
  PawPrint,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Utensils,
  X,
} from 'lucide-react'

const categories = [
  ['Comer y beber', Utensils, 128], ['Qué hacer', Compass, 64], ['Compras', ShoppingBag, 91],
  ['Belleza', Sparkles, 46], ['Salud', Heart, 37], ['Hospedaje', House, 23],
  ['Hogar y servicios', Home, 58], ['Autos', Building2, 42], ['Educación', BriefcaseBusiness, 29],
  ['Mascotas', PawPrint, 18],
] as const

const businesses = [
  { name: 'Café Colonial', category: 'Café y desayunos', meta: 'Centro · 0.4 km', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', rating: '4.8', open: true },
  { name: 'La Casona de Don Porfirio', category: 'Cocina poblana', meta: 'Centro · 0.7 km', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85', rating: '4.7', open: true },
  { name: 'Hotel Colonial', category: 'Hospedaje', meta: 'Barrio del Carmen · 1.2 km', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85', rating: '4.6', open: false },
]

const quickLinks = [
  ['Promos activas hoy', Tag, '12 cerca de ti'],
  ['Eventos esta semana', CalendarDays, '8 planes'],
  ['Negocios abiertos', Bell, 'Ahora mismo'],
] as const

export default function Page() {
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState<string[]>([])
  const [active, setActive] = useState('Inicio')
  const [showMenu, setShowMenu] = useState(false)

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    return businesses.filter((business) => `${business.name} ${business.category}`.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  const toggleSaved = (name: string) => setSaved((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])

  return (
    <main className="min-h-screen bg-niebla text-grano">
      <header className="sticky top-0 z-30 border-b border-grano/10 bg-niebla/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-10">
          <button className="flex items-center gap-3" onClick={() => setActive('Inicio')} aria-label="Ir a inicio">
            <span className="grid size-10 place-items-center rounded-full bg-cerro text-perla"><span className="font-serif text-xl">H</span></span>
            <span className="leading-none"><strong className="block font-serif text-xl tracking-tight">HOYTEZIU</strong><small className="font-mono text-[9px] uppercase tracking-[0.2em] text-granizo">La Perla de la Sierra</small></span>
          </button>
          <nav className="hidden items-center gap-7 font-sans text-sm font-semibold lg:flex" aria-label="Navegación principal">
            {['Explorar', 'Promos', 'Eventos', 'Favoritos'].map((item) => <button key={item} onClick={() => setActive(item)} className={active === item ? 'text-granizo' : 'text-grano/65 hover:text-granizo'}>{item}</button>)}
          </nav>
          <div className="flex items-center gap-2"><button className="hidden rounded-full border border-grano/15 p-2.5 lg:block" aria-label="Cuenta"><CircleUserRound /></button><button className="rounded-full bg-cerro p-2.5 text-perla lg:hidden" onClick={() => setShowMenu(!showMenu)} aria-label="Abrir menú">{showMenu ? <X /> : <Menu />}</button><button className="hidden rounded-full bg-granizo px-4 py-2.5 font-sans text-sm font-bold text-perla lg:block" onClick={() => setActive('Cuenta')}>Entrar</button></div>
        </div>
        {showMenu && <div className="flex flex-col gap-4 border-t border-grano/10 px-5 py-5 font-sans text-sm font-semibold lg:hidden">{['Explorar', 'Promos', 'Eventos', 'Favoritos', 'Cuenta'].map((item) => <button className="text-left" key={item} onClick={() => { setActive(item); setShowMenu(false) }}>{item}</button>)}</div>}
      </header>

      <section className="relative overflow-hidden bg-perla px-5 pb-12 pt-12 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="pointer-events-none absolute -right-20 top-4 size-72 rounded-full bg-granizo/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl"><div className="max-w-3xl"><p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.22em] text-granizo">Guía local · Teziutlán, Puebla</p><h1 className="max-w-2xl font-serif text-5xl leading-[0.98] tracking-tight text-cerro sm:text-6xl lg:text-8xl">¿Qué hacemos <em className="text-granizo">hoy?</em></h1><p className="mt-6 max-w-xl font-sans text-base leading-7 text-grano/65 lg:text-lg">Lo mejor de Teziutlán, reunido en un solo lugar. Encuentra ese café, plan o servicio que estabas buscando.</p></div>
          <div className="relative mt-9 max-w-2xl"><div className="absolute -inset-5 -z-0 rounded-[2.5rem] bg-granizo/10 blur-2xl" /><div className="relative flex items-center gap-3 rounded-2xl border border-granizo/20 bg-niebla px-5 py-4 shadow-sm"><Search className="text-granizo" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent font-sans text-base outline-none placeholder:text-grano/45" placeholder="Busca un lugar, antojo o servicio..." aria-label="Buscar negocios" />{query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X className="size-5 text-grano/50" /></button>}<kbd className="hidden rounded-md border border-grano/15 bg-perla px-2 py-1 font-mono text-[10px] text-grano/50 sm:block">⌘ K</kbd></div>{suggestions.length > 0 && <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-grano/10 bg-perla p-2 shadow-xl">{suggestions.map((business) => <button key={business.name} onClick={() => setQuery(business.name)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-niebla"><div className="grid size-9 place-items-center rounded-full bg-granizo/10 text-granizo"><Search className="size-4" /></div><span><strong className="block font-sans text-sm">{business.name}</strong><small className="font-mono text-[10px] text-grano/50">{business.category}</small></span></button>)}</div>}</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-7 lg:px-10"><div className="grid gap-3 sm:grid-cols-3">{quickLinks.map(([label, Icon, detail]) => <button key={label} className="group flex items-center gap-3 rounded-2xl border border-grano/10 bg-perla p-4 text-left transition hover:-translate-y-0.5 hover:border-granizo/40"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-granizo/10 text-granizo"><Icon className="size-5" /></span><span className="min-w-0 flex-1"><strong className="block font-sans text-sm">{label}</strong><small className="font-mono text-[10px] text-grano/50">{detail}</small></span><ChevronRight className="size-4 text-grano/30 transition group-hover:translate-x-1" /></button>)}</div></section>

      <section className="mx-auto max-w-6xl px-5 py-4 lg:px-10"><div className="mb-5 flex items-end justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-granizo">Explora Teziutlán</p><h2 className="mt-1 font-serif text-3xl text-cerro">Todo empieza aquí</h2></div><button className="hidden items-center gap-1 font-sans text-sm font-bold text-granizo sm:flex">Ver todas <ArrowRight className="size-4" /></button></div><div className="no-scrollbar flex gap-3 overflow-x-auto pb-3">{categories.map(([label, Icon, count]) => <button key={label} onClick={() => setActive(label)} className="group flex min-w-[106px] flex-col items-center gap-2 rounded-2xl border border-grano/10 bg-perla px-3 py-4 transition hover:border-granizo/40"><span className="grid size-11 place-items-center rounded-full bg-niebla text-granizo group-hover:bg-granizo group-hover:text-perla"><Icon className="size-5" /></span><span className="text-center font-sans text-xs font-bold leading-4">{label}</span><small className="font-mono text-[9px] text-grano/45">{count} lugares</small></button>)}</div></section>

      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-10"><div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]"><div className="overflow-hidden rounded-3xl bg-cerro p-6 text-perla lg:p-8"><div className="flex items-start justify-between"><div><span className="inline-flex items-center gap-2 rounded-full bg-alerta px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-perla"><Tag className="size-3" /> Promo del día</span><h2 className="mt-5 max-w-sm font-serif text-4xl leading-tight">Un cafecito sabe mejor con descuento.</h2><p className="mt-3 max-w-sm font-sans text-sm leading-6 text-perla/60">Descubre las promociones que los negocios de Teziutlán prepararon para ti.</p></div><div className="hidden size-20 rounded-full border border-granizo/40 bg-granizo/20 lg:block" /></div><button className="mt-7 inline-flex items-center gap-2 rounded-full bg-granizo px-5 py-3 font-sans text-sm font-bold text-perla">Ver cupones <ArrowRight className="size-4" /></button></div><div className="relative min-h-64 overflow-hidden rounded-3xl bg-[#c8d8d5] p-5"><div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'linear-gradient(30deg, transparent 48%, rgba(46,116,128,.18) 49%, transparent 50%), linear-gradient(120deg, transparent 48%, rgba(46,116,128,.14) 49%, transparent 50%)', backgroundSize: '42px 42px' }} /><div className="relative flex items-center gap-2 rounded-xl bg-perla/90 px-3 py-2 font-mono text-[10px] text-grano shadow-sm"><MapPin className="size-4 text-alerta" /> 12 promos cerca de ti</div><div className="absolute left-[58%] top-[48%] grid size-8 place-items-center rounded-full border-4 border-perla bg-alerta text-perla shadow-lg"><MapPin className="size-4" /></div><div className="absolute left-[30%] top-[30%] grid size-6 place-items-center rounded-full border-2 border-perla bg-granizo shadow"><MapPin className="size-3 text-perla" /></div></div></div></section>

      <section className="mx-auto max-w-6xl px-5 py-4 lg:px-10"><div className="mb-5 flex items-end justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-granizo">Conoce lo local</p><h2 className="mt-1 font-serif text-3xl text-cerro">Recomendados</h2></div><button className="flex items-center gap-1 font-sans text-sm font-bold text-granizo">Explorar <ArrowRight className="size-4" /></button></div><div className="grid gap-5 md:grid-cols-3">{businesses.map((business) => <article key={business.name} className="overflow-hidden rounded-2xl border border-grano/10 bg-perla"><div className="relative aspect-[4/3] overflow-hidden"><img src={business.image} alt={`Interior de ${business.name}`} loading="lazy" className="size-full object-cover transition duration-500 hover:scale-105" /><button onClick={() => toggleSaved(business.name)} className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-perla/90 text-grano" aria-label={saved.includes(business.name) ? `Quitar ${business.name} de favoritos` : `Guardar ${business.name} en favoritos`}><Heart className={saved.includes(business.name) ? 'fill-alerta text-alerta' : ''} /></button><span className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wide ${business.open ? 'bg-perla text-granizo' : 'bg-grano/75 text-perla'}`}>{business.open ? 'Abierto ahora' : 'Cierra pronto'}</span></div><div className="p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-serif text-xl text-cerro">{business.name}</h3><p className="mt-1 font-sans text-xs text-grano/55">{business.category}</p></div><span className="flex items-center gap-1 font-mono text-xs"><Star className="size-3 fill-alerta text-alerta" />{business.rating}</span></div><div className="mt-4 flex items-center gap-1 font-mono text-[10px] text-grano/50"><MapPin className="size-3" />{business.meta}</div></div></article>)}</div></section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-10"><div className="relative overflow-hidden rounded-3xl bg-granizo p-7 text-perla lg:p-10"><div className="absolute -right-10 -top-20 size-64 rounded-full border-[30px] border-perla/10" /><div className="relative max-w-2xl"><div className="mb-5 flex items-center gap-3"><div className="grid size-12 place-items-center rounded-full border border-perla/40 bg-perla/15 backdrop-blur-sm"><Sparkles /></div><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-perla/70">Tu guía local</span></div><h2 className="font-serif text-4xl leading-tight lg:text-5xl">¿No sabes qué hacer? <em>Nosotros armamos el plan.</em></h2><p className="mt-4 max-w-lg font-sans text-sm leading-6 text-perla/75">Cuéntanos con quién vienes y cuánto quieres gastar. Te damos una idea completa para disfrutar Teziutlán.</p><button className="mt-6 inline-flex items-center gap-2 rounded-full bg-perla px-5 py-3 font-sans text-sm font-bold text-cerro">Arma tu plan <ArrowRight className="size-4" /></button></div></div></section>

      <footer className="mt-8 bg-cerro px-5 py-10 text-perla lg:px-10"><div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><strong className="font-serif text-2xl">HOYTEZIU</strong><p className="mt-2 max-w-xs font-sans text-sm leading-6 text-perla/55">La guía para vivir Teziutlán como alguien de aquí.</p></div><div className="flex flex-wrap gap-x-5 gap-y-3 font-sans text-xs text-perla/65"><a href="/privacidad">Privacidad</a><a href="/terminos">Términos</a><button>Registra tu negocio</button><button>Empleos</button></div></div></footer>
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-grano/10 bg-perla/95 px-5 py-3 backdrop-blur-md lg:hidden"><div className="mx-auto flex max-w-md items-center justify-between">{[['Inicio', House], ['Explorar', Compass], ['Promos', Tag], ['Favoritos', Heart], ['Cuenta', CircleUserRound]].map(([label, Icon]) => <button key={label as string} onClick={() => setActive(label as string)} className={`flex flex-col items-center gap-1 font-mono text-[9px] ${active === label ? 'text-granizo' : 'text-grano/45'}`}><Icon className="size-5" /><span>{label as string}</span></button>)}</div></div>
    </main>
  )
}
