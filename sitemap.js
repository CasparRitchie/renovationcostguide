const fs = require("fs")

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
]

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
]

let urls = []

urls.push(`
<url>
<loc>https://www.renovationcostguide.co.uk/</loc>
</url>
`)

projects.forEach(project => {
  cities.forEach(city => {
    urls.push(`
<url>
<loc>https://www.renovationcostguide.co.uk/cost/${project}/${city}</loc>
</url>
`)
  })
})

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`

fs.writeFileSync("frontend/public/sitemap.xml", sitemap)

console.log("Sitemap generated")
