# Portfolio Restructure — Design Spec
**Data:** 2026-06-24  
**Approccio scelto:** A — Cleanup first, poi navigazione

---

## Obiettivo

Riorganizzare il portfolio di Juri Dabiankov Studio su due fronti:
1. **Cleanup** — eliminare file morti, risolvere duplicati asset, pulire la root
2. **Navigazione/UX** — collegare le pagine categoria come destinazioni reali dei filtri su `works.html`

---

## Sezione 1 — Cleanup file

### File da eliminare
- `demo-alt-1.html`
- `demo-hover.html`
- `demo-intro-1.html`
- `demo-intro-3.html`
- `preview.html`
- `Intro Animations _standalone_.html`
- Cartella `_upload/` (screenshot del 2017, non pertinenti)

### File da preservare
- `demo-scroll-intro.html` → spostare in `_concepts/concept-intro.html`

### Cartella `projects/` — risoluzione duplicati
La struttura canonica è quella **categorizzata** (`projects/eventi/`, `projects/brand-identity/`, ecc.) — già referenziata dalla maggior parte delle pagine HTML.

Cartelle flat alla root da eliminare dopo verifica referenze:
- `projects/altaroma/`
- `projects/fullwall/`
- `projects/ipc-italia/`
- `projects/packstyle/`
- `projects/scrubols/`
- `projects/logotypes/`
- `projects/centro-ippico-punta-ala/`

**Prima di eliminare:** verificare che nessuna pagina in `works/` referenzi i path flat. Aggiornare eventuali path rotti.

### `works/index.html`
Verificare contenuto — probabilmente da eliminare (non ha senso una index in una sottocartella di pagine progetto).

---

## Sezione 2 — Navigazione e UX

### Nav principale
Invariato: **Works / Servizi / Studio / Contatti**

### `works.html` — filtri
- **"Tutti"** → rimane filtro in-place (mostra tutto)
- **"Eventi"** → naviga a `eventi.html`
- **"Brand Identity"** → naviga a `branding.html`
- **"Packaging"** → naviga a `packaging.html`
- **"Web Design", "Social Media", "Logo", "App & UI"** → rimangono filtri in-place

### Pagine categoria
Ogni pagina categoria (`branding.html`, `packaging.html`, `eventi.html`) riceve:
- Lista progetti nello stesso stile di `works.html`
- Breadcrumb minimo nell'header: `Works → [Categoria]`
- Link "← Tutti i lavori" per tornare a `works.html`
- Nessun pannello filtri (già filtrati per categoria)

### sessionStorage cleanup
Il meccanismo `sessionStorage.worksFilter` su `works.html` diventa ridondante con le category pages — va rimosso per semplificare il codice.

---

## Sezione 3 — Progetti mancanti (sessione futura)

Le seguenti pagine in `works/` esistono ma non sono collegate — da aggiungere a `works.html` e alle rispettive category pages in una sessione dedicata:
- `works/polo-club.html`
- `works/posters.html`
- `works/book-print.html`
- `works/scrubols.html`

Gli asset sono già presenti in `projects/` nella struttura categorizzata.

---

## Struttura finale attesa

```
portfolio/
  index.html            ← homepage (redirect a intro al primo accesso)
  intro.html            ← animated intro (invariato)
  works.html            ← tutti i lavori (filtri → category pages)
  branding.html         ← categoria brand identity
  packaging.html        ← categoria packaging
  eventi.html           ← categoria eventi
  about.html
  contact.html
  services.html
  anim.css / anim.js
  works/                ← pagine progetto individuali
  projects/             ← solo struttura categorizzata (no duplicati flat)
    brand-identity/
    eventi/
    packaging/
    logo-identita/
    social-media/
    web-design/
    app-ui/
    book-print/
    posters/
  images/
  _concepts/
    concept-intro.html  ← ex demo-scroll-intro.html
  docs/                 ← documentazione interna
```

---

## Sezione 4 — Regola Hero/Header media

### Pagine progetto (`works/*.html`)
- Se esiste un **video** per il progetto → hero mostra il video
- Se non c'è video → hero mostra le **immagini a rotazione** (slideshow)
  - 2–3 immagini se disponibili, 1 sola se ce n'è solo una
  - Stessa logica già presente con `.project-slideshow`

### Homepage (`index.html`)
- Hero mostra **solo video**, in sequenza automatica
- I video sono quelli già presenti nei progetti del sito (un reel dei project video esistenti)
- Sequenza automatica con **transizione** tra un video e il prossimo (fade o slide)
- Nessuna immagine statica nella home — solo video in sequenza

---

## Non incluso in questo spec

- Redesign visivo delle pagine
- Aggiunta di nuovi progetti
- Modifica all'intro animation
- Nuove funzionalità (ricerca, contatto form, CMS)
