# Intro + Scroll Experience — JD Studio
**Data:** 2026-06-15  
**Stato:** Concept approvato, da sviluppare

---

## Obiettivo

Sostituire l'intro attuale con un'esperienza scroll-driven che:
1. Apre con il **Mosaic Burst** (concept 2 già prototipato)
2. Poi mostra un prompt "scroll" che invita l'utente a interagire
3. Ogni movimento dello scroll compone o decompone elementi visivi (testi, immagini)
4. Attraverso lo scroll l'utente **scopre i servizi** (EVENTI, BRANDING, PACKAGING)
5. Al termine → transizione al sito completo

**Tono:** Energia creativa (B), 4–5s intro + scroll-journey

---

## Concept Core

> "Andando avanti gli elementi si compongono, tornando indietro si decompongono."

Lo scroll è una **timeline bidirezionale**. Progress 0→1 = composizione. Progress 1→0 = decomposizione.

**Connessione con il mosaic:** I tile del mosaic burst non spariscono — diventano i mattoni da cui si compongono i contenuti delle sezioni servizio. C'è continuità visiva tra intro e scroll journey.

---

## Struttura dello scroll journey

### Fase 0 — Mosaic Burst (auto, ~4s)
- Tile pop in staggered → logo JD appare → flash bianco
- Dopo il flash: schermo nero con prompt "↓ Scroll" (o swipe su mobile)
- Parallela: le immagini dei tile rimangono in background molto scure

### Fase 1 — EVENTI (scroll 0% → 33%)
**Composizione (scroll in avanti):**
- Le lettere E-V-E-N-T-I partono da posizioni sparse o fuori schermo
- Ogni lettera "viaggia" lungo un percorso curvo verso la sua posizione finale
- Parallelamente: una project image si assembla da tile frammentati → immagine intera
- Caption: "01 / 03 — Identità visiva completa per ogni evento"

**Decomposizione (scroll indietro):**
- Processo inverso: lettere volano via, immagine si frammenta

### Fase 2 — BRANDING (scroll 33% → 66%)
- Stessa logica, elementi diversi
- Lettera B che si "disegna" da linee/stroke
- Immagine brand identity che si assembla
- Caption: "02 / 03 — Identità visiva da zero o restyling completo"

### Fase 3 — PACKAGING (scroll 66% → 100%)
- Stessa logica
- Le lettere emergono da dentro un "box" che si apre (metafora packaging)
- Caption: "03 / 03 — Design del prodotto che si distingue"

### Fase 4 — CTA (scroll 100%)
- Nero pieno
- "ENTRIAMO" o "ENTRA NEL SITO →" appare
- Click → transizione al sito (index.html)

---

## Effetti di composizione candidati

| Effetto | Descrizione | Difficoltà | Impatto |
|---|---|---|---|
| **Letter scatter** | Lettere partono da posizioni random e volano al posto | Media | Alta |
| **Path travel** | Ogni lettera segue una curva bezier propria | Alta | Altissima |
| **Tile assemble** | Tile frammentati → immagine intera (come puzzle) | Alta | Altissima |
| **Stroke draw** | Testo SVG che si disegna (stroke-dashoffset) | Bassa | Alta |
| **Clip reveal** | Testo/immagine rivelata da clip-path che cresce | Bassa | Media |

**Raccomandazione:** Letter scatter + tile assemble come coppia (testo e immagine si compongono in parallelo con lo stesso scroll progress).

---

## Tecnica implementativa

### Scroll handling
```js
// Scroll progress 0→1 per ogni sezione
const sectionProgress = (scrollY - sectionStart) / sectionHeight;
const p = Math.max(0, Math.min(1, sectionProgress));
```

**Non usare scroll-jacking** (bloccare lo scroll nativo è problematico su mobile). Usare invece un container con `overflow-y: scroll` che mappa `scrollTop` a progress delle animazioni.

### Letter scatter
- Ogni lettera è un `<span>` con posizione iniziale random (o calcolata da pattern)
- La posizione interpolata tra start e end è funzione di `p` + easing
- Su reverse: `1-p` → stessa funzione, stesso percorso a ritroso

### Tile assemble
- Grid di tile (come il mosaic burst) con ogni tile che ha `scale(0.8) + translateX/Y` in stato iniziale
- Con p: tutti convergono a `scale(1) + translate(0,0)`
- L'immagine è rivelata da `clip-path` che cresce o semplicemente dalla grid che si allinea

### Mobile
- Touch: `touchstart` + `touchmove` → delta Y → aggiorna `scrollY` virtuale
- Stessa logica dello scroll mouse

---

## Open questions (da risolvere prima di implementare)

1. **L'esperienza scroll sostituisce il homepage o è solo il preloader?**  
   → Se sostituisce il homepage, va ripensato come entra il nav e i contenuti normali.  
   → Se è preloader, dopo il scroll journey si passa a `index.html`.

2. **Durata dello scroll journey:** quanti "scroll" per passare da una sezione all'altra? (in vh o px)

3. **Font per le lettere animate:** Archivo Black (come intro) o Inter Bold (come il sito)?

4. **La logo mark JD appare come elemento dello scroll journey?**

---

## Riferimenti / Ispirazione

- Apple iPhone: composizione 3D al scroll (apple.com/iphone)
- Apple AirPods: smontaggio componenti al scroll
- Stripe homepage: feature reveal con scroll
- Tecnica: "Scrollytelling" / "Scroll-driven animation"
- CSS standard: `animation-timeline: scroll()` (Chrome 115+, non ancora universale)
- Libreria consigliata se necessario: GSAP ScrollTrigger (non usata attualmente nel sito)

---

## Prototipo esistente

- `demo-intro-2.html` — Mosaic Burst base (già funzionante, loopa)
- Aggiungere scroll journey come fase 2 del file intro
