// Builds responsive AVIF/WebP/JPG variants from the source photos into public/img.
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SOURCES = {
  salon: 'assets/DOLA-1.jpg',
  products: 'assets/DOLA-2.jpg',
  swatches: 'assets/DOLA-3.jpg',
  tim: 'assets/DOLA-4.jpg',
  shelf: 'assets/DOLA-5.jpg',
  sign: 'assets/DOLA-6.jpg',
  hair: 'assets/DOLA-7.jpg',
};
const WIDTHS = [480, 800, 1200, 1600];
const OUT = 'public/img';

await mkdir(OUT, { recursive: true });

for (const [name, src] of Object.entries(SOURCES)) {
  const meta = await sharp(src).metadata();
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (!widths.includes(meta.width) && widths.length < WIDTHS.length) widths.push(meta.width);
  for (const w of widths) {
    for (const [fmt, opts] of [['avif', { quality: 52 }], ['webp', { quality: 74 }], ['jpg', { quality: 78, mozjpeg: true }]]) {
      const file = path.join(OUT, `${name}-${w}.${fmt}`);
      try { await stat(file); continue; } catch {}
      const img = sharp(src).rotate().resize({ width: w });
      await (fmt === 'jpg' ? img.jpeg(opts) : img[fmt](opts)).toFile(file);
    }
  }
  console.log(name, meta.width + 'x' + meta.height, widths.join(','));
}

// Open Graph image: white logo on ink, 1200x630.
const og = path.join('public', 'og.png');
const logo = await sharp('salon-dola-logo/salon-dola-logo-wit.svg', { density: 300 }).resize({ width: 640 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#141414' } })
  .composite([{ input: logo, gravity: 'center' }])
  .png()
  .toFile(og);
