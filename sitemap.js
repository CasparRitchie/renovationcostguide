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
  "/",
  "/how-much-does-it-cost-to-renovate-a-house-uk"
];

const urls = [];

staticPages.forEach((page) => {
  urls.push(`
<url>
  <loc>https://www.renovationcostguide.co.uk${page}</loc>
</url>
`);
});

projects.forEach((project) => {
  urls.push(`
<url>
  <loc>https://www.renovationcostguide.co.uk/cost/${project}</loc>
</url>
`);

  cities.forEach((city) => {
    urls.push(`
<url>
  <loc>https://www.renovationcostguide.co.uk/cost/${project}/${city}</loc>
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
