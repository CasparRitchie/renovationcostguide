const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.renovationcostguide.co.uk";
const OUTPUT_DIR = path.join(__dirname, "frontend", "public");

const today = new Date().toISOString().split("T")[0];

const cities = [
  "london",
  "manchester",
  "birmingham",
  "leeds",
  "liverpool",
  "bristol",
  "nottingham",
  "sheffield",
  "newcastle",
  "oxford",
];

const priorityCities = [
  "london",
  "manchester",
  "birmingham",
  "bristol",
];

const projects = [
  "kitchen-renovation",
  "bathroom-renovation",
  "loft-conversion",
  "house-extension",
  "garage-conversion",
  "garden-room",
  "basement-conversion",
  "roof-replacement",
  "window-replacement",
  "rewiring-house",
];

const priorityProjects = [
  "kitchen-renovation",
  "bathroom-renovation",
  "loft-conversion",
  "house-extension",
  "garage-conversion",
  "garden-room",
];

const staticPages = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/how-much-does-it-cost-to-renovate-a-house-uk",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/cost-per-m2-house-renovation-uk",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/how-much-does-a-loft-conversion-cost-uk",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/how-much-does-a-house-extension-cost-uk",
    priority: "0.8",
    changefreq: "weekly",
  },
];

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildUrlEntry({ loc, lastmod = today, changefreq, priority }) {
  return [
    "<url>",
    `  <loc>${escapeXml(loc)}</loc>`,
    `  <lastmod>${lastmod}</lastmod>`,
    changefreq ? `  <changefreq>${changefreq}</changefreq>` : null,
    priority ? `  <priority>${priority}</priority>` : null,
    "</url>",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildUrlSet(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;
}

function buildSitemapIndex(sitemaps) {
  const entries = sitemaps
    .map(
      (filename) => `<sitemap>
  <loc>${BASE_URL}/${filename}</loc>
  <lastmod>${today}</lastmod>
</sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}

function writeFile(filename, content) {
  const fullPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(fullPath, content, "utf8");
  console.log(`Generated ${filename}`);
}

function buildStaticUrls() {
  return staticPages.map((page) =>
    buildUrlEntry({
      loc: `${BASE_URL}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority,
    })
  );
}

function buildProgrammaticUrls() {
  const urls = [];

  projects.forEach((project) => {
    urls.push(
      buildUrlEntry({
        loc: `${BASE_URL}/cost/${project}`,
        lastmod: today,
        changefreq: "weekly",
        priority: "0.8",
      })
    );

    cities.forEach((city) => {
      urls.push(
        buildUrlEntry({
          loc: `${BASE_URL}/cost/${project}/${city}`,
          lastmod: today,
          changefreq: "weekly",
          priority: "0.6",
        })
      );
    });
  });

  return urls;
}

function buildPriorityUrls() {
  const urls = [];

  // Core static pages
  urls.push(
    ...[
      "/",
      "/how-much-does-it-cost-to-renovate-a-house-uk",
      "/cost-per-m2-house-renovation-uk",
      "/how-much-does-a-loft-conversion-cost-uk",
      "/how-much-does-a-house-extension-cost-uk",
    ].map((pagePath, index) =>
      buildUrlEntry({
        loc: `${BASE_URL}${pagePath}`,
        lastmod: today,
        changefreq: "weekly",
        priority: index === 0 ? "1.0" : "0.9",
      })
    )
  );

  // Priority parent cost pages
  priorityProjects.forEach((project) => {
    urls.push(
      buildUrlEntry({
        loc: `${BASE_URL}/cost/${project}`,
        lastmod: today,
        changefreq: "weekly",
        priority: "0.9",
      })
    );
  });

  // Priority city pages
  priorityProjects.forEach((project) => {
    priorityCities.forEach((city) => {
      urls.push(
        buildUrlEntry({
          loc: `${BASE_URL}/cost/${project}/${city}`,
          lastmod: today,
          changefreq: "weekly",
          priority: "0.7",
        })
      );
    });
  });

  return urls;
}

function generateSitemaps() {
  ensureOutputDir();

  const staticUrls = buildStaticUrls();
  const priorityUrls = buildPriorityUrls();
  const programmaticUrls = buildProgrammaticUrls();

  writeFile("sitemap-static.xml", buildUrlSet(staticUrls));
  writeFile("sitemap-priority.xml", buildUrlSet(priorityUrls));
  writeFile("sitemap-programmatic.xml", buildUrlSet(programmaticUrls));

  writeFile(
    "sitemap.xml",
    buildSitemapIndex([
      "sitemap-static.xml",
      "sitemap-priority.xml",
      "sitemap-programmatic.xml",
    ])
  );

  console.log("All sitemaps generated successfully.");
}

generateSitemaps();
