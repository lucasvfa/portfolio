import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// Hyperscript — creates virtual DOM for Satori
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

// Lucas Vaz logo mark — clean SVG without CSS variables, as data URI
var LOGO_SVG = 'data:image/svg+xml,' + encodeURIComponent('<svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M65.99 45.35V57.95c-1.12 1.54-2.36 3-3.7 4.34a30.4 30.4 0 01-5.91 4.77l-.43.27H18.2a33.1 33.1 0 01-7.65-6.14C21.3 38.67 35.35 24.59 37.82 1.43a33.2 33.2 0 0120.7 7.15C45.27 29.76 10.52 48.71 16.41 62.69c.4.97 1.08 1.76 1.93 2.32.84.55 1.84.86 2.89.86 2.12 0 4.03-1.27 4.84-3.23l7.18-17.29h32.76z" fill="white"/><path d="M37.08 0c.24 0 .5 0 .77.01C45.92.18 53.36 2.92 59.38 7.45l.52.4c1.2.93 2.33 1.94 3.4 3.01C70.01 17.57 74.17 26.84 74.17 37.08v1.43h-.03a33.3 33.3 0 01-7.02 20.28 33.5 33.5 0 01-10.01 10.47 33.2 33.2 0 01-20.07 4.9c-7.2 0-13.66-1.98-19.28-5.4l-.18-.11-.16-.11a33.5 33.5 0 01-7.94-6.67C3.6 55.32 0 46.62 0 37.08 0 26.84 4.15 17.57 10.86 10.86 17.57 4.15 26.84 0 37.08 0zm-34.22 37.08c0 8.8 3.32 16.83 8.78 22.9a30.5 30.5 0 007.32 6.14l.17.1.17.11a30.4 30.4 0 0017.79 5.08c6.66 0 12.87-1.9 18.12-5.18l.01-.003.4-.25a30.5 30.5 0 006.08-4.62 30.5 30.5 0 003.55-4.17l.38-.53a30.4 30.4 0 004.65-19.5 30.4 30.4 0 00-10.02-24.2c-.99-.97-2.04-1.9-3.15-2.76l-.48-.37A30.4 30.4 0 0037.79 2.87h-.03A37 37 0 0037.08 2.86C27.63 2.86 19.07 6.69 12.88 12.88 6.69 19.08 2.86 27.63 2.86 37.08z" fill="white"/><path d="M51.52 22.22l-8.96 26.5h-.004v8.11h9.6l12.87-34.61h-13.51z" fill="black"/><path d="M20.68 22.22H9.14v11.54h11.54V22.22z" fill="black"/><path d="M32.21 33.75H20.67v11.54h11.54V33.75z" fill="black"/><path d="M43.75 45.29H32.21v11.54h11.54V45.29z" fill="black"/><path d="M56.39 67.07a30.3 30.3 0 01-19.3 5.67 30.3 30.3 0 01-18.53-5.19v-.48h37.84z" fill="white"/></svg>');

export default async function handler(req) {
  try {
    var url = new URL(req.url);
    var slug = url.searchParams.get('slug') || '';
    var project = OG_DATA[slug];

    // Debug mode
    if (url.searchParams.get('debug') === '1') {
      return new Response(JSON.stringify({ slug: slug, found: !!project, project: project }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    if (!project) {
      return new Response('Not found', { status: 404 });
    }

    var coverUrl = BASE + '/' + project.img;

    // Load Inter font (single weight to reduce fetch time)
    var fontData = await fetch(
      'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiA.woff2'
    ).then(function(r) { return r.arrayBuffer(); });

    // Layout: 1/3 branding | 2/3 project cover
    var element = h('div', {
      style: {
        display: 'flex',
        width: '1200px',
        height: '630px',
        backgroundColor: '#000000',
      },
    },
      // Left panel — branding
      h('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '400px',
          height: '630px',
          padding: '56px 40px',
          borderLeft: '4px solid #C42BAB',
        },
      },
        // Logo
        h('img', {
          src: LOGO_SVG,
          width: '52',
          height: '52',
          style: { marginBottom: '28px' },
        }),
        // Name
        h('div', {
          style: {
            fontSize: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '6px',
            fontFamily: 'Inter',
          },
        }, 'Lucas Vaz'),
        // Role
        h('div', {
          style: {
            fontSize: '13px',
            color: '#888888',
            marginBottom: '40px',
            fontFamily: 'Inter',
          },
        }, 'Art Director · Designer · Animator'),
        // Magenta divider
        h('div', {
          style: {
            display: 'flex',
            width: '40px',
            height: '2px',
            backgroundColor: '#C42BAB',
            marginBottom: '20px',
          },
        }),
        // Project name
        h('div', {
          style: {
            fontSize: '22px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '6px',
            fontFamily: 'Inter',
          },
        }, project.name),
        // Project type
        h('div', {
          style: {
            fontSize: '12px',
            color: '#C42BAB',
            fontFamily: 'Inter',
          },
        }, project.type)
      ),
      // Right panel — cover
      h('img', {
        src: coverUrl,
        width: '800',
        height: '630',
        style: {
          objectFit: 'cover',
        },
      })
    );

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: fontData, style: 'normal', weight: 700 },
      ],
    });
  } catch (e) {
    return new Response('Error generating image: ' + e.message, { status: 500 });
  }
}
