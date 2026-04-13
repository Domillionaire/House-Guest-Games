import React, { useEffect, useState } from "react";

const formats = [
  { id: 1, label: "1 Round", note: "Quick hit" },
  { id: 3, label: "3 Rounds", note: "Main event" },
  { id: 5, label: "5 Rounds", note: "Tour mode" },
];

const BOARD_TILE_COUNT = 16;

const roundedDisplay = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 700,
  letterSpacing: "-0.02em",
};

const cleanSans = {
  fontFamily: '"Inter", system-ui, sans-serif',
};

const showDisplay = {
  fontFamily: '"Inter", system-ui, sans-serif',
  fontWeight: 800,
  letterSpacing: "0.08em",
};

function assetPath(filename) {
  const baseUrl =
    typeof import.meta !== "undefined" && import.meta?.env?.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";

  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}images/houseguest/${encodeURIComponent(filename)}`;
}

const houseGuestAssets = {
  heroVideo: assetPath("House Guest intro vid.mp4"),
  arrivalFallback: assetPath("scott front door.png"),
  tvRoom: assetPath("Screenshot 2026-04-11 194025.png"),
  pool: assetPath("Pool Shot.png"),
  greenery: assetPath("Greenery Shot.png"),
  guestDoor: assetPath("scott.png"),
  guestRaincoat: assetPath("scott raincoat.webp"),
  guestGrill: assetPath("scottearlgrill.webp"),
};

const guestMoments = [
  {
    src: houseGuestAssets.guestDoor,
    title: "Pulling up",
    note: "The knock at the door, the welcome, and the start of the whole vibe.",
  },
  {
    src: houseGuestAssets.guestRaincoat,
    title: "Come through",
    note: "Style, presence, and the kind of guest who changes the room the second they walk in.",
  },
  {
    src: houseGuestAssets.guestGrill,
    title: "Good company",
    note: "Food, laughs, games, and the next neighbor waiting to pull up.",
  },
];

const slides = [
  {
    kind: "scene",
    graphic: "hotcomb",
    title: "hot comb",
    subtitle: "name that object",
    bg: "linear-gradient(135deg, #F7E17D 0%, #E9C84E 45%, #D9A63A 100%)",
    blob: "#FFF4CF",
  },
  {
    kind: "scene",
    emoji: "🦜",
    title: "bird talk",
    subtitle: "what are you seeing",
    bg: "linear-gradient(135deg, #9AD34B 0%, #6FA432 45%, #4A7C1B 100%)",
    blob: "#F8F1C8",
  },
  {
    kind: "scene",
    emoji: "🐸",
    title: "green room",
    subtitle: "guess it fast",
    bg: "linear-gradient(135deg, #F6E46D 0%, #D9C954 45%, #9BB541 100%)",
    blob: "#FFF9DD",
  },
  { kind: "title" },
];

const heroSlides = [0, 1, 2];

const gameLibrary = [
  {
    id: "five-to-flip",
    title: "Five to Flip",
    eyebrow: "guessing game",
    blurb: "Five questions. One celeb. A hidden image waiting on the screen.",
    accent: "from-[#dcc25f] via-[#d8b650] to-[#b98a34]",
    status: "playable prototype",
  },
  {
    id: "table-talk",
    title: "Table Talk",
    eyebrow: "party deck",
    blurb: "A hosted prompt game built for laughter, shade, and quick choices.",
    accent: "from-[#7c9250] via-[#5f7441] to-[#39482d]",
    status: "coming soon",
  },
  {
    id: "spot-the-vibe",
    title: "Spot the Vibe",
    eyebrow: "image game",
    blurb: "Read the room, call the object, and trust what you know on sight.",
    accent: "from-[#a66a47] via-[#8b573c] to-[#5c3928]",
    status: "coming soon",
  },
];

const celebrityDeck = [
  { name: "Taylor Swift", bucket: "music", tags: ["singer", "pop"], era: "current" },
  { name: "Beyoncé", bucket: "music", tags: ["singer", "performer", "pop-rnb"], era: "modern" },
  { name: "Rihanna", bucket: "music", tags: ["singer", "performer", "pop-rnb"], era: "modern" },
  { name: "Michael Jackson", bucket: "music", tags: ["singer", "performer", "pop"], era: "legacy" },
  { name: "Whitney Houston", bucket: "music", tags: ["singer", "rnb", "pop"], era: "legacy" },
  { name: "Chaka Khan", bucket: "music", tags: ["singer", "soul", "funk"], era: "legacy" },
  { name: "Sabrina Carpenter", bucket: "music", tags: ["singer", "pop", "actor"], era: "current" },
  { name: "Miley Cyrus", bucket: "music", tags: ["singer", "pop", "actor"], era: "modern" },
  { name: "Mariah Carey", bucket: "music", tags: ["singer", "pop", "rnb"], era: "modern" },
  { name: "Madonna", bucket: "music", tags: ["singer", "performer", "pop"], era: "legacy" },
  { name: "Prince", bucket: "music", tags: ["singer", "performer", "funk"], era: "legacy" },
  { name: "Usher", bucket: "music", tags: ["singer", "performer", "rnb"], era: "modern" },
  { name: "Chris Brown", bucket: "music", tags: ["singer", "performer", "rnb"], era: "modern" },
  { name: "Drake", bucket: "music", tags: ["rapper", "singer", "hip-hop"], era: "modern" },
  { name: "Jay-Z", bucket: "music", tags: ["rapper", "hip-hop", "business"], era: "modern" },
  { name: "Nicki Minaj", bucket: "music", tags: ["rapper", "performer", "hip-hop"], era: "modern" },
  { name: "Cardi B", bucket: "music", tags: ["rapper", "reality-tv", "hip-hop"], era: "current" },
  { name: "Kendrick Lamar", bucket: "music", tags: ["rapper", "hip-hop", "performer"], era: "current" },
  { name: "Snoop Dogg", bucket: "music", tags: ["rapper", "tv-personality", "hip-hop"], era: "modern" },
  { name: "Alicia Keys", bucket: "music", tags: ["singer", "piano", "rnb"], era: "modern" },
  { name: "Bruno Mars", bucket: "music", tags: ["singer", "performer", "pop"], era: "modern" },
  { name: "Billie Eilish", bucket: "music", tags: ["singer", "pop", "alt"], era: "current" },
  { name: "Justin Bieber", bucket: "music", tags: ["singer", "pop"], era: "modern" },
  { name: "Adele", bucket: "music", tags: ["singer", "pop", "soul"], era: "modern" },
  { name: "Britney Spears", bucket: "music", tags: ["singer", "performer", "pop"], era: "modern" },
  { name: "Denzel Washington", bucket: "screen", tags: ["actor", "film"], era: "modern" },
  { name: "Will Smith", bucket: "screen", tags: ["actor", "film", "tv"], era: "modern" },
  { name: "Halle Berry", bucket: "screen", tags: ["actor", "film"], era: "modern" },
  { name: "Angela Bassett", bucket: "screen", tags: ["actor", "film", "tv"], era: "modern" },
  { name: "Viola Davis", bucket: "screen", tags: ["actor", "film", "tv"], era: "modern" },
  { name: "Taraji P. Henson", bucket: "screen", tags: ["actor", "film", "tv"], era: "modern" },
  { name: "Morgan Freeman", bucket: "screen", tags: ["actor", "film"], era: "legacy" },
  { name: "Samuel L. Jackson", bucket: "screen", tags: ["actor", "film"], era: "modern" },
  { name: "Eddie Murphy", bucket: "screen", tags: ["actor", "comedian", "film"], era: "legacy" },
  { name: "Tom Hanks", bucket: "screen", tags: ["actor", "film"], era: "modern" },
  { name: "Leonardo DiCaprio", bucket: "screen", tags: ["actor", "film"], era: "modern" },
  { name: "Brad Pitt", bucket: "screen", tags: ["actor", "film"], era: "modern" },
  { name: "Julia Roberts", bucket: "screen", tags: ["actor", "film"], era: "modern" },
  { name: "Meryl Streep", bucket: "screen", tags: ["actor", "film"], era: "legacy" },
  { name: "Jennifer Aniston", bucket: "screen", tags: ["actor", "tv", "film"], era: "modern" },
  { name: "Keanu Reeves", bucket: "screen", tags: ["actor", "film"], era: "modern" },
  { name: "Zendaya", bucket: "screen", tags: ["actor", "tv", "film"], era: "current" },
  { name: "Keke Palmer", bucket: "screen", tags: ["actor", "tv", "host"], era: "current" },
  { name: "Jamie Foxx", bucket: "screen", tags: ["actor", "comedian", "music"], era: "modern" },
  { name: "Kevin Hart", bucket: "screen", tags: ["comedian", "actor", "film"], era: "modern" },
  { name: "Oprah Winfrey", bucket: "screen", tags: ["host", "tv", "media"], era: "legacy" },
  { name: "Steve Harvey", bucket: "screen", tags: ["host", "comedian", "tv"], era: "modern" },
  { name: "Tyler Perry", bucket: "screen", tags: ["filmmaker", "actor", "producer"], era: "modern" },
  { name: "Whoopi Goldberg", bucket: "screen", tags: ["actor", "host", "comedian"], era: "legacy" },
  { name: "Michael Jordan", bucket: "sports", tags: ["athlete", "basketball"], era: "legacy" },
  { name: "LeBron James", bucket: "sports", tags: ["athlete", "basketball"], era: "current" },
  { name: "Kobe Bryant", bucket: "sports", tags: ["athlete", "basketball"], era: "modern" },
  { name: "Shaquille O'Neal", bucket: "sports", tags: ["athlete", "basketball", "tv-personality"], era: "modern" },
  { name: "Serena Williams", bucket: "sports", tags: ["athlete", "tennis"], era: "modern" },
  { name: "Venus Williams", bucket: "sports", tags: ["athlete", "tennis"], era: "modern" },
  { name: "Tiger Woods", bucket: "sports", tags: ["athlete", "golf"], era: "modern" },
  { name: "Muhammad Ali", bucket: "sports", tags: ["athlete", "boxing"], era: "legacy" },
  { name: "Mike Tyson", bucket: "sports", tags: ["athlete", "boxing"], era: "legacy" },
  { name: "Simone Biles", bucket: "sports", tags: ["athlete", "gymnastics"], era: "current" },
  { name: "Stephen Curry", bucket: "sports", tags: ["athlete", "basketball"], era: "current" },
  { name: "Travis Kelce", bucket: "sports", tags: ["athlete", "football"], era: "current" },
  { name: "Kim Kardashian", bucket: "reality_style", tags: ["reality-tv", "fashion", "business"], era: "modern" },
  { name: "Kylie Jenner", bucket: "reality_style", tags: ["reality-tv", "fashion", "business"], era: "current" },
  { name: "Tyra Banks", bucket: "reality_style", tags: ["model", "host", "tv"], era: "modern" },
  { name: "RuPaul", bucket: "reality_style", tags: ["host", "reality-tv", "performer"], era: "modern" },
  { name: "Paris Hilton", bucket: "reality_style", tags: ["reality-tv", "socialite", "business"], era: "modern" },
  { name: "Gordon Ramsay", bucket: "reality_style", tags: ["chef", "host", "tv"], era: "modern" },
  { name: "Judge Judy", bucket: "reality_style", tags: ["judge", "tv"], era: "legacy" },
  { name: "Martha Stewart", bucket: "reality_style", tags: ["host", "lifestyle", "business"], era: "legacy" },
  { name: "Tiffany Pollard", bucket: "reality_style", tags: ["reality-tv", "tv-personality"], era: "modern" },
  { name: "Nene Leakes", bucket: "reality_style", tags: ["reality-tv", "tv-personality"], era: "modern" },
  { name: "Flavor Flav", bucket: "reality_style", tags: ["reality-tv", "rapper", "tv-personality"], era: "modern" },
  { name: "Wendy Williams", bucket: "reality_style", tags: ["host", "tv", "radio"], era: "modern" },
  { name: "Ryan Seacrest", bucket: "reality_style", tags: ["host", "tv", "radio"], era: "modern" },
  { name: "Elvis Presley", bucket: "icons_comedy", tags: ["singer", "performer", "icon"], era: "legacy" },
  { name: "Marilyn Monroe", bucket: "icons_comedy", tags: ["actor", "icon", "film"], era: "legacy" },
  { name: "Tupac Shakur", bucket: "icons_comedy", tags: ["rapper", "actor", "hip-hop"], era: "legacy" },
  { name: "The Notorious B.I.G.", bucket: "icons_comedy", tags: ["rapper", "hip-hop", "icon"], era: "legacy" },
  { name: "Janet Jackson", bucket: "icons_comedy", tags: ["singer", "performer", "pop-rnb"], era: "modern" },
  { name: "Ice Cube", bucket: "icons_comedy", tags: ["rapper", "actor", "film"], era: "modern" },
  { name: "50 Cent", bucket: "icons_comedy", tags: ["rapper", "tv", "business"], era: "modern" },
  { name: "Chris Rock", bucket: "icons_comedy", tags: ["comedian", "actor", "film"], era: "modern" },
  { name: "Dave Chappelle", bucket: "icons_comedy", tags: ["comedian", "tv", "film"], era: "modern" },
  { name: "Dwayne \"The Rock\" Johnson", bucket: "icons_comedy", tags: ["actor", "wrestling", "film"], era: "current" },
  { name: "John Cena", bucket: "icons_comedy", tags: ["wrestling", "actor", "tv"], era: "current" },
  { name: "Queen Latifah", bucket: "icons_comedy", tags: ["rapper", "actor", "host"], era: "modern" },
  { name: "Steve Irwin", bucket: "icons_comedy", tags: ["tv", "animals", "host"], era: "legacy" },
  { name: "Dolly Parton", bucket: "icons_comedy", tags: ["singer", "country", "icon"], era: "legacy" },
];

function drawRandomCeleb(excludeName = null) {
  const pool = excludeName ? celebrityDeck.filter((celeb) => celeb.name !== excludeName) : celebrityDeck;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildSporadicHeroMoments(total) {
  const counts = [1, 2, 1];
  const used = new Set();

  return counts.map((count, index) => {
    const tiles = [];
    while (tiles.length < count) {
      const candidate = Math.floor(Math.random() * total);
      if (!used.has(candidate)) {
        used.add(candidate);
        tiles.push(candidate);
      }
    }
    return { slide: heroSlides[index % heroSlides.length], tiles };
  });
}

function SlideGraphic({ slide, hero = false, tile = false }) {
  if (slide.graphic === "hotcomb") {
    const size = tile ? "h-14 w-14 sm:h-16 sm:w-16" : hero ? "h-40 w-40 sm:h-48 sm:w-48" : "h-32 w-32 sm:h-40 sm:w-40";
    return (
      <div className={`relative ${size}`}>
        <div className="absolute left-[18%] top-[10%] h-[78%] w-[16%] rounded-full border-2 border-[#2D2442] bg-[#2D2442]" />
        <div className="absolute left-[34%] top-[18%] h-[10%] w-[42%] rounded-full border-2 border-[#2D2442] bg-[#2D2442]" />
        <div className="absolute left-[36%] top-[30%] h-[48%] w-[36%] rounded-t-xl border-2 border-[#2D2442] bg-[#2D2442]" />
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute bottom-[8%] w-[3.5%] rounded-b-full bg-[#2D2442]"
            style={{ left: `${38 + i * 4.2}%`, height: `${24 + (i % 2 === 0 ? 2 : 0)}%` }}
          />
        ))}
      </div>
    );
  }

  const size = hero ? "text-7xl sm:text-8xl md:text-9xl" : tile ? "text-3xl sm:text-4xl" : "text-6xl sm:text-7xl md:text-8xl";
  return <div className={`${size} drop-shadow-[0_4px_0_rgba(45,36,66,0.18)]`}>{slide.emoji}</div>;
}

function SceneArt({ slide, hero = false }) {
  if (slide.kind === "title") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#E5D268] p-6 text-center text-[#2D2442]">
        <div className="absolute -top-8 left-8 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-[#93B437]/25 blur-2xl" />
        <div className="absolute inset-x-0 top-5 flex justify-center gap-2">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className={`h-3 w-3 rounded-full border border-[#2D2442] ${i % 2 === 0 ? "bg-[#F3A33A]" : "bg-[#93B437]"}`} />
          ))}
        </div>
        <div className="relative z-10">
          <div className="text-xs font-black uppercase tracking-[0.35em] text-[#75912B]">game room</div>
          <div className={`mt-4 font-black lowercase leading-[0.88] text-[#2D2442] ${hero ? "text-5xl sm:text-6xl md:text-7xl" : "text-4xl sm:text-5xl md:text-6xl"}`} style={roundedDisplay}>
            House Guest Games
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: slide.bg }}>
      <div className="absolute -left-10 top-6 h-28 w-28 rounded-full opacity-80" style={{ backgroundColor: slide.blob }} />
      <div className="absolute -right-6 bottom-5 h-24 w-24 rounded-full opacity-75" style={{ backgroundColor: slide.blob }} />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/20" />
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-5 text-center text-white">
        <SlideGraphic slide={slide} hero={hero} />
        <div className="rounded-full border-2 border-[#2D2442] bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#2D2442] sm:text-xs">
          {slide.subtitle}
        </div>
        <div className="text-2xl font-black lowercase text-[#2D2442] sm:text-3xl" style={roundedDisplay}>
          {slide.title}
        </div>
      </div>
    </div>
  );
}

function HeroTileArt({ slide }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[0.8rem] p-2 text-center text-[#2D2442]" style={{ background: slide.bg }}>
      <div className="absolute -left-3 -top-3 h-10 w-10 rounded-full opacity-70" style={{ backgroundColor: slide.blob }} />
      <div className="absolute -bottom-3 -right-2 h-9 w-9 rounded-full opacity-65" style={{ backgroundColor: slide.blob }} />
      <SlideGraphic slide={slide} tile />
      <div className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#2D2442]/80">{slide.subtitle}</div>
    </div>
  );
}

function HotCombBoardScene({ row, col, rows, cols }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[0.72rem] bg-[#efe4cc]">
      <div
        className="absolute"
        style={{
          width: `${cols * 100}%`,
          height: `${rows * 100}%`,
          left: `-${col * 100}%`,
          top: `-${row * 100}%`,
          background:
            "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.8), transparent 22%), linear-gradient(180deg, #f6eddc 0%, #e8dcc4 48%, #dccdb2 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(122,88,44,0.08) 0, rgba(122,88,44,0.08) 2px, transparent 2px, transparent 110px), linear-gradient(180deg, rgba(122,88,44,0.03) 0, rgba(122,88,44,0.03) 1px, transparent 1px, transparent 90px)",
            backgroundSize: "120px 100%, 100% 96px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_26%)]" />

        <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="combBody" x1="0" x2="1">
              <stop offset="0%" stopColor="#191919" />
              <stop offset="40%" stopColor="#2c2c2c" />
              <stop offset="70%" stopColor="#111111" />
              <stop offset="100%" stopColor="#2e2e2e" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="10" dy="18" stdDeviation="14" floodColor="#4a3720" floodOpacity="0.28" />
            </filter>
          </defs>

          <g transform="translate(500 510) rotate(-24)" filter="url(#softShadow)">
            <ellipse cx="12" cy="250" rx="110" ry="330" fill="rgba(63,44,22,0.14)" />
            <rect x="-55" y="-355" rx="54" ry="54" width="110" height="600" fill="url(#combBody)" />
            <rect x="-18" y="-315" rx="9" ry="9" width="12" height="470" fill="rgba(255,255,255,0.18)" />
            <rect x="88" y="-290" rx="30" ry="30" width="310" height="84" fill="url(#combBody)" />
            <rect x="112" y="-268" rx="12" ry="12" width="232" height="14" fill="rgba(255,255,255,0.16)" />
            <rect x="120" y="-212" rx="22" ry="22" width="240" height="430" fill="url(#combBody)" />
            <rect x="142" y="-180" rx="10" ry="10" width="18" height="338" fill="rgba(255,255,255,0.14)" />
            {Array.from({ length: 15 }, (_, i) => {
              const x = 135 + i * 14.8;
              const h = i % 2 === 0 ? 240 : 228;
              return <rect key={i} x={x} y="198" width="7" height={h} rx="3.5" fill="#111111" />;
            })}
            <rect x="120" y="192" width="240" height="24" rx="12" fill="#131313" />
            <path d="M120 214 C162 240, 318 240, 360 214" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
          </g>
        </svg>

        <div className="absolute bottom-[6%] left-[6%] rounded-full bg-black/75 px-4 py-2 text-[clamp(12px,1.1vw,15px)] font-black uppercase tracking-[0.2em] text-white/90 shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
          hot comb
        </div>
      </div>
    </div>
  );
}

function BoardWindowArt({ slide, row, col, rows, cols }) {
  if (slide.graphic === "hotcomb") {
    return <HotCombBoardScene row={row} col={col} rows={rows} cols={cols} />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[0.72rem] bg-white">
      <div
        className="absolute"
        style={{
          width: `${cols * 100}%`,
          height: `${rows * 100}%`,
          left: `-${col * 100}%`,
          top: `-${row * 100}%`,
          background: slide.bg,
        }}
      >
        <div className="absolute -left-[10%] top-[8%] h-[24%] w-[24%] rounded-full opacity-80" style={{ backgroundColor: slide.blob }} />
        <div className="absolute -right-[7%] bottom-[8%] h-[20%] w-[20%] rounded-full opacity-75" style={{ backgroundColor: slide.blob }} />
        <div className="absolute bottom-0 left-0 right-0 h-[16%] bg-white/20" />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-[3%] p-[6%] text-center text-white">
          <SlideGraphic slide={slide} />
          <div className="rounded-full border-2 border-[#2D2442] bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#2D2442] sm:text-xs">
            {slide.subtitle}
          </div>
          <div className="text-[#2D2442]" style={{ ...roundedDisplay, fontSize: "clamp(1.35rem, 3vw, 2.4rem)" }}>
            {slide.title}
          </div>
        </div>
      </div>
    </div>
  );
}

function RevealPanel({ rows, cols, revealed, aspectClass = "aspect-[4/3]", coverClassName = "bg-[linear-gradient(180deg,#93B437_0%,#75912B_100%)]", slide, tileDelay = 0 }) {
  const total = rows * cols;

  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] border-2 border-[#2D2442] bg-white ${aspectClass}`}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F7EFBF_0%,#FFF9DD_100%)]" />
      <div
        className="absolute inset-0 grid gap-[6px] p-[6px]"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: total }, (_, index) => {
          const isRevealed = revealed.includes(index);
          const row = Math.floor(index / cols);
          const col = index % cols;

          return (
            <div key={index} className="[perspective:1200px]">
              <div
                className="relative h-full w-full"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
                  transitionProperty: "transform",
                  transitionDuration: "900ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: `${index * tileDelay}ms`,
                }}
              >
                <div className={`absolute inset-0 rounded-[0.85rem] border-2 border-[#2D2442] ${coverClassName}`} style={{ backfaceVisibility: "hidden", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.32)" }}>
                  <div className="absolute inset-0 rounded-[0.72rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_42%)]" />
                  <div className="absolute inset-0 rounded-[0.72rem] bg-[linear-gradient(135deg,transparent_0%,transparent_45%,rgba(246,228,109,0.22)_45%,rgba(246,228,109,0.22)_55%,transparent_55%,transparent_100%)]" />
                </div>

                <div className="absolute inset-0 overflow-hidden rounded-[0.85rem] border-2 border-[#2D2442] bg-white" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  {slide ? <BoardWindowArt slide={slide} row={row} col={col} rows={rows} cols={cols} /> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeroReveal() {
  const rows = 3;
  const cols = 4;
  const total = rows * cols;
  const [sceneIndex, setSceneIndex] = useState(0);
  const [openTiles, setOpenTiles] = useState([]);
  const [finalReveal, setFinalReveal] = useState(false);
  const [fanfare, setFanfare] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timers = [];

    const clearTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };

    const addTimer = (fn, ms) => {
      const timer = window.setTimeout(fn, ms);
      timers.push(timer);
    };

    const runCycle = () => {
      clearTimers();
      const heroMoments = buildSporadicHeroMoments(total);
      let cursor = 250;

      heroMoments.forEach((moment) => {
        addTimer(() => {
          if (cancelled) return;
          setSceneIndex(moment.slide);
          setOpenTiles([]);
          setFinalReveal(false);
          setFanfare(false);
        }, cursor);

        cursor += 260;

        addTimer(() => {
          if (cancelled) return;
          setOpenTiles(moment.tiles);
        }, cursor);

        cursor += 1650;

        addTimer(() => {
          if (cancelled) return;
          setOpenTiles([]);
        }, cursor);

        cursor += 920;
      });

      addTimer(() => {
        if (cancelled) return;
        setSceneIndex(3);
        setOpenTiles([]);
        setFinalReveal(false);
        setFanfare(false);
      }, cursor);

      cursor += 360;

      addTimer(() => {
        if (cancelled) return;
        setFinalReveal(true);
      }, cursor);

      cursor += 1350;

      addTimer(() => {
        if (cancelled) return;
        setFanfare(true);
      }, cursor);

      cursor += 2350;

      addTimer(() => {
        if (cancelled) return;
        setFinalReveal(false);
        setFanfare(false);
        setOpenTiles([]);
        setSceneIndex(0);
        runCycle();
      }, cursor);
    };

    runCycle();

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, []);

  const activeSet = new Set(finalReveal ? Array.from({ length: total }, (_, i) => i) : openTiles);

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className={`absolute -inset-4 rounded-[2rem] transition-all duration-700 ${fanfare ? "bg-white/35 blur-xl" : "bg-transparent"}`} />
      <div className="relative overflow-hidden rounded-[1.8rem] border-4 border-[#2D2442] bg-white p-3 shadow-[0_14px_0_#2D2442]">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.35rem] border-2 border-[#2D2442] bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#E5D268_0%,#F8F1C8_100%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[82%] w-[92%] rounded-[1.2rem] border-2 border-[#2D2442]/20 bg-white/20" />
          </div>
          <div className={`absolute inset-0 transition-opacity duration-700 ${finalReveal || fanfare ? "opacity-100" : "opacity-0"}`}>
            <SceneArt slide={slides[3]} hero />
          </div>

          <div
            className="absolute inset-0 grid gap-[8px] p-[8px]"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: total }, (_, index) => {
              const isOpen = activeSet.has(index);
              const stagger = finalReveal ? index * 95 : 0;
              return (
                <div key={index} className="[perspective:1300px]">
                  <div
                    className="relative h-full w-full"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isOpen ? "rotateY(180deg)" : "rotateY(0deg)",
                      opacity: finalReveal && isOpen ? 0 : 1,
                      transitionProperty: "transform, opacity",
                      transitionDuration: finalReveal ? "1050ms, 220ms" : "900ms, 0ms",
                      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1), ease",
                      transitionDelay: `${stagger}ms, ${finalReveal && isOpen ? stagger + 700 : 0}ms`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-[0.95rem] border-2 border-[#2D2442] bg-[linear-gradient(180deg,#93B437_0%,#75912B_100%)]"
                      style={{
                        backfaceVisibility: "hidden",
                        boxShadow: fanfare ? "0 0 0 4px rgba(255,255,255,0.25), inset 0 1px 0 rgba(255,255,255,0.32)" : "inset 0 1px 0 rgba(255,255,255,0.32)",
                      }}
                    >
                      <div className="absolute inset-0 rounded-[0.8rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_42%)]" />
                      <div className="absolute inset-0 rounded-[0.8rem] bg-[linear-gradient(135deg,transparent_0%,transparent_45%,rgba(246,228,109,0.22)_45%,rgba(246,228,109,0.22)_55%,transparent_55%,transparent_100%)]" />
                    </div>

                    <div className="absolute inset-0 overflow-hidden rounded-[0.95rem] border-2 border-[#2D2442] bg-white" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                      {!finalReveal && isOpen ? <HeroTileArt slide={slides[sceneIndex]} /> : <div className="h-full w-full bg-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {fanfare ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
              <div className="rounded-full border-2 border-[#2D2442] bg-white px-5 py-2 text-sm font-black uppercase tracking-[0.22em] text-[#2D2442] shadow-[0_6px_0_#2D2442]">
                welcome in
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function LandingExperience({ onEnter }) {
  const environmentPlates = [
    { src: houseGuestAssets.pool, label: "good weather" },
    { src: houseGuestAssets.greenery, label: "around the house" },
  ];

  return (
    <div className="relative overflow-hidden rounded-[2.6rem] border border-[#c8d4dd] bg-[linear-gradient(180deg,#f9f7f1_0%,#f2f6f8_48%,#eef4f6_100%)] px-6 py-8 shadow-[0_30px_100px_rgba(60,52,40,0.10)] md:px-10 md:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_24%),radial-gradient(circle_at_left,rgba(250,216,78,0.14),transparent_30%),radial-gradient(circle_at_right,rgba(98,160,202,0.12),transparent_32%)]" />

      <div className="relative grid items-start gap-8 xl:grid-cols-[0.84fr,1.16fr]">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="inline-flex rounded-full border border-[#1f3f58]/10 bg-[#fadb4e] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#203d57]" style={cleanSans}>
              Hey neighbor!
            </div>
            <div className="mt-5 text-[#173149]">
              <div className="text-5xl leading-[0.9] md:text-7xl xl:text-8xl" style={showDisplay}>HOUSE</div>
              <div className="text-5xl leading-[0.9] md:text-7xl xl:text-8xl" style={showDisplay}>GUEST</div>
            </div>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#4f5c66] md:text-[17px]" style={cleanSans}>
              Pull up to the house. The TV room is loaded, the guests are coming through, and Five to Flip is ready on screen.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button onClick={onEnter} className="rounded-full bg-[#173149] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#f7f4ec] shadow-[0_18px_30px_rgba(23,49,73,0.18)] transition hover:-translate-y-0.5 hover:bg-[#12273a]" style={cleanSans}>
                come through
              </button>
              <div className="rounded-full border border-[#173149]/10 bg-white/80 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5f6c75]" style={cleanSans}>
                food · drinks · games
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-[#d7e0e6] bg-white/78 p-3 shadow-[0_18px_50px_rgba(60,52,40,0.08)] backdrop-blur">
            <div className="grid gap-3 md:grid-cols-[0.9fr,1.1fr]">
              <div className="relative overflow-hidden rounded-[1.3rem]">
                <img src={houseGuestAssets.arrivalFallback} alt="Arrival at the front door" className="h-full min-h-[220px] w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(17,27,35,0.62)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75" style={cleanSans}>pull up</div>
                  <div className="mt-2 text-2xl leading-none uppercase text-[#fadb4e]" style={showDisplay}>AT THE DOOR</div>
                </div>
              </div>
              <div className="rounded-[1.3rem] border border-[#d7e0e6] bg-[#f7f8f6] p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#173149]" style={cleanSans}>house note</div>
                <p className="mt-3 text-sm leading-7 text-[#4f5c66]" style={cleanSans}>
                  Good company pulls up, steps inside, grabs a drink, and heads for the room. The site should feel like that before the game even starts.
                </p>
                <div className="mt-4 rounded-full border border-[#173149]/10 bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5f6c75]" style={cleanSans}>
                  the intro sets the whole tone
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2.2rem] border border-[#d7e0e6] bg-white/68 p-3 shadow-[0_18px_50px_rgba(60,52,40,0.08)] backdrop-blur">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.7rem] bg-[#171310]">
              <video
                className="h-full w-full object-cover"
                src={houseGuestAssets.heroVideo}
                poster={houseGuestAssets.arrivalFallback}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_38%,rgba(12,22,31,0.70)_100%)]" />
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#fadb4e]/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#173149] shadow-[0_10px_20px_rgba(0,0,0,0.08)]" style={cleanSans}>
                come through
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70" style={cleanSans}>House Guest intro</div>
                <div className="mt-3 text-4xl leading-none uppercase text-[#fadb4e] md:text-5xl" style={showDisplay}>PULL UP TO THE HOUSE</div>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white/82" style={cleanSans}>
                  Let the real intro welcome people in before they ever touch the TV room lineup.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {environmentPlates.map((plate) => (
              <div key={plate.label} className="overflow-hidden rounded-[1.6rem] border border-[#d7e0e6] bg-white/74 p-3 shadow-[0_16px_40px_rgba(60,52,40,0.08)] backdrop-blur">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem]">
                  <img src={plate.src} alt={plate.label} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(19,31,41,0.62)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75" style={cleanSans}>house detail</div>
                    <div className="mt-2 text-2xl leading-none uppercase text-[#fadb4e]" style={showDisplay}>{plate.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GuestReel() {
  const [activeGuest, setActiveGuest] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveGuest((prev) => (prev + 1) % guestMoments.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  const currentGuest = guestMoments[activeGuest];

  return (
    <div className="rounded-[2.2rem] border border-[#d3dee4] bg-[linear-gradient(180deg,#f9f7f1_0%,#f3f7f9_100%)] p-4 shadow-[0_24px_80px_rgba(60,52,40,0.10)] md:p-5">
      <div className="grid gap-4 xl:grid-cols-[1.08fr,0.92fr]">
        <div className="overflow-hidden rounded-[1.8rem] border border-[#d7e0e6] bg-white/72 p-3 shadow-[0_16px_40px_rgba(60,52,40,0.08)] backdrop-blur">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] bg-[#1a1410]">
            <img src={currentGuest.src} alt={currentGuest.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.20)_42%,rgba(18,28,37,0.76)_100%)]" />
            <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#fadb4e]/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#173149] shadow-[0_10px_20px_rgba(0,0,0,0.08)]" style={cleanSans}>
              guest list
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-7">
              <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/72" style={cleanSans}>currently showing</div>
              <div className="mt-3 text-4xl leading-none uppercase text-[#fadb4e] md:text-5xl" style={showDisplay}>{currentGuest.title}</div>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/82" style={cleanSans}>{currentGuest.note}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[1.8rem] border border-[#d7e0e6] bg-white/72 p-5 shadow-[0_16px_40px_rgba(60,52,40,0.08)] backdrop-blur">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#173149]" style={cleanSans}>the guest list</div>
            <h2 className="mt-3 text-4xl leading-[0.94] uppercase text-[#173149]" style={showDisplay}>WHO’S PULLING UP?</h2>
            <p className="mt-4 text-sm leading-7 text-[#4f5c66]" style={cleanSans}>
              Good company, good conversation, and one more seat for the next neighbor. Let the reel feel like people coming through the house, not a product carousel.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {guestMoments.map((guest, index) => (
              <button
                key={guest.title}
                onClick={() => setActiveGuest(index)}
                className={`grid grid-cols-[88px,1fr] gap-3 overflow-hidden rounded-[1.2rem] border text-left transition ${
                  index === activeGuest ? "border-[#173149] bg-[#eef4f7] shadow-[0_10px_20px_rgba(23,49,73,0.08)]" : "border-[#d7e0e6] bg-[#fbfcfa] hover:bg-[#f3f7f9]"
                }`}
              >
                <img src={guest.src} alt={guest.title} className="h-full w-full object-cover" />
                <div className="py-4 pr-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#173149]" style={cleanSans}>guest moment</div>
                  <div className="mt-2 text-2xl leading-none uppercase text-[#173149]" style={showDisplay}>{guest.title}</div>
                  <div className="mt-2 text-xs leading-6 text-[#4f5c66]" style={cleanSans}>{guest.note}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TVRoomLibrary({ selectedIndex, onPrev, onNext, onOpenGame }) {
  const game = gameLibrary[selectedIndex];

  return (
    <div className="rounded-[2.4rem] border border-[#d3dee4] bg-[linear-gradient(180deg,#f9f7f1_0%,#f3f7f9_100%)] p-4 shadow-[0_30px_100px_rgba(60,52,40,0.10)] md:p-5">
      <div className="mb-5 flex items-start justify-between gap-4 px-2 pt-2">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#173149]" style={cleanSans}>the tv room</div>
          <h2 className="mt-2 text-4xl leading-none uppercase text-[#173149] md:text-5xl" style={showDisplay}>WHAT’S ON SCREEN?</h2>
        </div>
        <div className="rounded-full border border-[#173149]/10 bg-[#fadb4e] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173149]" style={cleanSans}>now playing</div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="overflow-hidden rounded-[1.9rem] border border-[#d7e0e6] bg-white/78 p-3 shadow-[0_18px_50px_rgba(60,52,40,0.08)] backdrop-blur">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#171310]">
            <img src={houseGuestAssets.tvRoom} alt="House Guest TV room" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.12)_24%,rgba(18,28,37,0.62)_100%)]" />

            <button onClick={onPrev} className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/25 text-xl text-white shadow-[0_10px_20px_rgba(0,0,0,0.18)] backdrop-blur transition hover:scale-105">‹</button>
            <button onClick={onNext} className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/25 text-xl text-white shadow-[0_10px_20px_rgba(0,0,0,0.18)] backdrop-blur transition hover:scale-105">›</button>

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
              <div className="max-w-xl rounded-[1.6rem] border border-white/12 bg-[rgba(18,28,37,0.70)] p-5 text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur">
                <div className="inline-flex rounded-full border border-white/15 bg-[#fadb4e]/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#173149]" style={cleanSans}>
                  {game.eyebrow}
                </div>
                <div className="mt-4 text-4xl leading-none uppercase text-[#fadb4e] md:text-5xl" style={showDisplay}>{game.title}</div>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/84" style={cleanSans}>{game.blurb}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="rounded-full border border-white/15 bg-black/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78" style={cleanSans}>{game.status}</div>
                  <button onClick={() => onOpenGame(game)} className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#173149] shadow-[0_12px_20px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5" style={cleanSans}>
                    {game.id === "five-to-flip" ? "play now" : "view room"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 px-2 pb-1 pt-4">
            {gameLibrary.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onOpenGame(item, true)}
                className={`h-2.5 rounded-full transition ${index === selectedIndex ? "w-12 bg-[#173149]" : "w-3 bg-[#173149]/20 hover:bg-[#173149]/35"}`}
                aria-label={`Go to ${item.title}`}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="overflow-hidden rounded-[1.8rem] border border-[#d7e0e6] bg-white/78 p-3 shadow-[0_18px_50px_rgba(60,52,40,0.08)] backdrop-blur">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
              <img src={houseGuestAssets.pool} alt="Pool area environment" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(18,28,37,0.60)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/72" style={cleanSans}>around the house</div>
                <div className="mt-2 text-3xl leading-none uppercase text-[#fadb4e]" style={showDisplay}>GOOD WEATHER</div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-[#d7e0e6] bg-white/78 p-3 shadow-[0_18px_50px_rgba(60,52,40,0.08)] backdrop-blur">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
              <img src={houseGuestAssets.greenery} alt="Greenery environment" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(18,28,37,0.60)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/72" style={cleanSans}>around the house</div>
                <div className="mt-2 text-3xl leading-none uppercase text-[#fadb4e]" style={showDisplay}>GREEN ROOM</div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[#d7e0e6] bg-white/78 p-5 shadow-[0_18px_50px_rgba(60,52,40,0.08)] backdrop-blur">
            <div className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#173149]" style={cleanSans}>room note</div>
            <p className="mt-3 text-sm leading-7 text-[#4f5c66]" style={cleanSans}>
              Slide the lineup, grab a seat, and pick what’s on screen. The room should feel like the show is already in motion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchFormatCard({ format, resetMatch }) {
  return (
    <div className="rounded-[2rem] border-4 border-[#2D2442] bg-[#F8F1C8] p-4 shadow-[0_16px_0_#2D2442]">
      <div className="rounded-[1.7rem] border-2 border-[#2D2442] bg-white p-4">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#75912B]">Match format</div>
        <div className="grid grid-cols-3 gap-3">
          {formats.map((item) => (
            <button
              key={item.id}
              onClick={() => resetMatch(item.id)}
              className={`rounded-2xl border-2 px-4 py-4 text-left transition ${format === item.id ? "border-[#2D2442] bg-[#93B437] text-[#2D2442] shadow-[0_6px_0_#2D2442]" : "border-[#2D2442] bg-[#FFF9DD] text-[#2D2442] hover:bg-[#F6E46D]"}`}
            >
              <div className="text-sm font-black uppercase tracking-[0.08em]">{item.label}</div>
              <div className="mt-1 text-xs text-[#4A4260]">{item.note}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FiveToFlipPrototype() {
  const [format, setFormat] = useState(3);
  const [view, setView] = useState("arrival");
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const [activePlayer, setActivePlayer] = useState("B");
  const [holder, setHolder] = useState("A");
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [status, setStatus] = useState("Ask up to 5 questions, then make one celeb guess.");
  const [flipped, setFlipped] = useState([]);
  const [imageGuessWindow, setImageGuessWindow] = useState(null);
  const [showSolvedBoard, setShowSolvedBoard] = useState(false);
  const [currentCeleb, setCurrentCeleb] = useState(() => drawRandomCeleb());
  const [showCelebPeek, setShowCelebPeek] = useState(false);

  const tileCount = BOARD_TILE_COUNT;
  const boardSize = Math.sqrt(tileCount);
  const previewSlide = slides[0];
  const questionDots = Array.from({ length: 5 }, (_, i) => i + 1);

  const resetTurn = () => {
    setQuestionsUsed(0);
    setImageGuessWindow(null);
    setShowSolvedBoard(false);
    setShowCelebPeek(false);
    setStatus("Ask up to 5 questions, then make one celeb guess.");
  };

  const resetMatch = (nextFormat = format) => {
    setFormat(nextFormat);
    setRound(1);
    setScore({ A: 0, B: 0 });
    setActivePlayer("B");
    setHolder("A");
    setQuestionsUsed(0);
    setStatus("Ask up to 5 questions, then make one celeb guess.");
    setFlipped([]);
    setImageGuessWindow(null);
    setShowSolvedBoard(false);
    setShowCelebPeek(false);
    setCurrentCeleb(drawRandomCeleb());
  };

  const getRevealWeight = (index) => {
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;
    const isOuter = row === 0 || row === boardSize - 1 || col === 0 || col === boardSize - 1;
    const isCorner = (row === 0 || row === boardSize - 1) && (col === 0 || col === boardSize - 1);
    if (isCorner) return 6;
    if (isOuter) return 5;
    return 1.15;
  };

  const pickWeightedTile = (available) => {
    const weightedPool = available.map((tile) => ({ tile, weight: getRevealWeight(tile) }));
    const totalWeight = weightedPool.reduce((sum, item) => sum + item.weight, 0);
    let roll = Math.random() * totalWeight;

    for (const item of weightedPool) {
      roll -= item.weight;
      if (roll <= 0) return item.tile;
    }

    return weightedPool[weightedPool.length - 1]?.tile;
  };

  const flipRandomTiles = (count) => {
    const available = Array.from({ length: tileCount }, (_, i) => i).filter((tile) => !flipped.includes(tile));
    const picks = [];
    const working = [...available];

    while (picks.length < Math.min(count, working.length)) {
      const picked = pickWeightedTile(working);
      picks.push(picked);
      const removeIndex = working.indexOf(picked);
      if (removeIndex >= 0) working.splice(removeIndex, 1);
    }

    setFlipped((prev) => [...prev, ...picks]);
  };

  const useQuestion = () => {
    if (questionsUsed >= 5 || imageGuessWindow || showSolvedBoard) return;
    const next = questionsUsed + 1;
    setQuestionsUsed(next);
    setStatus(next === 5 ? "5 questions used. Final celeb guess required now." : `Question ${next} asked. Keep narrowing it down or guess now.`);
  };

  const onCorrectCelebGuess = () => {
    if (showSolvedBoard) return;
    let revealCount = 2;
    if (questionsUsed <= 2) revealCount = 4;
    else if (questionsUsed === 3) revealCount = 3;
    flipRandomTiles(revealCount);
    setImageGuessWindow(activePlayer);
    setStatus(`Correct celeb guess by Player ${activePlayer}. Reveal ${revealCount} tiles, then Player ${activePlayer} gets the image guess.`);
  };

  const onWrongCelebGuess = () => {
    if (showSolvedBoard) return;
    flipRandomTiles(1);
    const other = activePlayer === "A" ? "B" : "A";
    setImageGuessWindow(other);
    setStatus(`Wrong celeb guess. Reveal 1 tile. Player ${other} gets the image guess chance.`);
  };

  const awardRound = (player) => {
    const nextScore = { ...score, [player]: score[player] + 1 };
    const nextRoundNumber = round + 1;
    const nextHolder = holder === "A" ? "B" : "A";
    const nextActive = activePlayer === "A" ? "B" : "A";

    setScore(nextScore);
    setShowSolvedBoard(true);
    setImageGuessWindow(null);
    setShowCelebPeek(false);

    if (nextScore[player] >= format) {
      setStatus(`Player ${player} guessed the image and wins the match.`);
      return;
    }

    setStatus(`Player ${player} guessed the image. Full reveal stays on screen for 7 seconds before the next round.`);

    window.setTimeout(() => {
      setRound(nextRoundNumber);
      setFlipped([]);
      setShowSolvedBoard(false);
      setActivePlayer(nextActive);
      setHolder(nextHolder);
      setCurrentCeleb((prev) => drawRandomCeleb(prev?.name));
      setQuestionsUsed(0);
      setImageGuessWindow(null);
      setStatus(`Round ${nextRoundNumber} starts with switched roles and a new celeb card.`);
    }, 7000);
  };

  const missImageGuess = () => {
    if (showSolvedBoard) return;
    const nextActive = activePlayer === "A" ? "B" : "A";
    const nextHolder = holder === "A" ? "B" : "A";
    setActivePlayer(nextActive);
    setHolder(nextHolder);
    setCurrentCeleb((prev) => drawRandomCeleb(prev?.name));
    resetTurn();
    setStatus("No one got the image. Roles switch and a new celeb card is assigned.");
  };

  const peekCelebCard = () => {
    if (!showSolvedBoard) setShowCelebPeek(true);
  };

  const hideCelebCard = () => {
    setShowCelebPeek(false);
  };

  const redrawCelebCard = () => {
    if (showSolvedBoard) return;
    setCurrentCeleb((prev) => drawRandomCeleb(prev?.name));
    setShowCelebPeek(false);
  };

  const selectPrevGame = () => {
    setSelectedGameIndex((prev) => (prev === 0 ? gameLibrary.length - 1 : prev - 1));
  };

  const selectNextGame = () => {
    setSelectedGameIndex((prev) => (prev === gameLibrary.length - 1 ? 0 : prev + 1));
  };

  const openGameFromLibrary = (game, onlySelect = false) => {
    const index = gameLibrary.findIndex((item) => item.id === game.id);
    if (index >= 0) setSelectedGameIndex(index);
    if (onlySelect) return;
    if (game.id === "five-to-flip") setView("game");
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <div className="min-h-screen overflow-hidden bg-[#f1eadf] text-[#2d241d]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_transparent_28%),radial-gradient(circle_at_left,_rgba(111,126,54,0.10),_transparent_30%),radial-gradient(circle_at_right,_rgba(201,171,73,0.10),_transparent_32%)]" />
        <div className="pointer-events-none absolute -top-16 left-1/2 h-[24rem] w-[64rem] -translate-x-1/2 rounded-full bg-white/45 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
          {view === "arrival" ? (
            <div className="mb-8 space-y-6">
              <LandingExperience onEnter={() => setView("library")} />
              <GuestReel />
            </div>
          ) : null}

          {view === "library" ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-[1.8rem] border border-[#3c3428]/10 bg-white/70 px-5 py-4 shadow-[0_18px_50px_rgba(60,52,40,0.08)] backdrop-blur">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#173149]" style={cleanSans}>Hey neighbor!</div>
                  <div className="mt-1 text-3xl leading-none uppercase text-[#173149]" style={showDisplay}>TV ROOM</div>
                </div>
                <button onClick={() => setView("arrival")} className="rounded-full border border-[#3c3428]/10 bg-[#f7f2e9] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2d241d] transition hover:bg-white" style={cleanSans}>
                  back outside
                </button>
              </div>

              <TVRoomLibrary selectedIndex={selectedGameIndex} onPrev={selectPrevGame} onNext={selectNextGame} onOpenGame={openGameFromLibrary} />
            </div>
          ) : null}

          {view === "game" ? (
            <>
              <div className="mb-8 flex items-center justify-between rounded-[1.8rem] border border-[#3c3428]/10 bg-white/70 px-5 py-4 shadow-[0_18px_50px_rgba(60,52,40,0.08)] backdrop-blur">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6f7e36]" style={cleanSans}>House Guest Games</div>
                  <div className="mt-1 text-3xl leading-none text-[#2d241d]" style={roundedDisplay}>Five to Flip</div>
                </div>
                <button onClick={() => setView("library")} className="rounded-full border border-[#3c3428]/10 bg-[#f7f2e9] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2d241d] transition hover:bg-white" style={cleanSans}>
                  back to tv room
                </button>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.45fr,0.85fr]">
                <section className="rounded-[2rem] border-4 border-[#2D2442] bg-[#F8F1C8] p-4 shadow-[0_16px_0_#2D2442] md:p-5">
                  <div className="rounded-[1.7rem] border-2 border-[#2D2442] bg-white p-4 md:p-5">
                    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.28em] text-[#75912B]">Main board</div>
                        <h2 className="mt-2 text-2xl font-black lowercase tracking-tight text-[#2D2442] md:text-4xl" style={roundedDisplay}>hidden image reveal</h2>
                        <p className="mt-2 text-sm text-[#4A4260]">One image panel. Flip covers away. Call the image to win the round.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-full border-2 border-[#2D2442] bg-[#FFF9DD] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#2D2442]">Round {round}</div>
                        <div className="rounded-full border-2 border-[#2D2442] bg-[#F3A33A] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#2D2442]">First to {format}</div>
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border-2 border-[#2D2442] bg-[#FDF7DA] p-3 md:p-4">
                      <div className="mb-4 flex items-center justify-between rounded-2xl border-2 border-[#2D2442] bg-[#F6E46D] px-4 py-3">
                        <div>
                          <div className="text-[11px] font-black uppercase tracking-[0.24em] text-[#75912B]">Reveal pressure</div>
                          <div className="mt-1 text-lg font-black text-[#2D2442]">{showSolvedBoard ? tileCount : flipped.length} / {tileCount} covers opened</div>
                        </div>
                        <div className="text-right text-sm text-[#4A4260]">Fast celeb guesses unlock bigger reveals.</div>
                      </div>

                      <RevealPanel rows={boardSize} cols={boardSize} revealed={showSolvedBoard ? Array.from({ length: tileCount }, (_, i) => i) : flipped} aspectClass="aspect-square" tileDelay={0} slide={previewSlide} />
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <MatchFormatCard format={format} resetMatch={resetMatch} />

                  <div className="rounded-[2rem] border-4 border-[#2D2442] bg-[#F8F1C8] p-4 shadow-[0_16px_0_#2D2442]">
                    <div className="rounded-[1.7rem] border-2 border-[#2D2442] bg-white p-4">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.28em] text-[#75912B]">Scoreboard</div>
                          <h2 className="mt-2 text-2xl font-black lowercase tracking-tight text-[#2D2442]" style={roundedDisplay}>podiums</h2>
                        </div>
                        <button onClick={() => resetMatch()} className="rounded-full border-2 border-[#2D2442] bg-[#F3A33A] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2D2442] transition hover:brightness-105">Reset match</button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[1.4rem] border-2 border-[#2D2442] bg-[#93B437] p-[1px]"><div className="rounded-[1.25rem] bg-[#FFF9DD] p-4"><div className="text-[11px] font-black uppercase tracking-[0.24em] text-[#75912B]">Player A</div><div className="mt-3 text-5xl font-black leading-none text-[#2D2442]">{score.A}</div><div className="mt-3 inline-flex rounded-full border border-[#2D2442] bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#2D2442]">{holder === "A" ? "Holding celeb" : activePlayer === "A" ? "Questioning" : "Waiting"}</div></div></div>
                        <div className="rounded-[1.4rem] border-2 border-[#2D2442] bg-[#F6E46D] p-[1px]"><div className="rounded-[1.25rem] bg-[#FFF9DD] p-4"><div className="text-[11px] font-black uppercase tracking-[0.24em] text-[#A06700]">Player B</div><div className="mt-3 text-5xl font-black leading-none text-[#2D2442]">{score.B}</div><div className="mt-3 inline-flex rounded-full border border-[#2D2442] bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#2D2442]">{holder === "B" ? "Holding celeb" : activePlayer === "B" ? "Questioning" : "Waiting"}</div></div></div>
                      </div>

                      <div className="mt-4 rounded-[1.4rem] border-2 border-[#2D2442] bg-[#FFF9DD] p-4">
                        <div className="text-[11px] font-black uppercase tracking-[0.24em] text-[#75912B]">Current call</div>
                        <p className="mt-2 text-sm leading-7 text-[#4A4260]">{status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border-4 border-[#2D2442] bg-[#F8F1C8] p-4 shadow-[0_16px_0_#2D2442]">
                    <div className="rounded-[1.7rem] border-2 border-[#2D2442] bg-white p-4">
                      <div className="mb-4">
                        <div className="text-xs font-bold uppercase tracking-[0.28em] text-[#75912B]">Turn controls</div>
                        <h2 className="mt-2 text-2xl font-black lowercase tracking-tight text-[#2D2442]" style={roundedDisplay}>control booth</h2>
                      </div>

                      <div className="rounded-[1.4rem] border-2 border-[#2D2442] bg-[#FFF9DD] p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-[#75912B]">Questions used</div>
                            <div className="mt-2 text-4xl font-black leading-none text-[#2D2442]">{questionsUsed}<span className="text-xl text-[#6E6682]"> / 5</span></div>
                          </div>
                          <div className="flex gap-2">
                            {questionDots.map((dot) => {
                              const active = dot <= questionsUsed;
                              return <span key={dot} className={`h-4 w-4 rounded-full border-2 border-[#2D2442] ${active ? "bg-[#F3A33A]" : "bg-white"}`} />;
                            })}
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <button onClick={useQuestion} disabled={questionsUsed >= 5 || imageGuessWindow !== null || showSolvedBoard} className="rounded-2xl border-2 border-[#2D2442] bg-[#93B437] px-4 py-4 text-sm font-black uppercase tracking-[0.08em] text-[#2D2442] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40">Use a question</button>
                          <button onClick={onCorrectCelebGuess} disabled={showSolvedBoard} className="rounded-2xl border-2 border-[#2D2442] bg-[#F6E46D] px-4 py-4 text-sm font-black uppercase tracking-[0.08em] text-[#2D2442] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40">Celeb guess correct</button>
                          <button onClick={onWrongCelebGuess} disabled={showSolvedBoard} className="rounded-2xl border-2 border-[#2D2442] bg-white px-4 py-4 text-sm font-black uppercase tracking-[0.08em] text-[#2D2442] transition hover:bg-[#F8F1C8] disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2">Celeb guess wrong</button>
                        </div>
                      </div>

                      <div className="mt-4 rounded-[1.4rem] border-2 border-[#2D2442] bg-[#FFF9DD] p-4">
                        <div className="mb-4 rounded-[1.2rem] border-2 border-[#2D2442] bg-white p-4">
                          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="text-[11px] font-black uppercase tracking-[0.24em] text-[#75912B]">Private celeb card</div>
                              <div className="mt-2 text-xl font-black lowercase tracking-tight text-[#2D2442]" style={roundedDisplay}>player {holder} holds the card</div>
                              <p className="mt-2 text-sm leading-6 text-[#4A4260]">The app knows the celeb. Only the holder should peek at the card.</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <button onClick={peekCelebCard} disabled={showSolvedBoard} className="rounded-2xl border-2 border-[#2D2442] bg-[#93B437] px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#2D2442] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40">Show celeb</button>
                              <button onClick={hideCelebCard} className="rounded-2xl border-2 border-[#2D2442] bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#2D2442] transition hover:bg-[#F8F1C8]">Hide card</button>
                              <button onClick={redrawCelebCard} disabled={showSolvedBoard} className="rounded-2xl border-2 border-[#2D2442] bg-[#F6E46D] px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#2D2442] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40">New celeb</button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-[#75912B]">Image guess window</div>
                            <div className="mt-2 text-xl font-black lowercase tracking-tight text-[#2D2442]" style={roundedDisplay}>{imageGuessWindow ? `player ${imageGuessWindow} is live` : "waiting for reveal result"}</div>
                          </div>
                          <div className="rounded-full border-2 border-[#2D2442] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2D2442]">Holder: Player {holder} · Questioner: Player {activePlayer}</div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <button onClick={() => imageGuessWindow && awardRound(imageGuessWindow)} disabled={!imageGuessWindow || showSolvedBoard} className="rounded-2xl border-2 border-[#2D2442] bg-[#F3A33A] px-4 py-4 text-sm font-black uppercase tracking-[0.08em] text-[#2D2442] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40">Image guess correct</button>
                          <button onClick={missImageGuess} disabled={showSolvedBoard} className="rounded-2xl border-2 border-[#2D2442] bg-white px-4 py-4 text-sm font-black uppercase tracking-[0.08em] text-[#2D2442] transition hover:bg-[#F8F1C8] disabled:cursor-not-allowed disabled:opacity-40">No one got it</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border-4 border-[#2D2442] bg-[#F8F1C8] p-4 shadow-[0_16px_0_#2D2442]">
                    <div className="rounded-[1.7rem] border-2 border-[#2D2442] bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.28em] text-[#75912B]">Rule card</div>
                      <h2 className="mt-2 text-2xl font-black lowercase tracking-tight text-[#2D2442]" style={roundedDisplay}>how the round works</h2>
                      <div className="mt-4 space-y-3 text-sm leading-7 text-[#4A4260]">
                        <div className="rounded-2xl border-2 border-[#2D2442] bg-[#FFF9DD] px-4 py-3">1. Ask up to 5 questions about the celeb in your opponent’s hand.</div>
                        <div className="rounded-2xl border-2 border-[#2D2442] bg-[#FFF9DD] px-4 py-3">2. Make one official celeb guess whenever you’re ready.</div>
                        <div className="rounded-2xl border-2 border-[#2D2442] bg-[#FFF9DD] px-4 py-3">3. Guess faster to earn more flips on the hidden image.</div>
                        <div className="rounded-2xl border-2 border-[#2D2442] bg-[#FFF9DD] px-4 py-3">4. Correct image guess wins the round. If nobody gets it, roles switch.</div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </>
          ) : null}
        </div>

        {showCelebPeek && currentCeleb ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D2442]/70 p-4">
            <div className="w-full max-w-xl rounded-[2rem] border-4 border-[#2D2442] bg-[#F8F1C8] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
              <div className="rounded-[1.6rem] border-2 border-[#2D2442] bg-white p-6 text-center">
                <div className="text-xs font-black uppercase tracking-[0.35em] text-[#75912B]">Private celeb card</div>
                <div className="mt-3 text-sm font-black uppercase tracking-[0.2em] text-[#4A4260]">Only player {holder} should look</div>
                <div className="mt-6 rounded-[1.6rem] border-2 border-[#2D2442] bg-[#FFF9DD] px-6 py-10 text-4xl font-black lowercase text-[#2D2442] sm:text-5xl" style={roundedDisplay}>{currentCeleb.name}</div>
                <div className="mt-6 flex justify-center gap-3">
                  <button onClick={hideCelebCard} className="rounded-2xl border-2 border-[#2D2442] bg-[#93B437] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#2D2442] transition hover:brightness-105">Hide card</button>
                  <button onClick={redrawCelebCard} className="rounded-2xl border-2 border-[#2D2442] bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#2D2442] transition hover:bg-[#F8F1C8]">New celeb</button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
