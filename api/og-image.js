import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

function h(type, props, ...ch) {
  return { type, props: { ...props, children: ch.length <= 1 ? (ch[0] || undefined) : ch } };
}

const BASE = 'https://www.lucasvfa.com.br';

const OG_DATA = {
  'gillette':        { img: 'assets/img/gillette_cover.png' },
  'gillette-venus':  { img: 'assets/img/gv_cover.png' },
  'ketel-one':       { img: 'assets/img/ketel_cover.png' },
  'downyariel':      { img: 'assets/img/da_cover.png' },
  'brett':           { img: 'assets/img/brett_celeb_1.png' },
  'cosmopolitan':    { img: 'assets/img/cosmo_cover.png' },
  'plano-b':         { img: 'assets/img/planob_6.png' },
  'black-duck':      { img: 'assets/img/bdc_1.png' },
  'wolf':            { img: 'assets/img/wolf-cover.jpg' },
  'qace':            { img: 'assets/img/qace_cover.jpg' },
  'doodi':           { img: 'assets/img/cover.jpg' },
  'candle':          { img: 'assets/img/cover.jpg' },
  'neiro':           { img: 'assets/img/cover.jpg' },
  'mong':            { img: 'assets/img/mong-4-half.jpg' },
  'veneza':          { img: 'assets/img/veneza_cover.png' },
  'blockwise':       { img: 'assets/img/blockwise_cover.png' },
  'bezzi':           { img: 'assets/img/cover.jpg' },
  'bula':            { img: 'assets/img/bula_cover.jpg' },
  'doshadeng':       { img: 'assets/img/doshadeng_cover.jpg' },
  'insideofme':      { img: 'assets/img/insideofme_cover.webp' },
  'masedo':          { img: 'assets/img/masedo_cover.png' },
  'natur':           { img: 'assets/img/natur_cover.jpg' },
  'pikachu':         { img: 'assets/img/pikachu_cover.jpg' },
  'retiredrobots':   { img: 'assets/img/retiredrobots_cover.jpg' },
  'astronaut-mural': { img: 'assets/img/astronaut_cover.jpg' },
  'lil-chano':       { img: 'assets/img/lilchano_cover.jpg' },
  'ui-ux-design':    { img: 'assets/img/uiux-thumb.png' },
};

export default async function handler(req) {
  try {
    var url = new URL(req.url);
    var slug = url.searchParams.get('slug') || '';
    var project = OG_DATA[slug];

    if (!project) {
      return new Response('Not found', { status: 404 });
    }

    // Left 1/3: static brand image from Figma export
    // Right 2/3: project cover
    var leftImg = BASE + '/assets/img/og-left.png';
    var rightImg = BASE + '/' + project.img;

    var element = h('div', {
      style: { display: 'flex', width: '1200px', height: '630px', backgroundColor: '#000000' },
    },
      // Left panel — brand identity (1/3)
      h('img', {
        src: leftImg,
        style: { width: '400px', height: '630px', objectFit: 'cover' },
      }),
      // Right panel — project cover (2/3)
      h('img', {
        src: rightImg,
        style: { width: '800px', height: '630px', objectFit: 'cover' },
      })
    );

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
    });
  } catch (e) {
    return new Response('Error: ' + e.message + '\n' + e.stack, { status: 500, headers: { 'content-type': 'text/plain' } });
  }
}
