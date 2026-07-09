const fs = require("fs");
const path = require("path");
const { PREDICTION_PAGES } = require("../prediction-essays-data.js");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://www.stateof.ai";
const PREDICTIONS_URL = `${SITE_URL}/predictions`;

const pageBySlug = new Map(PREDICTION_PAGES.map((page) => [page.slug, page]));

function esc(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonScript(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function richText(value) {
  const paragraph = typeof value === "string" ? { text: value, links: [] } : value;
  let html = esc(paragraph.text);

  (paragraph.links || []).forEach((link) => {
    const label = esc(link.text);
    if (!html.includes(label)) {
      throw new Error(`Source link text not found: ${link.text}`);
    }
    html = html.replace(
      label,
      `<a href="${esc(link.url)}" target="_blank" rel="noopener">${label}</a>`
    );
  });

  return html;
}

function pageCitations(page) {
  const citations = new Set();

  function visit(value) {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (typeof value !== "object") return;
    if (typeof value.url === "string" && /^https?:\/\//.test(value.url)) {
      citations.add(value.url);
    }
    Object.values(value).forEach(visit);
  }

  visit(page);
  citations.delete(page.sourceReportUrl);
  return [page.sourceReportUrl, ...citations].filter(Boolean);
}

function reportUrlForLabel(label) {
  const match = String(label || "").match(/\b(20\d{2})\b/);
  if (!match) return `${SITE_URL}/`;
  const year = match[1];
  return year === "2025" ? `${SITE_URL}/` : `${SITE_URL}/${year}`;
}

function localPreviewScript() {
  return `<script>
      if (location.hostname !== "www.stateof.ai") {
        document.querySelectorAll('a[href^="https://www.stateof.ai/predictions"]').forEach(function(link) {
          var slug = link.href.replace("https://www.stateof.ai/predictions", "");
          link.href = slug && slug !== "/" ? slug + (slug.endsWith("/") ? "" : "/") : "/";
        });
      }
    </script>`;
}

function predictionList(page) {
  if (!page.predictions || !page.predictions.length) return "";
  return `<section class="essay-block prediction-block" aria-labelledby="prediction-heading">
              <h2 id="prediction-heading">The Prediction</h2>
              <div class="prediction-list">
                ${page.predictions
                  .map((prediction) => {
                    const statusClass = prediction.status.toLowerCase();
                    return `<article class="prediction-quote">
                        <div class="prediction-meta">
                          <a href="${esc(reportUrlForLabel(prediction.label))}" target="_blank" rel="noopener">${esc(prediction.label)}</a>
                          <span class="status ${esc(statusClass)}">${esc(prediction.status)}</span>
                        </div>
                        <blockquote>${esc(prediction.text)}</blockquote>
                      </article>`;
                  })
                  .join("")}
              </div>
            </section>`;
}

function receiptsList(page) {
  if (!page.receipts || !page.receipts.length) return "";
  return `<section class="receipt-grid" aria-label="Calls we got right">
              ${page.receipts
                .map(
                  (receipt) => `<article class="receipt-card">
                    <div class="receipt-kicker">
                      <span>${esc(receipt.year)}</span>
                      <span class="status hit">${esc(receipt.status)}</span>
                    </div>
                    <h2>${esc(receipt.prediction)}</h2>
                    <dl>
                      <dt>What happened</dt>
                      <dd>${richText(receipt.happened)}</dd>
                      <dt>Why it mattered</dt>
                      <dd>${richText(receipt.mattered)}</dd>
                    </dl>
                  </article>`
                )
                .join("")}
            </section>`;
}

function editorialSections(page) {
  return (page.sections || [])
    .map(
      (section) => `<section class="essay-block">
          <h2>${esc(section.heading)}</h2>
          ${(section.body || []).map((paragraph) => `<p>${richText(paragraph)}</p>`).join("")}
        </section>`
    )
    .join("");
}

function relatedLinks(page) {
  const related = (page.related || [])
    .map((slug) => pageBySlug.get(slug))
    .filter(Boolean);

  if (!related.length) return "";

  return `<aside class="related-block" aria-labelledby="related-heading">
      <h2 id="related-heading">Related Reading</h2>
      <div class="related-list">
        ${related
          .map(
            (item) => `<a href="${PREDICTIONS_URL}/${esc(item.slug)}">
              <span>${esc(item.title)}</span>
              <small>${esc(item.type === "track-record" ? "Track record" : "Prediction essay")}</small>
            </a>`
          )
          .join("")}
      </div>
    </aside>`;
}

function pageSchema(page, canonical) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: page.title,
        alternativeHeadline: page.seoTitle || page.title,
        description: page.description,
        abstract: page.answer || page.dek,
        keywords: page.keywords || [],
        articleSection: page.type === "track-record" ? "AI prediction track record" : "AI prediction analysis",
        dateModified: page.lastUpdated,
        datePublished: page.datePublished || page.lastUpdated,
        inLanguage: "en",
        mainEntityOfPage: canonical,
        isAccessibleForFree: true,
        image: `${SITE_URL}/stateofai-predictions-card.png`,
        citation: pageCitations(page),
        isPartOf: { "@id": `${SITE_URL}/#series` },
        author: { "@id": `${SITE_URL}/#person-nathan` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: ["artificial intelligence", "AI predictions", "State of AI Report"],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "State of AI Report",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Predictions",
            item: PREDICTIONS_URL,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.title,
            item: canonical,
          },
        ],
      },
    ],
  };
}

function renderPage(page) {
  const canonical = `${PREDICTIONS_URL}/${page.slug}`;
  const title = page.seoTitle || `${page.title} | State of AI Report`;
  const isTrackRecord = page.type === "track-record";

  return `<!DOCTYPE html>
<html class="no-js" lang="en">
  <head>
    <script type="application/ld+json">${jsonScript(pageSchema(page, canonical))}</script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-25T8JQY0LN"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-25T8JQY0LN');
    </script>
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NWC2HDM');</script>
    <title>${esc(title)}</title>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="author" content="Nathan Benaich and Air Street Capital">
    <meta name="description" content="${esc(page.description)}">
    <meta name="keywords" content="${esc((page.keywords || []).join(", "))}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="canonical" href="${canonical}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <link rel="manifest" href="https://www.stateof.ai/site.webmanifest">
    <link rel="icon" href="https://www.stateof.ai/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="https://www.stateof.ai/favicon.ico" type="image/x-icon"/>
    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css" integrity="sha384-O2GsbeS5rYQ72SmBXWL+lDu67AGTu0ageCnidKcNJa8133eUgYoLccjQYYWkuj+Q" crossorigin="anonymous">
    <link rel="stylesheet" href="https://www.stateof.ai/main.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Francois+One">
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@stateofaireport" />
    <meta name="twitter:creator" content="@stateofaireport" />
    <meta property="twitter:title" content="${esc(page.title)}" />
    <meta property="twitter:description" content="${esc(page.description)}" />
    <meta property="twitter:image" content="https://www.stateof.ai/stateofai-predictions-card.png" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:image" content="https://www.stateof.ai/stateofai-predictions-card.png">
    <meta property="og:type" content="article" />
    <meta property="article:published_time" content="${esc(page.datePublished || page.lastUpdated)}" />
    <meta property="article:modified_time" content="${esc(page.lastUpdated)}" />
    <meta property="article:section" content="State of AI Report Predictions" />
    <style>
      :root{ --ink:#161e59; --orange:#ff9900; --muted:#6b7080; --line:#e2e1de; --paper:#f8faf9; --soft:#eceef3; --green:#2f7d4f; --red:#9c3a2a; }
      html{ background:var(--paper); }
      body{ color:var(--ink); overflow-x:hidden; }
      .prediction-page{ text-align:left; }
      .prediction-page .announcement{ text-align:center; }
      .prediction-shell{ max-width:880px; margin:0 auto; }
      .prediction-nav{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin:0 0 28px; }
      .prediction-nav .button{ height:auto; min-height:2.35em; margin:0; white-space:nowrap; }
      .essay-title{ color:var(--ink) !important; font-family:'Francois One',Impact,'Arial Narrow',sans-serif; font-size:3rem; font-weight:600; line-height:1.125; margin:0 auto 18px !important; text-align:center; max-width:920px; letter-spacing:0; }
      .essay-title .dot{ color:var(--orange); }
      .essay-dek{ max-width:760px; margin:0 auto 28px; color:#33384d; font-size:1.2rem; line-height:1.55; text-align:center; }
      .lead-block{ border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:24px 0; margin:6px 0 30px; }
      .lead-block p{ margin:0 0 14px; color:#33384d; font-size:1.08rem; line-height:1.62; }
      .lead-block p:last-child{ margin-bottom:0; }
      .answer-block{ border-left:4px solid var(--orange); background:#fff; padding:18px 20px; margin:4px 0 30px; }
      .answer-block h2{ color:var(--muted); font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; margin:0 0 7px; }
      .answer-block p{ color:var(--ink); font-size:1.08rem; font-weight:700; line-height:1.5; margin:0; }
      .essay-block{ margin:34px 0; }
      .essay-block h2, .related-block h2{ font-family:'Francois One',Impact,'Arial Narrow',sans-serif; color:var(--ink); font-size:1.75rem; line-height:1.1; margin:0 0 12px; letter-spacing:0; }
      .essay-block p{ color:#33384d; line-height:1.68; margin:0 0 15px; font-size:1.04rem; }
      .prediction-list{ display:grid; grid-template-columns:1fr; gap:12px; }
      .prediction-quote{ border:1px solid var(--line); border-left:4px solid var(--orange); border-radius:7px; background:#fff; padding:16px 18px; }
      .prediction-meta{ display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-bottom:10px; }
      .prediction-meta a{ color:var(--muted); font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:.08em; text-decoration:none; }
      .prediction-meta a:hover{ text-decoration:underline; }
      .status{ display:inline-flex; align-items:center; border-radius:4px; padding:2px 8px; font-size:10px; text-transform:uppercase; letter-spacing:.06em; font-weight:700; background:rgba(22,30,89,.1); color:var(--ink); }
      .status.hit{ background:rgba(47,125,79,.1); color:var(--green); }
      .status.miss{ background:rgba(156,58,42,.1); color:var(--red); }
      .status.partial{ background:rgba(176,125,24,.14); color:#8a6212; }
      .prediction-quote blockquote{ margin:0; color:var(--ink); font-weight:700; line-height:1.42; font-size:1.04rem; }
      .receipt-grid{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin:32px 0; }
      .receipt-card{ border:1px solid var(--line); border-left:4px solid var(--green); border-radius:7px; background:#fff; padding:18px 20px; }
      .receipt-kicker{ display:flex; align-items:center; flex-wrap:wrap; gap:8px; color:var(--muted); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; margin-bottom:10px; }
      .receipt-card h2{ font-size:1.15rem; line-height:1.35; color:var(--ink); font-weight:700; margin:0 0 14px; }
      .receipt-card dl{ margin:0; }
      .receipt-card dt{ font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; margin:13px 0 4px; }
      .receipt-card dd{ margin:0; color:#33384d; line-height:1.5; font-size:.98rem; }
      .essay-block p a, .lead-block p a, .answer-block p a, .receipt-card dd a{ color:var(--ink); text-decoration-line:underline; text-decoration-color:var(--orange); text-decoration-thickness:2px; text-underline-offset:2px; }
      .essay-block p a:hover, .lead-block p a:hover, .answer-block p a:hover, .receipt-card dd a:hover{ color:var(--orange); }
      .related-block{ border-top:1px solid var(--line); padding-top:24px; margin:44px 0 12px; }
      .related-list{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
      .related-list a{ display:block; border:1px solid var(--line); border-radius:7px; padding:14px 15px; background:#fff; text-decoration:none; color:var(--ink); min-width:0; }
      .related-list a:hover{ border-color:var(--ink); background:#eef1f8; }
      .related-list span{ display:block; font-weight:700; line-height:1.25; }
      .related-list small{ display:block; color:var(--muted); margin-top:7px; font-size:12px; }
      .essay-footer-note{ color:var(--muted); font-size:12.5px; line-height:1.5; text-align:center; margin-top:32px; }
      @media (max-width:720px){
        .prediction-nav{ gap:6px; }
        .prediction-nav .button{ font-size:.92rem; padding-left:.65rem; padding-right:.65rem; }
        .essay-dek{ font-size:1.06rem; text-align:left; }
        .receipt-grid, .related-list{ grid-template-columns:1fr; }
        .lead-block{ padding:20px 0; }
      }
    </style>
  </head>
  <body class="prediction-page">
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NWC2HDM" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <main>
      <div class="announcement">
        <p><b>Take the</b> <u><a href="https://airstreet.typeform.com/survey">State of AI Report Survey!</a></u></p>
      </div>
      <section class="hero is-info is-as">
        <div class="hero-body">
          <div class="container prediction-shell">
            <nav class="prediction-nav" aria-label="Prediction navigation">
              <a href="https://www.stateof.ai/" class="button">🏠 Home</a>
              <a href="https://www.stateof.ai/predictions" class="button">🎱 Predictions</a>
              <a href="https://press.airstreet.com/" class="button">📧 Air Street Press</a>
            </nav>
            <article>
              <h1 class="essay-title">${esc(page.title)}<span class="dot">.</span></h1>
              <p class="essay-dek">${esc(page.dek)}</p>
              ${page.answer ? `<section class="answer-block" aria-labelledby="answer-heading"><h2 id="answer-heading">In brief</h2><p>${richText(page.answer)}</p></section>` : ""}
${page.lead ? `<section class="lead-block">${page.lead.map((paragraph) => `<p>${richText(paragraph)}</p>`).join("")}</section>` : ""}
              ${isTrackRecord ? receiptsList(page) : predictionList(page)}
              ${editorialSections(page)}
              ${relatedLinks(page)}
              <p class="essay-footer-note">Last updated ${esc(page.lastUpdated)}. Verdicts and predictions are drawn from the annual State of AI Report and the public predictions scorecard.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
    ${localPreviewScript()}
  </body>
</html>
`;
}

PREDICTION_PAGES.forEach((page) => {
  const dir = path.join(ROOT, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderPage(page), "utf8");
});

console.log(`Generated ${PREDICTION_PAGES.length} prediction editorial pages.`);
