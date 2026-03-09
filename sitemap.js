const fs = require("fs");

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
  "oxford"
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
  "rewiring-house"
];

const staticPages = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly"
  },
  {
    path: "/how-much-does-it-cost-to-renovate-a-house-uk",
    priority: "0.9",
    changefreq: "weekly"
  },
  {
    path: "/cost-per-m2-house-renovation-uk",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/how-much-does-a-loft-conversion-cost-uk",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/how-much-does-a-house-extension-cost-uk",
    priority: "0.8",
    changefreq: "weekly"
  }
];

const urls = [];

staticPages.forEach((page) => {
  urls.push(`
<url>
  <loc>https://www.renovationcostguide.co.uk${page.path}</loc>
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority}</priority>
</url>
`);
});

projects.forEach((project) => {
  urls.push(`
<url>
  <loc>https://www.renovationcostguide.co.uk/cost/${project}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
`);

  cities.forEach((city) => {
    urls.push(`
<url>
  <loc>https://www.renovationcostguide.co.uk/cost/${project}/${city}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.6</priority>
</url>
`);
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

fs.writeFileSync("frontend/public/sitemap.xml", sitemap);

console.log("Sitemap generated");
