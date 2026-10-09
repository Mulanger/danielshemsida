import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
const knifeServices = [
  { value: 'grund', label: 'Grundslipning', price: 119, display: '119 kr' },
  { value: 'lyx', label: 'Lyxslipning Pro', price: 139, display: '139 kr' },
  { value: 'sekatör', label: 'Övrigt: Sekatör / Sax', price: 69, display: '69 kr' },
  { value: 'grensax', label: 'Övrigt: Grensax / Yxa', price: 79, display: '79–119 kr', variable: true },
  { value: 'spets', label: 'Reparation: Avbruten knivspets', price: 70, display: '+70 kr' },
  { value: 'hack', label: 'Reparation: Större hack i eggen', price: 50, display: '+50 kr' },
]
function ImageCompare() {
  const [position, setPosition] = useState(50)
  return <div className="relative w-full max-w-sm aspect-square bg-gray-100 rounded-[2.5rem] shadow-inner overflow-hidden select-none">
    <img src="/knife-after.jpg" alt="Slipad kniv" draggable="false" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img src="/knife-before.jpg" alt="Oslipad kniv" draggable="false" className="absolute inset-0 w-full h-full object-cover" /></div>
    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-700 shadow-sm">Före</span>
    <span className="absolute right-4 top-4 rounded-full bg-zinc-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">Efter</span>
    <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)] pointer-events-none" style={{ left: `${position}%` }}><div className="absolute bottom-4 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5 3 12l5 7M16 5l5 7-5 7M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></div></div>
    <input aria-label="Dra för att jämföra före och efter" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0" />
  </div>
}



function SendKnifeModal({ onClose }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedServices, setSelectedServices] = useState(['grund'])
  const [submitted, setSubmitted] = useState(false)
  const updateQuantity = (value) => {
    const next = Math.max(1, Math.min(20, Number(value) || 1))
    setQuantity(next)
    setSelectedServices((current) => Array.from({ length: next }, (_, index) => current[index] || 'grund'))
  }
  const updateService = (index, value) => setSelectedServices((current) => current.map((service, serviceIndex) => serviceIndex === index ? value : service))
  const subtotal = selectedServices.reduce((sum, selected) => sum + (knifeServices.find((service) => service.value === selected)?.price || 0), 0)
  const discount = quantity >= 5 ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount
  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [onClose])
  return <div className="fixed inset-0 z-[100] overflow-y-auto bg-zinc-900/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="send-knife-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="mx-auto my-4 max-w-3xl overflow-hidden rounded-2xl bg-gray-50 shadow-2xl sm:my-8">
      <div className="flex items-start justify-between border-b border-gray-200 bg-white px-6 py-5 sm:px-8"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">VASS / BOKNING</p><h2 id="send-knife-title" className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">Skicka kniv</h2><p className="mt-2 text-sm text-gray-500">Fyll i uppgifterna så återkommer vi med nästa steg.</p></div><button type="button" onClick={onClose} aria-label="Stäng formuläret" className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-zinc-900"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></button></div>
      {submitted ? <div className="px-6 py-16 text-center sm:px-8"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h3 className="text-2xl font-bold text-zinc-900">Tack! Din förfrågan är registrerad.</h3><p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">Vi återkommer till dig med bekräftelse och information om nästa steg.</p><button type="button" onClick={onClose} className="mt-8 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800">Stäng</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }} className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Namn</span><input required name="name" type="text" placeholder="Ditt namn" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Antal knivar</span><input required name="quantity" type="number" min="1" max="20" value={quantity} onChange={(event) => updateQuantity(event.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" /></label></div>
          <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Adress</span><input required name="address" type="text" placeholder="Gatuadress, postnummer och ort" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" /></label>
          <fieldset><legend className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">Hur vill du lämna in?</legend><div className="grid gap-3 sm:grid-cols-2"><label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 has-[:checked]:border-zinc-900 has-[:checked]:ring-1 has-[:checked]:ring-zinc-900"><input required type="radio" name="delivery" value="dropoff" defaultChecked className="mt-1 accent-zinc-900" /><span><strong className="block text-sm text-zinc-900">Jag lämnar in själv</strong><small className="mt-1 block text-xs leading-relaxed text-gray-500">Vi ses vid receptionen.</small></span></label><label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 has-[:checked]:border-zinc-900 has-[:checked]:ring-1 has-[:checked]:ring-zinc-900"><input required type="radio" name="delivery" value="envelope" className="mt-1 accent-zinc-900" /><span><strong className="block text-sm text-zinc-900">Skicka kuvert till mig</strong><small className="mt-1 block text-xs leading-relaxed text-gray-500">Vi skickar instruktioner.</small></span></label></div></fieldset>
          <div><div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-widest text-gray-500">Tjänst per kniv</span><span className="text-xs text-gray-400">{quantity} {quantity === 1 ? 'kniv' : 'knivar'}</span></div><div className="space-y-3">{selectedServices.map((selected, index) => <label key={index} className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">{index + 1}</span><select value={selected} onChange={(event) => updateService(index, event.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10">{knifeServices.map((service) => <option key={service.value} value={service.value}>{service.label} — {service.display}</option>)}</select></label>)}</div><p className="mt-3 text-xs italic text-gray-400">Grensax / Yxa räknas från 79 kr; slutpriset kan bli upp till 119 kr.</p></div>
        </div>
        <aside className="h-fit rounded-2xl bg-zinc-900 p-6 text-white sm:p-7 lg:sticky lg:top-6"><p className="text-xs font-bold uppercase tracking-widest text-gray-400">Prisöversikt</p><div className="mt-6 space-y-3 text-sm"><div className="flex justify-between text-gray-300"><span>{quantity} {quantity === 1 ? 'kniv' : 'knivar'}</span><span>{subtotal} kr</span></div>{discount > 0 && <div className="flex justify-between font-semibold text-white"><span>Mängdrabatt (10%)</span><span>−{discount} kr</span></div>}<div className="border-t border-white/15 pt-4"><div className="flex items-end justify-between"><span className="text-gray-400">Beräknat totalpris</span><strong className="text-3xl tracking-tight">{total} kr</strong></div></div></div><div className="mt-7 rounded-xl bg-white/10 p-4 text-xs leading-relaxed text-gray-300">{quantity >= 5 ? '10 % mängdrabatt är applicerad.' : `Lägg till ${5 - quantity} ${5 - quantity === 1 ? 'kniv' : 'knivar'} för att få 10 % mängdrabatt.`}{quantity >= 3 && <span className="mt-2 block text-white">Fri upphämtning i närområdet vid minst 3 knivar!</span>}</div><button type="submit" className="mt-7 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-zinc-900 transition hover:bg-gray-200">Skicka förfrågan</button></aside>
      </form>}
    </div>
  </div>
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <div className="font-sans bg-gray-50 text-gray-900 antialiased selection:bg-zinc-900 selection:text-white">
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between relative">
        <a href="#top" aria-label="VASS Sliperi" onClick={closeMenu}><img src="/vass-header-logo.png" alt="VASS" className="h-7 sm:h-8 w-auto object-contain" /></a>
        <button type="button" aria-label="Öppna meny" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -mr-2 text-zinc-900"><span className="block w-6 h-0.5 bg-current mb-1.5"></span><span className="block w-6 h-0.5 bg-current mb-1.5"></span><span className="block w-6 h-0.5 bg-current"></span></button>
        <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-full left-0 right-0 bg-white md:bg-transparent border-b md:border-0 border-gray-200 px-4 sm:px-6 md:px-0 py-3 md:py-0 flex-col md:flex-row items-stretch md:items-center justify-end space-y-1 md:space-y-0 md:space-x-5 lg:space-x-10`}>
          <a href="#priser" onClick={closeMenu} className="py-3 md:py-0 text-xs sm:text-sm font-semibold text-gray-600 hover:text-zinc-900 uppercase tracking-widest transition-colors duration-200">Priser</a>
          <a href="#tjanster" onClick={closeMenu} className="py-3 md:py-0 text-xs sm:text-sm font-semibold text-gray-600 hover:text-zinc-900 uppercase tracking-widest transition-colors duration-200">Tjänster</a>
          <a href="#om-oss" onClick={closeMenu} className="py-3 md:py-0 text-xs sm:text-sm font-semibold text-gray-600 hover:text-zinc-900 uppercase tracking-widest transition-colors duration-200">Om oss</a>
          <a href="#kontakt" onClick={closeMenu} className="py-3 md:py-0 text-xs sm:text-sm font-semibold text-gray-600 hover:text-zinc-900 uppercase tracking-widest transition-colors duration-200">Kontakt</a>
        </div>
      </div>
    </nav>

    <header className="relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-7 sm:gap-8 lg:gap-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left lg:translate-x-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-[12px] font-medium mb-6 sm:mb-8"><span className="w-2 h-2 rounded-full bg-green-500"></span> Öppet för inlämning</div>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] leading-[1.4] text-[#111827] mb-2 sm:text-[16px] sm:tracking-[0.32em]">VI GER DINA KNIVAR</p>
          <h1 className="font-editorial whitespace-nowrap text-[clamp(58px,16vw,76px)] font-semibold leading-[0.9] tracking-[-0.055em] text-[#111318] sm:text-[clamp(104px,9.5vw,132px)]">Nytt liv.</h1>
          <div className="mx-auto mt-5 mb-5 h-px w-10 bg-[#c9cdd3] sm:mx-0 sm:mt-[26px] sm:mb-[28px] sm:w-[60px]"></div>
          <p className="mx-auto mb-[26px] max-w-[340px] font-sans text-[15px] font-normal leading-[1.6] tracking-[-0.01em] text-[#4b5563] sm:mx-0 sm:max-w-[550px] sm:text-[18px] sm:leading-[1.65]">Professionell slipning av köksknivar, saxar och verktyg för både hemmakockar och restauranger. Vi slipar för hand för perfekt resultat.</p>
          <div className="flex w-auto max-w-none flex-col items-center gap-2 sm:flex-row sm:items-stretch sm:gap-4 justify-center lg:justify-start"><a href="#priser" className="flex min-h-[48px] w-auto min-w-[220px] items-center justify-center gap-4 rounded-[10px] bg-[#19191b] px-6 text-[14px] font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-gray-800 active:translate-y-0 sm:min-w-0">Se vår prislista <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></a><button type="button" onClick={() => { closeMenu(); setModalOpen(true) }} className="flex min-h-[48px] w-auto min-w-[220px] items-center justify-center gap-3 rounded-[10px] border-[1.5px] border-[#19191b] bg-white px-6 text-[14px] font-medium text-[#19191b] transition-colors hover:bg-gray-50 sm:min-w-0">Skicka kniv <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button></div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center"><ImageCompare /></div>
      </div>
    </header>

    <main>
      <section id="sa-funkar-det" className="bg-white py-12 px-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-10"><div className="h-px bg-gray-300 flex-1 max-w-[100px] md:max-w-[150px]"></div><h2 className="px-4 text-sm md:text-base font-bold tracking-widest text-zinc-900 uppercase whitespace-nowrap">Så funkar det:</h2><div className="h-px bg-gray-300 flex-1 max-w-[100px] md:max-w-[150px]"></div></div>
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-3 text-center">
            <div className="flex flex-col items-center flex-1"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">1</div><svg className="w-11 h-11 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5v-8Z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m8 8 3 2 3-2" /></svg></div><p className="text-sm text-gray-700 leading-relaxed max-w-[200px]">Berätta vilka knivar du vill få slipade.</p></div>
            <div className="hidden lg:flex items-center justify-center pt-8"><svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></div>
            <div className="flex flex-col items-center flex-1"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">2</div><svg className="w-11 h-11 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7.5V17l9 4 9-4V7.5M12 12v9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 5l-9 4.5" /></svg></div><p className="text-sm text-gray-700 leading-relaxed max-w-[200px]">Lämna in själv, få ett kuvert skickat eller välj upphämtning.</p></div>
            <div className="hidden lg:flex items-center justify-center pt-8"><svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></div>
            <div className="flex flex-col items-center flex-1"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">3</div><svg className="w-11 h-11 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h3" /></svg></div><p className="text-sm text-gray-700 leading-relaxed max-w-[200px]">Bekräfta beställningen och betala säkert online.</p></div>
            <div className="hidden lg:flex items-center justify-center pt-8"><svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></div>
            <div className="flex flex-col items-center flex-1"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">4</div><svg className="w-11 h-11 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8.5h13a3 3 0 0 1 3 3v4H3v-7Z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 12h2l1.5 2.5H19M6 15.5a2 2 0 1 0 4 0M16 15.5a2 2 0 1 0 4 0" /></svg></div><p className="text-sm text-gray-700 leading-relaxed max-w-[200px]">Vi slipar knivarna och skickar eller lämnar tillbaka dem.</p></div>
          </div>
        </div>
      </section>      <section id="priser" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center text-zinc-900 uppercase mb-12">Prislista & Slipning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold uppercase tracking-wide text-gray-800 mb-2">Grundslipning</h3>
            <div className="text-5xl font-extrabold text-zinc-900 my-6">119<span className="text-lg font-medium text-gray-500 ml-1">kr</span></div>
            <p className="text-gray-600 leading-relaxed text-sm">Grundslipas på Japanska våtstenar upp till 3000 grit. Utmärkt för vanliga köksknivar.</p>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-white"></div>
            <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2">Lyxslipning Pro</h3>
            <div className="text-5xl font-extrabold text-white my-6">139<span className="text-lg font-medium text-gray-400 ml-1">kr</span></div>
            <p className="text-gray-300 leading-relaxed text-sm">Högpolerad rakbladsvass finish upp till 12 000 grit på Shapton-stenar för bästa skärpa.</p>
          </div>
        </div>

        <div className="bg-gray-100/80 rounded-xl p-6 md:p-8 text-center text-sm md:text-base font-medium text-gray-800 mb-16 border border-gray-200">
          <span className="inline-block bg-zinc-900 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">Erbjudande</span><br />
          Mängdrabatt: <strong className="text-zinc-900">10% rabatt</strong> vid 5 eller fler knivar.<br className="hidden sm:block" />
          Fri upphämtning i närområdet vid minst 3 knivar!
        </div>

        <div id="tjanster" className="max-w-2xl mx-auto">
          <h3 className="text-lg font-bold uppercase tracking-wide text-zinc-900 border-b border-gray-300 pb-2 mb-6">Fler Tjänster & Reparationer</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center py-3 border-b border-gray-100"><span className="text-gray-700"><strong className="text-zinc-900 font-semibold">Övrigt:</strong> Sekatör / Sax</span><span className="font-bold text-zinc-900">69 kr</span></li>
            <li className="flex justify-between items-center py-3 border-b border-gray-100"><span className="text-gray-700"><strong className="text-zinc-900 font-semibold">Övrigt:</strong> Grensax / Yxa</span><span className="font-bold text-zinc-900">79 - 119 kr</span></li>
            <li className="flex justify-between items-center py-3 border-b border-gray-100"><span className="text-gray-700"><strong className="text-zinc-900 font-semibold">Reparation:</strong> Avbruten knivspets</span><span className="font-bold text-zinc-900">+70 kr</span></li>
            <li className="flex justify-between items-center py-3 border-b border-gray-100"><span className="text-gray-700"><strong className="text-zinc-900 font-semibold">Reparation:</strong> Större hack i eggen</span><span className="font-bold text-zinc-900">+50 kr</span></li>
          </ul>
          <p className="text-sm text-gray-500 italic mt-6">* Mindre hack (upp till 1 mm) ingår i det ordinarie slipningspriset.</p>
        </div>
      </section>

      <section id="om-oss" className="bg-white py-24 px-6 border-y border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 uppercase mb-8">Om Oss</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg text-left md:text-center">
            <p><strong className="block text-zinc-900 mb-2">Äkta hantverk för dina verktyg.</strong>Vi slipar köksknivar och eggverktyg på traditionellt vis med keramiska våtstenar. Genom att tunna ut eggen och avverka minimalt med stål förlängs knivens livslängd, samtidigt som du får en rakbladsvass skärupplevelse som maskinslipning aldrig kan matcha.</p>
            <p>Har du frågor om våra tjänster, specifika ståltyper eller vill boka upphämtning? Tveka inte att höra av dig.</p>
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-20 md:py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 uppercase mb-10 md:mb-12 text-center">Kontakt & Bokning</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto text-left items-stretch">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between min-h-[420px]">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Hör av dig</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm"><span className="block">Har du frågor eller vill boka in en slipning?</span><span className="block mt-1">Hör av dig så hjälper vi dig vidare.</span></p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
              <div><span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">Telefon</span><a href="tel:0700000000" className="text-xl font-semibold text-zinc-900 hover:text-gray-600 transition-colors">070-000 00 00</a></div>
              <div><span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">E-post</span><a href="mailto:info@vass-sliperi.se" className="text-base font-semibold text-zinc-900 hover:text-gray-600 underline decoration-2 underline-offset-4 transition-colors break-words">info@vass-sliperi.se</a></div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8"><h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Öppettider</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"><p className="mb-0"><strong className="text-zinc-900 block">Måndag – Fredag</strong><span className="text-gray-600">08:00 – 17:00</span></p><p className="mb-0"><strong className="text-zinc-900 block">Lördag & Söndag</strong><span className="text-gray-600">Enligt överenskommelse</span></p></div></div>
          </div>
          <div className="relative min-h-[420px] lg:min-h-[520px] overflow-hidden rounded-2xl border border-gray-200 bg-[#e9e9e7] shadow-sm" aria-label="Karta över Falköping">
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'linear-gradient(28deg, transparent 0 42%, rgba(255,255,255,.75) 42.5% 44%, transparent 44.5%), linear-gradient(112deg, transparent 0 29%, rgba(255,255,255,.65) 29.5% 31%, transparent 31.5%), linear-gradient(4deg, transparent 0 68%, rgba(255,255,255,.7) 68.5% 70%, transparent 70.5%), linear-gradient(146deg, transparent 0 77%, rgba(255,255,255,.6) 77.5% 79%, transparent 79.5%)' }}></div>
            <div className="absolute -left-16 top-[22%] h-10 w-[125%] rotate-[22deg] rounded-full bg-white/45"></div><div className="absolute -left-16 top-[56%] h-8 w-[125%] rotate-[-14deg] rounded-full bg-white/50"></div><div className="absolute left-[45%] top-[-15%] h-[130%] w-8 rotate-[18deg] rounded-full bg-white/45"></div>
            <span className="absolute left-[13%] top-[24%] text-xs font-medium text-gray-500/70">Mösseberg</span><span className="absolute right-[12%] top-[22%] text-xs font-medium text-gray-500/70">Stenstorp</span><span className="absolute left-[12%] bottom-[24%] text-xs font-medium text-gray-500/70">Åsle</span><span className="absolute right-[11%] bottom-[20%] text-xs font-medium text-gray-500/70">Skövde</span>
            <div className="absolute left-[52%] top-[42%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"><div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg ring-8 ring-zinc-900/10"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7"/></svg></div></div>
            <div className="absolute inset-x-8 bottom-8"><p className="mb-1 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">Falköping</p><p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Västra Götaland · Sverige</p></div>
            <a href="https://www.google.com/maps/search/?api=1&query=Falköping" target="_blank" rel="noreferrer" className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-900 shadow-sm hover:bg-white">Öppna karta ↗</a>
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
    {modalOpen && <SendKnifeModal onClose={() => setModalOpen(false)} />}
  </div>
}
createRoot(document.getElementById('root')).render(<App />)





























