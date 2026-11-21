// GTA 6 Clipper entry program — Node 22, standard library only.
//
// The entry is the video itself, not this program. All this program does is
// hand the house the video's address: it reads VIDEO.json out of the
// repository and writes it into the output directory, where the gate picks
// it up and scores the video by its YouTube views.
//
// Outside the grader's container, /bot and /output are stood in for with
// environment variables:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

interface VideoLink {
  url: string;
  videoId: string;
}

// A YouTube Shorts address: https://www.youtube.com/shorts/<11-character id>.
// www. or m. before youtube.com read too, and a query or fragment after the id
// is read past, the way the gate reads one.
const SHORTS_URL = /^https:\/\/(?:www\.|m\.)?youtube\.com\/shorts\/([A-Za-z0-9_-]{11})(?:[?#].*)?$/;

function readVideoLink(): VideoLink {
  const text = readFileSync(join(BOT_DIR, 'VIDEO.json'), 'utf8');
  const parsed = JSON.parse(text) as { url?: unknown };
  if (typeof parsed.url !== 'string') {
    throw new Error('VIDEO.json holds no url string');
  }
  const match = SHORTS_URL.exec(parsed.url);
  if (match === null) {
    throw new Error(`VIDEO.json does not hold a valid youtube.com/shorts address: ${parsed.url}`);
  }
  return { url: parsed.url, videoId: match[1] };
}

// The entry's metadata, for anything that imports this module: the platform
// the video lives on, its address, and the id the house ranks by. It is set
// when the program runs, so a bad VIDEO.json still fails in main's handler.
export const entry: { platform: string; url: string | null; videoId: string | null } = {
  platform: 'youtube',
  url: null,
  videoId: null,
};

function main(): void {
  const link = readVideoLink();
  entry.url = link.url;
  entry.videoId = link.videoId;
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, 'VIDEO.json'), `${JSON.stringify({ url: link.url })}\n`, 'utf8');
  console.log(`Video entered: ${link.url} (id ${link.videoId})`);
}

try {
  main();
} catch (error) {
  console.error(`Failed to hand VIDEO.json to ${OUTPUT_DIR}: ${(error as Error).message}`);
  process.exit(1);
}
