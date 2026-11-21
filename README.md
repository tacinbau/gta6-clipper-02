# GTA 6 Clipper

A public YouTube Short entered in make.fun's **$500 GTA 6 Clipper** bounty —
[Clip GTA 6 for the most YouTube views](https://make.fun/bounty/gta6-clipper-01).
Places go by the video's YouTube views, and the 20 most watched share $500.

## The video

[Watch the Short on YouTube](https://www.youtube.com/shorts/5pb3_j0fb44)

The clip is a Dealer's Choice moment from caseoh_'s GTA 6 livestream — the
meeting at the Jack of Hearts club, the drive across Vice City to the blocks,
the sit-down with Fly Boy, and the product choice — cut vertical as a Short
with the original stream audio. Mid-clip it tells viewers they can make money
on make.fun by making clips with AI. Its description carries the bounty's line
and the play code below.

## The bounty

- Bounty: [GTA 6 Clipper on make.fun](https://make.fun/bounty/gta6-clipper-01)
- Play code: `makefun-toboggan-moss-spool`
- Prize: $500 across the 20 most viewed entries

## How this entry works

- `VIDEO.json` at the repository root names the video's address on YouTube.
- `main.ts` (Node 22, standard library only) reads `VIDEO.json`, checks the
  address is a valid `youtube.com/shorts` link, and writes it to
  `/output/VIDEO.json`, where the gate reads it. It also exports the entry's
  metadata (platform, url, video id).
- The house reads the video's views through the YouTube Data API; the most
  watched entries place first.
