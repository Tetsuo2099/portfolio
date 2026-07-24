# Balance — pagina brand unificata (pilota "iter di costruzione del brand")

## Contesto

Juri vuole che i clienti con un iter di brand completo (IPC, Centro Ippico Punta Ala, Scrubols, Balance, BloomValley) abbiano ciascuno **una sola pagina** che racconta l'intero percorso — strategia → identità (logo/palette/font) → applicazioni (packaging/sito/social/eventi) — invece di essere sparsi su più card/pagine duplicate per lo stesso cliente.

Stato attuale per questi 5 clienti:
- **CIP** e **BloomValley** — già impostati con pattern "capitoli" (sidebar + sezioni), ma il capitolo Brand è solo logo + due foto, senza strategia/palette/font.
- **Scrubols** — stesso pattern, stesso limite.
- **IPC** — frammentato su 3 entry in works.html (`ipc-italia.html`, `ipc-web.html`, "IPC Social" con `href="#"`, mai costruita).
- **Balance** — nessuna pagina esiste. Due card placeholder in works.html (`href="#"`, righe 568 e 788). È però il cliente con il materiale grezzo più ricco: style guide reale, positioning deck, packaging, sito, social, store Amazon/eBay.

Si parte da **Balance** come pilota: definisce il template e in particolare un componente nuovo — il **Brand System block** (palette + tipografia in forma di specimen, non prosa) — che oggi manca ovunque e che verrà riportato sugli altri 4 clienti in un secondo momento (fuori scope di questo spec).

## Architettura pagina

Nuovo file: `works/balance.html`, basato sullo scheletro già in uso in `works/cip.html` (stessa struttura: header fisso, hero full-bleed, sidebar sticky con navigazione a punti + capitoli in scroll verticale, sezione "next", footer). Stesso design system (`--canvas:#111111; --accent:#c4b49c`, Inter, `anim.css`/`anim.js`).

### Hero

Immagine: `projects/brand-identity/Balance/Sito/header/Header_Balance_prova copia.jpg` — product shot (bottiglia Multivitamins) con headline "Morning people, it's time to Vitamins!" su sfondo lifestyle grigio chiaro. Va trattata come hero full-bleed con gradiente verso `--canvas` in basso (stesso trattamento di `.hero-bleed::after` in `ipc-web.html`), non come video.

- Eyebrow: "Brand Identity · Integratori Alimentari"
- Titolo: "Balance <em>Nutrition</em>"

### Sidebar meta

Come in `cip.html`/`ipc-italia.html`: tag, titolo, rule, meta (Anno, Cliente, Deliverable), brief, nav a capitoli.

### Capitoli

| # | Titolo | Fonte contenuti |
|---|--------|------------------|
| 01 | Strategia | Sintesi (non slide verbatim) del "Brand Positioning" — mercato saturo, necessità di un positioning netto, USP. `projects/logotypes/images/Brand positioning Balance Nutrition.pdf` |
| 02 | Brand Identity | **Brand System block** (nuovo componente, vedi sotto) + immagini logo (`Sito/Logo_balance.png`, `Store_Amazon_Balance_New/Logo_Bianco.png`) |
| 03 | Packaging | Box ed etichette: `Studio_Box_Label/Studio_Box&Etichette_Balance_prova_0{1..5}(_vert).jpg`, mockup bottiglia (`Mockup/HYALURONIC-ACID-3X_Mockup.jpg`, `Mockup_Prova*.jpg`) |
| 04 | Sito | Popup (`Sito/Balance_popUp_01.jpg`, `_02.jpg`) + product shot (`Sito/Prodotti/Collagene.jpg`, `Probiotico.jpg`, `drenaslim.jpg`, `multivitaminco.jpg`) |
| 05 | Social | Creatività Instagram/Facebook (`Social/Nicola/Collagene+AcidoIaluronico_Creatività_*.jpg`), Black Friday (`Social/Black_Friday/Balance_ADV_BlackFriday_*.jpg`), LinkedIn cover (`Social/Linkedin_cover_A.jpg`, `_B.jpg`) |
| 06 | Amazon & Marketplace | Header e prodotti Amazon (`Store_Amazon_Balance_New/Header_3000x600*.jpg`, `Seasonal_Products*.jpg`, `New_Products*.jpg`), store eBay (`Store_Ebay/Header_ebay_0{1,2}.jpg`, `640x640_01.jpg`) |

Curazione esatta delle immagini per ogni capitolo (quali, quante, layout griglia — full/duo/trio/quad) viene decisa in fase di implementazione seguendo il pattern già visto in `packstyle.html`/`logotypes.html`, non fissata rigidamente qui.

## Brand System block (nuovo componente)

Va inserito come primo blocco visivo del capitolo 02, prima delle immagini di logo. Non è testo discorsivo: è uno specimen.

- **Swatch colore**: riga di 4 quadrati colore (stile griglia, non elenco), ciascuno con HEX sotto: `#3C3C3B`, `#FFFFFF` (bordo sottile per non sparire su sfondo scuro), `#008EAC`, `#1CB5C9`. Fonte: `Balance_StyleGuide_2.0.pdf`.
- **Type specimen**: due blocchi affiancati o impilati — headline in Questrial (peso grande, es. "Aa" o parola campione) e corpo in Montserrat (paragrafo breve) — replicando la logica dello style guide (non le sue proporzioni esatte, adattato al design system del sito: sfondo `--canvas`, accenti `--accent`).
- Componente pensato per essere riusabile: classi CSS generiche (`.brand-system`, `.swatch-row`, `.swatch`, `.type-specimen`) da poter copiare/incollare nelle pagine di CIP/Scrubols/BloomValley/IPC nel rollout successivo.

Se i font Questrial/Montserrat non sono già caricati nel sito, aggiungere il link Google Fonts solo in questa pagina (non toccare `anim.css` condiviso).

## Integrazione in works.html

- Rimuovere le due card placeholder esistenti ("Balance Amazon" riga ~568, categoria `packaging`, e "Balance Amazon Social" riga ~788, categoria `social-media`).
- Aggiungere **una sola card** "Balance · Nutrition" con `data-category="brand-identity"` (coerente con la convenzione già in uso: la categoria riflette l'identità core del cliente, non la copertura letterale dei contenuti — vedi CIP che è `data-category="eventi"` pur trattando web/brand/comunicazione/foto) e `href="works/balance.html"`.
- Rinumerare `project-num` solo se necessario per continuità visiva (non è un requisito stretto — i numeri non devono essere sequenziali senza buchi, ma se la rimozione lascia un buco vistoso si può chiudere).

## Fuori scope (rollout futuro, non in questo spec)

- Applicare lo stesso pattern (capitoli + Brand System block) a IPC (che richiede prima il merge di 3 pagine in 1), CIP, Scrubols, BloomValley.
- Gallery foto eventi con scroll laterale + lightbox (nata dalla discussione su IPC, componente a parte).
- Tassonomia estesa Branding/Packaging/Eventi a livello di intero portfolio.

## Verifica

- Aprire `works/balance.html` in locale (`python3 -m http.server`) e controllare: hero leggibile, Brand System block coerente col resto del design system dark-luxury, tutti i capitoli navigabili dalla sidebar, nessuna immagine rotta (percorsi verificati contro il filesystem reale, non ipotetici).
- Controllare che la card in works.html punti alla nuova pagina e che il filtro `brand-identity` la mostri correttamente.
