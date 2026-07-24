# Balance Brand Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one unified `works/balance.html` case-study page for the Balance Nutrition brand covering the full brand-building iter (strategy → identity → packaging → sito → social → marketplace), and replace its two dead placeholder cards in `works.html` with a single working one.

**Architecture:** Static HTML page, no build step, following the existing "magazine" pattern already used in `works/cip.html` (fixed header, full-bleed hero, sticky sidebar with chapter nav, stacked chapter sections, next/footer). One new reusable visual component is introduced inside chapter 02: a "Brand System" block (color swatches + type specimen) styled with plain CSS, no JS framework.

**Tech Stack:** Plain HTML/CSS/JS (no bundler). Shared `anim.css`/`anim.js` for scroll-reveal animation and mobile nav. Google Fonts (Inter, plus Questrial + Montserrat loaded only on this page for the type specimen).

## Global Constraints

- No build step, no package manager — files are edited directly and opened via `python3 -m http.server` for local preview (from `CLAUDE.md`).
- Dark-background page tokens: `--dark:#0c0c0c` family is used elsewhere, but detail pages under `works/` use their own local tokens `--canvas:#111111; --surface:#1b1b1b; --hairline:#2a2a2a; --ink:#fff; --muted:#78786e; --accent:#c4b49c` — reuse these exact values, do not invent new ones (from `works/cip.html`).
- Every page loads `../anim.css` and `../anim.js?v=5`, and uses `data-anim` / `data-anim="img"` / `data-delay` attributes for scroll reveals (from `CLAUDE.md`).
- Font is Inter (weights 300/400/500/600/800) site-wide; this page additionally loads Questrial + Montserrat for the Brand System type specimen only — do not add them to the shared `anim.css`.
- All image paths must point to files that actually exist in the repo working tree — verify with the checker command in Task 1, Step 2 before considering any step done.
- One page per client — do not leave the two old Balance placeholder cards in `works.html` after this plan; they must be fully replaced by the single new card (per project rule: no duplicate pages per client).
- Design reference: `docs/superpowers/specs/2026-07-24-balance-brand-page-design.md` — chapter list, asset sources and the Brand System spec are locked there; this plan implements it verbatim.

---

## File Structure

- **Create:** `works/balance.html` — the full case-study page (head/CSS, header, hero, sidebar, 6 chapters, next/footer, script).
- **Modify:** `works.html:568-586` — turn the dead "Balance Amazon" placeholder card into the one working card pointing at `works/balance.html`.
- **Modify:** `works.html:788-806` — delete the dead "Balance Amazon Social" placeholder card entirely (its content is now covered by the unified page).

No new shared CSS/JS files: per `CLAUDE.md`, each `works/*.html` page keeps its own inline `<style>` block; the Brand System CSS lives inside `works/balance.html`'s own `<style>`, ready to be copy-pasted into the other four clients' pages in a future rollout (out of scope here).

---

### Task 1: Build `works/balance.html`

**Files:**
- Create: `works/balance.html`

**Interfaces:**
- Consumes: `../anim.css`, `../anim.js` (existing shared files, unchanged), `../images/logo.svg` (existing), and the Balance asset files listed below (all pre-existing in the repo, verified in Step 2 — nothing needs to be copied from the SSD).
- Produces: the `works/balance.html` page, linked to from `works.html` in Task 2 and linking out to `works/bloom-valley.html` (existing page, unchanged).

- [ ] **Step 1: Create the file with the full page content**

Write this exact content to `works/balance.html`:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balance Nutrition — Brand Identity, Packaging & E-commerce | Juri Dabiankov Studio</title>
  <meta name="description" content="Iter completo di costruzione del brand Balance Nutrition: strategia, identità visiva, packaging, sito e-commerce, social e marketplace.">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="Balance Nutrition — Juri Dabiankov Studio">
  <meta property="og:description" content="Strategia, brand identity, packaging, sito, social e marketplace per il brand di integratori alimentari Balance Nutrition.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="../images/og-cover.jpg">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&family=Questrial&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{--canvas:#111111;--surface:#1b1b1b;--hairline:#2a2a2a;--ink:#fff;--muted:#78786e;--accent:#c4b49c;--sidebar:300px;}
    body{background:var(--canvas);color:var(--ink);font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
    img{display:block;width:100%;height:auto;}
    header{position:fixed;inset:0 0 auto;z-index:200;height:64px;padding:0 48px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.06);background:rgba(17,17,17,.88);backdrop-filter:blur(16px);}
    .logo-link img{height:32px;filter:invert(1);}
    nav{display:flex;align-items:center;gap:32px;}
    nav a{font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;color:rgba(255,255,255,.38);transition:color .2s;}
    nav a:hover{color:var(--ink);}
    .back{color:rgba(255,255,255,.5)!important;display:flex;align-items:center;gap:7px;}
    .back::before{content:'←';font-size:12px;}

    /* ── HERO (image bleed) ── */
    .hero-bleed{position:relative;height:100vh;min-height:600px;overflow:hidden;display:flex;align-items:flex-end;padding:0 80px 64px;}
    .hero-bg{position:absolute;inset:0;}
    .hero-bg img{width:100%;height:100%;object-fit:cover;object-position:center 30%;display:block;}
    .hero-bleed::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(17,17,17,.05) 0%,rgba(17,17,17,.15) 30%,rgba(17,17,17,.85) 68%,#111111 100%);pointer-events:none;}
    .hero-info{position:relative;z-index:2;}
    .hero-eyebrow{display:block;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);margin-bottom:18px;}
    .hero-h{font-size:clamp(60px,10vw,150px);font-weight:800;line-height:.82;letter-spacing:-.05em;text-transform:uppercase;}
    .hero-h em{font-style:normal;color:var(--accent);}

    /* ── MAGAZINE ── */
    .magazine{display:grid;grid-template-columns:var(--sidebar) 1fr;border-top:1px solid var(--hairline);}
    .sidebar{position:sticky;top:64px;height:calc(100vh - 64px);overflow-y:auto;scrollbar-width:none;padding:48px 36px 48px 48px;border-right:1px solid var(--hairline);display:flex;flex-direction:column;}
    .sidebar::-webkit-scrollbar{display:none;}
    .sb-tag{font-size:8px;letter-spacing:.25em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
    .sb-title{font-size:20px;font-weight:800;letter-spacing:-.03em;text-transform:uppercase;line-height:.88;}
    .sb-title em{font-style:normal;color:var(--accent);}
    .sb-rule{height:1px;background:var(--hairline);margin:24px 0;}
    .sb-meta{display:flex;flex-direction:column;gap:14px;}
    .sb-meta .k{font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:3px;}
    .sb-meta .v{font-size:12px;font-weight:500;line-height:1.6;}
    .sb-brief{margin-top:20px;font-size:12px;font-weight:300;line-height:1.85;color:rgba(255,255,255,.42);}
    .sb-brief em{font-style:normal;color:rgba(255,255,255,.72);}
    .sb-nav{margin-top:auto;padding-top:20px;}
    .sb-nav-lbl{font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;}
    .sb-nav a{display:flex;align-items:center;gap:14px;padding:11px 0;border-top:1px solid var(--hairline);text-decoration:none;color:rgba(255,255,255,.28);transition:color .25s;}
    .sb-nav a:hover{color:rgba(255,255,255,.65);}
    .sb-nav a.active{color:var(--ink);}
    .dot{width:5px;height:5px;border-radius:50%;border:1px solid currentColor;flex-shrink:0;transition:background .25s;}
    .sb-nav a.active .dot{background:var(--accent);border-color:var(--accent);}
    .nl{font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;}

    /* ── SCROLL COLUMN ── */
    .scroll-col{min-height:100vh;}
    .ch+.ch{border-top:1px solid var(--hairline);}
    .ch-hd{padding:24px 48px;display:flex;align-items:center;gap:20px;border-bottom:1px solid var(--hairline);}
    .ch-n{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);flex-shrink:0;}
    .ch-r{flex:1;height:1px;background:var(--hairline);}
    .ch-t{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.4);flex-shrink:0;}

    /* Image layout helpers */
    .if img{display:block;width:100%;height:auto;}
    .ig{height:1px;background:var(--hairline);}
    .id{display:grid;grid-template-columns:1fr 1fr;gap:1px;}
    .it{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;}
    .iq{display:grid;grid-template-columns:1fr 1fr;gap:1px;}

    /* Logo surface */
    .logo-surface{background:var(--surface);padding:80px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--hairline);}
    .logo-surface img{width:auto;max-width:280px;height:auto;display:block;}

    /* Text block inside chapter */
    .ch-text{padding:48px 48px 40px;border-bottom:1px solid var(--hairline);}
    .ch-text p{font-size:14px;font-weight:300;line-height:1.9;color:rgba(255,255,255,.42);max-width:640px;}

    /* ── BRAND SYSTEM (new, reusable) ── */
    .brand-system{border-bottom:1px solid var(--hairline);}
    .swatch-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--hairline);}
    .swatch{aspect-ratio:1;display:flex;align-items:flex-end;padding:16px;}
    .swatch span{font-size:10px;letter-spacing:.08em;font-weight:500;font-family:'Inter',sans-serif;}
    .type-specimen{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--hairline);}
    .type-block{background:var(--canvas);padding:40px;}
    .type-block .tk{font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:16px;}
    .type-block .tf-display{font-family:'Questrial',sans-serif;font-size:clamp(32px,4vw,56px);line-height:1;color:var(--ink);}
    .type-block .tf-body{font-family:'Montserrat',sans-serif;font-size:14px;font-weight:300;line-height:1.8;color:rgba(255,255,255,.55);}

    /* ── NEXT ── */
    .next{display:flex;align-items:center;justify-content:space-between;padding:80px 48px;text-decoration:none;color:var(--ink);background:var(--surface);border-top:1px solid var(--hairline);transition:background .3s;}
    .next:hover{background:var(--hairline);}
    .next-lbl{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);display:block;margin-bottom:14px;}
    .next-t{font-size:clamp(28px,4vw,60px);font-weight:800;letter-spacing:-.04em;text-transform:uppercase;line-height:.88;}
    .next-t em{font-style:normal;color:var(--accent);}
    .arr{font-size:28px;color:var(--muted);transition:transform .3s,color .3s;}
    .next:hover .arr{transform:translateX(10px);color:var(--accent);}

    footer{padding:32px 48px;border-top:1px solid var(--hairline);display:flex;justify-content:space-between;align-items:center;}
    footer a{font-size:10px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;color:var(--muted);margin-right:24px;}
    footer a:hover{color:var(--ink);}
    .fc{font-size:9px;color:var(--muted);}

    /* ── RESPONSIVE ── */
    @media(max-width:900px){
      .hero-bleed{padding:0 36px 48px;}
      .magazine{grid-template-columns:1fr;}
      .sidebar{position:relative;top:0;height:auto;padding:36px 24px;border-right:none;border-bottom:1px solid var(--hairline);}
      .sb-nav{margin-top:32px;}
      .next,footer{padding-left:24px;padding-right:24px;}
      .ch-hd{padding:20px 24px;}
      .ch-text{padding:36px 24px 28px;}
      .id,.iq{grid-template-columns:1fr 1fr;}
      .it{grid-template-columns:1fr 1fr;}
      .logo-surface{padding:48px 36px;}
      .swatch-row{grid-template-columns:1fr 1fr;}
      .type-specimen{grid-template-columns:1fr;}
    }
    @media(max-width:600px){
      header{padding:0 24px;}
      .hero-bleed{padding:0 24px 36px;}
      .ch-hd{padding:16px 20px;}
      .ch-text{padding:28px 20px 20px;}
      .id,.iq,.it{grid-template-columns:1fr;}
      .logo-surface{padding:40px 24px;}
      .logo-surface img{max-width:200px;}
      .next,footer{padding-left:20px;padding-right:20px;}
    }
  </style>
  <link rel="stylesheet" href="../anim.css">
</head>
<body>

<header>
  <a class="logo-link" href="../index.html"><img src="../images/logo.svg" alt="Juri Dabiankov Studio"></a>
  <nav>
    <a class="back" href="../works.html">Works</a>
    <a href="../services.html">Servizi</a>
    <a href="../about.html">Studio</a>
    <a href="../contact.html">Contatti</a>
  </nav>
</header>

<section class="hero-bleed">
  <div class="hero-bg">
    <img src="../projects/brand-identity/Balance/Sito/header/Header_Balance_prova copia.jpg" alt="Balance Nutrition — hero">
  </div>
  <div class="hero-info">
    <span class="hero-eyebrow">Brand Strategy · Identity · E-commerce</span>
    <h1 class="hero-h">BALANCE<br><em>NUTRITION</em></h1>
  </div>
</section>

<div class="magazine">
  <aside class="sidebar">
    <span class="sb-tag">Progetto</span>
    <h2 class="sb-title">BALANCE<br><em>NUTRITION</em></h2>
    <div class="sb-rule"></div>
    <div class="sb-meta">
      <div><div class="k">Cliente</div><div class="v">Balance Nutrition</div></div>
      <div><div class="k">Categoria</div><div class="v">Integratori Alimentari · E-commerce</div></div>
      <div><div class="k">Anno</div><div class="v">2022 → in corso</div></div>
      <div><div class="k">Servizi</div><div class="v">Brand Strategy · Identity · Packaging · Sito · Social · Marketplace</div></div>
    </div>
    <p class="sb-brief">Un brand di integratori alimentari in un mercato saturo. <em>Posizionamento netto, sistema visivo coerente.</em> Il progetto copre l'intero iter: strategia, identità, packaging, e-commerce, social e marketplace.</p>
    <div class="sb-nav">
      <div class="sb-nav-lbl">Capitoli</div>
      <a class="active" href="#ch01"><div class="dot"></div><span class="nl">Strategia</span></a>
      <a href="#ch02"><div class="dot"></div><span class="nl">Brand Identity</span></a>
      <a href="#ch03"><div class="dot"></div><span class="nl">Packaging</span></a>
      <a href="#ch04"><div class="dot"></div><span class="nl">Sito</span></a>
      <a href="#ch05"><div class="dot"></div><span class="nl">Social</span></a>
      <a href="#ch06"><div class="dot"></div><span class="nl">Marketplace</span></a>
    </div>
  </aside>

  <div class="scroll-col">

    <!-- 01 STRATEGIA -->
    <div id="ch01" class="ch">
      <div class="ch-hd"><span class="ch-n">01</span><div class="ch-r"></div><span class="ch-t">Strategia</span></div>
      <div class="ch-text">
        <p>Il mercato degli integratori alimentari è saturo: decine di brand offrono più prodotti di quanti i consumatori possano davvero valutare. In un contesto così, lo scontro non può basarsi sulla mera quantità. Balance nasce da un posizionamento netto e distintivo — una promessa al mercato chiara prima ancora che un prodotto sullo scaffale — per rendere la comunicazione semplice, credibile e memorabile.</p>
      </div>
    </div>

    <!-- 02 BRAND IDENTITY -->
    <div id="ch02" class="ch">
      <div class="ch-hd"><span class="ch-n">02</span><div class="ch-r"></div><span class="ch-t">Brand Identity</span></div>
      <div class="ch-text">
        <p>Palette essenziale, tipografia pulita: Questrial per i titoli, Montserrat per il corpo testo. Il triangolo capovolto del monogramma diventa l'elemento riconoscibile su ogni supporto, dal barattolo al banner digitale.</p>
      </div>
      <div class="brand-system" data-anim="img">
        <div class="swatch-row">
          <div class="swatch" style="background:#3C3C3B"><span style="color:#fff">#3C3C3B</span></div>
          <div class="swatch" style="background:#FFFFFF;border-right:1px solid var(--hairline)"><span style="color:#111">#FFFFFF</span></div>
          <div class="swatch" style="background:#008EAC"><span style="color:#fff">#008EAC</span></div>
          <div class="swatch" style="background:#1CB5C9"><span style="color:#111">#1CB5C9</span></div>
        </div>
        <div class="type-specimen">
          <div class="type-block">
            <div class="tk">Display · Questrial</div>
            <div class="tf-display">Balance</div>
          </div>
          <div class="type-block">
            <div class="tk">Corpo · Montserrat</div>
            <p class="tf-body">Un approccio più efficace e strategico alla comunicazione, per un marchio riconoscibile in un mercato competitivo.</p>
          </div>
        </div>
      </div>
      <div class="ig"></div>
      <div class="logo-surface" data-anim="img">
        <img src="../projects/brand-identity/Balance/Sito/Logo_balance.png" alt="Balance Nutrition — logo">
      </div>
    </div>

    <!-- 03 PACKAGING -->
    <div id="ch03" class="ch">
      <div class="ch-hd"><span class="ch-n">03</span><div class="ch-r"></div><span class="ch-t">Packaging</span></div>
      <div class="ch-text">
        <p>Etichette e box pensati per lo scaffale e per lo schermo: leggibilità del beneficio a colpo d'occhio, sistema colore coerente su tutta la linea di integratori.</p>
      </div>
      <div class="if" data-anim="img">
        <img src="../projects/brand-identity/Balance/Mockup/HYALURONIC-ACID-3X_Mockup.jpg" alt="Balance — mockup packaging">
      </div>
      <div class="ig"></div>
      <div class="it" data-anim="img">
        <img src="../projects/brand-identity/Balance/Studio_Box_Label/Studio_Box&amp;Etichette_Balance_prova_03_vert.jpg" alt="Balance — studio etichetta">
        <img src="../projects/brand-identity/Balance/Studio_Box_Label/Studio_Box&amp;Etichette_Balance_prova_04_vert.jpg" alt="Balance — studio etichetta">
        <img src="../projects/brand-identity/Balance/Studio_Box_Label/Studio_Box&amp;Etichette_Balance_prova_05_vert.jpg" alt="Balance — studio etichetta">
      </div>
      <div class="ig"></div>
      <div class="id" data-anim="img">
        <img src="../projects/brand-identity/Balance/Studio_Box_Label/Studio_Box&amp;Etichette_Balance_prova_01.jpg" alt="Balance — box">
        <img src="../projects/brand-identity/Balance/Studio_Box_Label/Studio_Box&amp;Etichette_Balance_prova_02.jpg" alt="Balance — box">
      </div>
    </div>

    <!-- 04 SITO -->
    <div id="ch04" class="ch">
      <div class="ch-hd"><span class="ch-n">04</span><div class="ch-r"></div><span class="ch-t">Sito</span></div>
      <div class="ch-text">
        <p>Il sito e-commerce mette il prodotto al centro: schede fotografiche pulite su sfondo neutro, pop-up promozionali coerenti con la palette del brand.</p>
      </div>
      <div class="id" data-anim="img">
        <img src="../projects/brand-identity/Balance/Sito/Balance_popUp_01.jpg" alt="Balance — popup sito">
        <img src="../projects/brand-identity/Balance/Sito/Balance_popUp_02.jpg" alt="Balance — popup sito">
      </div>
      <div class="ig"></div>
      <div class="iq" data-anim="img">
        <img src="../projects/brand-identity/Balance/Sito/Prodotti/Collagene.jpg" alt="Balance — Collagene">
        <img src="../projects/brand-identity/Balance/Sito/Prodotti/Probiotico.jpg" alt="Balance — Probiotico">
        <img src="../projects/brand-identity/Balance/Sito/Prodotti/drenaslim.jpg" alt="Balance — DrenaSlim">
        <img src="../projects/brand-identity/Balance/Sito/Prodotti/multivitaminco.jpg" alt="Balance — Multivitaminico">
      </div>
    </div>

    <!-- 05 SOCIAL -->
    <div id="ch05" class="ch">
      <div class="ch-hd"><span class="ch-n">05</span><div class="ch-r"></div><span class="ch-t">Social</span></div>
      <div class="ch-text">
        <p>Creatività social pensate per la performance: campagne stagionali come il Black Friday, contenuti prodotto per Instagram e Facebook, comunicazione istituzionale su LinkedIn.</p>
      </div>
      <div class="it" data-anim="img">
        <img src="../projects/brand-identity/Balance/Social/Nicola/Collagene+AcidoIaluronico_Creatività_A1.jpg" alt="Balance — creatività social">
        <img src="../projects/brand-identity/Balance/Social/Nicola/Collagene+AcidoIaluronico_Creatività_B1.jpg" alt="Balance — creatività social">
        <img src="../projects/brand-identity/Balance/Social/Nicola/Collagene+AcidoIaluronico_Creatività_C1.jpg" alt="Balance — creatività social">
      </div>
      <div class="ig"></div>
      <div class="id" data-anim="img">
        <img src="../projects/brand-identity/Balance/Social/Black_Friday/Balance_ADV_BlackFriday_A_00.jpg" alt="Balance — Black Friday">
        <img src="../projects/brand-identity/Balance/Social/Black_Friday/Balance_ADV_BlackFriday_02.jpg" alt="Balance — Black Friday">
      </div>
      <div class="ig"></div>
      <div class="if" data-anim="img">
        <img src="../projects/brand-identity/Balance/Social/Linkedin_cover_A.jpg" alt="Balance — LinkedIn cover">
      </div>
    </div>

    <!-- 06 MARKETPLACE -->
    <div id="ch06" class="ch">
      <div class="ch-hd"><span class="ch-n">06</span><div class="ch-r"></div><span class="ch-t">Marketplace</span></div>
      <div class="ch-text">
        <p>Balance vive anche sui marketplace: header e schede prodotto ottimizzati per Amazon Store ed eBay, con lo stesso sistema visivo del brand.</p>
      </div>
      <div class="if" data-anim="img">
        <img src="../projects/brand-identity/Balance/Store_Amazon_Balance_New/Header_3000x600.jpg" alt="Balance — header Amazon Store">
      </div>
      <div class="ig"></div>
      <div class="id" data-anim="img">
        <img src="../projects/brand-identity/Balance/Store_Amazon_Balance_New/Seasonal_Products.jpg" alt="Balance — Amazon seasonal products">
        <img src="../projects/brand-identity/Balance/Store_Amazon_Balance_New/New_Products.jpg" alt="Balance — Amazon new products">
      </div>
      <div class="ig"></div>
      <div class="id" data-anim="img">
        <img src="../projects/brand-identity/Balance/Store_Ebay/Header_ebay_01.jpg" alt="Balance — header eBay">
        <img src="../projects/brand-identity/Balance/Store_Ebay/640x640_01.jpg" alt="Balance — scheda eBay">
      </div>
    </div>

  </div><!-- /scroll-col -->
</div><!-- /magazine -->

<a class="next" href="bloom-valley.html">
  <div>
    <span class="next-lbl">Progetto successivo</span>
    <div class="next-t">Bloom Valley<br><em>Packaging</em></div>
  </div>
  <span class="arr">→</span>
</a>

<footer>
  <div><a href="mailto:juri.dabiankov@gmail.com">Email</a><a href="https://www.behance.net/juridabiankov" target="_blank">Behance</a><a href="https://www.instagram.com/juridabiankov" target="_blank">Instagram</a></div>
  <span class="fc">© 2025 Juri Dabiankov Studio</span>
</footer>

<script>
  const ids=['ch01','ch02','ch03','ch04','ch05','ch06'],ls={};
  ids.forEach(id=>ls[id]=document.querySelector(`a[href="#${id}"]`));
  const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){ids.forEach(i=>ls[i]?.classList.remove('active'));ls[x.target.id]?.classList.add('active');}}),{rootMargin:'-30% 0px -60% 0px'});
  ids.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});
</script>
<script src="../anim.js?v=5" defer></script>
</body>
</html>
```

- [ ] **Step 2: Verify every image path resolves to a real file**

Run from the repo root:

```bash
cd works && grep -oE 'src="[^"]+\.(jpg|jpeg|png|gif)"' balance.html | sed -E 's/^src="//;s/"$//;s/&amp;/\&/g' | while read -r p; do [ -f "$p" ] || echo "MISSING: $p"; done; cd ..
```

Expected: no output (no `MISSING:` lines). If any file is reported missing, re-check the exact filename in `projects/brand-identity/Balance/...` with `ls` (accented/special characters are easy to mistype) and fix the `src` in `works/balance.html` before continuing.

- [ ] **Step 3: Serve locally and confirm the page loads**

```bash
python3 -m http.server 8080 >/dev/null 2>&1 &
sleep 1
curl -sI http://localhost:8080/works/balance.html | head -1
```

Expected: `HTTP/1.0 200 OK`.

- [ ] **Step 4: Visual check in browser**

```bash
open http://localhost:8080/works/balance.html
```

Confirm manually: hero image fills the viewport with legible title over it, sidebar chapter nav scrolls and highlights the active chapter, the Brand System swatches show four distinct colors with readable HEX labels, the two type-specimen blocks show Questrial (display) and Montserrat (body) rendering differently from the rest of the page's Inter type, and every chapter's images load (no broken-image icons).

- [ ] **Step 5: Commit**

```bash
git add works/balance.html
git commit -m "$(cat <<'EOF'
feat: aggiungi pagina brand unificata Balance Nutrition

Pilota per il pattern "iter di costruzione del brand" (strategia,
identità, packaging, sito, social, marketplace) da estendere poi
a IPC, CIP, Scrubols, BloomValley.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Replace the two dead Balance cards in `works.html`

**Files:**
- Modify: `works.html:568-586` (the "Balance Amazon" card)
- Modify: `works.html:788-806` (the "Balance Amazon Social" card, deleted)

**Interfaces:**
- Consumes: `works/balance.html` from Task 1 (must exist before this task, since the new card links to it).
- Produces: `works.html` with exactly one Balance card, `data-category="brand-identity"`, `href="balance.html"`.

- [ ] **Step 1: Turn the "Balance Amazon" card into the unified card**

In `works.html`, find this exact block (currently lines 568–586):

```html
      <!-- 10 — Balance Amazon -->
      <a class="project-item" data-category="packaging" href="#" data-anim data-delay="9">
        <div class="project-inner">
          <div class="project-meta">
            <span class="project-num">10</span>
            <h2 class="project-title">Balance<br><em>Amazon</em></h2>
            <span class="project-year">2023</span>
            <div class="project-tags"><span class="tag">Packaging</span><span class="tag">Print</span></div>
            <span class="view-link">View project</span>
          </div>
          <div class="project-images">
            <div class="img-strip">
              <div class="img-wrap"><img src="projects/packaging/balance-amazon/images/mockup_01.jpg" alt="" loading="lazy"></div>
              <div class="img-wrap"><img src="projects/packaging/balance-amazon/images/brand_A.jpg" alt="" loading="lazy"></div>
              <div class="img-wrap"><img src="projects/packaging/balance-amazon/images/mockup_02.jpg" alt="" loading="lazy"></div>
            </div>
          </div>
        </div>
      </a>
```

Replace it with:

```html
      <!-- 10 — Balance Nutrition -->
      <a class="project-item" data-category="brand-identity" href="works/balance.html" data-anim data-delay="9">
        <div class="project-inner">
          <div class="project-meta">
            <span class="project-num">10</span>
            <h2 class="project-title">Balance<br><em>Nutrition</em></h2>
            <span class="project-year">2022</span>
            <div class="project-tags"><span class="tag">Brand Identity</span><span class="tag">Packaging</span></div>
            <span class="view-link">View project</span>
          </div>
          <div class="project-images">
            <div class="img-strip">
              <div class="img-wrap"><img src="projects/packaging/balance-amazon/images/mockup_01.jpg" alt="" loading="lazy"></div>
              <div class="img-wrap"><img src="projects/packaging/balance-amazon/images/brand_A.jpg" alt="" loading="lazy"></div>
              <div class="img-wrap"><img src="projects/packaging/balance-amazon/images/mockup_02.jpg" alt="" loading="lazy"></div>
            </div>
          </div>
        </div>
      </a>
```

Note the `href` is `works/balance.html` (not `balance.html`) because `works.html` lives at the repo root, one level above `works/`.

- [ ] **Step 2: Delete the "Balance Amazon Social" card**

In `works.html`, find this exact block (currently lines 788–806) and delete it completely, including the blank line directly above the comment:

```html

      <!-- 18 — Balance Amazon Social -->
      <a class="project-item" data-category="social-media" href="#" data-anim data-delay="17">
        <div class="project-inner">
          <div class="project-meta">
            <span class="project-num">18</span>
            <h2 class="project-title">Balance<br><em>Social Media</em></h2>
            <span class="project-year">2023</span>
            <div class="project-tags"><span class="tag">Social Media</span><span class="tag">Amazon</span></div>
            <span class="view-link">View project</span>
          </div>
          <div class="project-images">
            <div class="img-strip">
              <div class="img-wrap"><img src="projects/social-media/balance-amazon/images/brand_A.jpg" alt="" loading="lazy"></div>
              <div class="img-wrap"><img src="projects/social-media/balance-amazon/images/brand_B.jpg" alt="" loading="lazy"></div>
              <div class="img-wrap"><img src="projects/social-media/balance-amazon/images/brand_A.jpg" alt="" loading="lazy"></div>
            </div>
          </div>
        </div>
      </a>
```

Leave a single blank line between the previous card's closing `</a>` and the next card's opening `<!-- 19 — ... -->` comment (i.e. don't leave a double blank line behind).

- [ ] **Step 3: Verify there is exactly one Balance entry and no dead link remains**

```bash
grep -c 'Balance<br>' works.html
grep -n 'Balance' works.html
```

Expected: the count is `1` (only one `<h2 class="project-title">Balance<br>...` left — i.e. only one `project-item` block mentions Balance), and the `grep -n` output shows a single card with `href="works/balance.html"` and no `href="#"` next to any Balance text.

- [ ] **Step 4: Confirm the filter still works**

```bash
python3 -m http.server 8080 >/dev/null 2>&1 &
sleep 1
open http://localhost:8080/works.html
```

Manually: click the "Brand Identity" filter button and confirm the Balance card appears; click it and confirm it opens `works/balance.html`.

- [ ] **Step 5: Commit**

```bash
git add works.html
git commit -m "$(cat <<'EOF'
fix: unifica le due card Balance in works.html in una sola

Le card "Balance Amazon" e "Balance Amazon Social" puntavano
entrambe a href="#" (nessuna pagina esisteva). Sostituite con
un'unica card verso la nuova pagina brand unificata.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Out of scope (future work, not this plan)

- Applying the same chapter + Brand System pattern to IPC (requires merging 3 existing pages first), CIP, Scrubols, BloomValley.
- The event-photo gallery with lateral scroll + lightbox discussed for IPC.
- Any change to `sitemap.xml` or `images/og-cover.jpg` (tracked separately in `project_stato_lavori` memory).
