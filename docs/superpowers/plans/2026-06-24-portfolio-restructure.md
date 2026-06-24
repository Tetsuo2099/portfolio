# Portfolio Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pulire il codebase da file morti/duplicati e collegare le pagine categoria come destinazioni reali dei filtri su works.html, con transizioni video nella homepage.

**Architecture:** Sito statico HTML/CSS/JS — nessun framework, nessun bundler. Ogni task modifica direttamente i file HTML. L'ordine è cleanup → navigazione → homepage video → regola hero.

**Tech Stack:** HTML5, CSS3 (inline `<style>`), JavaScript vanilla, `python3 -m http.server 8080` per sviluppo locale.

## Global Constraints

- Nessun framework, nessun npm, nessun build step
- Font: Inter via Google Fonts (già caricato in ogni pagina)
- Design tokens: `--dark: #0c0c0c`, `--light: #ffffff`, `--muted-dark: #888880`, `--border-dark: rgba(12,12,12,0.10)`
- Animazioni scroll: sistema `data-anim` + `anim.js` / `anim.css` (non toccare)
- Path immagini: relativi al file HTML (non assoluti)
- Verificare sempre nel browser su `http://localhost:8080` dopo ogni task

---

## Task 1: Cleanup — file demo e _upload

**Files:**
- Delete: `demo-alt-1.html`, `demo-hover.html`, `demo-intro-1.html`, `demo-intro-3.html`, `preview.html`, `Intro Animations _standalone_.html`, cartella `_upload/`
- Create: `_concepts/concept-intro.html` (moved from `demo-scroll-intro.html`)
- Verify + delete: `works/index.html`

**Interfaces:**
- Produces: root pulita senza file demo; `_concepts/concept-intro.html` preservato

- [ ] **Step 1: Creare la cartella _concepts e spostare il concept**

```bash
mkdir -p /Users/juri/portfolio/_concepts
mv /Users/juri/portfolio/demo-scroll-intro.html /Users/juri/portfolio/_concepts/concept-intro.html
```

- [ ] **Step 2: Eliminare i file demo**

```bash
rm /Users/juri/portfolio/demo-alt-1.html
rm /Users/juri/portfolio/demo-hover.html
rm /Users/juri/portfolio/demo-intro-1.html
rm /Users/juri/portfolio/demo-intro-3.html
rm /Users/juri/portfolio/preview.html
rm "/Users/juri/portfolio/Intro Animations _standalone_.html"
```

- [ ] **Step 3: Eliminare la cartella _upload**

```bash
rm -rf /Users/juri/portfolio/_upload
```

- [ ] **Step 4: Verificare works/index.html e decidere**

Aprire `http://localhost:8080/works/index.html` nel browser. Se è vuota o inutile:

```bash
rm /Users/juri/portfolio/works/index.html
```

- [ ] **Step 5: Verifica finale**

```bash
ls /Users/juri/portfolio/*.html
ls /Users/juri/portfolio/_concepts/
```

Expected: nessun `demo-*.html`, nessun `preview.html`, presente `_concepts/concept-intro.html`.

- [ ] **Step 6: Commit**

```bash
cd /Users/juri/portfolio
git add -A
git commit -m "chore: rimuovi file demo e _upload, preserva concept-intro"
```

---

## Task 2: Audit e cleanup duplicati in projects/

**Files:**
- Modify: nessuno (solo verifica e delete selettivo)
- Script di audit: temporaneo in `/tmp/audit-paths.sh`

**Interfaces:**
- Produces: `projects/` con solo struttura categorizzata; tutti i path HTML aggiornati

- [ ] **Step 1: Trovare tutti i riferimenti ai path flat in tutti gli HTML**

```bash
grep -r "projects/altaroma\|projects/fullwall\|projects/ipc-italia\|projects/packstyle\|projects/logotypes\|projects/centro-ippico-punta-ala\|projects/scrubols/" /Users/juri/portfolio --include="*.html" -l
```

Annotare i file risultanti.

- [ ] **Step 2: Per ogni file trovato, vedere i path specifici**

```bash
grep -rn "projects/altaroma\|projects/fullwall\|projects/ipc-italia\|projects/packstyle\|projects/logotypes\|projects/centro-ippico-punta-ala\|projects/scrubols/" /Users/juri/portfolio --include="*.html"
```

- [ ] **Step 3: Confrontare contenuto flat vs categorizzato per scrubols**

`projects/scrubols/header/scrubols-header.mp4` esiste nella flat.
`projects/brand-identity/scrubols/header/scrubols-wide.mp4` esiste nella categorizzata.
Sono file diversi — **entrambe le cartelle vanno tenute** finché non si decide quale video usare per ogni pagina.

Per ora: aggiornare i path HTML che usano `projects/scrubols/` → `projects/brand-identity/scrubols/` dove il file esiste lì, oppure lasciare invariati.

- [ ] **Step 4: Aggiornare i path in index.html per i duplicati confermati**

In `index.html` il HERO MARQUEE usa path flat. Aggiornare:
- `projects/altaroma/header/slide-01.png` → `projects/eventi/altaroma/header/slide-01.png`
- `projects/logotypes/header/slide-01.png` → `projects/logo-identita/loghi-vari/header/slide-01.png`
- `projects/ipc-italia/header/slide-01.jpg` → `projects/eventi/ipc/header/slide-01.jpg`

Lasciare invariati i path per cartelle senza equivalente categorizzato: `polo-club/`, `unlucky/`, `book-print/`, `posters/`, `packstyle/`.

- [ ] **Step 5: Verificare nel browser**

Aprire `http://localhost:8080/index.html` — il marquee hero deve mostrare le immagini senza broken images. Aprire DevTools → Network e filtrare per status 404.

- [ ] **Step 6: Eliminare solo i duplicati confermati e aggiornati**

```bash
rm -rf /Users/juri/portfolio/projects/altaroma
rm -rf /Users/juri/portfolio/projects/logotypes
```

Solo questi due per ora — gli altri (`fullwall`, `ipc-italia`, `packstyle`, `centro-ippico-punta-ala`) vanno verificati progetto per progetto nelle sessioni future.

- [ ] **Step 7: Commit**

```bash
cd /Users/juri/portfolio
git add -A
git commit -m "chore: aggiorna path duplicati, elimina cartelle flat confermate"
```

---

## Task 3: works.html — filtri diventano link per le 3 categorie principali

**Files:**
- Modify: `works.html` (script filtri + HTML bottoni + rimozione sessionStorage)

**Interfaces:**
- Consumes: `eventi.html`, `branding.html`, `packaging.html` (devono esistere)
- Produces: bottoni "Eventi", "Brand Identity", "Packaging" navigano alle rispettive pagine

- [ ] **Step 1: Sostituire i 3 bottoni categoria con link-button**

In `works.html`, trovare il blocco `<div class="filters">` e sostituire i 3 bottoni:

```html
<!-- DA -->
<button class="filter-btn" data-filter="eventi">Eventi</button>
<button class="filter-btn" data-filter="brand-identity">Brand Identity</button>
<button class="filter-btn" data-filter="packaging">Packaging</button>

<!-- A -->
<a class="filter-btn" href="eventi.html">Eventi</a>
<a class="filter-btn" href="branding.html">Brand Identity</a>
<a class="filter-btn" href="packaging.html">Packaging</a>
```

- [ ] **Step 2: Rimuovere sessionStorage dal blocco script**

Nello script di `works.html`, eliminare le ultime 2 righe:

```javascript
// Rimuovere questo blocco:
const saved = sessionStorage.getItem('worksFilter');
if (saved) { applyFilter(saved); sessionStorage.removeItem('worksFilter'); }
```

- [ ] **Step 3: Aggiornare applyFilter per ignorare i filtri diventati link**

I `data-filter` "eventi", "brand-identity", "packaging" non esistono più come bottoni, quindi `applyFilter` non verrà mai chiamata con quei valori. Nessuna modifica necessaria alla logica — funziona già.

- [ ] **Step 4: Aggiungere stile CSS per il link-button**

I `<a class="filter-btn">` hanno bisogno di `text-decoration: none` e `display: inline-block`. Aggiungere nel `<style>` di `works.html`:

```css
a.filter-btn {
  display: inline-block;
  text-decoration: none;
}
```

- [ ] **Step 5: Verifica nel browser**

Aprire `http://localhost:8080/works.html`. Verificare:
- Click "Tutti" → filtra in-place ✓
- Click "Eventi" → naviga a `eventi.html` ✓
- Click "Brand Identity" → naviga a `branding.html` ✓
- Click "Packaging" → naviga a `packaging.html` ✓
- Click "Web Design" → filtra in-place ✓

- [ ] **Step 6: Commit**

```bash
cd /Users/juri/portfolio
git add works.html
git commit -m "feat: filtri eventi/branding/packaging diventano link a category pages"
```

---

## Task 4: Category pages — breadcrumb e back link

**Files:**
- Modify: `eventi.html`, `branding.html`, `packaging.html`

**Interfaces:**
- Consumes: nessuno
- Produces: ogni categoria ha breadcrumb `Works → [Categoria]` e link `← Tutti i lavori`

Il pattern è identico per tutte e 3 le pagine. Esempio per `eventi.html`:

- [ ] **Step 1: Aggiungere stile breadcrumb in eventi.html**

Nel `<style>` di `eventi.html`, aggiungere:

```css
.cat-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted-light);
  padding: 0 48px;
  margin-top: 88px; /* header height + spacing */
  margin-bottom: 32px;
}
.cat-breadcrumb a {
  color: inherit;
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.cat-breadcrumb a:hover { opacity: 1; }
.cat-breadcrumb span { opacity: 0.4; }
.cat-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--muted-light);
  transition: opacity 0.2s;
  padding: 0 48px;
  margin-bottom: 48px;
}
.cat-back:hover { opacity: 0.7; }
.cat-back::before { content: '←'; }
```

- [ ] **Step 2: Aggiungere breadcrumb HTML in eventi.html dopo il `<header>`**

Trovare la sezione hero/main di `eventi.html` e aggiungere prima del contenuto principale:

```html
<div class="cat-breadcrumb">
  <a href="works.html">Works</a>
  <span>/</span>
  <span>Eventi</span>
</div>
```

- [ ] **Step 3: Ripetere per branding.html e packaging.html**

`branding.html`: cambia l'ultima `<span>` in `Brand Identity`  
`packaging.html`: cambia l'ultima `<span>` in `Packaging`

- [ ] **Step 4: Verificare nel browser**

Aprire `http://localhost:8080/eventi.html`, `branding.html`, `packaging.html`.
Il breadcrumb deve essere visibile in alto. Click "Works" → torna a `works.html`.

- [ ] **Step 5: Commit**

```bash
cd /Users/juri/portfolio
git add eventi.html branding.html packaging.html
git commit -m "feat: aggiungi breadcrumb Works → Categoria alle category pages"
```

---

## Task 5: Homepage — transizione fade tra video

**Files:**
- Modify: `index.html` (solo lo script del video player, ~20 righe)

**Interfaces:**
- Consumes: `projects/` video files (già presenti)
- Produces: video hero con fade-out/fade-in tra un video e il prossimo

Il codice attuale (in `index.html`) usa un singolo `<video id="heroVideo">` con `ended → next()` senza transizione. La CSS già ha `transition: opacity 1.2s ease` sull'elemento `.hero-video`.

- [ ] **Step 1: Sostituire il blocco script video in index.html**

Trovare e sostituire l'intero blocco `(function () { var playlist = [...]` con:

```html
<script>
(function () {
  var playlist = [
    'projects/brand-identity/scrubols/header/scrubols-wide.mp4',
    'projects/centro-ippico-punta-ala/header/Centro_Ippico_Punta_Ala.mp4',
    'projects/ipc-italia/header/ipc-highlight.mp4'
  ];
  var idx = 0;
  var v = document.getElementById('heroVideo');
  if (!v) return;

  function loadNext() {
    v.src = playlist[idx];
    idx = (idx + 1) % playlist.length;
    v.load();
    v.play().catch(function () {});
  }

  function fadeToNext() {
    /* fade out */
    v.classList.remove('loaded');
    setTimeout(function () {
      loadNext();
      v.addEventListener('canplay', function () {
        /* fade in */
        v.classList.add('loaded');
      }, { once: true });
    }, 1200); /* match CSS transition: opacity 1.2s */
  }

  /* primo caricamento */
  loadNext();
  v.addEventListener('canplay', function () {
    v.classList.add('loaded');
  }, { once: true });

  v.addEventListener('ended', fadeToNext);
})();
</script>
```

Nota: rimosso `scrubols/header/scrubols-header.mp4` (duplicato dello stesso brand) per tenere il playlist pulito con 3 video distinti.

- [ ] **Step 2: Verificare nel browser**

Aprire `http://localhost:8080/index.html`. Attendere la fine del primo video (~durata video). Verificare che:
- Alla fine del video l'hero si oscuri gradualmente (fade out, ~1.2s)
- Poi il nuovo video parta e l'hero si illumini (fade in)
- Il ciclo continui automaticamente

- [ ] **Step 3: Commit**

```bash
cd /Users/juri/portfolio
git add index.html
git commit -m "feat: aggiungi transizione fade tra video nella homepage hero"
```

---

## Task 6: Regola hero — video se esiste, altrimenti slideshow immagini

**Files:**
- Modify: `works/ipc-italia.html`, `works/altaroma.html`, `works/fullwall.html`, `works/adv.html`, `works/packstyle.html`, `works/logotypes.html`

**Interfaces:**
- Consumes: video in `projects/*/header/*.mp4`, immagini in `projects/*/header/slide-*.jpg`
- Produces: ogni pagina progetto usa video se disponibile, altrimenti slideshow immagini

**Regola:**
- Se esiste `projects/[categoria]/[progetto]/header/*.mp4` → usa `<video class="project-video">`
- Altrimenti → usa slideshow con le immagini `header/slide-01.jpg`, `slide-02.jpg`, ecc.

**Mappa video disponibili per progetto:**
- `ipc-italia` → `projects/eventi/ipc/header/ipc-highlight.mp4` ✓ video
- `centro-ippico/polo-club` → `projects/centro-ippico-punta-ala/header/Centro_Ippico_Punta_Ala.mp4` ✓ video
- `scrubols` → `projects/brand-identity/scrubols/header/scrubols-wide.mp4` ✓ video
- `altaroma`, `fullwall`, `adv`, `packstyle`, `logotypes` → nessun video → slideshow immagini

- [ ] **Step 1: Verificare lo stato attuale di ipc-italia.html**

Aprire `works/ipc-italia.html` e controllare se già usa `<video class="project-video">`. Se sì, verificare che il path sia corretto:
```
src="projects/eventi/ipc/header/ipc-highlight.mp4"
```
(path relativo da `works/` → `../projects/...`)

- [ ] **Step 2: Aggiornare ipc-italia.html se necessario**

Se manca il video, aggiungere nel hero:
```html
<video class="project-video" autoplay muted playsinline loop>
  <source src="../projects/eventi/ipc/header/ipc-highlight.mp4" type="video/mp4">
</video>
```

- [ ] **Step 3: Verificare le pagine senza video hanno slideshow**

Per ogni pagina senza video (`altaroma.html`, `fullwall.html`, `adv.html`, `packstyle.html`, `logotypes.html`), il hero deve avere un elemento con classe `.project-slideshow` o almeno un'immagine statica. Aprire ciascuna nel browser e verificare che l'hero non sia vuoto.

- [ ] **Step 4: Per pagine con una sola immagine nell'header — usare immagine singola**

Se `header/` contiene solo `slide-01.jpg`, usare:
```html
<div class="project-bg">
  <img src="../projects/[categoria]/[progetto]/header/slide-01.jpg" alt="">
</div>
```

Se contiene 2+ immagini, usare `.project-slideshow` (pattern già presente in altri works/).

- [ ] **Step 5: Verifica globale nel browser**

Aprire ogni pagina in `works/` e controllare che il hero abbia contenuto visivo. Nessun hero vuoto.

- [ ] **Step 6: Commit**

```bash
cd /Users/juri/portfolio
git add works/
git commit -m "feat: applica regola hero — video se disponibile, altrimenti immagini"
```

---

## Riepilogo tasks e ordine di esecuzione

| Task | Cosa fa | Rischio |
|------|---------|---------|
| 1 | Cleanup demo + _upload | Basso — solo delete di file non linkati |
| 2 | Audit + fix path duplicati projects/ | Medio — aggiorna path in HTML |
| 3 | works.html filtri → link categoria | Basso — modifica 3 bottoni + 2 righe JS |
| 4 | Category pages breadcrumb | Basso — aggiunge HTML/CSS |
| 5 | Homepage video fade transition | Basso — sostituisce ~20 righe JS |
| 6 | Hero rule per-progetto | Medio — va aperto ogni works/*.html |
