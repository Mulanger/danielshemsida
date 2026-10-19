import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
const knifeServices = [
  { value: 'grund-kniv', label: 'Grundslipning av kniv', price: 99, display: '99 kr', description: 'Gäller köksknivar, jaktknivar, fällknivar och moraknivar.', discountEligible: true, category: 'slipning' },
  { value: 'grund-sax', label: 'Grundslipning av sax', price: 119, display: '119 kr', description: 'Gäller hushållssaxar och frisörsaxar med rak egg.', discountEligible: true, category: 'slipning' },
  { value: 'brodkniv', label: 'Slipning av brödkniv', price: 139, display: '139 kr', description: 'Gäller ej omtandning.', discountEligible: true, category: 'slipning' },
  { value: 'spets', label: 'Reparation av spets', price: 69, display: '69 kr', description: 'Återskapande av knivens profil.', discountEligible: false, category: 'reparation' },
  { value: 'hack', label: 'Reparation av hack', price: 99, display: '99 kr', description: 'Bortslipning av skador.', discountEligible: false, category: 'reparation' },
  { value: 'latt-tunning', label: 'Lätt tunning', price: 99, display: '99 kr', description: 'Får bladet att skära med mindre motstånd.', discountEligible: false, category: 'modifikation' },
  { value: 'storre-tunning', label: 'Större tunning', price: 199, display: '199 kr', description: 'För tjocka blad med dåliga skäregenskaper.', discountEligible: false, category: 'modifikation' },
]
function ImageCompare() {
  const [position, setPosition] = useState(50)
  return <div className="relative w-full max-w-sm aspect-square bg-gray-100 rounded-[2.5rem] shadow-inner overflow-hidden select-none">
    <img src="/knife-after.jpg" alt="Slipad kniv" draggable="false" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img src="/knife-before-matched.jpg" alt="Oslipad kniv" draggable="false" className="absolute inset-0 w-full h-full object-cover" /></div>
    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-700 shadow-sm">Före</span>
    <span className="absolute right-4 top-4 rounded-full bg-zinc-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">Efter</span>
    <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)] pointer-events-none" style={{ left: `${position}%` }}><div className="absolute bottom-4 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5 3 12l5 7M16 5l5 7-5 7M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></div></div>
    <input aria-label="Dra för att jämföra före och efter" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0" />
  </div>
}

const faqItems = [
  { value: 'faq-1', title: 'Hur går slipningen till?', content: 'Slipningen genomförs i två steg:\n\nGrundslipning: Arbetet utförs antingen på ett vattenkylt band, en våtstensmaskin eller med japanska slipstenar. Det beror på verktyget och hur slitet det är.\n\nSlutfinish: Den råegg som bildas tas bort med hjälp av fina stenar och läder för att skapa en helt ren egg som skär effektivt.' },
  { value: 'faq-3', title: 'Vad innebär det att “tunna ut” ett knivblad?', content: 'Att tunna ut bladet innebär att jag tar bort material ovanför själva eggen. Det gör att kniven skär betydligt mer effektivt och glider mycket lättare genom råvarorna. Jag gör alltid en kostnadsfri bedömning utifrån dina användningsområden för att se om kniven behöver tunnas ut.' },
  { value: 'faq-4', title: 'Kostar det extra om min kniv har hack eller bruten spets?', content: 'Ja. Reparation av spets kostar 69 kr och återskapar knivens profil. Reparation av hack kostar 99 kr och innebär att skadan slipas bort. Jag reserverar mig för eventuella dolda fel eller mikrosprickor i materialet som kan framträda vid slipning.' },
  { value: 'faq-5', title: 'Hur fungerar er nöjd kundgaranti?', content: 'Jag är yrkesaktiv kock och lämnar aldrig ifrån mig en kniv som inte lever upp till min förväntan. Därför testar jag alla knivar före leverans. Skulle slipningen ändå inte leva upp till dina förväntningar är det bara att kontakta mig så löser jag det.' },
  { value: 'faq-6', title: 'Hur lämnar jag och hämtar mina knivar?', content: 'Du kan när som helst lämna av knivarna i min markpostlåda. Lägg dem i en mindre låda eller linda in dem i en handduk och påse. Lägg en lapp med ditt nummer i paketet.\n\nDu kan också boka hämtning eller utkörning, vilket kostar 69 kr per tillfälle och erbjuds inom Falköpings tätort.' },
  { value: 'faq-7', title: 'Slipar du andra redskap än knivar?', content: 'Självklart. Jag slipar hushållssaxar och frisörsaxar med rak egg för 119 kr. Har du något annat som du önskar få slipat är du välkommen att skicka en förfrågan.' },
  { value: 'faq-8', title: 'Slipar du alla typer av knivar?', content: 'Ja, de allra flesta. Utöver köksknivar slipar jag även jaktknivar, arbetsknivar, buköppnare och fällknivar. Jag slipar också brödknivar, men erbjuder inte omtandning.' },
  { value: 'faq-9', title: 'Erbjuder du någon mängdrabatt?', content: 'Ja, du får 15 % rabatt när du lämnar in 4 eller fler objekt för slipning. Detta gäller ej på reparationer. Som återkommande kund får du ytterligare 5 % rabatt på ett helt köp.' },
  { value: 'faq-10', title: 'Är min trasiga kniv värd att reparera?', content: 'Om du är osäker på om kniven är kostnadsmässigt värd att laga kan du skicka in närbilder på den till mig. Jag tittar på bilderna och ger dig en kostnadsfri bedömning av vad som kan göras.' },
  { value: 'faq-11', title: 'Hur lång tid tar det och hur betalar jag?', content: 'Oftast är arbetet slutfört på 1–2 dagar. Därefter skickar jag en betalningsförfrågan eller faktura till företag, och du kan hämta dina nyslipade redskap. Bokar du via hemsidan kan du även betala direkt online.' },
]

function FaqColumn({ items }) {
  const [openItems, setOpenItems] = useState([items[0].value])
  const toggleItem = (value) => setOpenItems((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])

  return <div className="w-full space-y-2">
    {items.map((item) => {
      const isOpen = openItems.includes(item.value)
      const contentId = `${item.value}-content`
      return <div key={item.value} className={`overflow-hidden rounded-sm bg-white transition-shadow duration-300 ${isOpen ? 'shadow-lg' : 'shadow-sm'}`}>
        <h3>
          <button type="button" aria-expanded={isOpen} aria-controls={contentId} onClick={() => toggleItem(item.value)} className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left text-sm font-medium text-zinc-900 transition-colors hover:text-gray-600 sm:text-base">
            <span>{item.title}</span>
            <svg className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </h3>
        <div id={contentId} className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="min-h-0 overflow-hidden"><p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-gray-500">{item.content}</p></div>
        </div>
      </div>
    })}
  </div>
}

function getCartSummary(quantities) {
  const selected = knifeServices.filter((service) => quantities[service.value] > 0)
  const itemCount = selected.reduce((sum, service) => sum + quantities[service.value], 0)
  const eligibleCount = selected.filter((service) => service.discountEligible).reduce((sum, service) => sum + quantities[service.value], 0)
  const subtotal = selected.reduce((sum, service) => sum + service.price * quantities[service.value], 0)
  const eligibleSubtotal = selected.filter((service) => service.discountEligible).reduce((sum, service) => sum + service.price * quantities[service.value], 0)
  const discount = eligibleCount >= 4 ? Math.round(eligibleSubtotal * 0.15) : 0
  const hasRepairOrModification = selected.some((service) => !service.discountEligible)
  return { selected, itemCount, eligibleCount, subtotal, discount, total: subtotal - discount, hasRepairOrModification }
}

function ServiceSelector({ quantities, onQuantityChange }) {
  const { hasRepairOrModification } = getCartSummary(quantities)
  const renderService = (service) => <div key={service.value} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-gray-200 py-5 last:border-0">
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1"><h5 className="text-sm font-bold text-zinc-900 sm:text-base">{service.label}</h5><span className="text-sm font-bold text-zinc-900">{service.display}</span></div>
      <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">{service.description}</p>
    </div>
    <div className="flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm" aria-label={`Antal ${service.label}`}>
      <button type="button" onClick={() => onQuantityChange(service.value, -1)} disabled={quantities[service.value] === 0} aria-label={`Minska antal ${service.label}`} className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-zinc-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300">−</button>
      <span className="w-7 text-center text-sm font-bold tabular-nums text-zinc-900" aria-live="polite">{quantities[service.value]}</span>
      <button type="button" onClick={() => onQuantityChange(service.value, 1)} aria-label={`Öka antal ${service.label}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-lg text-white transition hover:bg-gray-700">+</button>
    </div>
  </div>

  return <div className="space-y-8">
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div><h4 className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Slipning</h4>{knifeServices.filter((service) => service.category === 'slipning').map(renderService)}</div>
      <div><h4 className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Reparation & modifikation</h4>{knifeServices.filter((service) => service.category !== 'slipning').map(renderService)}</div>
    </div>
    {hasRepairOrModification && <p className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-xs italic leading-relaxed text-gray-600 sm:text-sm">Jag reserverar mig för eventuella dolda fel eller mikrosprickor i materialet som kan framträda vid slipning.</p>}
    <p className="text-xs leading-relaxed text-gray-400">Reparationer och modifikationer räknas inte in i gränsen för 15 % mängdrabatt.</p>
  </div>
}

function CheckoutDrawer({ open, onClose, quantities, onQuantityChange }) {
  const { selected, itemCount, eligibleCount, subtotal, discount, total, hasRepairOrModification } = getCartSummary(quantities)
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])
  if (!open || itemCount === 0) return null

  return <aside role="dialog" aria-modal="false" aria-labelledby="checkout-title" className="fixed left-1/2 top-[68px] z-[80] flex h-[calc(100dvh-84px)] max-h-[640px] w-[calc(100%-1.5rem)] max-w-[350px] -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_20px_64px_rgba(17,24,39,0.22)] sm:left-auto sm:right-4 sm:top-[76px] sm:h-[calc(100dvh-96px)] sm:translate-x-0">
    <div className="flex items-start justify-between border-b border-gray-200 px-4 py-4"><div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">VASS / CHECKOUT</p><h2 id="checkout-title" className="mt-1 text-xl font-extrabold tracking-tight text-zinc-900">Dina tjänster</h2><p className="mt-0.5 text-[11px] text-gray-500">{itemCount} {itemCount === 1 ? 'vald tjänst' : 'valda tjänster'}</p></div><button type="button" onClick={onClose} aria-label="Minimera checkout" className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-zinc-900"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></button></div>
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-1">{selected.map((service) => <div key={service.value} className="border-b border-gray-100 py-3 last:border-0"><div className="flex items-start justify-between gap-3"><div><h3 className="text-[13px] font-bold text-zinc-900">{service.label}</h3><p className="mt-0.5 text-[11px] leading-relaxed text-gray-500">{service.description}</p></div><strong className="whitespace-nowrap text-xs text-zinc-900">{service.price * quantities[service.value]} kr</strong></div><div className="mt-2.5 flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{service.discountEligible ? 'Rabattgrundande' : 'Fast pris'}</span><div className="flex items-center rounded-full border border-gray-200 p-0.5"><button type="button" onClick={() => onQuantityChange(service.value, -1)} aria-label={`Minska antal ${service.label}`} className="flex h-6 w-6 items-center justify-center rounded-full text-sm text-zinc-900 hover:bg-gray-100">−</button><span className="w-6 text-center text-[11px] font-bold tabular-nums">{quantities[service.value]}</span><button type="button" onClick={() => onQuantityChange(service.value, 1)} aria-label={`Öka antal ${service.label}`} className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-sm text-white hover:bg-gray-700">+</button></div></div></div>)}</div>
    <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-4 py-4">{hasRepairOrModification && <p className="mb-3 text-[10px] italic leading-relaxed text-gray-500">Jag reserverar mig för eventuella dolda fel eller mikrosprickor i materialet som kan framträda vid slipning.</p>}<div className="space-y-1.5 text-xs"><div className="flex justify-between text-gray-500"><span>Delsumma</span><span>{subtotal} kr</span></div>{discount > 0 && <div className="flex justify-between font-semibold text-zinc-900"><span>Mängdrabatt 15 %</span><span>−{discount} kr</span></div>}<div className="flex items-end justify-between border-t border-gray-200 pt-2.5"><span className="font-bold text-zinc-900">Totalt</span><strong className="text-xl font-extrabold tracking-tight text-zinc-900">{total} kr</strong></div></div>{eligibleCount < 4 ? <p className="mt-2 text-[11px] text-gray-500">Lägg till {4 - eligibleCount} {4 - eligibleCount === 1 ? 'slipning' : 'slipningar'} för 15 % rabatt.</p> : <p className="mt-2 text-[11px] font-semibold text-zinc-900">15 % rabatt på slipning är aktiverad.</p>}<button type="button" className="mt-3.5 w-full rounded-lg bg-zinc-900 px-4 py-3 text-xs font-bold text-white shadow-md transition hover:bg-gray-800">Fortsätt till checkout</button></div>
  </aside>
}



function SendKnifeModal({ onClose }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedServices, setSelectedServices] = useState(['grund-kniv'])
  const [submitted, setSubmitted] = useState(false)
  const updateQuantity = (value) => {
    const next = Math.max(1, Math.min(20, Number(value) || 1))
    setQuantity(next)
    setSelectedServices((current) => Array.from({ length: next }, (_, index) => current[index] || 'grund-kniv'))
  }
  const updateService = (index, value) => setSelectedServices((current) => current.map((service, serviceIndex) => serviceIndex === index ? value : service))
  const subtotal = selectedServices.reduce((sum, selected) => sum + (knifeServices.find((service) => service.value === selected)?.price || 0), 0)
  const discountEligibleServices = selectedServices.map((selected) => knifeServices.find((service) => service.value === selected)).filter((service) => service?.discountEligible)
  const eligibleSubtotal = discountEligibleServices.reduce((sum, service) => sum + service.price, 0)
  const discount = discountEligibleServices.length >= 4 ? Math.round(eligibleSubtotal * 0.15) : 0
  const total = subtotal - discount
  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [onClose])
  return <div className="fixed inset-0 z-[100] overflow-y-auto bg-zinc-900/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="send-knife-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="mx-auto my-4 max-w-3xl overflow-hidden rounded-2xl bg-gray-50 shadow-2xl sm:my-8">
      <div className="flex items-start justify-between border-b border-gray-200 bg-white px-6 py-5 sm:px-8"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">VASS / BOKNING</p><h2 id="send-knife-title" className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">Skicka kniv</h2><p className="mt-2 text-sm text-gray-500">Fyll i uppgifterna så återkommer jag med nästa steg.</p></div><button type="button" onClick={onClose} aria-label="Stäng formuläret" className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-zinc-900"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></button></div>
      {submitted ? <div className="px-6 py-16 text-center sm:px-8"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h3 className="text-2xl font-bold text-zinc-900">Tack! Din förfrågan är registrerad.</h3><p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">Jag återkommer till dig med bekräftelse och information om nästa steg.</p><button type="button" onClick={onClose} className="mt-8 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800">Stäng</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }} className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Namn</span><input required name="name" type="text" placeholder="Ditt namn" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Antal redskap</span><input required name="quantity" type="number" min="1" max="20" value={quantity} onChange={(event) => updateQuantity(event.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" /></label></div>
          <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Adress</span><input required name="address" type="text" placeholder="Gatuadress, postnummer och ort" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" /></label>
          <fieldset><legend className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">Hur vill du lämna in?</legend><div className="grid gap-3 sm:grid-cols-2"><label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 has-[:checked]:border-zinc-900 has-[:checked]:ring-1 has-[:checked]:ring-zinc-900"><input required type="radio" name="delivery" value="dropoff" defaultChecked className="mt-1 accent-zinc-900" /><span><strong className="block text-sm text-zinc-900">Jag lämnar in själv</strong><small className="mt-1 block text-xs leading-relaxed text-gray-500">Jag möter dig vid receptionen.</small></span></label><label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 has-[:checked]:border-zinc-900 has-[:checked]:ring-1 has-[:checked]:ring-zinc-900"><input required type="radio" name="delivery" value="envelope" className="mt-1 accent-zinc-900" /><span><strong className="block text-sm text-zinc-900">Skicka kuvert till mig</strong><small className="mt-1 block text-xs leading-relaxed text-gray-500">Jag skickar instruktioner.</small></span></label></div></fieldset>
          <div><div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-widest text-gray-500">Tjänst per redskap</span><span className="text-xs text-gray-400">{quantity} {quantity === 1 ? 'redskap' : 'redskap'}</span></div><div className="space-y-3">{selectedServices.map((selected, index) => <label key={index} className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">{index + 1}</span><select value={selected} onChange={(event) => updateService(index, event.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10">{knifeServices.map((service) => <option key={service.value} value={service.value}>{service.label} — {service.display}</option>)}</select></label>)}</div>{selectedServices.some((selected) => !knifeServices.find((service) => service.value === selected)?.discountEligible) && <p className="mt-3 text-xs italic leading-relaxed text-gray-500">Jag reserverar mig för eventuella dolda fel eller mikrosprickor i materialet som kan framträda vid slipning.</p>}</div>
        </div>
        <aside className="h-fit rounded-2xl bg-zinc-900 p-6 text-white sm:p-7 lg:sticky lg:top-6"><p className="text-xs font-bold uppercase tracking-widest text-gray-400">Prisöversikt</p><div className="mt-6 space-y-3 text-sm"><div className="flex justify-between text-gray-300"><span>{quantity} redskap</span><span>{subtotal} kr</span></div>{discount > 0 && <div className="flex justify-between font-semibold text-white"><span>Mängdrabatt (15%)</span><span>−{discount} kr</span></div>}<div className="border-t border-white/15 pt-4"><div className="flex items-end justify-between"><span className="text-gray-400">Beräknat totalpris</span><strong className="text-3xl tracking-tight">{total} kr</strong></div></div></div><div className="mt-7 rounded-xl bg-white/10 p-4 text-xs leading-relaxed text-gray-300">{discountEligibleServices.length >= 4 ? '15 % mängdrabatt på slipning är applicerad.' : `Lägg till ${4 - discountEligibleServices.length} ${4 - discountEligibleServices.length === 1 ? 'slipning' : 'slipningar'} för att få 15 % mängdrabatt.`}<span className="mt-2 block text-gray-400">Reparationer och modifikationer räknas inte in.</span>{quantity >= 3 && <span className="mt-2 block text-white">Fri upphämtning i närområdet vid minst 3 redskap!</span>}</div><button type="submit" className="mt-7 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-zinc-900 transition hover:bg-gray-200">Skicka förfrågan</button></aside>
      </form>}
    </div>
  </div>
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [serviceQuantities, setServiceQuantities] = useState(() => Object.fromEntries(knifeServices.map((service) => [service.value, 0])))
  const { itemCount: checkoutItemCount } = getCartSummary(serviceQuantities)
  const updateServiceQuantity = (value, change) => setServiceQuantities((current) => {
    const next = { ...current, [value]: Math.max(0, Math.min(20, current[value] + change)) }
    const nextItemCount = Object.values(next).reduce((sum, quantity) => sum + quantity, 0)
    if (change > 0) setCheckoutOpen(true)
    if (nextItemCount === 0) setCheckoutOpen(false)
    return next
  })
  const closeMenu = () => setMenuOpen(false)
  return <div className="font-sans bg-gray-50 text-gray-900 antialiased selection:bg-zinc-900 selection:text-white">
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between relative">
        <a href="#top" aria-label="VASS Sliperi" onClick={closeMenu}><img src="/vass-header-logo.png" alt="VASS" className="h-7 sm:h-8 w-auto object-contain" /></a>
        <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-full left-0 right-0 bg-white md:bg-transparent border-b md:border-0 border-gray-200 px-4 sm:px-6 md:px-0 py-3 md:py-0 flex-col md:flex-row items-stretch md:items-center justify-end space-y-1 md:space-y-0 md:space-x-5 lg:space-x-10`}>
          <a href="#priser" onClick={closeMenu} className="py-3 md:py-0 text-xs sm:text-sm font-semibold text-gray-600 hover:text-zinc-900 uppercase tracking-widest transition-colors duration-200">Priser</a>
          <a href="#tjanster" onClick={closeMenu} className="py-3 md:py-0 text-xs sm:text-sm font-semibold text-gray-600 hover:text-zinc-900 uppercase tracking-widest transition-colors duration-200">Tjänster</a>
          <a href="#om-mig" onClick={closeMenu} className="py-3 md:py-0 text-xs sm:text-sm font-semibold text-gray-600 hover:text-zinc-900 uppercase tracking-widest transition-colors duration-200">Om mig</a>
          <a href="#kontakt" onClick={closeMenu} className="py-3 md:py-0 text-xs sm:text-sm font-semibold text-gray-600 hover:text-zinc-900 uppercase tracking-widest transition-colors duration-200">Kontakt</a>
        </div>
        <div className="ml-4 flex items-center gap-1.5"><button type="button" onClick={() => checkoutItemCount > 0 && setCheckoutOpen((current) => !current)} disabled={checkoutItemCount === 0} aria-expanded={checkoutOpen} aria-label={checkoutItemCount > 0 ? `${checkoutOpen ? 'Minimera' : 'Öppna'} checkout med ${checkoutItemCount} ${checkoutItemCount === 1 ? 'tjänst' : 'tjänster'}` : 'Checkout är tom'} className={`relative flex h-10 w-10 items-center justify-center rounded-full border bg-white text-zinc-900 shadow-sm transition hover:border-gray-300 hover:shadow-md disabled:cursor-default disabled:text-gray-300 disabled:shadow-none ${checkoutOpen ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-gray-200'}`}><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h2l1.7 9.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H7M10 20h.01M18 20h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>{checkoutItemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">{checkoutItemCount}</span>}</button><button type="button" aria-label="Öppna meny" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="p-2 -mr-2 text-zinc-900 md:hidden"><span className="block w-6 h-0.5 bg-current mb-1.5"></span><span className="block w-6 h-0.5 bg-current mb-1.5"></span><span className="block w-6 h-0.5 bg-current"></span></button></div>
      </div>
    </nav>

    <header className="relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-7 sm:gap-8 lg:gap-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left lg:translate-x-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-[12px] font-medium mb-6 sm:mb-8"><span className="w-2 h-2 rounded-full bg-green-500"></span> Öppet för inlämning</div>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] leading-[1.4] text-[#111827] mb-2 sm:text-[16px] sm:tracking-[0.32em]">JAG GER DINA KNIVAR</p>
          <h1 className="font-editorial whitespace-nowrap text-[clamp(58px,16vw,76px)] font-semibold leading-[0.9] tracking-[-0.055em] text-[#111318] sm:text-[clamp(104px,9.5vw,132px)]">Nytt liv.</h1>
          <div className="mx-auto mt-5 mb-5 h-px w-10 bg-[#c9cdd3] sm:mx-0 sm:mt-[26px] sm:mb-[28px] sm:w-[60px]"></div>
          <p className="mx-auto mb-[26px] max-w-[340px] font-sans text-[15px] font-normal leading-[1.6] tracking-[-0.01em] text-[#4b5563] sm:mx-0 sm:max-w-[550px] sm:text-[18px] sm:leading-[1.65]">Professionell slipning av köksknivar, saxar och verktyg för både hemmakockar och restauranger i Falköping & Skaraborg. Lämna in slött, få tillbaka sylvasst – snabbt, smidigt och med en skärpa som håller.</p>
          <div className="flex w-auto max-w-none flex-col items-center gap-2 sm:flex-row sm:items-stretch sm:gap-4 justify-center lg:justify-start"><a href="#priser" className="flex min-h-[48px] w-auto min-w-[220px] items-center justify-center gap-4 rounded-[10px] bg-[#19191b] px-6 text-[14px] font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-gray-800 active:translate-y-0 sm:min-w-0">Se min prislista <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></a><a href="#tjanster" className="flex min-h-[48px] w-auto min-w-[220px] items-center justify-center gap-3 rounded-[10px] border-[1.5px] border-[#19191b] bg-white px-6 text-[14px] font-medium text-[#19191b] transition-colors hover:bg-gray-50 sm:min-w-0">Välj tjänster <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></a></div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center"><ImageCompare /></div>
      </div>
    </header>

    <main>
      <section id="sa-funkar-det" className="bg-white py-12 px-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-10"><div className="h-px bg-gray-300 flex-1 max-w-[100px] md:max-w-[150px]"></div><h2 className="px-4 text-sm md:text-base font-bold tracking-widest text-zinc-900 uppercase whitespace-nowrap">Så funkar det:</h2><div className="h-px bg-gray-300 flex-1 max-w-[100px] md:max-w-[150px]"></div></div>
          <div className="grid grid-cols-2 gap-3 text-center sm:gap-4 lg:grid-cols-4">
            <div className="group relative flex min-h-[190px] flex-col items-center rounded-2xl border border-gray-200 bg-white px-3 pb-5 pt-7 shadow-[0_8px_28px_rgba(17,24,39,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(17,24,39,0.12)] sm:min-h-[210px] sm:px-6 sm:pb-7 sm:pt-8"><div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-sm sm:left-4 sm:top-4 sm:h-8 sm:w-8 sm:text-sm">1</div><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-zinc-800 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white sm:h-14 sm:w-14"><svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3.5" width="14" height="17" rx="2" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 8h6M8 12h4M15.5 16.5l4-4 1.5 1.5-4 4-2.5.8.8-2.3Z" /></svg></div><p className="text-[12px] font-medium leading-[1.55] text-gray-700 sm:text-sm sm:leading-relaxed">Berätta vilka redskap du vill få slipade.</p></div>
            <div className="group relative flex min-h-[190px] flex-col items-center rounded-2xl border border-gray-200 bg-white px-3 pb-5 pt-7 shadow-[0_8px_28px_rgba(17,24,39,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(17,24,39,0.12)] sm:min-h-[210px] sm:px-6 sm:pb-7 sm:pt-8"><div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-sm sm:left-4 sm:top-4 sm:h-8 sm:w-8 sm:text-sm">2</div><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-zinc-800 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white sm:h-14 sm:w-14"><svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h3m6.5-.5 1.2 1.2 2.3-2.6" /></svg></div><p className="text-[12px] font-medium leading-[1.55] text-gray-700 sm:text-sm sm:leading-relaxed">Bekräfta beställning och betala säkert online.</p></div>
            <div className="group relative flex min-h-[190px] flex-col items-center rounded-2xl border border-gray-200 bg-white px-3 pb-5 pt-7 shadow-[0_8px_28px_rgba(17,24,39,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(17,24,39,0.12)] sm:min-h-[210px] sm:px-6 sm:pb-7 sm:pt-8"><div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-sm sm:left-4 sm:top-4 sm:h-8 sm:w-8 sm:text-sm">3</div><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-zinc-800 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white sm:h-14 sm:w-14"><svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7.5V17l9 4 9-4V7.5M12 12v9M16 5l-9 4.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.5 10.2v3.3h3.3" /></svg></div><p className="text-[12px] font-medium leading-[1.55] text-gray-700 sm:text-sm sm:leading-relaxed">Packa och märk med ditt nummer. Lämna in själv eller välj upphämtning.</p></div>
            <div className="group relative flex min-h-[190px] flex-col items-center rounded-2xl border border-gray-200 bg-white px-3 pb-5 pt-7 shadow-[0_8px_28px_rgba(17,24,39,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(17,24,39,0.12)] sm:min-h-[210px] sm:px-6 sm:pb-7 sm:pt-8"><div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-sm sm:left-4 sm:top-4 sm:h-8 sm:w-8 sm:text-sm">4</div><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-zinc-800 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white sm:h-14 sm:w-14"><svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 4h6M10 4c0 2.2-1 3.2-3 4l-1.5 12h13L17 8c-2-.8-3-1.8-3-4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10-4 2m14-2 4 2M9 14h6v3H9z" /></svg></div><p className="text-[12px] font-medium leading-[1.55] text-gray-700 sm:text-sm sm:leading-relaxed">Redskapen slipas. Jag levererar till dig, eller du hämtar själv.</p></div>
          </div>
        </div>
      </section>      <section id="priser" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center text-zinc-900 uppercase mb-12">Prislista & Slipning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold uppercase tracking-wide text-gray-800 mb-2">Slipning av kniv</h3>
            <div className="text-5xl font-extrabold text-zinc-900 my-6">99<span className="text-lg font-medium text-gray-500 ml-1">kr</span></div>
            <p className="text-gray-600 leading-relaxed text-sm">Ny jämn egg. Ofta vassare än ny!</p>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-white"></div>
            <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2">Paketerbjudande – 4 st slipningar</h3>
            <div className="text-5xl font-extrabold text-white my-6">15<span className="text-lg font-medium text-gray-400 ml-1">% rabatt</span></div>
            <p className="text-gray-300 leading-relaxed text-sm">20 % rabatt för återkommande kunder.</p>
          </div>
        </div>

        <div className="bg-gray-100/80 rounded-xl p-6 md:p-8 text-center text-sm md:text-base font-medium text-gray-800 mb-16 border border-gray-200">
          <span className="inline-block bg-zinc-900 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">Erbjudande</span><br />
          Mängdrabatt: <strong className="text-zinc-900">15% rabatt</strong> vid 4 eller fler objekt för slipning.<br className="hidden sm:block" />
          Fri upphämtning i närområdet vid minst 3 redskap!
        </div>

        <div id="tjanster" className="mx-auto max-w-4xl">
          <h3 className="mb-8 border-b border-gray-300 pb-2 text-lg font-bold uppercase tracking-wide text-zinc-900">Tjänster & Reparationer</h3>
          <ServiceSelector quantities={serviceQuantities} onQuantityChange={updateServiceQuantity} />
        </div>
      </section>

      <section id="om-mig" className="border-y border-gray-200 bg-gray-50 px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          <div className="flex min-h-[420px] flex-col justify-between rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm md:p-12">
            <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">VASS / OM MIG</p><h2 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 uppercase md:text-4xl">Om Mig</h2><div className="space-y-6 text-base leading-relaxed text-gray-600 md:text-lg"><p>Som entusiastisk och yrkesaktiv kock vet jag hur avgörande vassa redskap är för både arbetsglädje och resultat. Min filosofi är enkel: din kniv ska ha en perfekt balans mellan skärpa och hållbarhet, anpassad exakt för det du ska använda den till. Redskapet ska inte slipas mer än vad som behövs för att maximera dess livslängd.</p><p>Har du frågor om mina tjänster, specifika ståltyper eller vill boka upphämtning? Tveka inte att höra av dig.</p></div></div><div className="mt-10 border-t border-gray-200 pt-5"><p className="mb-0 text-xs font-medium uppercase tracking-widest text-gray-400">Traditionell slipning · Personlig service</p></div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 shadow-sm md:min-h-[520px]"><img src="/vass-workshop.jpg" alt="VASS sliperi i verkstaden" className="absolute inset-0 h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div><span className="absolute bottom-5 left-6 rounded-full bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-900 shadow-sm">Min verkstad</span></div>
        </div>
      </section>

      <section id="vanliga-fragor" className="border-b border-gray-200 bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-xl"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">VASS / FRÅGOR</p><h2 className="text-3xl font-bold uppercase tracking-tight text-zinc-900 md:text-4xl">Vanliga frågor</h2><p className="mt-4 max-w-lg text-base leading-relaxed text-gray-500">Här hittar du svar på vanliga frågor om slipning, inlämning och service.</p></div>
          <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 md:gap-4">
            <FaqColumn items={faqItems.slice(0, 6)} />
            <FaqColumn items={faqItems.slice(6)} />
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-20 md:py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 uppercase mb-10 md:mb-12 text-center">Kontakt & Bokning</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto text-left items-stretch">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between min-h-[420px]">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Hör av dig</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm"><span className="block">Har du frågor eller vill boka in en slipning?</span><span className="block mt-1">Hör av dig så hjälper jag dig vidare.</span></p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
              <div><span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">Telefon</span><a href="tel:0700000000" className="text-xl font-semibold text-zinc-900 hover:text-gray-600 transition-colors">070-000 00 00</a></div>
              <div><span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">E-post</span><a href="mailto:info@vass-sliperi.se" className="text-base font-semibold text-zinc-900 hover:text-gray-600 underline decoration-2 underline-offset-4 transition-colors break-words">info@vass-sliperi.se</a></div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8"><h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Öppettider</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"><p className="mb-0"><strong className="text-zinc-900 block">Måndag – Fredag</strong><span className="text-gray-600">08:00 – 17:00</span></p><p className="mb-0"><strong className="text-zinc-900 block">Lördag & Söndag</strong><span className="text-gray-600">Enligt överenskommelse</span></p></div></div>
          </div>
          <div className="relative min-h-[420px] lg:min-h-[520px] overflow-hidden rounded-2xl border border-gray-200 bg-[#e9e9e7] shadow-sm" aria-label="Karta över Rapidgatan 38 i Falköping">
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'linear-gradient(28deg, transparent 0 42%, rgba(255,255,255,.75) 42.5% 44%, transparent 44.5%), linear-gradient(112deg, transparent 0 29%, rgba(255,255,255,.65) 29.5% 31%, transparent 31.5%), linear-gradient(4deg, transparent 0 68%, rgba(255,255,255,.7) 68.5% 70%, transparent 70.5%), linear-gradient(146deg, transparent 0 77%, rgba(255,255,255,.6) 77.5% 79%, transparent 79.5%)' }}></div>
            <div className="absolute -left-16 top-[22%] h-10 w-[125%] rotate-[22deg] rounded-full bg-white/45"></div><div className="absolute -left-16 top-[56%] h-8 w-[125%] rotate-[-14deg] rounded-full bg-white/50"></div><div className="absolute left-[45%] top-[-15%] h-[130%] w-8 rotate-[18deg] rounded-full bg-white/45"></div>
            <span className="absolute left-[13%] top-[24%] text-xs font-medium text-gray-500/70">Mösseberg</span><span className="absolute right-[12%] top-[22%] text-xs font-medium text-gray-500/70">Stenstorp</span><span className="absolute left-[12%] bottom-[24%] text-xs font-medium text-gray-500/70">Åsle</span><span className="absolute right-[11%] bottom-[20%] text-xs font-medium text-gray-500/70">Skövde</span>
            <div className="absolute left-[52%] top-[42%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"><div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg ring-8 ring-zinc-900/10"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7"/></svg></div></div>
            <div className="absolute inset-x-8 bottom-8"><p className="mb-1 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">Rapidgatan 38</p><p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Falköping · Västra Götaland</p></div>
            <a href="https://www.google.com/maps/search/?api=1&query=Rapidgatan%2038%2C%20Falk%C3%B6ping" target="_blank" rel="noreferrer" className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-900 shadow-sm hover:bg-white">Öppna karta ↗</a>
          </div>
        </div>
      </section>
    </main>

    <footer className="bg-zinc-900 text-gray-400 text-center py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <p className="text-sm">&copy; 2026 VASS Sliperi och Knivservice. Alla rättigheter förbehållna.</p>
        <a href="#top" className="text-sm text-white hover:text-gray-300 transition-colors uppercase tracking-wider">Tillbaka till toppen &uarr;</a>
      </div>
    </footer>
    <CheckoutDrawer open={checkoutOpen} onClose={() => setCheckoutOpen(false)} quantities={serviceQuantities} onQuantityChange={updateServiceQuantity} />
  </div>
}
createRoot(document.getElementById('root')).render(<App />)
