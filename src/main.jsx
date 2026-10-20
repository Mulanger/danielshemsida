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
  return <div className="relative aspect-[2032/1134] w-[88%] max-w-xl select-none bg-transparent sm:w-full">
    <img src="/knife-edge-after-transparent-hq.png" alt="Slipad knivegg" draggable="false" className="absolute inset-0 h-full w-full object-contain object-center" />
    <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img src="/knife-edge-before-transparent-hq.png" alt="Oslipad knivegg" draggable="false" className="absolute inset-0 h-full w-full object-contain object-center" /></div>
    <span className="absolute left-4 top-4 rounded-full bg-zinc-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">Före</span>
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
  { value: 'faq-11', title: 'Hur lång tid tar det och hur betalar jag?', content: 'Oftast är arbetet slutfört på 1–2 dagar. Därefter skickar jag en betalningsförfrågan eller faktura till företag, och du kan hämta dina nyslipade redskap.' },
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

const companyContact = ['Adress: Rapidgatan 38, Falköping', 'Telefon: 072-974 33 79', 'E-post: kontakt@vass-sliperi.se']

// Innehållet i en sektion: sträng = stycke, array = punktlista.
const policyDocuments = {
  terms: {
    title: 'Köpvillkor',
    eyebrow: 'Villkor',
    updated: '20 oktober 2026',
    intro: 'Villkoren gäller när du anlitar VASS Sliperi och Knivservice för slipning, reparation eller modifikation av knivar, saxar och andra eggverktyg – oavsett om du bokar via webbplatsen, per telefon, via e-post eller lämnar in redskapen direkt. Villkoren begränsar aldrig de rättigheter du har som konsument enligt lag.',
    sections: [
      { heading: 'Om VASS', content: ['VASS Sliperi och Knivservice är en enskild firma med F-skatt. I villkoren kallas företaget ”VASS” eller ”jag” och du som kund ”du”.', companyContact] },
      { heading: 'Tjänster och priser', content: ['Alla priser anges i svenska kronor och är slutpriser för dig som privatperson. Aktuella priser:', [...knifeServices.map((service) => `${service.label} – ${service.display}. ${service.description}`), 'Upphämtning eller utkörning inom Falköpings tätort – 69 kr per tillfälle.'], 'Det slutliga priset framgår av din bokning. Tillkommer något arbete som du inte har beställt gäller punkt 6.'] },
      { heading: 'Rabatter och erbjudanden', content: [['Mängdrabatt: 15 % rabatt på slipning när du lämnar in 4 eller fler redskap för slipning vid samma tillfälle.', 'Reparationer och modifikationer, till exempel reparation av spets eller hack och tunning, ger inte mängdrabatt och räknas inte in i antalet.', 'Återkommande kund: som återkommande kund får du ytterligare 5 % rabatt på hela köpet.', 'Fri upphämtning: vid minst 3 redskap är upphämtningen kostnadsfri i närområdet.']] },
      { heading: 'Bokning och avtal', content: ['Du bokar via webbplatsens checkout, per telefon eller via e-post. Avtalet är ingått när du har slutfört bokningen eller, om du inte har bokat i förväg, när du lämnar in dina redskap.', 'Efter bokningen får du en bekräftelse. Kontrollera att uppgifterna stämmer och hör av dig direkt om något är fel. Ingen betalning görs vid bokningen.'] },
      { heading: 'Inlämning och återlämning', content: [['Lämna själv: du kan när som helst lämna redskapen i markpostlådan på Rapidgatan 38 i Falköping.', 'Upphämtning och utkörning: inom Falköpings tätort hämtar jag och/eller lämnar tillbaka redskapen hos dig.', 'Hämta själv: när redskapen är klara meddelar jag dig och du hämtar dem hos VASS enligt överenskommelse.'], 'Förpacka redskapen så att ingen kan skada sig – lägg dem i en mindre låda eller linda in dem i en handduk och lägg dem i en påse. Lägg med en lapp med ditt namn och telefonnummer. Har du särskilda önskemål kan du skriva dem på lappen.'] },
      { heading: 'Utförande och leveranstid', content: ['Arbetet utförs fackmässigt och med omsorg. Varje redskap testas innan det lämnas tillbaka. Normalt är arbetet klart inom 1–2 dagar från att jag har tagit emot redskapen. Tar det längre tid meddelar jag dig.', 'Jag gör alltid en kostnadsfri bedömning av redskapet. Är en tjänst inte till nytta för dig, till exempel om en reparation inte är värd kostnaden, avråder jag från den.', 'Behövs mer arbete än du har beställt, till exempel om ett hack eller en skadad spets upptäcks vid slipningen, kontaktar jag dig först. Tilläggsarbete utförs bara om du godkänner det.'] },
      { heading: 'Ansvar för dina redskap', content: ['Om ett redskap skadas eller försvinner medan det är i min vård ansvarar jag för det enligt konsumenttjänstlagen, om jag inte kan visa att skadan inte beror på försummelse från min sida.', 'Vid slipning och reparation kan dolda fel i materialet framträda, till exempel mikrosprickor, tidigare skador eller defekter i stålet. Jag ansvarar inte för skador som beror på sådana fel om de inte rimligen kunde upptäckas innan arbetet och skadan inte beror på vårdslöshet från min sida. Upptäcker jag ett sådant fel kontaktar jag dig innan jag fortsätter.', 'Slipning innebär alltid att en liten mängd stål tas bort från bladet. Jag slipar aldrig mer än vad som behövs för att bevara redskapets livslängd.'] },
      { heading: 'Betalning', content: ['Du betalar först när arbetet är klart, senast när du får tillbaka dina redskap. Du kan betala:', ['Kontant vid upphämtning eller avlämning.', 'Med Swish – du får en Swish-länk när redskapen är klara.', 'Mot faktura – gäller företagskunder.']] },
      { heading: 'Ångerrätt', content: ['När du bokar via webbplatsen, per telefon eller via e-post har du som konsument 14 dagars ångerrätt enligt lagen om distansavtal och avtal utanför affärslokaler. Ångerfristen räknas från dagen då avtalet ingicks.', 'När du lämnar in redskapen eller låter mig hämta dem begär du samtidigt att arbetet påbörjas direkt, alltså under ångerfristen. Det innebär att:', ['Om du ångrar dig efter att arbetet har påbörjats betalar du för den del av arbetet som hunnit utföras.', 'När tjänsten är helt utförd gäller inte längre ångerrätten.'], 'Vill du ångra dig meddelar du mig inom ångerfristen via e-post till kontakt@vass-sliperi.se eller på telefon 072-974 33 79. Du kan använda standardformuläret nedan, men ett tydligt meddelande räcker. Har du redan betalat återbetalar jag beloppet, med avdrag för utfört arbete, senast 14 dagar efter att jag fått ditt meddelande. Återbetalningen görs med samma betalsätt som du använde, om vi inte kommer överens om något annat.'] },
      { heading: 'Standardformulär för ångerrätt', boxed: true, content: ['Fyll i och skicka formuläret endast om du vill frånträda avtalet.', ['Till: VASS Sliperi och Knivservice, Rapidgatan 38, Falköping, kontakt@vass-sliperi.se', 'Jag meddelar härmed att jag vill frånträda mitt avtal om tillhandahållande av följande tjänster: ____________', 'Beställd den: ____________', 'Namn: ____________', 'Adress: ____________', 'Namnteckning (endast om formuläret skickas på papper): ____________', 'Datum: ____________']] },
      { heading: 'Reklamation och nöjd kund-garanti', content: ['Jag lämnar aldrig ifrån mig ett redskap som inte lever upp till mina förväntningar. Är du ändå inte nöjd med slipningen, kontakta mig så löser jag det utan extra kostnad för dig.', 'Är tjänsten felaktig har du dessutom rättigheter enligt konsumenttjänstlagen. Reklamera inom skälig tid efter att du har märkt felet – en reklamation inom två månader räknas alltid som i rätt tid. Kontakta mig via e-post eller telefon och beskriv felet. Felet åtgärdas i första hand genom att jag gör om eller rättar arbetet utan kostnad. Går det inte kan du ha rätt till prisavdrag, att häva avtalet eller skadestånd.', 'Garantin är ett tillägg och begränsar inte dina rättigheter enligt lag.'] },
      { heading: 'Redskap som inte hämtas ut', content: ['Hämta dina redskap så snart du har fått besked om att de är klara. Redskap som inte hämtas ut hanteras enligt lagen om näringsidkares rätt att sälja saker som inte hämtats ut. Jag kontaktar dig alltid innan det blir aktuellt.'] },
      { heading: 'Företagskunder', content: ['För företag, restauranger och andra näringsidkare gäller villkoren i tillämpliga delar. Ångerrätten och de konsumentskyddande reglerna gäller inte. Betalning sker mot faktura enligt de betalningsvillkor som anges på fakturan. Vid sen betalning debiteras dröjsmålsränta enligt räntelagen.'] },
      { heading: 'Tvister', content: ['Hör alltid av dig till mig först – de flesta frågor löser vi enkelt tillsammans. Kan vi inte komma överens kan du som konsument vända dig till Allmänna reklamationsnämnden (ARN), www.arn.se. En tvist som inte kan lösas på annat sätt avgörs av allmän domstol enligt svensk lag.'] },
      { heading: 'Ändringar av villkoren', content: ['Jag kan komma att uppdatera villkoren. För din beställning gäller den version som gällde när du gjorde din bokning.'] },
    ],
  },
  privacy: {
    title: 'Integritet & GDPR',
    eyebrow: 'Personuppgifter',
    updated: '20 oktober 2026',
    intro: 'Jag värnar om din personliga integritet. Här beskriver jag vilka personuppgifter jag behandlar när du besöker webbplatsen, bokar en tjänst eller kontaktar mig, varför jag gör det och vilka rättigheter du har enligt dataskyddsförordningen (GDPR).',
    sections: [
      { heading: 'Personuppgiftsansvarig', content: ['VASS Sliperi och Knivservice (enskild firma) är personuppgiftsansvarig för behandlingen av dina personuppgifter. Har du frågor om hur dina uppgifter behandlas är du välkommen att kontakta mig.', companyContact] },
      { heading: 'Vilka uppgifter jag behandlar', content: [['Kontaktuppgifter: namn, adress, telefonnummer och e-postadress.', 'Uppgifter om din beställning: valda tjänster, antal redskap, hur du vill lämna in och få tillbaka redskapen samt valt betalsätt.', 'Betalningsuppgifter: till exempel telefonnummer kopplat till Swish, belopp och datum. För företagskunder även fakturauppgifter.', 'Kommunikation: e-post, sms och bilder du skickar till mig, till exempel närbilder för en bedömning av en skadad kniv.', 'Besöksstatistik: om du samtycker till statistikcookies, se punkt 4.'], 'Uppgifterna i bokningen behövs för att jag ska kunna utföra och leverera tjänsten. Utan dem kan jag inte ta emot bokningen.'] },
      { heading: 'Varför jag behandlar uppgifterna', content: [['Hantera din bokning, utföra tjänsten, hämta och lämna redskap samt kontakta dig om beställningen. Rättslig grund: avtal.', 'Ta betalt och föra bokföring. Rättslig grund: rättslig förpliktelse enligt bokföringslagen.', 'Hantera reklamationer och garantiärenden. Rättslig grund: avtal och rättslig förpliktelse enligt konsumentlagstiftningen.', 'Svara på frågor och ge kostnadsfria bedömningar innan du bokar. Rättslig grund: berättigat intresse av att kunna besvara din förfrågan.', 'Spara din beställningshistorik så att du kan få rabatt som återkommande kund. Rättslig grund: berättigat intresse.', 'Räkna antalet besök på webbplatsen. Rättslig grund: samtycke.'], 'Jag använder inte automatiserat beslutsfattande eller profilering.'] },
      { heading: 'Webbplatsen och besöksstatistik', content: ['Om du samtycker använder jag Google Analytics 4 för att se hur många som besöker webbplatsen. Statistiken används bara för att räkna besök – inte för att följa hur enskilda besökare rör sig på sidan och inte för marknadsföring. Läs mer i cookiepolicyn.', 'Webbplatsen hämtar typsnitt från Google Fonts och designfiler från Tailwind CSS. När sidan laddas skickas därför din IP-adress till dessa leverantörer så att sidan kan visas korrekt. Om du öppnar kartlänken kommer du till Google Maps, där Googles egna villkor gäller.'] },
      { heading: 'Hur länge uppgifterna sparas', content: [['Bokningar och kundhistorik: upp till 3 år efter ditt senaste uppdrag, för att kunna hantera reklamationer och ge rabatt till återkommande kunder.', 'Bokföringsunderlag, till exempel kvitton och fakturor: 7 år efter utgången av det kalenderår då räkenskapsåret avslutades, enligt bokföringslagen.', 'Förfrågningar som inte leder till en bokning: raderas senast 12 månader efter senaste kontakten.', 'Lappar med kontaktuppgifter som följer med inlämnade redskap: slängs när uppdraget är avslutat.', 'Besöksstatistik: se cookiepolicyn.']] },
      { heading: 'Vem som får ta del av uppgifterna', content: ['Jag säljer aldrig dina personuppgifter. Uppgifterna delas bara när det behövs:', ['Leverantörer av IT-tjänster, till exempel e-post och webbhotell, som behandlar uppgifterna för min räkning enligt personuppgiftsbiträdesavtal.', 'Bank och Swish, för att hantera betalningar.', 'Google, för besöksstatistik om du har samtyckt till det.', 'Myndigheter, till exempel Skatteverket, när jag är skyldig att lämna ut uppgifter enligt lag.']] },
      { heading: 'Överföring utanför EU/EES', content: ['Vissa leverantörer, till exempel Google, kan behandla uppgifter i USA. Överföringen sker då med stöd av EU-kommissionens beslut om adekvat skyddsnivå för företag som är anslutna till EU–US Data Privacy Framework, eller med EU-kommissionens standardavtalsklausuler.'] },
      { heading: 'Så skyddas dina uppgifter', content: ['Jag vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina uppgifter, till exempel lösenordsskyddade konton och att uppgifterna bara används för de ändamål som beskrivs här.'] },
      { heading: 'Dina rättigheter', content: [['Tillgång: du kan begära ett registerutdrag med de uppgifter jag har om dig.', 'Rättelse: du kan be mig rätta felaktiga eller ofullständiga uppgifter.', 'Radering: du kan be mig radera uppgifter som inte längre behövs. Uppgifter som jag måste spara enligt lag, till exempel bokföringsunderlag, kan inte raderas i förtid.', 'Begränsning: du kan begära att behandlingen begränsas, till exempel medan en begäran om rättelse utreds.', 'Invändning: du kan invända mot behandling som grundar sig på berättigat intresse.', 'Dataportabilitet: du kan få ut uppgifter som du själv har lämnat i ett maskinläsbart format.', 'Återkalla samtycke: du kan när som helst återkalla ditt samtycke till statistikcookies via cookieinställningarna på webbplatsen.'], 'Kontakta mig på kontakt@vass-sliperi.se för att använda dina rättigheter. Jag svarar senast inom en månad.'] },
      { heading: 'Klagomål', content: ['Anser du att jag behandlar dina personuppgifter felaktigt kan du lämna klagomål till Integritetsskyddsmyndigheten (IMY), www.imy.se. Hör gärna av dig till mig först, så försöker vi lösa det.'] },
      { heading: 'Ändringar', content: ['Jag kan komma att uppdatera policyn, till exempel om webbplatsen eller mina tjänster förändras. Den senaste versionen finns alltid här på webbplatsen.'] },
    ],
  },
  cookies: {
    title: 'Cookiepolicy',
    eyebrow: 'Cookies',
    updated: '20 oktober 2026',
    intro: 'En cookie är en liten textfil som sparas i din webbläsare när du besöker en webbplats. Enligt lagen om elektronisk kommunikation ska du få information om vilka cookies som används, och cookies som inte är nödvändiga får bara användas om du samtycker.',
    sections: [
      { heading: 'Cookies på webbplatsen', content: ['Webbplatsen fungerar helt utan cookies. De enda cookies jag använder är statistikcookies från Google Analytics 4, och de sätts bara om du har samtyckt till dem.', 'Ditt val sparas i webbläsaren så att du inte behöver svara vid varje besök. Det är nödvändigt för att ditt val ska kunna respekteras och kräver inget samtycke.'] },
      { heading: 'Statistikcookies – Google Analytics 4', content: ['Används enbart för att räkna antalet besök på webbplatsen – inte för att följa hur du rör dig på sidan och inte för marknadsföring.', ['_ga: skiljer unika besökare åt. Lagras i upp till 2 år.', '_ga_<id>: håller reda på det pågående besöket. Lagras i upp till 2 år.', 'Leverantör: Google Ireland Limited. Uppgifter kan överföras till Google LLC i USA med stöd av EU–US Data Privacy Framework.']] },
      { heading: 'Ändra eller återkalla ditt samtycke', content: ['Första gången du besöker webbplatsen får du välja om du tillåter statistikcookies. Du kan när som helst ändra eller återkalla ditt val via cookieinställningarna på webbplatsen. Du kan också radera eller blockera cookies i din webbläsares inställningar.'] },
      { heading: 'Externa tjänster', content: ['Webbplatsen hämtar typsnitt från Google Fonts och designfiler från Tailwind CSS. De sätter inga cookies, men din IP-adress skickas till leverantörerna när sidan laddas. Kartlänken öppnar Google Maps, där Googles egna cookies och villkor gäller.'] },
      { heading: 'Mer information', content: ['Hur jag behandlar personuppgifter beskrivs under Integritet & GDPR. Har du frågor är du välkommen att kontakta mig på kontakt@vass-sliperi.se.'] },
    ],
  },
}

function PolicyContent({ policy }) {
  const renderBlock = (block, index) => Array.isArray(block)
    ? <ul key={index} className="list-disc space-y-1.5 pl-5 marker:text-gray-400">{block.map((item) => <li key={item}>{item}</li>)}</ul>
    : <p key={index}>{block}</p>
  return <div className="space-y-8">
    <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{policy.intro}</p>
    {policy.sections.map((section, index) => <section key={section.heading}>
      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">{index + 1}. {section.heading}</h3>
      <div className={`mt-3 space-y-3 text-sm leading-relaxed text-gray-600 ${section.boxed ? 'rounded-xl border border-gray-200 bg-gray-50 px-5 py-4' : ''}`}>{section.content.map(renderBlock)}</div>
    </section>)}
    <p className="border-t border-gray-200 pt-5 text-xs text-gray-400">Senast uppdaterad {policy.updated}</p>
  </div>
}

function PolicyModal({ policy, onClose }) {
  useEffect(() => {
    if (!policy) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [policy, onClose])

  if (!policy) return null
  return <div className="fixed inset-0 z-[120] flex items-center justify-center bg-zinc-950/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="policy-modal-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
      <div className="flex shrink-0 items-start justify-between gap-6 border-b border-gray-200 px-6 py-5 sm:px-8 sm:py-6">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">VASS / {policy.eyebrow}</p><h2 id="policy-modal-title" className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">{policy.title}</h2></div>
        <button type="button" onClick={onClose} aria-label={`Stäng ${policy.title}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></button>
      </div>
      <div tabIndex="0" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 outline-none sm:px-8"><PolicyContent policy={policy} /></div>
    </div>
  </div>
}

function PolicyPage({ policy }) {
  return <div className="min-h-screen bg-gray-50 text-zinc-900">
    <header className="border-b border-gray-200 bg-white px-6 py-5">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6"><a href="/" className="inline-flex items-center gap-3" aria-label="Tillbaka till VASS Sliperi"><img src="/vass-header-logo.png" alt="VASS" className="h-7 w-auto" /><span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 sm:inline">Sliperi & knivservice</span></a><button type="button" onClick={() => window.close()} className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500 transition hover:text-zinc-900">Stäng flik</button></div>
    </header>
    <main className="px-6 py-12 sm:py-16">
      <article className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">VASS / {policy.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{policy.title}</h1>
        <div className="mt-8"><PolicyContent policy={policy} /></div>
      </article>
    </main>
  </div>
}

function SiteFooter({ onPolicyOpen }) {
  const policyLink = (key) => <button key={key} type="button" onClick={() => onPolicyOpen(policyDocuments[key])} className="group inline-flex w-fit items-center gap-2 text-left text-sm text-zinc-400 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"><span>{policyDocuments[key].title}</span><span aria-hidden="true" className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">&#8599;</span></button>
  return <footer className="bg-zinc-950 px-6 py-10 text-zinc-400 sm:py-12">
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-9 md:grid-cols-[1.45fr_.75fr_1fr] md:gap-12">
        <div className="max-w-sm">
          <a href="#top" className="inline-flex items-center gap-3 text-white" aria-label="VASS Sliperi – tillbaka till toppen"><img src="/vass-header-logo.png" alt="VASS" className="h-7 w-auto brightness-0 invert" /><span className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Sliperi & knivservice</span></a>
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">Professionell slipning av knivar, saxar och verktyg i Falköping och Skaraborg.</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">Enskild firma med F-skatt.</p>
        </div>
        <nav aria-label="Sidnavigation"><p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Utforska</p><div className="flex flex-col items-start gap-2.5 text-sm"><a href="#sa-funkar-det" className="transition hover:translate-x-1 hover:text-white">Så funkar det</a><a href="#priser" className="transition hover:translate-x-1 hover:text-white">Priser</a><a href="#tjanster" className="transition hover:translate-x-1 hover:text-white">Tjänster</a><a href="#om-mig" className="transition hover:translate-x-1 hover:text-white">Om mig</a><a href="#vanliga-fragor" className="transition hover:translate-x-1 hover:text-white">Vanliga frågor</a></div></nav>
        <div><p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Kontakt</p><address className="not-italic text-sm leading-6"><p>Rapidgatan 38<br />Falköping</p><a href="tel:+46729743379" className="mt-3 block w-fit text-zinc-300 transition hover:text-white">072-974 33 79</a><a href="mailto:kontakt@vass-sliperi.se" className="mt-1 block w-fit text-zinc-300 transition hover:text-white">kontakt@vass-sliperi.se</a></address></div>
      </div>
      <div className="mt-9 border-t border-white/10 pt-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-zinc-600">&copy; 2026 VASS Sliperi och Knivservice. Alla rättigheter förbehållna.</p>
          <nav aria-label="Policyer" className="flex flex-wrap gap-x-5 gap-y-2">{['terms', 'privacy', 'cookies'].map(policyLink)}</nav>
          <a href="#top" className="group inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-300 transition hover:text-white"><span>Till toppen</span><span className="transition group-hover:-translate-y-1" aria-hidden="true">&#8593;</span></a>
        </div>
      </div>
    </div>
  </footer>
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

function CheckoutDrawer({ open, onClose, onContinue, quantities, onQuantityChange }) {
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
    <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-4 py-4">{hasRepairOrModification && <p className="mb-3 text-[10px] italic leading-relaxed text-gray-500">Jag reserverar mig för eventuella dolda fel eller mikrosprickor i materialet som kan framträda vid slipning.</p>}<div className="space-y-1.5 text-xs"><div className="flex justify-between text-gray-500"><span>Delsumma</span><span>{subtotal} kr</span></div>{discount > 0 && <div className="flex justify-between font-semibold text-zinc-900"><span>Mängdrabatt 15 %</span><span>−{discount} kr</span></div>}<div className="flex items-end justify-between border-t border-gray-200 pt-2.5"><span className="font-bold text-zinc-900">Totalt</span><strong className="text-xl font-extrabold tracking-tight text-zinc-900">{total} kr</strong></div></div>{eligibleCount < 4 ? <p className="mt-2 text-[11px] text-gray-500">Lägg till {4 - eligibleCount} {4 - eligibleCount === 1 ? 'slipning' : 'slipningar'} för 15 % rabatt.</p> : <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-900"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] text-white">✓</span>15 % rabatt på slipning</p>}{itemCount >= 3 ? <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-900"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] text-white">✓</span>Fri upphämtning</p> : <p className="mt-2 text-[11px] text-gray-500">Lägg till {3 - itemCount} {3 - itemCount === 1 ? 'redskap' : 'redskap'} för fri upphämtning.</p>}<button type="button" onClick={onContinue} className="mt-3.5 w-full rounded-lg bg-zinc-900 px-4 py-3 text-xs font-bold text-white shadow-md transition hover:bg-gray-800">Fortsätt till checkout</button></div>
  </aside>
}

function BookingCheckout({ open, onClose, quantities }) {
  const [step, setStep] = useState(1)
  const [customer, setCustomer] = useState({ name: '', address: '', phone: '', email: '' })
  const [dropOff, setDropOff] = useState('')
  const [returnMethod, setReturnMethod] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [termsRead, setTermsRead] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [bookingId, setBookingId] = useState('')
  const [website, setWebsite] = useState('')
  const { selected, itemCount, total: servicesTotal } = getCartSummary(quantities)
  const hasFreePickup = itemCount >= 3
  const pickupFee = dropOff === 'pickup' && !hasFreePickup ? 69 : 0
  const deliveryFee = returnMethod === 'delivery' ? 69 : 0
  const checkoutTotal = servicesTotal + pickupFee + deliveryFee

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const updateCustomer = (field, value) => setCustomer((current) => ({ ...current, [field]: value }))
  const canContinue = step === 1
    ? Object.values(customer).every((value) => value.trim())
    : step === 2 ? Boolean(dropOff)
      : step === 3 ? Boolean(returnMethod)
        : step === 4 ? Boolean(paymentMethod)
          : step === 5 ? termsRead : false
  const nextStep = async (event) => {
    event?.preventDefault()
    if (!canContinue || submitting) return
    if (step === 5) {
      setSubmitting(true)
      setSubmitError('')
      try {
        const response = await fetch(import.meta.env.VITE_BOOKING_API_URL || 'https://api.vass-sliperi.se/booking.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customer, quantities, dropOff, returnMethod, paymentMethod, termsAccepted: true, website }),
        })
        const result = await response.json().catch(() => ({}))
        if (!response.ok || !result.ok) throw new Error(result.message || 'Bokningen kunde inte skickas.')
        setBookingId(result.bookingId || '')
        setCompleted(true)
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Bokningen kunde inte skickas. Försök igen.')
      } finally {
        setSubmitting(false)
      }
      return
    }
    setSubmitError('')
    setStep((current) => Math.min(5, current + 1))
  }
  const previousStep = () => {
    setSubmitError('')
    setStep((current) => Math.max(1, current - 1))
  }

  const choice = ({ name, value, selected, onChange, title, description, price, icon }) => <label className={`group flex cursor-pointer items-start gap-4 rounded-xl border p-5 transition ${selected === value ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg' : 'border-gray-200 bg-white text-zinc-900 hover:border-gray-400'}`}>
    <input type="radio" name={name} value={value} checked={selected === value} onChange={() => onChange(value)} className="mt-1 h-4 w-4 shrink-0 accent-zinc-900" />
    {icon && <span className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl ${selected === value ? 'bg-white' : 'bg-gray-100'}`}>{icon}</span>}
    <span className="min-w-0 flex-1"><span className="flex items-start justify-between gap-4"><strong className="text-sm sm:text-base">{title}</strong>{price && <span className={`shrink-0 text-xs font-bold ${selected === value ? 'text-white' : 'text-zinc-900'}`}>{price}</span>}</span><small className={`mt-2 block text-xs leading-relaxed ${selected === value ? 'text-gray-300' : 'text-gray-500'}`}>{description}</small></span>
  </label>

  return <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-zinc-950/65 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="booking-checkout-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className={`flex min-h-[560px] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-[max-width] duration-300 sm:min-h-[620px] ${completed ? 'max-w-3xl' : 'max-w-2xl'}`}>
      <header className="border-b border-gray-200 px-5 pb-5 pt-5 sm:px-8 sm:pb-6 sm:pt-7">
        <div className="flex items-start justify-between gap-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">VASS / BOKNING</p><h2 id="booking-checkout-title" className="mt-1.5 text-2xl font-extrabold tracking-tight text-zinc-900">{completed ? 'Bokning klar' : `Checkout ${step}/5`}</h2></div><button type="button" onClick={onClose} aria-label="Stäng checkout" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-zinc-900"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></button></div>
        <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-gray-100 px-4 py-3"><div><span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">Antal</span><strong className="mt-0.5 block text-sm text-zinc-900">{itemCount} {itemCount === 1 ? 'vald tjänst' : 'valda tjänster'}{selected.length !== itemCount && <span className="font-normal text-gray-500"> · {selected.length} {selected.length === 1 ? 'typ' : 'typer'}</span>}</strong></div><div className="text-right"><span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">Totalbelopp</span><strong className="mt-0.5 block text-lg font-extrabold tracking-tight text-zinc-900">{checkoutTotal} kr</strong></div></div>
        {!completed && <div className="mt-5 grid grid-cols-5 gap-2" aria-label={`Steg ${step} av 5`}>{[1, 2, 3, 4, 5].map((progressStep) => <span key={progressStep} className={`h-1.5 rounded-full transition-colors duration-300 ${progressStep <= step ? 'bg-zinc-900' : 'bg-gray-200'}`}></span>)}</div>}
      </header>

      <form onSubmit={nextStep} className="relative flex min-h-0 flex-1 flex-col">
        <input type="text" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex="-1" autoComplete="off" className="absolute -left-[9999px] h-px w-px opacity-0" aria-hidden="true" />
        <div className="flex-1 overflow-y-auto px-5 py-7 sm:px-8 sm:py-9">
          {completed && <div className="mx-auto flex w-full max-w-2xl flex-col items-center py-2 text-center sm:py-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg shadow-zinc-900/15"><svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">Tack! Din bokning är registrerad.</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">Du får en bekräftelse med information om nästa steg via e-post.</p>
            {bookingId && <p className="mt-3 rounded-full bg-gray-100 px-4 py-2 text-xs font-bold tracking-wide text-zinc-900">Bokningsnummer: {bookingId}</p>}

            <div className="mt-8 w-full border-y border-gray-200 text-left">
              <div className="grid gap-4 py-6 sm:grid-cols-[44px_1fr] sm:items-start">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-zinc-900"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg></span>
                <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Inlämning</p><p className="mt-1.5 text-base font-semibold leading-relaxed text-zinc-900">Välkommen att lämna in dina föremål på <a href="https://www.google.com/maps/search/?api=1&query=Rapidgatan%2038%2C%20521%2032%20Falk%C3%B6ping" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 underline decoration-gray-300 decoration-2 underline-offset-4 transition hover:decoration-zinc-900">Rapidgatan 38, 521 32 Falköping <span aria-hidden="true" className="text-xs transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span></a>.</p></div>
              </div>

              <div className="grid gap-4 border-t border-gray-200 py-6 sm:grid-cols-[44px_1fr] sm:items-start">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-zinc-900"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 8.5 12 5l7 3.5v8L12 20l-7-3.5v-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m5 8.5 7 3.5 7-3.5M12 12v8" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg></span>
                <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Packa säkert</p><p className="mt-1.5 text-sm leading-6 text-gray-600">Linda in föremålen i ett par handdukar och lägg dem sedan i en kraftig påse eller en liten papplåda. Lägg en lapp med ditt telefonnummer i paketet.</p><p className="mt-3 inline-flex rounded-full bg-zinc-900 px-3 py-1.5 text-[11px] font-bold text-white">Maxmått: 15 × 20 × 40 cm</p><p className="mt-2 text-xs text-gray-400">Höjd × djup × längd</p></div>
              </div>

              <div className="grid gap-4 border-t border-gray-200 py-6 sm:grid-cols-[44px_1fr] sm:items-start">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-zinc-900"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7"/><path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Vad händer nu?</p><p className="mt-1.5 text-sm leading-6 text-gray-600">Jag kontaktar dig när slipningen är slutförd, så bestämmer vi en tid för hämtning eller återlämning.</p>{dropOff === 'pickup' && <p className="mt-3 text-sm font-semibold leading-6 text-zinc-900">Du har bokat upphämtning. Jag kontaktar dig även för den tidsbokningen.</p>}</div>
              </div>
            </div>
          </div>}

          {!completed && <>
          {step === 1 && <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Dina uppgifter</p><h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">Vem ska vi kontakta?</h3><div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Namn</span><input required autoFocus value={customer.name} onChange={(event) => updateCustomer('name', event.target.value)} autoComplete="name" type="text" placeholder="För- och efternamn" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" /></label>
            <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Telefon</span><input required value={customer.phone} onChange={(event) => updateCustomer('phone', event.target.value)} autoComplete="tel" type="tel" placeholder="070-000 00 00" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" /></label>
            <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Adress</span><input required value={customer.address} onChange={(event) => updateCustomer('address', event.target.value)} autoComplete="street-address" type="text" placeholder="Gatuadress, postnummer och ort" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" /></label>
            <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Mailadress</span><input required value={customer.email} onChange={(event) => updateCustomer('email', event.target.value)} autoComplete="email" type="email" placeholder="namn@exempel.se" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" /></label>
          </div></div>}

          {step === 2 && <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Inlämning</p><h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">Hur vill du lämna?</h3><div className="mt-7 grid gap-3">
            {choice({ name: 'drop-off', value: 'self', selected: dropOff, onChange: setDropOff, title: 'Lämna själv', description: 'Lämna redskapen hos VASS Sliperi på Rapidgatan 38.' })}
            {choice({ name: 'drop-off', value: 'pickup', selected: dropOff, onChange: setDropOff, title: 'Boka upphämtning', description: hasFreePickup ? 'Fri upphämtning inom Falköpings tätort eftersom du har minst 3 redskap.' : 'Jag hämtar redskapen hos dig inom Falköpings tätort.', price: hasFreePickup ? 'Gratis' : '69 kr' })}
          </div></div>}

          {step === 3 && <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Återlämning</p><h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">Hur vill du hämta?</h3><div className="mt-7 grid gap-3">
            {choice({ name: 'return-method', value: 'self', selected: returnMethod, onChange: setReturnMethod, title: 'Hämta själv', description: 'Hämta dina färdigslipade redskap hos VASS Sliperi.' })}
            {choice({ name: 'return-method', value: 'delivery', selected: returnMethod, onChange: setReturnMethod, title: 'Boka avlämning', description: 'Jag lämnar de färdigslipade redskapen hos dig inom Falköpings tätort.', price: '69 kr' })}
          </div></div>}

          {step === 4 && <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Betalning</p><h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">Hur vill du betala?</h3><div className="mt-5 flex gap-3 rounded-xl bg-gray-100 p-4 text-xs leading-relaxed text-gray-600"><svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M12 11v5m0-8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg><p><strong className="block text-zinc-900">Ingen betalning görs nu.</strong>Du betalar först när dina redskap är färdigslipade.</p></div><div className="mt-5 grid gap-3 sm:grid-cols-2">
            {choice({ name: 'payment-method', value: 'cash', selected: paymentMethod, onChange: setPaymentMethod, title: 'Kontant', description: 'Betala kontant vid avlämning eller upphämtning.', icon: <svg className="h-7 w-7 text-zinc-900" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M7 9H5.5v1.5M17 15h1.5v-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> })}
            {choice({ name: 'payment-method', value: 'swish', selected: paymentMethod, onChange: setPaymentMethod, title: 'Swish', description: 'Få en Swish-länk när redskapen är klara.', icon: <img src="/swish-logo.png" alt="" className="h-11 w-11 object-contain" /> })}
          </div>{paymentMethod === 'cash' && <p className="mt-5 rounded-xl border border-gray-200 px-4 py-3 text-sm leading-relaxed text-gray-600">Du betalar kontant när redskapen lämnas tillbaka eller när du hämtar dem.</p>}{paymentMethod === 'swish' && <p className="mt-5 rounded-xl border border-gray-200 px-4 py-3 text-sm leading-relaxed text-gray-600">När redskapen är färdigslipade skickar jag en Swish-länk inför upphämtning eller avlämning.</p>}</div>}

          {step === 5 && <div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Sista steget</p><h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">Köpvillkor</h3></div><p className="mt-4 text-sm leading-relaxed text-gray-500">Läs sammanfattningen och skrolla till slutet för att aktivera knappen Slutför bokning.</p><div tabIndex="0" onScroll={(event) => { const element = event.currentTarget; if (element.scrollHeight - element.scrollTop - element.clientHeight <= 10) setTermsRead(true) }} className="mt-5 h-[290px] overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 px-5 py-5 text-sm leading-7 text-gray-600 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" aria-label="Sammanfattning av köpvillkor, skrolla till slutet">
            <p className="mb-5 font-bold text-zinc-900">Sammanfattning av villkoren</p>
            <section className="mb-5"><h4 className="font-bold text-zinc-900">Bokning, arbete och pris</h4><p className="mt-1">Avtalet ingås när du slutför bokningen eller lämnar in dina redskap. Aktuellt pris framgår av bokningen. Arbetet utförs fackmässigt och är normalt klart inom 1–2 dagar. Tilläggsarbete utförs bara efter att du har godkänt det.</p></section>
            <section className="mb-5"><h4 className="font-bold text-zinc-900">Inlämning och återlämning</h4><p className="mt-1">Du kan lämna och hämta själv eller boka upphämtning och utkörning inom Falköpings tätort. Upphämtning kostar 69 kr, men är gratis vid minst 3 redskap. Utkörning kostar 69 kr. Redskapen ska förpackas säkert och märkas med namn och telefonnummer.</p></section>
            <section className="mb-5"><h4 className="font-bold text-zinc-900">Betalning och rabatter</h4><p className="mt-1">Ingen betalning görs vid bokningen. Du betalar när arbetet är klart, kontant eller via Swish. Företagskunder kan betala mot faktura. Vid minst fyra slipningar ges 15 % mängdrabatt; reparationer och modifikationer räknas inte in. Återkommande kunder får ytterligare 5 % rabatt.</p></section>
            <section className="mb-5"><h4 className="font-bold text-zinc-900">Material och ansvar</h4><p className="mt-1">Slipning innebär att en liten mängd stål tas bort. VASS ansvarar för redskapen enligt konsumenttjänstlagen, men dolda materialfel som mikrosprickor kan framträda under arbetet. Om ett sådant fel upptäcks kontaktas du innan arbetet fortsätter.</p></section>
            <section className="mb-5"><h4 className="font-bold text-zinc-900">Ångerrätt och reklamation</h4><p className="mt-1">Som konsument har du normalt 14 dagars ångerrätt vid distansbokning. Om arbetet har påbörjats betalar du för den del som redan utförts, och när tjänsten är helt utförd upphör ångerrätten. Är du inte nöjd ska du kontakta VASS så att felet kan rättas. Dina lagstadgade konsumenträttigheter påverkas inte.</p></section>
            <p className="mb-5">Villkoren gäller tillsammans med svensk konsumentlagstiftning. Vid en tvist kan du vända dig till Allmänna reklamationsnämnden (ARN).</p>
            <a href="/?policy=terms" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-bold text-zinc-900 underline decoration-gray-300 decoration-2 underline-offset-4 transition hover:decoration-zinc-900">Läs fullständiga köpvillkor <span aria-hidden="true" className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span></a>
          </div>{termsRead ? <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-zinc-900"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white">✓</span>Du har skrollat igenom villkoren.</p> : <p className="mt-3 text-xs text-gray-400">Slutför aktiveras när du når slutet av texten.</p>}</div>}
          </>}
        </div>

        {submitError && <div role="alert" className="mx-5 mb-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800 sm:mx-8"><strong className="block">Bokningen skickades inte.</strong>{submitError}</div>}
        <footer className="flex items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:px-8 sm:py-5">
          {completed ? <span></span> : <button type="button" onClick={previousStep} disabled={step === 1} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-sm font-bold text-zinc-900 transition hover:border-zinc-900 disabled:cursor-not-allowed disabled:opacity-35"><span aria-hidden="true">←</span> Tillbaka</button>}
          {completed ? <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-6 text-sm font-bold text-white shadow-md transition hover:bg-gray-800">Stäng</button> : <button type="submit" disabled={!canContinue || submitting} aria-busy={submitting} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-zinc-900 px-6 text-sm font-bold text-white shadow-md transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none">{submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />}{submitting ? 'Skickar bokning…' : step === 5 ? 'Slutför bokning' : 'Nästa'} {!submitting && step < 5 && <span aria-hidden="true">→</span>}</button>}
        </footer>
      </form>
    </div>
  </div>
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
  const [bookingCheckoutOpen, setBookingCheckoutOpen] = useState(false)
  const [activePolicy, setActivePolicy] = useState(null)
  const [cartFeedback, setCartFeedback] = useState(0)
  const [serviceQuantities, setServiceQuantities] = useState(() => Object.fromEntries(knifeServices.map((service) => [service.value, 0])))
  const { itemCount: checkoutItemCount } = getCartSummary(serviceQuantities)
  useEffect(() => {
    if (!cartFeedback) return undefined
    const timer = window.setTimeout(() => setCartFeedback(0), 750)
    return () => window.clearTimeout(timer)
  }, [cartFeedback])
  const updateServiceQuantity = (value, change) => setServiceQuantities((current) => {
    const next = { ...current, [value]: Math.max(0, Math.min(20, current[value] + change)) }
    const nextItemCount = Object.values(next).reduce((sum, quantity) => sum + quantity, 0)
    if (change > 0 && next[value] > current[value]) setCartFeedback((currentFeedback) => currentFeedback + 1)
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
        <div className="ml-4 flex items-center gap-1.5"><button type="button" onClick={() => checkoutItemCount > 0 && setCheckoutOpen((current) => !current)} disabled={checkoutItemCount === 0} aria-expanded={checkoutOpen} aria-label={checkoutItemCount > 0 ? `${checkoutOpen ? 'Minimera' : 'Öppna'} checkout med ${checkoutItemCount} ${checkoutItemCount === 1 ? 'tjänst' : 'tjänster'}` : 'Checkout är tom'} className={`relative flex h-10 w-10 items-center justify-center rounded-full border bg-white text-zinc-900 shadow-sm transition hover:border-gray-300 hover:shadow-md disabled:cursor-default disabled:text-gray-300 disabled:shadow-none ${checkoutOpen ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-gray-200'} ${cartFeedback ? 'cart-vibrate' : ''}`}><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h2l1.7 9.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H7M10 20h.01M18 20h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>{checkoutItemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">{checkoutItemCount}</span>}{cartFeedback > 0 && <span key={cartFeedback} className="cart-pulse" aria-hidden="true" />}</button><button type="button" aria-label="Öppna meny" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="p-2 -mr-2 text-zinc-900 md:hidden"><span className="block w-6 h-0.5 bg-current mb-1.5"></span><span className="block w-6 h-0.5 bg-current mb-1.5"></span><span className="block w-6 h-0.5 bg-current"></span></button></div>
      </div>
    </nav>

    <header className="relative bg-white overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:flex-row md:gap-7 md:py-16 lg:gap-10 lg:px-8 lg:py-20">
        <div className="w-full text-center md:w-1/2 md:text-left lg:translate-x-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-[12px] font-medium mb-6 sm:mb-8"><span className="w-2 h-2 rounded-full bg-green-500"></span> Öppet för inlämning</div>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] leading-[1.4] text-[#111827] mb-2 sm:text-[16px] sm:tracking-[0.32em]">JAG GER DINA KNIVAR</p>
          <h1 className="font-editorial whitespace-nowrap text-[clamp(58px,16vw,76px)] font-semibold leading-[0.9] tracking-[-0.055em] text-[#111318] sm:text-[clamp(78px,12vw,104px)] md:text-[clamp(66px,8.5vw,88px)] lg:text-[clamp(104px,9.5vw,132px)]">Nytt liv.</h1>
          <div className="mx-auto mb-5 mt-5 h-px w-10 bg-[#c9cdd3] sm:mb-[28px] sm:mt-[26px] sm:w-[60px] md:mx-0"></div>
          <p className="mx-auto mb-[26px] max-w-[340px] font-sans text-[15px] font-normal leading-[1.6] tracking-[-0.01em] text-[#4b5563] sm:max-w-[550px] sm:text-[18px] sm:leading-[1.65] md:mx-0 md:text-[15px] lg:text-[18px]">Professionell slipning av köksknivar, saxar och verktyg för både hemmakockar och restauranger i Falköping & Skaraborg. Lämna in slött, få tillbaka sylvasst – snabbt, smidigt och med en skärpa som håller.</p>
          <div className="flex w-auto max-w-none flex-col items-center justify-center gap-2 sm:flex-row sm:items-stretch sm:gap-4 md:justify-start"><a href="#priser" className="flex min-h-[48px] w-auto min-w-[220px] items-center justify-center gap-4 rounded-[10px] bg-[#19191b] px-6 text-[14px] font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-gray-800 active:translate-y-0 sm:min-w-0 md:px-4 lg:px-6">Se min prislista <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></a><a href="#tjanster" className="flex min-h-[48px] w-auto min-w-[220px] items-center justify-center gap-3 rounded-[10px] border-[1.5px] border-[#19191b] bg-white px-6 text-[14px] font-medium text-[#19191b] transition-colors hover:bg-gray-50 sm:min-w-0 md:px-4 lg:px-6">Välj tjänster <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></a></div>
        </div>
        <div className="flex w-full justify-center md:w-1/2 md:translate-y-8 lg:translate-y-10"><ImageCompare /></div>
      </div>
    </header>

    <main>
      <section id="sa-funkar-det" className="bg-white py-12 px-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-10"><div className="h-px bg-gray-300 flex-1 max-w-[100px] md:max-w-[150px]"></div><h2 className="px-4 text-sm md:text-base font-bold tracking-widest text-zinc-900 uppercase whitespace-nowrap">Så funkar det:</h2><div className="h-px bg-gray-300 flex-1 max-w-[100px] md:max-w-[150px]"></div></div>
          <div className="grid grid-cols-2 gap-3 text-center sm:gap-4 lg:grid-cols-4">
            <div className="group relative flex min-h-[190px] flex-col items-center rounded-2xl border border-gray-200 bg-white px-3 pb-5 pt-7 shadow-[0_8px_28px_rgba(17,24,39,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(17,24,39,0.12)] sm:min-h-[210px] sm:px-6 sm:pb-7 sm:pt-8"><div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-sm sm:left-4 sm:top-4 sm:h-8 sm:w-8 sm:text-sm">1</div><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-zinc-800 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white sm:h-14 sm:w-14"><svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3.5" width="14" height="17" rx="2" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 8h6M8 12h4M15.5 16.5l4-4 1.5 1.5-4 4-2.5.8.8-2.3Z" /></svg></div><p className="text-[12px] font-medium leading-[1.55] text-gray-700 sm:text-sm sm:leading-relaxed">Berätta vilka redskap du vill få slipade.</p></div>
            <div className="group relative flex min-h-[190px] flex-col items-center rounded-2xl border border-gray-200 bg-white px-3 pb-5 pt-7 shadow-[0_8px_28px_rgba(17,24,39,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(17,24,39,0.12)] sm:min-h-[210px] sm:px-6 sm:pb-7 sm:pt-8"><div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-sm sm:left-4 sm:top-4 sm:h-8 sm:w-8 sm:text-sm">2</div><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-zinc-800 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white sm:h-14 sm:w-14"><svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h3m6.5-.5 1.2 1.2 2.3-2.6" /></svg></div><p className="text-[12px] font-medium leading-[1.55] text-gray-700 sm:text-sm sm:leading-relaxed">Bekräfta beställningen och fyll i dina kontaktuppgifter.</p></div>
            <div className="group relative flex min-h-[190px] flex-col items-center rounded-2xl border border-gray-200 bg-white px-3 pb-5 pt-7 shadow-[0_8px_28px_rgba(17,24,39,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(17,24,39,0.12)] sm:min-h-[210px] sm:px-6 sm:pb-7 sm:pt-8"><div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-sm sm:left-4 sm:top-4 sm:h-8 sm:w-8 sm:text-sm">3</div><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-zinc-800 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white sm:h-14 sm:w-14"><svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7.5V17l9 4 9-4V7.5M12 12v9M16 5l-9 4.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.5 10.2v3.3h3.3" /></svg></div><p className="text-[12px] font-medium leading-[1.55] text-gray-700 sm:text-sm sm:leading-relaxed">Packa och märk med ditt nummer. Lämna in själv eller välj upphämtning.</p></div>
            <div className="group relative flex min-h-[190px] flex-col items-center rounded-2xl border border-gray-200 bg-white px-3 pb-5 pt-7 shadow-[0_8px_28px_rgba(17,24,39,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(17,24,39,0.12)] sm:min-h-[210px] sm:px-6 sm:pb-7 sm:pt-8"><div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-sm sm:left-4 sm:top-4 sm:h-8 sm:w-8 sm:text-sm">4</div><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-zinc-800 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white sm:h-14 sm:w-14"><svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 4h6M10 4c0 2.2-1 3.2-3 4l-1.5 12h13L17 8c-2-.8-3-1.8-3-4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10-4 2m14-2 4 2M9 14h6v3H9z" /></svg></div><p className="text-[12px] font-medium leading-[1.55] text-gray-700 sm:text-sm sm:leading-relaxed">Redskapen slipas. Jag levererar till dig, eller du hämtar själv.</p></div>
          </div>
        </div>
      </section>      <section id="priser" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center text-zinc-900 uppercase mb-12">Prislista & Slipning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="grid min-h-[260px] grid-rows-[68px_82px_52px] items-center rounded-2xl border border-gray-200 bg-white px-7 py-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-8">
            <h3 className="flex h-full items-center justify-center text-xl font-bold uppercase leading-tight tracking-wide text-gray-800">Slipning av kniv</h3>
            <div className="flex h-full items-center justify-center text-5xl font-extrabold text-zinc-900">99<span className="ml-1 text-lg font-medium text-gray-500">kr</span></div>
            <p className="flex h-full items-center justify-center text-sm leading-relaxed text-gray-600">Ny jämn egg. Ofta vassare än ny!</p>
          </div>
          <div className="grid min-h-[260px] grid-rows-[68px_82px_52px] items-center rounded-2xl border border-zinc-900 bg-zinc-900 px-7 py-7 text-center shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:px-8">
            <h3 className="flex h-full items-center justify-center text-xl font-bold uppercase leading-tight tracking-wide text-white">Paketerbjudande – 4 st slipningar</h3>
            <div className="flex h-full items-center justify-center text-5xl font-extrabold text-white">15<span className="ml-1 text-lg font-medium text-gray-400">% rabatt</span></div>
            <p className="flex h-full items-center justify-center text-sm leading-relaxed text-gray-300">20 % rabatt för återkommande kunder.</p>
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
              <div><span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">Telefon</span><a href="tel:+46729743379" className="text-xl font-semibold text-zinc-900 hover:text-gray-600 transition-colors">072-974 33 79</a></div>
              <div><span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">E-post</span><a href="mailto:kontakt@vass-sliperi.se" className="text-base font-semibold text-zinc-900 hover:text-gray-600 underline decoration-2 underline-offset-4 transition-colors break-words">kontakt@vass-sliperi.se</a></div>
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

    <SiteFooter onPolicyOpen={setActivePolicy} />
    <PolicyModal policy={activePolicy} onClose={() => setActivePolicy(null)} />
    <CheckoutDrawer open={checkoutOpen} onClose={() => setCheckoutOpen(false)} onContinue={() => { setCheckoutOpen(false); setBookingCheckoutOpen(true) }} quantities={serviceQuantities} onQuantityChange={updateServiceQuantity} />
    <BookingCheckout open={bookingCheckoutOpen} onClose={() => setBookingCheckoutOpen(false)} quantities={serviceQuantities} />
  </div>
}

function Root() {
  const policyKey = new URLSearchParams(window.location.search).get('policy')
  return policyKey && policyDocuments[policyKey] ? <PolicyPage policy={policyDocuments[policyKey]} /> : <App />
}

createRoot(document.getElementById('root')).render(<Root />)
