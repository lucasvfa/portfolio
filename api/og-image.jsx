import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

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
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug') || '';
  const project = OG_DATA[slug];

  if (!project) {
    return new Response('Not found', { status: 404 });
  }

  const coverUrl = `${BASE}/${project.img}`;

  // Load Inter Medium font for text
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiA.woff2'
  ).then((res) => res.arrayBuffer());

  const fontBold = await fetch(
    'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiA.woff2'
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          backgroundColor: '#000000',
        }}
      >
        {/* Left panel — branding (1/3) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '400px',
            height: '630px',
            padding: '56px 40px',
            position: 'relative',
          }}
        >
          {/* Accent bar left edge */}
          <div
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '4px',
              height: '630px',
              backgroundColor: '#C42BAB',
            }}
          />

          {/* Logo */}
          <img
            src={`${BASE}/favicon.svg`}
            width="56"
            height="56"
            style={{ marginBottom: '32px' }}
          />

          {/* Name */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '8px',
              fontFamily: 'Inter Bold',
            }}
          >
            Lucas Vaz
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#888888',
              lineHeight: 1.4,
              marginBottom: '40px',
              fontFamily: 'Inter',
            }}
          >
            Art Director · Designer · Animator
          </div>

          {/* Divider */}
          <div
            style={{
              width: '40px',
              height: '2px',
              backgroundColor: '#C42BAB',
              marginBottom: '24px',
            }}
          />

          {/* Project name */}
          <div
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.3,
              marginBottom: '8px',
              fontFamily: 'Inter Bold',
            }}
          >
            {project.name}
          </div>

          {/* Project type */}
          <div
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#C42BAB',
              lineHeight: 1.5,
              fontFamily: 'Inter',
            }}
          >
            {project.type}
          </div>

          {/* URL at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '40px',
              fontSize: '12px',
              fontWeight: 500,
              color: '#555555',
              fontFamily: 'Inter',
            }}
          >
            lucasvfa.com.br
          </div>
        </div>

        {/* Right panel — project cover (2/3) */}
        <div
          style={{
            display: 'flex',
            width: '800px',
            height: '630px',
            overflow: 'hidden',
          }}
        >
          <img
            src={coverUrl}
            width="800"
            height="630"
            style={{
              objectFit: 'cover',
              width: '800px',
              height: '630px',
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: fontData, style: 'normal', weight: 500 },
        { name: 'Inter Bold', data: fontBold, style: 'normal', weight: 700 },
      ],
      headers: {
        'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=2592000',
      },
    }
  );
}
