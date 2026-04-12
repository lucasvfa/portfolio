const fs = require('fs');
const path = require('path');

// OG data per project — cover images for social sharing previews
// For projects with .mp4 covers, use first available static image
const OG_DATA = {
  'gillette':        { name: 'Gillette', type: 'Art Direction · Social Media · Motion Design', desc: 'Art direction and digital content creation for Gillette\'s social media presence in Brazil.', img: 'assets/img/gillette_cover.png' },
  'gillette-venus':  { name: 'Gillette Venus', type: 'Art Direction · Social Media', desc: 'Visual development and social media art direction for Gillette Venus.', img: 'assets/img/gv_cover.png' },
  'ketel-one':       { name: 'Ketel One Botanical', type: 'Social Media · Art Direction', desc: 'Part of the creative team that launched Ketel One Botanical on digital media in Brazil.', img: 'assets/img/ketel_cover.png' },
  'downyariel':      { name: 'Downy & Ariel', type: 'Art Direction · Photography · Motion', desc: 'Art direction, photography and content creation for P&G\'s Downy and Ariel brands.', img: 'assets/img/da_cover.png' },
  'brett':           { name: 'BRETT', type: '2D Animation · Creative Concept · Illustration', desc: 'Creative concepts, 2D animation and illustration for $BRETT — including work that aired during the UEFA 2024 broadcast.', img: 'assets/img/brett_celeb_1.png' },
  'cosmopolitan':    { name: 'Cosmopolitan', type: 'Social Media · Art Direction · Motion Design', desc: 'Social media art direction and content creation for Cosmopolitan events.', img: 'assets/img/cosmo_cover.png' },
  'plano-b':         { name: 'Plano B', type: 'Branding · Visual Identity · Motion', desc: 'Complete branding and visual identity development for Plano B.', img: 'assets/img/planob_6.png' },
  'black-duck':      { name: 'Black Duck Crossfit', type: 'Branding · Visual Identity · Motion', desc: 'Bold branding and visual identity for Black Duck Crossfit.', img: 'assets/img/bdc_1.png' },
  'wolf':            { name: 'Wolf', type: 'Illustration · Branding', desc: 'Visual identity and illustration work for Wolf memecoin project.', img: 'assets/img/wolf-cover.jpg' },
  'qace':            { name: 'QACE Dynamics', type: 'Logo Design · Branding', desc: 'Logo design and brand identity development for QACE Dynamics.', img: 'assets/img/qace_cover.jpg' },
  'doodi':           { name: 'Doodi', type: '2D Animation · Illustration · Motion', desc: 'Character animation and motion design for Doodi.', img: 'assets/img/cover.jpg' },
  'candle':          { name: 'Candle', type: 'Motion Design · Social Content · Video', desc: 'Motion design and video content for Candle.', img: 'assets/img/cover.jpg' },
  'neiro':           { name: 'Neiro', type: '2D Animation · Illustration', desc: '2D animation and video production for $NEIRO memecoin.', img: 'assets/img/cover.jpg' },
  'mong':            { name: 'Mong', type: 'Animation · Illustration', desc: '2D animation and video production for $MONG memecoin.', img: 'assets/img/mong-4-half.jpg' },
  'veneza':          { name: 'Veneza', type: 'Branding · Visual Identity', desc: 'Brand identity and visual system for Veneza.', img: 'assets/img/veneza_cover.png' },
  'blockwise':       { name: 'Blockwise', type: 'Logo Design · Branding', desc: 'Branding design for a crypto project.', img: 'assets/img/blockwise_cover.png' },
  'bezzi':           { name: 'Gustavo Bezzi', type: 'Motion Design · Video', desc: 'Motion design and video content for Gustavo Bezzi.', img: 'assets/img/cover.jpg' },
  'bula':            { name: 'Bula', type: 'Branding', desc: 'Branding design for Bula, an agency focused on helping children with rare diseases.', img: 'assets/img/bula_cover.jpg' },
  'doshadeng':       { name: 'Dosha-Deng', type: 'Illustration', desc: 'Illustration using the model Dosha Deng as a reference.', img: 'assets/img/doshadeng_cover.jpg' },
  'insideofme':      { name: 'Inside of Me', type: 'Illustration · Animation', desc: 'Personal illustration and animation project.', img: 'assets/img/insideofme_cover.webp' },
  'masedo':          { name: 'Masedo Japanese Graffiti', type: 'Illustration · Design', desc: 'Japanese graffiti-inspired illustration and design for a japanese restaurant.', img: 'assets/img/masedo_cover.png' },
  'natur':           { name: 'Natur', type: 'Illustration', desc: 'Vector illustrations for Natur.', img: 'assets/img/natur_cover.jpg' },
  'pikachu':         { name: 'Pikachu Bodybuilder', type: 'Illustration', desc: 'Illustration of a bodybuilder Pikachu.', img: 'assets/img/pikachu_cover.jpg' },
  'retiredrobots':   { name: 'Retired Robots', type: 'Illustration', desc: 'Illustration celebrating Daft Punk legacy — retired in Caraíva, Brazil.', img: 'assets/img/retiredrobots_cover.jpg' },
  'astronaut-mural': { name: 'Studio Astronauta Mural', type: 'Illustration · Mural', desc: 'Astronaut mural illustration project.', img: 'assets/img/astronaut_cover.jpg' },
  'lil-chano':       { name: 'Lil Chano From 79th', type: 'Illustration', desc: 'Illustration tribute to Chance the Rapper.', img: 'assets/img/lilchano_cover.jpg' },
  'ui-ux-design':    { name: 'UI/UX Design', type: 'UI Design · Landing Pages · Web Concepts', desc: 'Collection of UI/UX design explorations — landing pages, bento grids and web interface concepts.', img: 'assets/img/uiux-thumb.png' }
};

// Escape HTML entities in OG content
function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = (req, res) => {
  const slug = req.query.slug || '';
  const project = OG_DATA[slug];

  // Read the static project.html
  let html;
  try {
    html = fs.readFileSync(path.join(process.cwd(), 'project.html'), 'utf8');
  } catch (e) {
    res.status(500).send('Internal Server Error');
    return;
  }

  if (project) {
    const BASE = 'https://www.lucasvfa.com.br';
    const ogTitle = esc(`${project.name} — ${project.type} | Lucas Vaz`);
    const ogDesc = esc(`${project.desc} Case study by Lucas Vaz — art director & graphic designer with 19+ years of experience.`);
    const ogImg = `${BASE}/api/og-image?slug=${slug}`;
    const ogUrl = `${BASE}/work/${slug}`;

    // Replace static OG tags with project-specific ones
    html = html
      .replace('<title>Project — Lucas Vaz</title>', `<title>${ogTitle}</title>`)
      .replace(
        'content="Portfolio project by Lucas Vaz — Art Director, Illustrator and Motion Designer."',
        `content="${ogDesc}"`
      )
      .replace(
        'content="Project — Lucas Vaz Portfolio"',
        `content="${ogTitle}"`
      )
      .replace(
        'content="Graphic Design, Illustration & Art Direction by Lucas Vaz"',
        `content="${ogDesc}"`
      )
      .replace(
        '<meta property="og:image" content="https://www.lucasvfa.com.br/assets/img/cover.jpg">',
        `<meta property="og:image" content="${ogImg}">`
      )
      .replace(
        '<link rel="canonical" href="https://www.lucasvfa.com.br/project.html">',
        `<link rel="canonical" href="${ogUrl}">`
      )
      .replace(
        'content="Lucas Vaz Portfolio"',
        `content="${ogTitle}"`
      )
      .replace(
        'content="Art direction, illustration and motion design portfolio."',
        `content="${ogDesc}"`
      )
      .replace(
        /<meta name="twitter:image" content="[^"]*">/,
        `<meta name="twitter:image" content="${ogImg}">`
      );
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.status(200).send(html);
};
