// Generates static, crawlable local landing pages into public/<city>/index.html
// (and public/ontario/) plus public/sitemap.xml and robots.txt.
// Run: node scripts/generate-city-pages.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://www.neexoraai.com";
const WA = "https://wa.me/923069829158";
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const today = new Date().toISOString().slice(0, 10);

const cities = [
  {
    slug: "toronto",
    name: "Toronto",
    areas: ["Downtown Toronto", "North York", "Scarborough", "East York", "York"],
    industries:
      "law firms and licensed paralegals, home renovation and construction companies, clinics, restaurants and professional services",
    angle:
      "Toronto is the most competitive local search market in Canada, so a generic website is not enough. Ranking here means a fast, well-structured site, a fully optimized Google Business Profile, and pages written for the specific neighbourhoods your customers search from.",
  },
  {
    slug: "etobicoke",
    name: "Etobicoke",
    areas: ["Islington", "Humber Bay", "Rexdale", "Mimico", "The Kingsway"],
    industries: "traffic ticket and paralegal firms, home services, clinics and small professional offices",
    angle:
      "Etobicoke customers search close to home: near-me and neighbourhood searches decide who gets the call. We build the Etobicoke pages, Google Business Profile and review plan that put you in front of them. Our work with Bridge Legal Services, a paralegal firm in Etobicoke, is a good example.",
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    areas: ["Port Credit", "Streetsville", "Erin Mills", "Meadowvale", "Cooksville"],
    industries: "professional services, clinics, contractors, real estate and retail businesses",
    angle:
      "Mississauga is a large, fast-growing city with strong local competition in almost every trade. We target the neighbourhoods you actually serve, from Port Credit to Meadowvale, and track which searches turn into calls and bookings.",
  },
  {
    slug: "brampton",
    name: "Brampton",
    areas: ["Bramalea", "Springdale", "Heart Lake", "Downtown Brampton", "Mount Pleasant"],
    industries: "law and paralegal practices, trades and home services, clinics, logistics and local retail",
    angle:
      "Brampton is one of Ontario's fastest-growing cities, and many customers search in more than one language. We build clear service pages and a strong Google Business Profile so Brampton customers can find you, trust you and contact you quickly.",
  },
];

// City-specific material, so each page says something the others don't.
// `proof` must stay factual: Bridge Legal Services really has offices in
// Etobicoke, Mississauga and Brampton and defends Toronto tickets.
const local = {
  toronto: {
    keyword: "SEO Company in Toronto",
    searches: [
      "\"near me\" searches from a phone, which Google answers with the map pack first",
      "service + neighbourhood searches such as \"plumber North York\" or \"dentist Scarborough\"",
      "comparison searches (\"best\", \"reviews\", \"cost\") where directories and review sites compete with you",
    ],
    approach:
      "In Toronto we rarely start with the whole city. We pick the two or three districts where you can realistically win first, usually the ones closest to your location or where your best jobs come from, then expand once the Business Profile and those pages are earning calls. Trying to rank for all of Toronto at once spreads a small budget too thin.",
    proof:
      "Bridge Legal Services defends drivers in Toronto's provincial offences courts. After our technical work in November 2026, their homepage's mobile Largest Contentful Paint fell from 8.1 seconds to 1.7 seconds on Google PageSpeed Insights.",
    nearby: ["etobicoke", "mississauga"],
    faq: [
      "Can a small business rank in Toronto against big brands?",
      "Usually yes, for local searches. Google's map results weigh distance, relevance and prominence, so a well-run Business Profile with steady reviews can outrank national brands near your location even when their website is stronger. Broad city-wide terms take longer.",
    ],
  },
  etobicoke: {
    keyword: "SEO Company in Etobicoke",
    searches: [
      "searches that name a neighbourhood or plaza, such as \"Islington\" or \"Rexdale\"",
      "urgent \"near me\" searches made from a phone and answered by the map pack",
      "searches for Etobicoke courts, offices and clinics, where clear directions and hours win the click",
    ],
    approach:
      "Etobicoke is a set of distinct neighbourhoods rather than one market, and customers rarely cross the whole borough for a local service. We match your pages and Business Profile to the neighbourhoods you actually serve, and make sure address, hours and phone number are identical everywhere they appear.",
    proof:
      "Bridge Legal Services runs its main office on Islington Avenue in Etobicoke. We rebuilt the technical side of their site: mobile PageSpeed performance went from 63 to 87, mobile Largest Contentful Paint from 8.1 to 1.7 seconds, and accessibility from 87 to 100.",
    nearby: ["toronto", "mississauga"],
    faq: [
      "Should my Etobicoke business target Toronto or Etobicoke searches?",
      "Both, but in that order: Etobicoke first. People searching locally tend to add the neighbourhood or borough name, and those searches have less competition than \"Toronto\". Once you rank locally, the same pages and reviews help with broader Toronto searches.",
    ],
  },
  mississauga: {
    keyword: "SEO Company in Mississauga",
    searches: [
      "neighbourhood searches such as \"Port Credit\", \"Streetsville\" or \"Meadowvale\"",
      "B2B and professional-service searches from the city's large business community",
      "\"near me\" searches near major roads and plazas, where an accurate pin on the map matters",
    ],
    approach:
      "Mississauga is large and spread out, so proximity matters a lot in Google Maps. We look at where your location sits, which neighbourhoods are within reach, and build service pages and Business Profile content around those, instead of a single generic Mississauga page.",
    proof:
      "Bridge Legal Services has an office on Drew Road in Mississauga. The same site-wide work applies there: all 69 pages of their site now pass our 47 on-page checks with no duplicate titles or descriptions.",
    nearby: ["brampton", "etobicoke"],
    faq: [
      "How do I rank in Mississauga if my office is near the edge of the city?",
      "Google's map results favour businesses close to the searcher, so you rank most easily near your location. Pages for the specific neighbourhoods you serve, plus reviews that mention them, help you show up further out. We set realistic targets based on where you are.",
    ],
  },
  brampton: {
    keyword: "SEO Company in Brampton",
    searches: [
      "searches in more than one language, and English searches from customers who also use Punjabi, Hindi or Urdu",
      "neighbourhood searches such as \"Bramalea\", \"Springdale\" or \"Heart Lake\"",
      "searches for trades, logistics and professional services from a fast-growing population",
    ],
    approach:
      "In Brampton we pay close attention to language and trust signals. Clear service pages, reviews from real local customers and, where it fits your business, content that answers questions your customers ask in their first language all make a difference to who gets the call.",
    proof:
      "Bridge Legal Services serves Brampton drivers from an office on Education Road. Their site now loads its main content in 1.7 seconds on a mobile test (from 8.1 seconds), which matters when most local searches come from phones.",
    nearby: ["mississauga", "toronto"],
    faq: [
      "Do I need a website in other languages to rank in Brampton?",
      "Not always. Most customers still search in English, but a page or section in the language your customers prefer can improve trust and conversions. We look at your customers and competitors before recommending it.",
    ],
  },
};

const css =
  "*{box-sizing:border-box}body{margin:0;background:#09090D;color:#e5e7eb;font:16px/1.65 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}a{color:#B9FF29}header,main,footer{max-width:980px;margin:0 auto;padding:0 20px}header{display:flex;justify-content:space-between;align-items:center;padding-top:20px;padding-bottom:20px;flex-wrap:wrap;gap:8px}.logo{font-weight:800;color:#fff;text-decoration:none;font-size:20px}h1{font-size:clamp(30px,5vw,46px);line-height:1.15;color:#fff;margin:28px 0 16px}h2{color:#fff;font-size:26px;margin:44px 0 12px}h3{color:#fff;margin:6px 0}ul{padding-left:20px}li{margin:6px 0}.cta{display:inline-block;background:#B9FF29;color:#09090D;font-weight:800;padding:14px 24px;border-radius:12px;text-decoration:none;margin:10px 12px 10px 0}.cta.alt{background:transparent;color:#B9FF29;border:1px solid #B9FF29}.card{background:#111118;border:1px solid #23232e;border-radius:16px;padding:16px 24px;margin:16px 0}nav a{margin-left:18px;color:#d1d5db;text-decoration:none;font-size:14px}footer{padding:40px 20px;color:#9ca3af;font-size:14px;border-top:1px solid #1b1b24;margin-top:56px}.crumbs{font-size:13px;color:#9ca3af}";

const faqFor = (c) => [
  [
    `How long does it take to rank in ${c.name}?`,
    `Most local businesses see early movement in Google Maps and local results within 2 to 3 months once the Google Business Profile and local pages are in place. Competitive searches in the GTA usually take 6 to 12 months of steady work. We do not promise a specific position, because nobody can.`,
  ],
  [
    `Do you have an office in ${c.name}?`,
    `No. Nexora AI works remotely with businesses across Canada, the USA and the UK. We build ${c.name}-focused pages, Google Business Profile optimization and tracking for your business, based on your real service area.`,
  ],
  [
    `What does SEO for a ${c.name} business include?`,
    `A technical review of your website, ${c.name} and neighbourhood landing pages, Google Business Profile optimization, a review plan, citations, and lead tracking so you can see which searches bring in calls, forms and bookings.`,
  ],
  [
    `Do I have to sign a long-term contract?`,
    `No. Monthly plans are month-to-month and website builds are quoted at a fixed price before we start.`,
  ],
];

const page = ({ slug, title, h1, desc, body, faq, areaName, areaType, article = false }) => {
  const url = `${SITE}/${slug}/`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE}/#organization`,
      name: "Nexora AI",
      url: `${SITE}/`,
    },
    article
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          headline: h1,
          description: desc,
          datePublished: today,
          author: { "@id": `${SITE}/#organization` },
          publisher: { "@id": `${SITE}/#organization` },
          mainEntityOfPage: url,
        }
      : {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: h1,
          serviceType: "Search engine optimization and digital marketing",
          provider: { "@id": `${SITE}/#organization` },
          areaServed: { "@type": areaType, name: areaName },
          url,
        },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Nexora AI", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: h1, item: url },
      ],
    },
  ];
  if (faq.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  }
  const faqHtml = faq.length
    ? `<h2>Frequently asked questions</h2>${faq
        .map(([q, a]) => `<div class="card"><h3>${q}</h3><p>${a}</p></div>`)
        .join("")}`
    : "";
  return `<!DOCTYPE html>
<html lang="en-CA"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Nexora AI"><meta property="og:locale" content="en_CA">
<meta property="og:url" content="${url}"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}">
<meta property="og:image" content="${SITE}/og-image.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${SITE}/og-image.jpg">
<meta name="theme-color" content="#09090D">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n")}
<style>${css}</style></head>
<body><header><a class="logo" href="/">Nexora AI</a><nav><a href="/#services">Services</a><a href="/#clients">Case studies</a><a href="/ontario/">Ontario</a><a href="/#pricing">Contact</a></nav></header>
<main><p class="crumbs"><a href="/">Home</a> / ${h1}</p>
${body}
${faqHtml}
</main>
<footer><p>Nexora AI is a digital marketing agency working remotely with businesses in Canada, the USA and the UK.</p>
<p>Ontario: ${cities.map((c) => `<a href="/${c.slug}/">${c.name}</a>`).join(" · ")} · <a href="/ontario/">All of Ontario</a></p></footer></body></html>`;
};

const cta = `<p><a class="cta" href="/#pricing">Get a free SEO audit</a><a class="cta alt" href="${WA}">Message us on WhatsApp</a></p>`;
const write = (slug, html) => {
  mkdirSync(join(root, slug), { recursive: true });
  writeFileSync(join(root, slug, "index.html"), html);
};

const nameOf = (slug) => cities.find((c) => c.slug === slug).name;

for (const c of cities) {
  const L = local[c.slug];
  const h1 = `${L.keyword}: Local SEO & Digital Marketing`;
  const body = `<h1>${h1}</h1>
<p>Nexora AI helps ${c.name} businesses get found on Google, Google Maps and AI search, turn visitors into enquiries, and see which marketing brings in customers.</p>${cta}
<h2>Why local SEO in ${c.name} needs its own strategy</h2><p>${c.angle}</p>
<h2>How people search for local businesses in ${c.name}</h2><ul>${L.searches
    .map((s) => `<li>${s}</li>`)
    .join("")}</ul>
<h2>How we approach a ${c.name} campaign</h2><p>${L.approach}</p>
<h2>Real work in ${c.name}</h2><div class="card"><p>${L.proof}</p><p><a href="/case-studies/bridge-legal/">Read the Bridge Legal case study</a></p></div>
<h2>What we do for ${c.name} businesses</h2><p>Google Business Profile optimization, landing pages for ${c.areas.slice(0, 3).join(", ")} and the other areas you serve, fast mobile-first websites, AI search visibility and lead tracking. <a href="/#services">See all services</a>.</p>
<h2>Neighbourhoods and areas</h2><p>We build local relevance around the parts of ${c.name} you want customers from, including ${c.areas.join(", ")}.</p>
<h2>Who we work with</h2><p>Typical clients in ${c.name} include ${c.industries}. See our <a href="/#clients">case studies</a>.</p>
<h2>Nearby areas</h2><p>We also work with businesses in ${L.nearby
    .map((s) => `<a href="/${s}/">${nameOf(s)}</a>`)
    .join(" and ")}, and across <a href="/ontario/">Ontario</a>.</p>
<div class="card"><strong>Honest expectations.</strong> We work remotely and do not guarantee a number-one ranking, because no agency can. We do the work that earns visibility and measure it against real enquiries.</div>${cta}`;
  write(
    c.slug,
    page({
      slug: c.slug,
      title: `${L.keyword} | Local SEO | Nexora AI`,
      h1,
      desc: `Local SEO, Google Business Profile and web design for ${c.name}, Ontario businesses. Get found on Google and AI search and track the leads. Free SEO audit.`,
      body,
      // One city-specific question plus the two generic ones that matter most
      // (timeline, office). More shared FAQs made the city pages read as
      // near-duplicates of each other.
      faq: [L.faq, ...faqFor(c).slice(0, 2)],
      areaName: c.name,
      areaType: "City",
    }),
  );
}

const ontarioBody = `<h1>SEO & Digital Marketing in Ontario</h1>
<p>Nexora AI is a digital marketing agency helping Ontario businesses get found on Google, Google Maps and AI search, and turn that visibility into calls, bookings and customers.</p>${cta}
<h2>Cities we focus on</h2><ul>${cities
  .map((c) => `<li><a href="/${c.slug}/"><strong>${c.name}</strong></a>: local SEO for ${c.areas.slice(0, 3).join(", ")} and more.</li>`)
  .join("")}</ul>
<h2>What we do</h2><p>Local SEO, Google Business Profile optimization, website design, AI search visibility and lead tracking, managed by one team. We work remotely and build each campaign around the cities and neighbourhoods where you want more customers.</p>
<h2>How local search works across the GTA</h2><p>Google decides who appears in the map results using three things: how relevant your business is to the search, how close you are to the searcher, and how prominent you are (reviews, links and mentions across the web). Distance is the one you cannot change, which is why a business in Etobicoke rarely tops the map for Scarborough. What you can change is relevance and prominence, and that is where the work goes.</p>
<p>For most Ontario businesses that means a complete Google Business Profile with the right primary category, consistent name, address and phone number on every directory, steady reviews from real customers, and a website with a dedicated page for each service and each area you genuinely serve. On top of that, AI search tools such as Google AI Overviews and ChatGPT increasingly answer local questions directly, and they draw on the same clear, well-structured information.</p>
<h2>What a first month usually looks like</h2><ol>
<li><strong>Audit</strong>: a technical and on-page check of every page, plus a look at your Business Profile and top local competitors.</li>
<li><strong>Fixes</strong>: speed, structured data, titles and headings, and anything blocking Google from understanding the site.</li>
<li><strong>Local foundation</strong>: Business Profile categories, services and photos, citation clean-up and a simple review request process.</li>
<li><strong>Tracking</strong>: calls, forms and chats connected to the searches that produced them, so you can judge results on enquiries rather than traffic.</li></ol>
<h2>Ontario client work</h2><p>Bridge Legal Services, a licensed paralegal firm with offices in Etobicoke, Mississauga and Brampton, is one of our Ontario clients. <a href="/case-studies/bridge-legal/">See what we changed and the measured results</a>.</p>${cta}`;
write(
  "ontario",
  page({
    slug: "ontario",
    title: "SEO Company in Ontario | Toronto & GTA | Nexora AI",
    h1: "SEO & Digital Marketing in Ontario",
    desc: "Local SEO, Google Business Profile and web design for businesses in Toronto, Etobicoke, Mississauga, Brampton and across Ontario. Free SEO audit.",
    body: ontarioBody,
    faq: [],
    areaName: "Ontario",
    areaType: "AdministrativeArea",
  }),
);

// ─── Case study: Bridge Legal Services ───────────────────────────────────────
// Numbers are Google PageSpeed Insights lab results for
// https://bridgelegalservices.ca/, run on 17 Nov 2026 before and after the
// deploy. Keep them exactly as measured; add ranking or lead figures only
// once they exist.
const caseRows = [
  ["Mobile performance score", "63", "87"],
  ["Mobile Largest Contentful Paint", "8.1 s", "1.7 s"],
  ["Desktop Largest Contentful Paint", "2.5 s", "0.4 s"],
  ["Accessibility score (mobile)", "87", "100"],
  ["SEO score", "100", "100"],
];
const caseBody = `<h1>Case Study: Bridge Legal Services, Etobicoke</h1>
<p>Bridge Legal Services is a licensed paralegal firm (Law Society of Ontario) that defends drivers against traffic tickets and Highway Traffic Act charges, with offices in <a href="/etobicoke/">Etobicoke</a>, <a href="/mississauga/">Mississauga</a> and <a href="/brampton/">Brampton</a>. Their site is <a href="https://bridgelegalservices.ca/" rel="noopener">bridgelegalservices.ca</a>.</p>
<h2>The problem</h2><p>The site already had strong content, but on a phone the main headline and introduction stayed invisible until the page's JavaScript finished loading. Google's mobile test measured 8.1 seconds before the main content appeared. The structured data also marked up the firm's own Google reviews as a site rating, which Google does not allow and never shows as stars.</p>
<h2>What we changed</h2><ul>
<li>Made the headline and introduction visible in the first HTML the server sends, instead of fading them in with JavaScript.</li>
<li>Rewrote the main heading to match what people search for: "Traffic Ticket Paralegal Toronto &amp; GTA".</li>
<li>Removed the self-serving review markup and linked the schema to the firm's real Google Business Profile.</li>
<li>Replaced a 297 KB logo with a 6 KB version, and fixed form labels, heading order and text contrast.</li>
<li>Checked all 69 pages against 47 on-page SEO checks and fixed every issue found.</li></ul>
<h2>Measured results</h2><p>Google PageSpeed Insights, homepage, before and after the update on 17 November 2026:</p>
<div class="card"><table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left">Metric</th><th>Before</th><th>After</th></tr></thead><tbody>${caseRows
  .map(([m, b, a]) => `<tr><td>${m}</td><td style="text-align:center">${b}</td><td style="text-align:center"><strong>${a}</strong></td></tr>`)
  .join("")}</tbody></table></div>
<p>Largest Contentful Paint is one of Google's Core Web Vitals; under 2.5 seconds counts as good. These are lab measurements from a single test run, and real-world numbers vary by device and connection.</p>
<h2>What comes next</h2><p>Faster pages and clean structured data are the foundation. Rankings and enquiries build over the following months through the Google Business Profile, reviews and local content, and we will add those results here once they are measured.</p>${cta}`;
write(
  "case-studies/bridge-legal",
  page({
    slug: "case-studies/bridge-legal",
    title: "Case Study: Bridge Legal Services | Nexora AI",
    h1: "Case Study: Bridge Legal Services, Etobicoke",
    desc: "How Nexora AI cut mobile load time from 8.1s to 1.7s and raised PageSpeed from 63 to 87 for Bridge Legal Services, a paralegal firm in Etobicoke, Ontario.",
    body: caseBody,
    faq: [],
    areaName: "Etobicoke",
    areaType: "City",
    article: true,
  }),
);

const urls = ["", "ontario/", ...cities.map((c) => `${c.slug}/`), "case-studies/bridge-legal/"];
writeFileSync(
  join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${SITE}/${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync(join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log("generated", urls.length, "pages");
