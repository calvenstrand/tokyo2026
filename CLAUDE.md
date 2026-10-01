# Tokyo26 — Trip Context

## The project
Website for a 15-night Japan trip, Oct 29 – Nov 15 2026.
Built with Svelte + Vite + TypeScript. Deployed as static files.
Live at riverbeach.se/tokyo26.
Itinerary data lives in src/data/itinerary.ts — that is the source of truth.
Dates and trip phase (before / live / after) come from src/data/trip.ts.

Trip structure:
- Departure · Oct 29 · ARN 09:35, lands Tokyo the morning of Oct 30
- Tokyo I (Shinjuku) · 4 nights · Oct 30 – Nov 3
- Kyoto · 3 nights · Nov 3 – 6
- Osaka · 3 nights · Nov 6 – 9
- Hiroshima · 1 night · Nov 9 – 10 (Miyajima the morning after)
- Tokyo II (Ueno) · 4 nights · Nov 10 – 14
- Fly home Sun Nov 15, 00:30 from Haneda
- Day 1 = Fri Oct 30 … Day 16 = Sat Nov 14 (departure day is Day 0)

## The group
4 guys. One (Chris) has been to Japan twice. 
Three first-timers. Food, beer, gaming, sports focused.
Not a temple tour.

## Tone
Confident, specific, like a recommendation from someone who knows Japan.
Not a travel guide. Beer and food energy throughout.
Assumes the group can navigate independently.

## Key decisions already made
- Ueno over Akihabara as Tokyo II base (better neighborhood,
  one stop away)
- Knives bought at Kappabashi (Tokyo II) — Sakai cut from Osaka
- Fukuoka and sumo dropped — Hiroshima + Miyajima instead
- Knife sharpening class and yakitori omakase in Kyoto dropped
- No USJ (too touristy, long queues)
- Osaka is 3 nights (derby on Nov 8); Kobe day trip dropped
- Nikko dropped
- Baseball booking removed — Japan Series fixtures didn't align

## Booking priorities
Nintendo Museum is confirmed and paid (Nov 5, 15:30–16:00).
Still to book: 3× Shinkansen via SmartEX (seats open one month ahead, 10:00 JST),
Osaka Derby tickets (on sale Oct 3), Shibuya Sky sunset slot, teamLab Biovortex.