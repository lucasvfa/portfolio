import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

function h(type, props, ...ch) {
  return { type, props: { ...props, children: ch.length <= 1 ? (ch[0] || undefined) : ch } };
}

const BASE = 'https://www.lucasvfa.com.br';

const OG_DATA = {
  'gillette':        { name: 'Gillette', type: 'Art Direction · Social Media · Motion Design', img: 'assets/img/gillette_cover.png' },
  'gillette-venus':  { name: 'Gillette Venus', type: 'Art Direction · Social Media', img: 'assets/img/gv_cover.png' },
  'ketel-one':       { name: 'Ketel One Botanical', type: 'Social Media · Art Direction', img: 'assets/img/ketel_cover.png' },
  'downyariel':      { name: 'Downy & Ariel', type: 'Art Direction · Photography · Motion', img: 'assets/img/da_cover.png' },
  'brett':           { name: 'BRETT', type: '2D Animation · Illustration · Creative Concept', img: 'assets/img/brett_celeb_1.png' },
  'cosmopolitan':    { name: 'Cosmopolitan', type: 'Social Media · Art Direction · Motion Design', img: 'assets/img/cosmo_cover.png' },
  'plano-b':         { name: 'Plano B', type: 'Branding · Visual Identity · Motion', img: 'assets/img/planob_6.png' },
  'black-duck':      { name: 'Black Duck Crossfit', type: 'Branding · Visual Identity · Motion', img: 'assets/img/bdc_1.png' },
  'wolf':            { name: 'Wolf', type: 'Illustration · Branding', img: 'assets/img/wolf-cover.jpg' },
  'qace':            { name: 'QACE Dynamics', type: 'Logo Design · Branding', img: 'assets/img/qace_cover.jpg' },
  'doodi':           { name: 'Doodi', type: '2D Animation · Illustration · Motion', img: 'assets/img/cover.jpg' },
  'candle':          { name: 'Candle', type: 'Motion Design · Social Content · Video', img: 'assets/img/cover.jpg' },
  'neiro':           { name: 'Neiro', type: '2D Animation · Illustration', img: 'assets/img/cover.jpg' },
  'mong':            { name: 'Mong', type: 'Animation · Illustration', img: 'assets/img/mong-4-half.jpg' },
  'veneza':          { name: 'Veneza', type: 'Branding · Visual Identity', img: 'assets/img/veneza_cover.png' },
  'blockwise':       { name: 'Blockwise', type: 'Logo Design · Branding', img: 'assets/img/blockwise_cover.png' },
  'bezzi':           { name: 'Gustavo Bezzi', type: 'Motion Design · Video', img: 'assets/img/cover.jpg' },
  'bula':            { name: 'Bula', type: 'Branding', img: 'assets/img/bula_cover.jpg' },
  'doshadeng':       { name: 'Dosha-Deng', type: 'Illustration', img: 'assets/img/doshadeng_cover.jpg' },
  'insideofme':      { name: 'Inside of Me', type: 'Illustration · Animation', img: 'assets/img/insideofme_cover.webp' },
  'masedo':          { name: 'Masedo', type: 'Illustration · Design', img: 'assets/img/masedo_cover.png' },
  'natur':           { name: 'Natur', type: 'Illustration', img: 'assets/img/natur_cover.jpg' },
  'pikachu':         { name: 'Pikachu Bodybuilder', type: 'Illustration', img: 'assets/img/pikachu_cover.jpg' },
  'retiredrobots':   { name: 'Retired Robots', type: 'Illustration', img: 'assets/img/retiredrobots_cover.jpg' },
  'astronaut-mural': { name: 'Studio Astronauta Mural', type: 'Illustration · Mural', img: 'assets/img/astronaut_cover.jpg' },
  'lil-chano':       { name: 'Lil Chano From 79th', type: 'Illustration', img: 'assets/img/lilchano_cover.jpg' },
  'ui-ux-design':    { name: 'UI/UX Design', type: 'UI Design · Landing Pages · Web Concepts', img: 'assets/img/uiux-thumb.png' },
};

export default async function handler(req) {
  try {
    var url = new URL(req.url);
    var slug = url.searchParams.get('slug') || '';
    var project = OG_DATA[slug];

    if (url.searchParams.get('debug') === '1') {
      return new Response(JSON.stringify({ slug: slug, found: !!project, project: project }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    if (!project) {
      return new Response('Not found', { status: 404 });
    }

    var coverUrl = BASE + '/' + project.img;

    // Test mode: text-only (no external images)
    var testMode = url.searchParams.get('test') === '1';

    // Build element tree
    var rightPanel;
    if (testMode) {
      rightPanel = h('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '800px', height: '630px', backgroundColor: '#111111' }
      }, h('div', { style: { color: '#333', fontSize: '20px' } }, coverUrl));
    } else {
      rightPanel = h('img', {
        src: coverUrl,
        style: { width: '800px', height: '630px', objectFit: 'cover' },
      });
    }

    var element = h('div', {
      style: { display: 'flex', width: '1200px', height: '630px', backgroundColor: '#000000' },
    },
      // Left panel
      h('div', {
        style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '400px', height: '630px', padding: '56px 40px', borderLeft: '4px solid #C42BAB' },
      },
        h('div', { style: { fontSize: '28px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' } }, 'Lucas Vaz'),
        h('div', { style: { fontSize: '13px', color: '#888888', marginBottom: '36px' } }, 'Art Director · Designer · Animator'),
        h('div', { style: { display: 'flex', width: '40px', height: '2px', backgroundColor: '#C42BAB', marginBottom: '20px' } }),
        h('div', { style: { fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' } }, project.name),
        h('div', { style: { fontSize: '12px', color: '#C42BAB' } }, project.type),
        h('div', { style: { fontSize: '11px', color: '#444', marginTop: 'auto' } }, 'lucasvfa.com.br')
      ),
      // Right panel
      rightPanel
    );

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
    });
  } catch (e) {
    return new Response('Error: ' + e.message + '\n' + e.stack, { status: 500, headers: { 'content-type': 'text/plain' } });
  }
}
