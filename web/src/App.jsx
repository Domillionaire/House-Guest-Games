import React, { useEffect, useRef, useState } from "react";

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
  fontFamily: '"Anton", "Arial Narrow", "Inter", sans-serif',
  fontWeight: 400,
  letterSpacing: "-0.015em",
};

const gamesDisplay = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 700,
  letterSpacing: "0.02em",
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
  tvStand: assetPath("tvstand.png"),
  gameRoomWall: assetPath("Game room background.png"),
  heroVideo: assetPath("House Guest intro vid.mp4"),
  arrivalFallback: assetPath("scott front door.png"),
  tvRoom: assetPath("Screenshot 2026-04-11 194025.png"),
  pool: assetPath("Pool Shot.png"),
  greenery: assetPath("Greenery Shot.png"),
  backyardTree: assetPath("backyard tree.png"),
  emptySeat: assetPath("Empty guest seat.png"),
  guestDoor: assetPath("scott.png"),
  scottPortrait: assetPath("scott.jpeg"),
  guestRaincoat: assetPath("scott raincoat.webp"),
  guestGrill: assetPath("scottearlgrill.webp"),
  brandLockup: assetPath("house-guest-lockup-removebg-preview.png"),
  brandLockupHorizontal: assetPath("House Guest hori.png"),
  brandLockupGamesHorizontal: assetPath("House Guest games less blank space.png"),
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

function BrandWordmark({ dark = false, className = "", stacked = false, srcOverride = null, alt = "House Guest" }) {
  const [imageMissing, setImageMissing] = useState(false);
  const imageSrc = srcOverride || houseGuestAssets.brandLockup;

  if (!imageMissing) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        onError={() => setImageMissing(true)}
      />
    );
  }

  if (stacked) {
    return (
      <span className={`inline-flex flex-col leading-[0.8] ${className}`}>
        <span className="inline-block text-[#fadb4e]" style={{ ...showDisplay, fontSize: "inherit", lineHeight: "inherit" }}>
          HOUSE
        </span>
        <span className="inline-block text-[#fadb4e]" style={{ ...showDisplay, fontSize: "inherit", lineHeight: "inherit" }}>
          GUEST
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="inline-block text-[#fadb4e]" style={{ ...showDisplay, fontSize: "inherit", lineHeight: "inherit" }}>
        HOUSE GUEST
      </span>
      <span className={dark ? "text-[#173149]" : "text-white"} style={{ ...gamesDisplay, fontSize: "inherit", lineHeight: "inherit" }}>
        Games
      </span>
    </span>
  );
}

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

function HeroReveal({ fill = false }) {
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
    <div className={fill ? "relative h-full w-full overflow-hidden" : "relative mx-auto max-w-4xl"}>
      <div
        className={`${fill ? "absolute inset-0 rounded-[1.4rem]" : "absolute -inset-4 rounded-[2rem]"} transition-all duration-700 ${fanfare ? "bg-white/35 blur-xl" : "bg-transparent"}`}
      />
      <div
        className={fill
          ? "relative h-full w-full overflow-hidden rounded-[1.4rem] bg-transparent"
          : "relative overflow-hidden rounded-[1.8rem] border-4 border-[#2D2442] bg-white p-3 shadow-[0_14px_0_#2D2442]"
        }
      >
        <div
          className={fill
            ? "relative h-full w-full overflow-hidden rounded-[1.4rem] bg-white"
            : "relative aspect-[16/9] overflow-hidden rounded-[1.35rem] border-2 border-[#2D2442] bg-white"
          }
        >
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

function LandingExperience({ onEnter, introAlreadySeen = false, onIntroDismiss }) {
  const videoRef = useRef(null);
  const [introExiting, setIntroExiting] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(introAlreadySeen);

  const dismissIntro = () => {
    if (introExiting || introDismissed) return;
    setIntroExiting(true);
    window.setTimeout(() => {
      setIntroDismissed(true);
      onIntroDismiss?.();
    }, 1100);
  };

  const enterTVRoom = () => {
    if (introExiting) return;
    setIntroExiting(true);
    window.setTimeout(() => {
      setIntroDismissed(true);
      onIntroDismiss?.();
      onEnter();
    }, 900);
  };

  useEffect(() => {
    if (introAlreadySeen) {
      setIntroDismissed(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const applyPlaybackRate = () => {
      video.playbackRate = 0.62;
    };

    const handleEnded = () => {
      setIntroExiting(true);
      window.setTimeout(() => {
        setIntroDismissed(true);
      }, 1100);
    };

    applyPlaybackRate();
    video.addEventListener("loadedmetadata", applyPlaybackRate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", applyPlaybackRate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <>
      {!introDismissed ? (
        <div
          className={`fixed left-0 top-0 z-50 h-[100svh] w-screen overflow-hidden bg-[#09131d] transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            introExiting ? "pointer-events-none -translate-y-[108%] scale-[1.08] rotate-[-2deg] opacity-0 blur-sm" : "translate-y-0 scale-100 opacity-100"
          }`}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={houseGuestAssets.heroVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,22,0.12)_0%,rgba(6,14,22,0.16)_22%,rgba(6,14,22,0.44)_54%,rgba(6,14,22,0.86)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,219,78,0.28),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(108,164,204,0.18),transparent_28%)]" />
          <div className={`absolute inset-0 bg-[#fadb4e] transition-all duration-700 ${introExiting ? "opacity-45 scale-[1.25]" : "opacity-0 scale-100"}`} />

          <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-6 py-6 md:px-10 md:py-8">
            <div className="flex items-start justify-end">
              <button onClick={dismissIntro} className="rounded-full border border-white/16 bg-black/18 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/88 backdrop-blur transition hover:bg-black/28" style={cleanSans}>
                skip intro
              </button>
            </div>

            <div className="pointer-events-none flex items-end justify-center pb-4 md:pb-6">
              <div className="h-[2px] w-24 rounded-full bg-white/28" />
            </div>
          </div>
        </div>
      ) : null}

      <section className={`relative min-h-[88vh] overflow-hidden rounded-[3rem] bg-[#edf3f6] shadow-[0_32px_100px_rgba(33,53,71,0.10)] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${introDismissed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        <img src={houseGuestAssets.emptySeat} alt="An open seat at the House Guest table" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,24,0.34)_0%,rgba(7,16,24,0.18)_16%,rgba(7,16,24,0.36)_44%,rgba(7,16,24,0.58)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,219,78,0.08),transparent_22%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_28%)]" />

        <div className="relative z-10 flex min-h-[88vh] flex-col justify-between px-6 py-8 md:px-10 md:py-10">
          <div className="flex justify-start">
            <div className="relative inline-flex min-h-[6rem] items-center pl-24 sm:min-h-[7rem] sm:pl-28 md:min-h-[8rem] md:pl-32">
              <div className="absolute left-[3.8rem] top-1/2 h-5 w-12 -translate-y-1/2 rounded-full bg-[#fadb4e] sm:left-[4.3rem] sm:h-6 sm:w-14 md:left-[5rem] md:h-7 md:w-16" />
              <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2">
                <div className="absolute -inset-4 rounded-full bg-[#fadb4e]/18 blur-2xl" />
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-[4px] ring-[#fadb4e] shadow-[0_20px_40px_rgba(0,0,0,0.22)] sm:h-28 sm:w-28 md:h-32 md:w-32">
                  <img src={houseGuestAssets.scottPortrait} alt="Scott Evans welcoming the neighbor in" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="relative inline-flex rounded-full bg-[#fadb4e] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-[#111111] shadow-[0_12px_24px_rgba(0,0,0,0.10)] sm:px-7 md:px-8 md:py-4" style={cleanSans}>
                Hey neighbor!
              </div>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center text-center -translate-y-3 md:-translate-y-5">
            <img src={houseGuestAssets.brandLockupGamesHorizontal} alt="House Guest Games" className="w-full max-w-[22rem] drop-shadow-[0_12px_28px_rgba(0,0,0,0.18)] sm:max-w-[30rem] md:max-w-[44rem] lg:max-w-[54rem]" />

            <div className="mt-5 text-3xl leading-[0.96] text-white md:text-[3.25rem]" style={roundedDisplay}>
              Play the games from House Guest.
            </div>
            <p className="mt-3 max-w-3xl text-[15px] leading-8 text-white/86 md:text-[17px]" style={cleanSans}>
              Pull up, pick a game, and experience the fun of being a neighbor.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <button onClick={onEnter} className="rounded-full bg-[#fadb4e] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#173149] shadow-[0_18px_30px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 hover:brightness-95" style={cleanSans}>
                enter the game room
              </button>
              <button onClick={() => document.getElementById("around-the-house")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="rounded-full border border-white/16 bg-white/10 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/86 backdrop-blur transition hover:bg-white/16" style={cleanSans}>
                see around the house
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function GamesBridgeSection({ onEnter }) {
  const [activeCard, setActiveCard] = useState(0);

  const bridgeCards = [
    {
      id: 0,
      step: "01 · first up",
      title: "Play Five to Flip",
      body: "Five questions. One celeb. One hidden image waiting on the screen.",
    },
    {
      id: 1,
      step: "02 · make your guess",
      title: "Ask. Narrow it down.",
      body: "Use up to five questions, read the clues, and decide when it’s time to make the call.",
    },
    {
      id: 2,
      step: "03 · get the reveal",
      title: "Flip it and find out.",
      body: "A right guess earns the reveal. Then the room gets to see who really had it figured out.",
    },
  ];

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-[#dfe9ee]">
      <img src={houseGuestAssets.greenery} alt="" aria-hidden="true" className="pointer-events-none absolute left-0 top-[-6%] h-[112%] w-full object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(223,233,238,0.18)_0%,rgba(223,233,238,0.04)_14%,rgba(223,233,238,0.04)_86%,rgba(223,233,238,0.18)_100%)]" />

      <section className="relative mx-auto my-4 max-w-7xl overflow-hidden rounded-[2.5rem] bg-[rgba(13,29,42,0.88)] shadow-[0_22px_70px_rgba(0,0,0,0.12)] backdrop-blur-[2px] md:my-5">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,30,0.94)_0%,rgba(8,20,30,0.84)_34%,rgba(8,20,30,0.76)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,219,78,0.10),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(157,204,226,0.08),transparent_26%)]" />

      <div className="relative z-10 grid gap-8 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[0.92fr,1.08fr] lg:items-center">
        <div className="max-w-2xl text-white">
          <div className="inline-flex rounded-full border border-white/14 bg-[#fadb4e] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#173149]" style={cleanSans}>
            from the house
          </div>
          <div className="mt-5 text-4xl leading-[0.94] text-[#fadb4e] md:text-5xl" style={showDisplay}>
            WE ALWAYS INVITE OUR HOUSE GUESTS TO PLAY A GAME.
          </div>
          <div className="mt-3 text-3xl leading-[0.98] text-white md:text-4xl" style={roundedDisplay}>
            Now you can too, Neighbor.
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={onEnter}
              className="rounded-full bg-[#fadb4e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#173149] shadow-[0_14px_26px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:brightness-95"
              style={cleanSans}
            >
              enter the game room
            </button>
            <div className="rounded-full border border-white/14 bg-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/84 backdrop-blur" style={cleanSans}>
              choose · guess · reveal
            </div>
          </div>
        </div>

        <div
          className="flex h-[34rem] flex-col gap-4 md:h-[38rem]"
          onMouseLeave={() => setActiveCard(0)}
        >
          {bridgeCards.map((card, index) => {
            const isActive = activeCard === index;

            return (
              <button
                key={card.id}
                type="button"
                onMouseEnter={() => setActiveCard(index)}
                onFocus={() => setActiveCard(index)}
                onClick={() => setActiveCard(index)}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/12 bg-[rgba(255,255,255,0.06)] px-5 py-5 text-left shadow-[0_14px_30px_rgba(0,0,0,0.12)] backdrop-blur transition-all duration-300 ease-out hover:border-[#fadb4e]/70 min-h-0 ${
                  isActive
                    ? "flex-[2.9] border-[#fadb4e]/60 bg-[rgba(255,255,255,0.09)] shadow-[0_24px_48px_rgba(0,0,0,0.20)]"
                    : "flex-1 bg-[rgba(255,255,255,0.05)]"
                }`}
              >
                <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-70"} ${
                  index === 0
                    ? "bg-[radial-gradient(circle_at_top_left,rgba(250,219,78,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.00)_100%)]"
                    : index === 1
                      ? "bg-[radial-gradient(circle_at_top_right,rgba(250,219,78,0.10),transparent_30%)]"
                      : "bg-[radial-gradient(circle_at_bottom_left,rgba(157,204,226,0.10),transparent_30%)]"
                }`} />

                {index === 0 && isActive ? (
                  <>
                    <div className="absolute inset-0">
                      <HeroReveal fill />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,30,0.78)_0%,rgba(8,20,30,0.22)_40%,rgba(8,20,30,0.72)_100%)]" />
                  </>
                ) : null}

                <div className="relative z-10 flex h-full min-h-0 flex-col justify-between text-white">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/58" style={cleanSans}>{card.step}</div>

                  <div className="mt-4">
                    <div className={`leading-[0.94] transition-all duration-300 ${isActive ? "text-[#fadb4e]" : "text-white"} ${index === 0 ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`} style={index === 0 ? showDisplay : roundedDisplay}>
                      {card.title}
                    </div>
                    <p className={`mt-3 max-w-xl text-sm leading-7 text-white/78 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden mt-0"}`} style={cleanSans}>
                      {card.body}
                    </p>
                  </div>

                  
                </div>
              </button>
            );
          })}
        </div>
      </div>
      </section>
    </div>
  );
}

function WatchHouseGuestPage() {
  const [activeGuest, setActiveGuest] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveGuest((prev) => (prev + 1) % guestMoments.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  const currentGuest = guestMoments[activeGuest];

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-[#d9e3e8] bg-[#eef4f6] shadow-[0_24px_80px_rgba(33,53,71,0.08)]">
      <img src={currentGuest.src} alt={currentGuest.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,34,0.84)_0%,rgba(11,23,34,0.56)_42%,rgba(11,23,34,0.32)_100%)]" />

      <div className="relative z-10 grid min-h-[28rem] gap-6 px-6 py-6 md:px-8 md:py-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-end">
        <div className="max-w-lg text-white">
          <div className="inline-flex rounded-full border border-white/14 bg-[#fadb4e] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#173149]" style={cleanSans}>
            House Guest Games
          </div>
          <div className="mt-5 text-4xl leading-[0.94] text-[#fadb4e] md:text-5xl" style={showDisplay}>THE GUEST LIST</div>
          <p className="mt-4 text-sm leading-7 text-white/84 md:text-base" style={cleanSans}>
            Good company pulls up, shifts the room, and leaves you seeing them a little differently. The site should feel like that too.
          </p>
          <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/64" style={cleanSans}>now showing</div>
          <div className="mt-2 text-3xl leading-none text-white md:text-4xl" style={showDisplay}>{currentGuest.title}</div>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/80" style={cleanSans}>{currentGuest.note}</p>
        </div>

        <div className="flex flex-col gap-3 self-end lg:items-end">
          <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-2xl">
            {guestMoments.map((guest, index) => (
              <button
                key={guest.title}
                onClick={() => setActiveGuest(index)}
                className={`group relative overflow-hidden rounded-[1.4rem] border text-left transition ${
                  index === activeGuest
                    ? "border-[#fadb4e] shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
                    : "border-white/14 hover:border-white/28"
                }`}
              >
                <img src={guest.src} alt={guest.title} className="h-36 w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_22%,rgba(11,23,34,0.82)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/64" style={cleanSans}>guest moment</div>
                  <div className="mt-2 text-xl leading-none text-[#fadb4e]" style={showDisplay}>{guest.title}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="rounded-full border border-white/14 bg-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/84 backdrop-blur" style={cleanSans}>
            maybe you’re the next neighbor
          </div>
        </div>
      </div>
    </section>
  );
}

function TVRoomLibrary({ selectedIndex, onPrev, onNext, onSelectGame, onOpenGame }) {
  const game = gameLibrary[selectedIndex];
  const isPlayable = game.id === "five-to-flip";

  return (
    <section
      id="game-room"
      className="relative overflow-hidden rounded-[2.9rem] shadow-[0_30px_100px_rgba(33,53,71,0.08)]"
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,24,0.06)_0%,rgba(7,16,24,0.12)_26%,rgba(7,16,24,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_26%),radial-gradient(circle_at_left,rgba(157,204,226,0.08),transparent_22%),radial-gradient(circle_at_right,rgba(250,219,78,0.06),transparent_22%)]" />

      <div className="relative z-10 flex min-h-[46rem] flex-col px-5 py-5 md:px-8 md:py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full border border-white/16 bg-[rgba(11,23,34,0.22)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/88 backdrop-blur" style={cleanSans}>
              inside the game room
            </div>
            
            <p className="mt-3 max-w-lg text-sm leading-7 text-white/82 md:text-base" style={cleanSans}>
              A good game gets the room talking.
              <br />
              A better one gets everybody involved.
            </p>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button onClick={onPrev} aria-label="Previous game" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-black/20 text-xl text-white backdrop-blur transition hover:scale-105">‹</button>
            <button onClick={onNext} aria-label="Next game" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-black/20 text-xl text-white backdrop-blur transition hover:scale-105">›</button>
          </div>
        </div>

        <div className="relative mx-auto mt-8 flex w-full max-w-6xl flex-1 flex-col items-center justify-end">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[20rem] bg-[linear-gradient(180deg,transparent_0%,rgba(18,28,38,0.10)_40%,rgba(18,28,38,0.16)_100%)]" />

          <div className="relative z-20 w-full max-w-[70rem] px-2 md:px-8">
            <div className="relative mx-auto w-full max-w-5xl">
              <div className="absolute inset-x-[8%] bottom-[-2.2rem] h-10 rounded-full bg-black/28 blur-2xl md:bottom-[-2.6rem] md:h-12" />

              <div className="relative z-20 mx-auto w-full max-w-4xl md:mb-[-0.6rem]">
                <div className="relative rounded-none border-[2px] border-[#111417] bg-[#0f1419] p-[3px] shadow-[0_22px_60px_rgba(0,0,0,0.35)] md:rounded-none md:border-[3px]">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-none bg-[#0b1620]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${game.accent} opacity-95`} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_24%),linear-gradient(180deg,rgba(8,20,30,0.10)_0%,rgba(8,20,30,0.42)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,transparent_16%,transparent_84%,rgba(0,0,0,0.16)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,transparent_8%,transparent_92%,rgba(255,255,255,0.05)_100%)]" />

                    <div className="relative flex h-full flex-col justify-between p-4 text-white md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex rounded-full border border-white/16 bg-black/18 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/82 backdrop-blur" style={cleanSans}>
                          {game.eyebrow}
                        </div>
                        <div className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] backdrop-blur ${isPlayable ? "border-[#fadb4e]/40 bg-[#fadb4e]/16 text-[#fff3b0]" : "border-white/16 bg-white/10 text-white/82"}`} style={cleanSans}>
                          {game.status}
                        </div>
                      </div>

                      <div className="max-w-[82%]">
                        <div className="text-4xl leading-[0.9] text-[#fadb4e] md:text-6xl" style={showDisplay}>{game.title}</div>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-white/86 md:text-base" style={cleanSans}>{game.blurb}</p>
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        <div className="flex gap-2">
                          {gameLibrary.map((item, index) => (
                            <button
                              key={item.id}
                              type="button"
                              aria-label={`Show ${item.title}`}
                              onClick={() => onSelectGame(index)}
                              className={`h-3 w-3 rounded-full border transition ${index === selectedIndex ? "border-[#fadb4e] bg-[#fadb4e]" : "border-white/34 bg-white/18 hover:bg-white/38"}`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => onOpenGame(game)}
                          disabled={!isPlayable}
                          className={`rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_12px_20px_rgba(0,0,0,0.14)] transition ${isPlayable ? "bg-[#fadb4e] text-[#173149] hover:-translate-y-0.5 hover:brightness-95" : "cursor-not-allowed border border-white/16 bg-white/10 text-white/70"}`}
                          style={cleanSans}
                        >
                          {isPlayable ? "play now" : "coming soon"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mx-auto mt-[-0.5rem] w-full max-w-5xl md:mt-[-0.85rem]">
                <img
                  src={houseGuestAssets.tvStand}
                  alt="TV stand and decor"
                  className="pointer-events-none block w-full object-contain select-none"
                  draggable="false"
                />
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-6 flex justify-center gap-2 sm:hidden">
            <button onClick={onPrev} aria-label="Previous game" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/28 text-xl text-white backdrop-blur transition hover:scale-105">‹</button>
            <button onClick={onNext} aria-label="Next game" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/28 text-xl text-white backdrop-blur transition hover:scale-105">›</button>
          </div>

          <div className="relative z-20 mt-5 flex flex-wrap items-center justify-center gap-3 pb-2 text-center">
            {gameLibrary.map((item, index) => {
              const isActive = index === selectedIndex;
              const playable = item.id === "five-to-flip";
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectGame(index)}
                  className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition ${isActive ? "bg-[#fadb4e] text-[#173149] shadow-[0_10px_24px_rgba(0,0,0,0.14)]" : "border border-white/16 bg-white/10 text-white/82 hover:bg-white/16"}`}
                  style={cleanSans}
                >
                  {item.title}
                  <span className={`ml-2 ${isActive ? "text-[#173149]/72" : "text-white/56"}`}>
                    {playable ? "• live" : "• soon"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
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

function SiteNav({ activePage, onGoGamesHome, onGoWatchHouseGuest, onGoTVRoom }) {
  const baseClass = "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition";

  return (
    <div className="sticky top-4 z-30 flex justify-end gap-2">
      <button
        onClick={onGoGamesHome}
        className={`${baseClass} ${activePage === "games" ? "bg-[#173149] text-white shadow-[0_10px_24px_rgba(0,0,0,0.10)]" : "border border-[#173149]/12 bg-white/72 text-[#173149] hover:bg-white"}`}
        style={cleanSans}
      >
        House Guest Games
      </button>
      <button
        onClick={onGoWatchHouseGuest}
        className={`${baseClass} ${activePage === "watch" ? "bg-[#173149] text-white shadow-[0_10px_24px_rgba(0,0,0,0.10)]" : "border border-[#173149]/12 bg-white/72 text-[#173149] hover:bg-white"}`}
        style={cleanSans}
      >
        Watch House Guest
      </button>
      <button
        onClick={onGoTVRoom}
        className={`${baseClass} bg-[#fadb4e] text-[#173149] shadow-[0_10px_24px_rgba(0,0,0,0.08)] hover:brightness-95`}
        style={cleanSans}
      >
        Enter Game Room
      </button>
    </div>
  );
}

export default function FiveToFlipPrototype() {
  const [format, setFormat] = useState(3);
  const [view, setView] = useState("arrival");
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const [arrivalPage, setArrivalPage] = useState("games");
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
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

  useEffect(() => {
    if (view !== "library") return;

    const interval = window.setInterval(() => {
      setSelectedGameIndex((prev) => (prev + 1) % gameLibrary.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [view]);

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

  const selectGameByIndex = (index) => {
    setSelectedGameIndex(index);
  };

  const openGameFromLibrary = (game) => {
    const index = gameLibrary.findIndex((item) => item.id === game.id);
    if (index >= 0) setSelectedGameIndex(index);
    if (game.id === "five-to-flip") setView("game");
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Anton&family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap'); html, body, #root { margin: 0; min-height: 100%; } body { overflow-x: hidden; background: #f3f7f9; }`}</style>
      <div className={`min-h-screen overflow-hidden text-[#173149] ${view === "library" ? "bg-transparent" : "bg-[linear-gradient(180deg,#f3f7f9_0%,#eaf1f4_100%)]"}`} style={view === "library" ? { backgroundImage: `url(${houseGuestAssets.gameRoomWall})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } : undefined}>
        <div className={`pointer-events-none absolute inset-0 ${view === "library" ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.20),transparent_26%),radial-gradient(circle_at_left,rgba(250,219,78,0.06),transparent_30%),radial-gradient(circle_at_right,rgba(157,204,226,0.06),transparent_32%)]" : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.94),transparent_26%),radial-gradient(circle_at_left,rgba(250,219,78,0.10),transparent_30%),radial-gradient(circle_at_right,rgba(157,204,226,0.10),transparent_32%)]"}`} />
        <div className={`pointer-events-none absolute -top-16 left-1/2 h-[24rem] w-[64rem] -translate-x-1/2 rounded-full blur-3xl ${view === "library" ? "bg-white/12" : "bg-white/45"}`} />

        <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
          {view === "arrival" ? (
            <div className="mb-8 space-y-6">
              <SiteNav
                activePage={arrivalPage}
                onGoGamesHome={() => setArrivalPage("games")}
                onGoWatchHouseGuest={() => setArrivalPage("watch")}
                onGoTVRoom={() => setView("library")}
              />

              {arrivalPage === "games" ? (
                <div className="space-y-6">
                  <LandingExperience
                    onEnter={() => setView("library")}
                    introAlreadySeen={hasSeenIntro}
                    onIntroDismiss={() => setHasSeenIntro(true)}
                  />
                  <GamesBridgeSection onEnter={() => setView("library")} />
                </div>
              ) : (
                <WatchHouseGuestPage />
              )}
            </div>
          ) : null}

          {view === "library" ? (
            <div className="space-y-6 p-0">
              <div className="relative flex items-center justify-between overflow-hidden rounded-[1.6rem] px-3 py-3">
                {/* greenery header background (top crop, no stretch) */}
                <img
                  src={houseGuestAssets.greenery}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 h-[140%] w-full object-cover object-top opacity-80"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,30,0.55)_0%,rgba(8,20,30,0.35)_40%,rgba(8,20,30,0.55)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,219,78,0.10),transparent_30%)]" />
                <div className="relative z-10 flex w-full items-center justify-between">
                  <div>
                    <BrandWordmark
                      srcOverride={houseGuestAssets.brandLockupGamesHorizontal}
                      alt="House Guest Games"
                      className="h-8 w-auto md:h-9"
                    />
                    <div className="mt-1 text-3xl leading-none text-[#173149]" style={showDisplay}>GAME ROOM</div>
                  </div>
                  <button onClick={() => setView("arrival")} className="rounded-full border border-white/14 bg-[rgba(11,23,34,0.28)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[rgba(11,23,34,0.38)]" style={cleanSans}>
                    back outside
                  </button>
                </div>
              </div>

              <TVRoomLibrary selectedIndex={selectedGameIndex} onPrev={selectPrevGame} onNext={selectNextGame} onSelectGame={selectGameByIndex} onOpenGame={openGameFromLibrary} />
            </div>
          ) : null}

          {view === "game" ? (
            <>
              <div className="mb-8 flex items-center justify-between rounded-[1.8rem] border border-[#3c3428]/10 bg-white/70 px-5 py-4 shadow-[0_18px_50px_rgba(60,52,40,0.08)] backdrop-blur">
                <div>
                  <BrandWordmark
                    srcOverride={houseGuestAssets.brandLockupGamesHorizontal}
                    alt="House Guest Games"
                    className="h-8 w-auto md:h-9"
                  />
                  <div className="mt-1 text-3xl leading-none text-[#2d241d]" style={roundedDisplay}>Five to Flip</div>
                </div>
                <button onClick={() => setView("library")} className="rounded-full border border-[#3c3428]/10 bg-[#f7f2e9] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2d241d] transition hover:bg-white" style={cleanSans}>
                  back to game room
                </button>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.45fr,0.85fr]">
                <section className="rounded-[2rem] border-4 border-[#2D2442] bg-[#F8F1C8] p-4 shadow-[0_16px_0_#2D2442] md:p-5">
                  <div className="rounded-[1.7rem] border-2 border-[#2D2442] bg-white p-4 md:p-5">
                    <div className="mb-6">
                      <HeroReveal />
                    </div>
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
