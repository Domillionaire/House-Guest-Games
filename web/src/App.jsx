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
  takeItToTheStagePreview: assetPath("Take it to the stage.png"),
  singDownToLinkUpPreview: assetPath("Sing Down to Link up.png"),
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
    title: "",
    subtitle: "name that object",
    bg: "linear-gradient(135deg, #F7E17D 0%, #E9C84E 45%, #D9A63A 100%)",
    blob: "#FFF4CF",
  },
  {
    kind: "scene",
    emoji: "🦜",
    title: "",
    subtitle: "ask up to 5 questions",
    bg: "linear-gradient(135deg, #9AD34B 0%, #6FA432 45%, #4A7C1B 100%)",
    blob: "#F8F1C8",
  },
  {
    kind: "scene",
    emoji: "🐸",
    title: "",
    subtitle: "guess the celebrity",
    bg: "linear-gradient(135deg, #F6E46D 0%, #D9C954 45%, #9BB541 100%)",
    blob: "#FFF9DD",
  },
  { kind: "title" },
];

const heroSlides = [1, 2, 0];

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
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[0.8rem] p-3 text-center" style={{ background: slide.bg }}>
      <div className="absolute -left-3 -top-3 h-10 w-10 rounded-full opacity-70" style={{ backgroundColor: slide.blob }} />
      <div className="absolute -bottom-3 -right-2 h-9 w-9 rounded-full opacity-65" style={{ backgroundColor: slide.blob }} />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="rounded-full border-2 border-[#2D2442] bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#2D2442] sm:text-xs">
          {slide.subtitle}
        </div>
      </div>
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

function HeroRevealQuestionDots({ count = 0 }) {
  return (
    <div className="mt-2 flex justify-center gap-1.5">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`h-2.5 w-2.5 rounded-full border transition ${i < count ? "border-[#efc26a] bg-[#efc26a]/85" : "border-white/20 bg-white/10"}`}
        />
      ))}
    </div>
  );
}

function HeroReveal({ fill = false, playOnce = false, onComplete = null, layoutMode = "default" }) {
  const total = 16;
  const fullReveal = Array.from({ length: total }, (_, i) => i);
  const [phase, setPhase] = useState(0);
  const [revealed, setRevealed] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
      let cursor = 320;

      setPhase(0);
      setRevealed([]);
      setActiveSlideIndex(0);

      heroMoments.forEach((moment, index) => {
        addTimer(() => {
          if (cancelled) return;
          setPhase(index + 1);
          setActiveSlideIndex(moment.slide);
          setRevealed(moment.tiles);
        }, cursor);

        cursor += index === 1 ? 980 : 860;

        addTimer(() => {
          if (cancelled) return;
          setRevealed([]);
        }, cursor);

        cursor += index === 1 ? 560 : 500;
      });

      addTimer(() => {
        if (cancelled) return;
        setPhase(4);
        setRevealed(fullReveal);
      }, cursor + 140);

      addTimer(() => {
        if (cancelled) return;
        setPhase(5);
      }, cursor + 140 + 1180);

      cursor += playOnce ? 3200 : 3800;

      addTimer(() => {
        if (cancelled) return;
        if (playOnce) {
          onComplete?.();
          return;
        }
        runCycle();
      }, cursor);
    };

    runCycle();

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [playOnce, onComplete, total]);

  const isSubheroLayout = fill && layoutMode === "subhero";

  const wrapperClass = fill
    ? "relative h-full w-full overflow-hidden rounded-[1.4rem] bg-[linear-gradient(180deg,#15100d_0%,#0f0b09_100%)]"
    : "relative overflow-hidden rounded-[1.8rem] border-4 border-[#2D2442] bg-white p-3 shadow-[0_14px_0_#2D2442]";

  const innerClass = fill
    ? "relative h-full w-full overflow-hidden rounded-[1.4rem]"
    : "relative aspect-[16/9] overflow-hidden rounded-[1.35rem] border-2 border-[#2D2442]";

  const framePaddingClass = isSubheroLayout ? "px-1 py-1 sm:px-1.5 sm:py-1.5" : "px-5 py-5 sm:px-6 sm:py-6";
  const boardWrapClass = isSubheroLayout ? "relative w-full max-w-none" : "relative w-full max-w-[40rem]";
  const boardScaleClass = isSubheroLayout ? "mx-auto w-full max-w-none" : "mx-auto w-full max-w-[36rem]";
  const boardAspectClass = isSubheroLayout ? "aspect-[2.05/1]" : "aspect-[1.12/1]";
  const chromeInsetClass = isSubheroLayout ? "inset-[6px]" : "inset-[10px]";
  const boardInsetClass = isSubheroLayout ? "inset-[10px]" : "inset-[18px]";
  const gridGapClass = isSubheroLayout ? "gap-[6px]" : "gap-[8px]";
  const outerGlowClass = isSubheroLayout
    ? "absolute inset-[1.2%] rounded-[1.5rem] bg-[radial-gradient(circle_at_top,rgba(255,210,138,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,182,82,0.08),transparent_30%)] blur-xl"
    : fill
      ? "absolute inset-0 rounded-[1.4rem] bg-[radial-gradient(circle_at_top,rgba(255,210,138,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,182,82,0.10),transparent_28%)] blur-xl"
      : "absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(255,210,138,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,182,82,0.10),transparent_28%)] blur-xl";
  const boardFrameStyle = undefined;

  return (
    <div className={fill ? "relative h-full w-full overflow-hidden" : "relative mx-auto max-w-4xl"}>
      <div className={outerGlowClass} />

      <div className={wrapperClass}>
        <div className={innerClass}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,143,0.10),transparent_22%),linear-gradient(180deg,#2a1f18_0%,#17110e_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,182,82,0.08),transparent_24%)]" />

          <div className={`relative z-10 flex h-full items-center justify-center ${framePaddingClass}`}>
            <div className={boardWrapClass}>
              <div className={boardScaleClass}>
                <div className={`relative overflow-hidden rounded-[1.35rem] border border-[#6f5436] bg-[linear-gradient(180deg,#2a1f18_0%,#17110e_100%)] shadow-[0_18px_40px_rgba(0,0,0,0.28)] ${boardAspectClass}`} style={boardFrameStyle}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,143,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,182,82,0.08),transparent_24%)]" />
                  <div className={`absolute ${chromeInsetClass} rounded-[1rem] border border-white/5 bg-[linear-gradient(180deg,#231a15_0%,#15100d_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`} />

                  <div className={`absolute ${boardInsetClass} overflow-hidden rounded-[0.95rem] border border-[#8f714c] bg-[#18120f] shadow-[0_10px_18px_rgba(0,0,0,0.16)]`}>
                    {phase >= 5 ? (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,143,0.12),transparent_22%),linear-gradient(180deg,#2a1f18_0%,#17110e_100%)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,182,82,0.08),transparent_24%)]" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-[8%] text-center">
                          <div className="text-[clamp(8px,0.95vw,13px)] font-semibold uppercase tracking-[0.32em] text-[#d9b476]/78" style={cleanSans}>
                            house guest games
                          </div>
                          <div className="mt-[4%] text-[clamp(24px,6vw,72px)] leading-none text-[#fff1d5]" style={roundedDisplay}>
                            Five to Flip
                          </div>
                          <div className="mt-[3%] text-[clamp(8px,0.95vw,13px)] font-semibold uppercase tracking-[0.22em] text-[#f0d8ac]/78" style={cleanSans}>
                            guess · reveal · repeat
                          </div>
                        </div>
                      </div>
                    ) : (
                      <GameImageBoardScene row={0} col={0} rows={1} cols={1} image={GAME_IMAGE_LIBRARY[0]} />
                    )}
                  </div>

                  <div
                    className={`absolute ${boardInsetClass} grid ${gridGapClass}`}
                    style={{
                      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                      gridTemplateRows: "repeat(4, minmax(0, 1fr))",
                    }}
                  >
                    {Array.from({ length: total }, (_, index) => {
                      const isRevealed = revealed.includes(index);
                      return (
                        <div key={index} className="[perspective:1200px]">
                          <div
                            className="relative h-full w-full"
                            style={{
                              transformStyle: "preserve-3d",
                              transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
                              transitionProperty: "transform, opacity",
                              transitionDuration: "900ms, 240ms",
                              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1), ease",
                              transitionDelay: `${phase >= 4 ? index * 28 : 0}ms, ${phase >= 4 && isRevealed ? index * 28 + 700 : 0}ms`,
                              opacity: phase >= 4 && isRevealed ? 0 : 1,
                            }}
                          >
                            <div
                              className="absolute inset-0 overflow-hidden rounded-[0.82rem] border border-[#b58b55] bg-[radial-gradient(circle_at_top,rgba(255,231,178,0.18),transparent_30%),linear-gradient(180deg,#8d7965_0%,#6d5a4c_52%,#534236_100%)] shadow-[0_10px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                              style={{ backfaceVisibility: "hidden" }}
                            >
                              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_28%,transparent_72%,rgba(0,0,0,0.10)_100%)]" />
                              <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,211,120,0.24)_0%,rgba(255,211,120,0.10)_38%,transparent_70%)] blur-[1px]" />
                              <div
                                className="absolute inset-0 flex items-center justify-center text-[clamp(1.4rem,3vw,2.2rem)] font-black text-[#ffe5ad]"
                                style={{
                                  ...cleanSans,
                                  textShadow: "0 0 10px rgba(255,204,102,0.30), 0 0 22px rgba(255,170,70,0.18), 0 2px 0 rgba(92,55,24,0.55)",
                                }}
                              >
                                ?
                              </div>
                            </div>

                            <div
                              className="absolute inset-0 overflow-hidden rounded-[0.82rem] border border-[#8f714c] bg-[#18120f] shadow-[0_10px_18px_rgba(0,0,0,0.16)]"
                              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                            >
                              {phase < 4 ? <HeroTileArt slide={slides[activeSlideIndex]} /> : <div className="h-full w-full bg-transparent" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroRevealSubhero({ playOnce = false, onComplete = null }) {
  const rows = 3;
  const cols = 4;
  const total = rows * cols;
  const fullReveal = Array.from({ length: total }, (_, i) => i);
  const [phase, setPhase] = useState(0);
  const [revealed, setRevealed] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
      let cursor = 320;

      setPhase(0);
      setRevealed([]);
      setActiveSlideIndex(0);

      heroMoments.forEach((moment, index) => {
        addTimer(() => {
          if (cancelled) return;
          setPhase(index + 1);
          setActiveSlideIndex(moment.slide);
          setRevealed(moment.tiles);
        }, cursor);

        cursor += index === 1 ? 980 : 860;

        addTimer(() => {
          if (cancelled) return;
          setRevealed([]);
        }, cursor);

        cursor += index === 1 ? 560 : 500;
      });

      addTimer(() => {
        if (cancelled) return;
        setPhase(4);
        setRevealed(fullReveal);
      }, cursor + 140);

      addTimer(() => {
        if (cancelled) return;
        setPhase(5);
      }, cursor + 140 + 1180);

      cursor += playOnce ? 3200 : 3800;

      addTimer(() => {
        if (cancelled) return;
        if (playOnce) {
          onComplete?.();
          return;
        }
        runCycle();
      }, cursor);
    };

    runCycle();

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [playOnce, onComplete, total]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,143,0.10),transparent_22%),linear-gradient(180deg,#2a1f18_0%,#17110e_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,182,82,0.08),transparent_24%)]" />
      <div className="absolute inset-[7px] rounded-[1.72rem] border border-white/6 bg-[linear-gradient(180deg,#231a15_0%,#15100d_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" />

      <div className="absolute inset-[12px] overflow-hidden rounded-[1.48rem] border border-[#8f714c] bg-[#18120f] shadow-[0_10px_18px_rgba(0,0,0,0.16)]">
        {phase >= 5 ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,143,0.12),transparent_22%),linear-gradient(180deg,#2a1f18_0%,#17110e_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,182,82,0.08),transparent_24%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-[8%] text-center">
              <div className="text-[clamp(8px,0.95vw,13px)] font-semibold uppercase tracking-[0.32em] text-[#d9b476]/78" style={cleanSans}>
                house guest games
              </div>
              <div className="mt-[4%] text-[clamp(24px,6vw,72px)] leading-none text-[#fff1d5]" style={roundedDisplay}>
                Five to Flip
              </div>
              <div className="mt-[3%] text-[clamp(8px,0.95vw,13px)] font-semibold uppercase tracking-[0.22em] text-[#f0d8ac]/78" style={cleanSans}>
                guess · reveal · repeat
              </div>
            </div>
          </div>
        ) : (
          <GameImageBoardScene row={0} col={0} rows={1} cols={1} image={GAME_IMAGE_LIBRARY[0]} />
        )}
      </div>

      <div
        className="absolute inset-[12px] grid gap-[7px]"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: total }, (_, index) => {
          const isRevealed = revealed.includes(index);
          return (
            <div key={index} className="[perspective:1200px]">
              <div
                className="relative h-full w-full"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
                  transitionProperty: "transform, opacity",
                  transitionDuration: "900ms, 240ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1), ease",
                  transitionDelay: `${phase >= 4 ? index * 28 : 0}ms, ${phase >= 4 && isRevealed ? index * 28 + 700 : 0}ms`,
                  opacity: phase >= 4 && isRevealed ? 0 : 1,
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-[0.96rem] border border-[#b58b55] bg-[radial-gradient(circle_at_top,rgba(255,231,178,0.18),transparent_30%),linear-gradient(180deg,#8d7965_0%,#6d5a4c_52%,#534236_100%)] shadow-[0_10px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_28%,transparent_72%,rgba(0,0,0,0.10)_100%)]" />
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,211,120,0.24)_0%,rgba(255,211,120,0.10)_38%,transparent_70%)] blur-[1px]" />
                  <div
                    className="absolute inset-0 flex items-center justify-center text-[clamp(1.35rem,2.8vw,2rem)] font-black text-[#ffe5ad]"
                    style={{
                      ...cleanSans,
                      textShadow: "0 0 10px rgba(255,204,102,0.30), 0 0 22px rgba(255,170,70,0.18), 0 2px 0 rgba(92,55,24,0.55)",
                    }}
                  >
                    ?
                  </div>
                </div>

                <div
                  className="absolute inset-0 overflow-hidden rounded-[0.96rem] border border-[#8f714c] bg-[#18120f] shadow-[0_10px_18px_rgba(0,0,0,0.16)]"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  {phase < 4 ? <HeroTileArt slide={slides[activeSlideIndex]} /> : <div className="h-full w-full bg-transparent" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LandingExperience({ onEnter, introAlreadySeen = false, onIntroDismiss }) {
  const videoRef = useRef(null);
  const [introExiting, setIntroExiting] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(introAlreadySeen);
  const [videoReady, setVideoReady] = useState(false);

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
      setVideoReady(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const applyPlaybackRate = () => {
      video.playbackRate = 0.62;
    };

    const handleCanPlay = () => {
      setVideoReady(true);
    };

    const handleEnded = () => {
      setIntroExiting(true);
      window.setTimeout(() => {
        setIntroDismissed(true);
      }, 1100);
    };

    applyPlaybackRate();
    video.addEventListener("loadedmetadata", applyPlaybackRate);
    video.addEventListener("loadeddata", handleCanPlay);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", applyPlaybackRate);
      video.removeEventListener("loadeddata", handleCanPlay);
      video.removeEventListener("canplay", handleCanPlay);
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
          <img
            src={houseGuestAssets.tvRoom}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${videoReady ? "opacity-0" : "opacity-100"}`}
          />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={houseGuestAssets.heroVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={houseGuestAssets.tvRoom}
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

function HouseGamePreviewArt({ id }) {
  if (id === "five-to-flip") {
    return (
      <>
        <div className="absolute inset-0">
          <HeroRevealSubhero />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,30,0.76)_0%,rgba(8,20,30,0.20)_40%,rgba(8,20,30,0.74)_100%)]" />
      </>
    );
  }

  const config =
    id === "take-it-to-the-stage"
      ? {
          src: houseGuestAssets.takeItToTheStagePreview,
          alt: "Take It to the Stage concept preview",
          objectPosition: "50% 46%",
          chip: "concept preview",
          accentGlow: "rgba(250,219,78,0.18)",
          accentLine: "rgba(250,219,78,0.72)",
        }
      : {
          src: houseGuestAssets.singDownToLinkUpPreview,
          alt: "Sing Down to Link Up concept preview",
          objectPosition: "50% 40%",
          chip: "concept preview",
          accentGlow: "rgba(96,165,250,0.18)",
          accentLine: "rgba(120,190,255,0.72)",
        };

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
      <img
        src={config.src}
        alt={config.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: config.objectPosition }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,24,0.10)_0%,rgba(7,16,24,0.08)_24%,rgba(7,16,24,0.24)_50%,rgba(7,16,24,0.84)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[44%] bg-[linear-gradient(180deg,transparent_0%,rgba(7,16,24,0.16)_18%,rgba(7,16,24,0.88)_100%)]" />
      <div
        className="absolute left-1/2 top-[-8%] h-32 w-40 -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: config.accentGlow }}
      />
      <div
        className="absolute inset-x-6 bottom-5 h-[2px] rounded-full"
        style={{ backgroundColor: config.accentLine }}
      />
      <div className="absolute right-4 top-4 rounded-full border border-white/14 bg-[rgba(7,16,24,0.46)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/84 backdrop-blur" style={cleanSans}>
        {config.chip}
      </div>
    </div>
  );
}

function GamesBridgeSection({ onEnter }) {
  const [activeCard, setActiveCard] = useState(0);

  const previewGames = [
    {
      id: "five-to-flip",
      step: "01 · live now",
      title: "Five to Flip",
      body: "Five questions. One celeb. One hidden image.",
      accent: "gold",
    },
    {
      id: "take-it-to-the-stage",
      step: "02 · from the house",
      title: "Take It to the Stage",
      body: "Answer trivia, earn the roll, survive mic check.",
      accent: "rose",
    },
    {
      id: "sing-down-to-link-up",
      step: "03 · from the house",
      title: "Sing Down to Link Up",
      body: "Sing the prompt, buzz in, then solve the linked board.",
      accent: "blue",
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
              HOUSE GUEST HAS PLENTY OF GAMES.
            </div>
            <div className="mt-3 text-3xl leading-[0.98] text-white md:text-4xl" style={roundedDisplay}>
              Five to Flip is first. More could be next.
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 md:text-base" style={cleanSans}>
              The game room starts with one playable prototype, but the house can hold a whole slate. Think of these as coming attractions pulled from the same energy.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={onEnter}
                className="rounded-full bg-[#fadb4e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#173149] shadow-[0_14px_26px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:brightness-95"
                style={cleanSans}
              >
                enter the game room
              </button>
              <div className="rounded-full border border-white/14 bg-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/84 backdrop-blur" style={cleanSans}>
                one live · more previews
              </div>
            </div>
          </div>

          <div className="flex h-[34rem] flex-col gap-4 md:h-[38rem]" onMouseLeave={() => setActiveCard(0)}>
            {previewGames.map((card, index) => {
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
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-70"} ${
                      card.accent === "gold"
                        ? "bg-[radial-gradient(circle_at_top_left,rgba(250,219,78,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.00)_100%)]"
                        : card.accent === "rose"
                          ? "bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.12),transparent_28%)]"
                          : "bg-[radial-gradient(circle_at_bottom_left,rgba(96,165,250,0.12),transparent_30%)]"
                    }`}
                  />

                  {isActive ? <HouseGamePreviewArt id={card.id} /> : null}

                  <div className="relative z-10 flex h-full min-h-0 flex-col justify-between text-white">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/58" style={cleanSans}>{card.step}</div>

                    <div className="mt-4">
                      <div className={`leading-[0.94] transition-all duration-300 ${isActive ? "text-[#fadb4e]" : "text-white"} ${card.id === "five-to-flip" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`} style={card.id === "five-to-flip" ? showDisplay : roundedDisplay}>
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
            <div className="inline-flex items-center gap-3">
              <div className="h-[1px] w-10 bg-white/30" />
              <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70" style={cleanSans}>
                inside the game room
              </div>
              <div className="h-[1px] w-10 bg-white/30" />
            </div>

            <div className="mt-4 max-w-xl">
              <div className="text-2xl leading-[1.1] text-white md:text-3xl" style={roundedDisplay}>
                A good game gets the room talking.
              </div>
              <div className="mt-2 text-2xl leading-[1.1] text-[#fadb4e] md:text-3xl" style={showDisplay}>
                A better one gets everybody involved.
              </div>
            </div>
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
                  <div className="relative aspect-[16/9] overflow-hidden rounded-none bg-[#0b1620] shadow-[0_0_34px_rgba(250,219,78,0.16)] contrast-[1.08] brightness-[1.05]">
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

function TVZoomTransition({ game, onComplete }) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState("zoom");

  useEffect(() => {
    const startTimer = window.setTimeout(() => setActive(true), 30);
    const phaseTimer = window.setTimeout(() => setPhase("hero_reveal"), 1900);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(phaseTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden bg-[#09131d]">
      {phase === "zoom" ? (
        <>
          <div
            className={`absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              active ? "bg-black/70 backdrop-blur-sm" : "bg-black/0"
            }`}
          />
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              active ? "scale-[1.08]" : "scale-100"
            }`}
            style={{ backgroundImage: `url(${houseGuestAssets.gameRoomWall})` }}
          />

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div
              className={`relative w-full max-w-5xl transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                active ? "scale-[2.65] opacity-100" : "scale-[0.82] opacity-96"
              }`}
            >
              <div className="absolute inset-x-[8%] bottom-[-2.2rem] h-10 rounded-full bg-black/36 blur-2xl md:bottom-[-2.6rem] md:h-12" />

              <div className="relative z-20 mx-auto w-full max-w-4xl md:mb-[-0.6rem]">
                <div className="relative rounded-none border-[2px] border-[#111417] bg-[#0f1419] p-[3px] shadow-[0_22px_60px_rgba(0,0,0,0.35)] md:border-[3px]">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-none bg-[#0b1620] shadow-[0_0_34px_rgba(250,219,78,0.16)] contrast-[1.08] brightness-[1.05]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${game?.accent || "from-[#dcc25f] via-[#d8b650] to-[#b98a34]"} opacity-95`} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_24%),linear-gradient(180deg,rgba(8,20,30,0.10)_0%,rgba(8,20,30,0.42)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,transparent_16%,transparent_84%,rgba(0,0,0,0.16)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,transparent_8%,transparent_92%,rgba(255,255,255,0.05)_100%)]" />
                    <div className={`absolute inset-0 bg-black transition-opacity duration-[1300ms] ${active ? "opacity-78" : "opacity-0"}`} />

                    <div className="relative flex h-full flex-col justify-between p-4 text-white md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex rounded-full border border-white/16 bg-black/18 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/82 backdrop-blur" style={cleanSans}>
                          {game?.eyebrow || "guessing game"}
                        </div>
                        <div className="rounded-full border border-[#fadb4e]/40 bg-[#fadb4e]/16 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#fff3b0] backdrop-blur" style={cleanSans}>
                          entering game
                        </div>
                      </div>

                      <div className="max-w-[82%]">
                        <div className="text-4xl leading-[0.9] text-[#fadb4e] md:text-6xl" style={showDisplay}>{game?.title || "Five to Flip"}</div>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-white/86 md:text-base" style={cleanSans}>
                          Step into the screen.
                        </p>
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        <div className="h-[2px] w-20 bg-white/28" />
                        <div className="rounded-full border border-white/16 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/82 backdrop-blur" style={cleanSans}>
                          loading room energy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`relative z-10 mx-auto mt-[-0.5rem] w-full max-w-5xl transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "opacity-0 scale-[1.08]" : "opacity-100 scale-100"}`}>
                <img
                  src={houseGuestAssets.tvStand}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none block w-full object-contain select-none"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-[#09131d]">
          <HeroReveal fill playOnce onComplete={onComplete} />
        </div>
      )}
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

const GAME_IMAGE_LIBRARY = [
  {
    id: "hot-comb",
    filename: "hot comb.png",
    label: "Hot Comb",
    answers: ["hot comb", "hotcomb"],
  },
  {
    id: "guac",
    filename: "guac.png",
    label: "Avocado",
    answers: ["avocado", "guac", "guacamole"],
  },
  {
    id: "hood-marg",
    filename: "hood marg.png",
    label: "Hood Margarita",
    answers: ["hood margarita", "margarita", "hood marg"],
  },
  {
    id: "smoothie",
    filename: "smoothie.png",
    label: "Smoothie",
    answers: ["smoothie", "erewhon smoothie", "hailey bieber smoothie", "hailey smoothie"],
  },
  {
    id: "earl",
    filename: "earl.png",
    label: "Rooster",
    answers: ["rooster", "earl"],
  },
];

function GamePageMarqueeTitle({ children }) {
  return (
    <div className="relative inline-flex items-center justify-center px-2 py-1">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-y-[4px] scale-[1.02] blur-[2px] opacity-65"
        style={{
          ...cleanSans,
          fontSize: "clamp(2rem,4.5vw,3.2rem)",
          fontWeight: 900,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#7a3f13",
          textShadow: "0 8px 24px rgba(255,159,58,0.22)",
        }}
      >
        {children}
      </div>

      <div
        className="relative"
        style={{
          ...cleanSans,
          fontSize: "clamp(2rem,4.5vw,3.2rem)",
          fontWeight: 900,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "2px #8f4814",
          backgroundImage:
            "radial-gradient(circle at 8px 8px, rgba(255,248,220,0.95) 0 2px, transparent 2.6px), linear-gradient(180deg, #ffd06f 0%, #ffb347 34%, #ff9329 68%, #d96a14 100%)",
          backgroundSize: "16px 16px, 100% 100%",
          backgroundPosition: "0 0, 0 0",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          textShadow: "0 1px 0 rgba(255,244,212,0.9), 0 3px 0 rgba(166,84,17,0.65), 0 0 18px rgba(255,174,70,0.26)",
          filter: "drop-shadow(0 0 12px rgba(255,171,64,0.18))",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function gameImagePath(filename) {
  return assetPath(filename);
}

function drawRandomGameImage(excludeId = null) {
  const pool = excludeId ? GAME_IMAGE_LIBRARY.filter((image) => image.id !== excludeId) : GAME_IMAGE_LIBRARY;
  return pool[Math.floor(Math.random() * pool.length)];
}

function normalizeGameImageGuess(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
}

function GameImageBoardScene({ row, col, rows, cols, image }) {
  if (image?.kind === "title-board") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[0.78rem] bg-[#17110d]">
        <div
          className="absolute"
          style={{
            width: `${cols * 100}%`,
            height: `${rows * 100}%`,
            left: `-${col * 100}%`,
            top: `-${row * 100}%`,
            background:
              "radial-gradient(circle_at_top,rgba(255,214,143,0.12),transparent_22%), linear-gradient(180deg,#2a1f18_0%,#17110e_100%)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,182,82,0.08),transparent_24%)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-[8%] text-center">
            <div className="text-[clamp(8px,0.95vw,13px)] font-semibold uppercase tracking-[0.32em] text-[#d9b476]/78" style={cleanSans}>
              house guest games
            </div>
            <div className="mt-[4%] text-[clamp(24px,6vw,72px)] leading-none text-[#fff1d5]" style={roundedDisplay}>
              Five to Flip
            </div>
            <div className="mt-[3%] text-[clamp(8px,0.95vw,13px)] font-semibold uppercase tracking-[0.22em] text-[#f0d8ac]/78" style={cleanSans}>
              guess · reveal · repeat
            </div>
          </div>
        </div>
      </div>
    );
  }

  const imageSrc = gameImagePath(image.filename);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[0.78rem] bg-[#17110d]">
      <div
        className="absolute"
        style={{
          width: `${cols * 100}%`,
          height: `${rows * 100}%`,
          left: `-${col * 100}%`,
          top: `-${row * 100}%`,
          backgroundImage: `url("${imageSrc}")`,
          backgroundSize: `${cols * 100}% ${rows * 100}%`,
          backgroundPosition: `${(col / Math.max(cols - 1, 1)) * 100}% ${(row / Math.max(rows - 1, 1)) * 100}%`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#17110d",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.10)_100%)]" />
      </div>
    </div>
  );
}

function GamePageRevealPanel({ rows, cols, revealed, image, aspectClass = "aspect-square", tileDelay = 0 }) {
  const total = rows * cols;

  return (
    <div className={`relative overflow-hidden rounded-[1.35rem] border border-[#6f5436] bg-[linear-gradient(180deg,#2a1f18_0%,#17110e_100%)] shadow-[0_18px_40px_rgba(0,0,0,0.28)] ${aspectClass}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,143,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,182,82,0.08),transparent_24%)]" />
      <div className="absolute inset-[10px] rounded-[1rem] border border-white/5 bg-[linear-gradient(180deg,#231a15_0%,#15100d_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" />

      <div
        className="absolute inset-[18px] grid gap-[8px]"
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
                <div
                  className="absolute inset-0 overflow-hidden rounded-[0.82rem] border border-[#b58b55] bg-[radial-gradient(circle_at_top,rgba(255,231,178,0.18),transparent_30%),linear-gradient(180deg,#8d7965_0%,#6d5a4c_52%,#534236_100%)] shadow-[0_10px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_28%,transparent_72%,rgba(0,0,0,0.10)_100%)]" />
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,211,120,0.24)_0%,rgba(255,211,120,0.10)_38%,transparent_70%)] blur-[1px]" />
                  <div
                    className="absolute inset-0 flex items-center justify-center text-[clamp(1.4rem,3vw,2.2rem)] font-black text-[#ffe5ad]"
                    style={{
                      ...cleanSans,
                      textShadow: "0 0 10px rgba(255,204,102,0.30), 0 0 22px rgba(255,170,70,0.18), 0 2px 0 rgba(92,55,24,0.55)",
                    }}
                  >
                    ?
                  </div>
                </div>

                <div
                  className="absolute inset-0 overflow-hidden rounded-[0.82rem] border border-[#8f714c] bg-[#18120f] shadow-[0_10px_18px_rgba(0,0,0,0.16)]"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <GameImageBoardScene row={row} col={col} rows={rows} cols={cols} image={image} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GamePagePhoneShell({ title, subtitle, children, tilt = 0 }) {
  return (
    <div className="flex justify-center xl:block" style={{ transform: `rotate(${tilt}deg)` }}>
      <div className="relative w-[260px] md:w-[280px] xl:w-[260px]">
        <div className="relative rounded-[2.6rem] bg-[linear-gradient(180deg,#151313_0%,#090909_100%)] p-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          <div className="absolute left-1/2 top-[6px] h-[6px] w-[70px] -translate-x-1/2 rounded-full bg-black/70" />
          <div className="absolute left-[-3px] top-[120px] h-[40px] w-[4px] rounded bg-black/70" />
          <div className="absolute left-[-3px] top-[170px] h-[30px] w-[4px] rounded bg-black/70" />
          <div className="absolute right-[-3px] top-[130px] h-[50px] w-[4px] rounded bg-black/70" />

          <div className="rounded-[2rem] border border-[#2f2119] bg-[radial-gradient(circle_at_top,rgba(255,214,148,0.07),transparent_26%),linear-gradient(180deg,#211712_0%,#16100d_52%,#0f0b0a_100%)] px-4 py-5 text-white h-[520px] flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="text-[10px] uppercase tracking-[0.26em] text-[#d7b98b]/72" style={cleanSans}>{title}</div>
            <div className="mt-3 text-sm text-[#f0e2ce]/82" style={cleanSans}>{subtitle}</div>
            <div className="mt-4 space-y-3 flex-1 overflow-y-auto pr-1">{children}</div>
            <div className="mt-4 flex justify-center">
              <div className="h-[5px] w-[80px] rounded-full bg-[#f0d3a2]/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GamePageSurfaceNote({ children }) {
  return (
    <div className="rounded-[0.95rem] border border-[#5a4131] bg-[linear-gradient(180deg,rgba(255,248,238,0.05)_0%,rgba(255,248,238,0.02)_100%)] px-3 py-3 text-sm leading-6 text-[#f0deca]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" style={cleanSans}>
      {children}
    </div>
  );
}

function GamePageActionButton({ children, variant = "secondary", onClick }) {
  const styles = {
    primary: "border-[#e6a75d] bg-[linear-gradient(180deg,#f2b86c_0%,#cf6f29_100%)] text-[#fff8ef] shadow-[0_12px_22px_rgba(130,62,20,0.30),0_0_20px_rgba(241,166,75,0.12),inset_0_1px_0_rgba(255,255,255,0.18)]",
    accent: "border-[#e2bf83] bg-[linear-gradient(180deg,#f7d99a_0%,#e0a245_100%)] text-[#3d2412] shadow-[0_12px_22px_rgba(130,89,32,0.22),0_0_18px_rgba(244,209,135,0.10),inset_0_1px_0_rgba(255,255,255,0.18)]",
    secondary: "border-[#735440] bg-[linear-gradient(180deg,#412f25_0%,#261b15_100%)] text-[#f2e2cf] shadow-[0_8px_16px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.06)]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[0.95rem] border py-2.5 text-sm font-semibold uppercase tracking-[0.12em] transition hover:brightness-[1.04] ${styles[variant]}`}
      style={cleanSans}
    >
      {children}
    </button>
  );
}

function GamePageChip({ children, tone = "neutral" }) {
  const tones = {
    neutral: "border-[#6b513e] bg-[rgba(255,248,238,0.05)] text-[#e9d5bd]",
    warm: "border-[#d0a264] bg-[rgba(240,172,83,0.10)] text-[#f4d79d]",
    cream: "border-[#e2c59a] bg-[rgba(255,248,238,0.82)] text-[#6a4022]",
  };

  return (
    <div className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${tones[tone]}`} style={cleanSans}>
      {children}
    </div>
  );
}

function GamePageTextInput({ value, onChange, onSubmit, placeholder }) {
  return (
    <div className="rounded-[1rem] border border-[#5f4431] bg-[linear-gradient(180deg,rgba(255,250,242,0.06)_0%,rgba(255,250,242,0.03)_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
        placeholder={placeholder}
        className="w-full rounded-[0.85rem] border border-[#77563f] bg-[rgba(255,248,238,0.06)] px-3 py-3 text-sm text-[#f7eddc] outline-none placeholder:text-[#cdb79a]/60"
        style={cleanSans}
      />
    </div>
  );
}

function GamePageCelebPreviewCard({ name }) {
  return (
    <div className="rounded-[1.15rem] border border-[#9b7448] bg-[radial-gradient(circle_at_top,rgba(255,216,149,0.12),transparent_26%),linear-gradient(180deg,rgba(66,46,33,0.96)_0%,rgba(31,21,17,0.98)_100%)] p-3.5 shadow-[0_14px_28px_rgba(0,0,0,0.24)]">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[9px] uppercase tracking-[0.22em] text-[#d9b476]/85" style={cleanSans}>
          private celeb card
        </div>
        <GamePageChip tone="warm">holder only</GamePageChip>
      </div>
      <div className="mt-2.5 text-[12px] leading-5 text-[#f0deca]/68" style={cleanSans}>
        Keep this hidden from the other player while they ask questions.
      </div>
      <div className="mt-3 rounded-[0.95rem] border border-[#5f4431] bg-[linear-gradient(180deg,rgba(255,250,242,0.06)_0%,rgba(255,250,242,0.03)_100%)] px-4 py-5 text-center text-[2rem] text-[#f7eddc] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" style={roundedDisplay}>
        {name}
      </div>
    </div>
  );
}

function GamePageMatchFormatPicker({ format, onChange }) {
  return (
    <div className="mt-4 rounded-[1rem] border border-[#dfe5eb] bg-[#fbfcfd] px-4 py-3" style={cleanSans}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7f6d58]">match length</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {formats.map((item) => {
          const active = item.id === format;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`rounded-[0.95rem] border px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition ${
                active
                  ? "border-[#d5a15a] bg-[linear-gradient(180deg,#f6d392_0%,#e3a347_100%)] text-[#4b2b16] shadow-[0_8px_16px_rgba(149,94,35,0.15)]"
                  : "border-[#dbcfc0] bg-white text-[#6b5846] hover:bg-[#f8f2ea]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GamePageRulesOverlay({ open, onClose, format }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-[1.8rem] border border-[#b98d60] bg-[radial-gradient(circle_at_top,rgba(255,210,138,0.14),transparent_24%),linear-gradient(180deg,#5b4030_0%,#2a1d17_100%)] p-5 text-[#f7eddc] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d8b57b]" style={cleanSans}>Five to Flip</div>
            <div className="mt-2 text-4xl leading-none text-[#fff2da]" style={roundedDisplay}>Rules</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7b5a41] bg-[rgba(255,248,238,0.05)] text-xl text-[#f6dfb5] transition hover:bg-[rgba(255,248,238,0.10)]"
            aria-label="Close rules"
          >
            ×
          </button>
        </div>

        <div className="mt-3 text-xs leading-6 text-[#e8d3b2]/78" style={cleanSans}>
          Inspired by <span className="text-[#ffdca1] font-semibold">Face Card</span> from <span className="text-[#ffdca1] font-semibold">House Guest</span>.
        </div>

        <div className="mt-5 space-y-4 text-sm leading-7 text-[#f2dfc8]" style={cleanSans}>
          <div className="rounded-[1rem] border border-[#5f4431] bg-[rgba(255,248,238,0.04)] px-4 py-3">
            Each round starts with a <span className="text-[#ffdca1] font-semibold">Holder</span> and a <span className="text-[#ffdca1] font-semibold">Guesser</span>. The Holder privately sees the celeb and answers the Guesser’s questions out loud.
          </div>

          <div className="rounded-[1rem] border border-[#5f4431] bg-[rgba(255,248,238,0.04)] px-4 py-3">
            The Guesser can ask up to <span className="text-[#ffdca1] font-semibold">5 questions</span>, then makes <span className="text-[#ffdca1] font-semibold">one celeb guess</span>. The Holder confirms whether that celeb guess is correct or wrong.
          </div>

          <div className="rounded-[1rem] border border-[#5f4431] bg-[rgba(255,248,238,0.04)] px-4 py-3">
            If the celeb guess is <span className="text-[#ffdca1] font-semibold">correct</span>, the <span className="text-[#ffdca1] font-semibold">Guesser</span> earns the image guess. Reveal tiles based on question count: <span className="text-[#ffdca1] font-semibold">1–2 questions = 4 tiles</span>, <span className="text-[#ffdca1] font-semibold">3 questions = 3 tiles</span>, <span className="text-[#ffdca1] font-semibold">4–5 questions = 2 tiles</span>.
          </div>

          <div className="rounded-[1rem] border border-[#5f4431] bg-[rgba(255,248,238,0.04)] px-4 py-3">
            If the celeb guess is <span className="text-[#ffdca1] font-semibold">wrong</span>, reveal <span className="text-[#ffdca1] font-semibold">1 tile</span> and the <span className="text-[#ffdca1] font-semibold">Holder</span> earns the image guess instead.
          </div>

          <div className="rounded-[1rem] border border-[#5f4431] bg-[rgba(255,248,238,0.04)] px-4 py-3">
            The player who earns the image guess types the answer on their phone. The round ends only when the image is guessed <span className="text-[#ffdca1] font-semibold">correctly</span>.
          </div>

          <div className="rounded-[1rem] border border-[#5f4431] bg-[rgba(255,248,238,0.04)] px-4 py-3">
            If the image guess is <span className="text-[#ffdca1] font-semibold">wrong</span>, roles fully switch, a new celeb is assigned, the 5-question allowance resets, and play continues on the <span className="text-[#ffdca1] font-semibold">same partially revealed image</span>.
          </div>

          <div className="rounded-[1rem] border border-[#5f4431] bg-[rgba(255,248,238,0.04)] px-4 py-3">
            Match length can be <span className="text-[#ffdca1] font-semibold">1, 3, or 5 rounds</span>. Whoever wins the most rounds wins the match, and roles swap between rounds. Current selection: <span className="text-[#ffdca1] font-semibold">{format === 1 ? "1 round" : `${format} rounds`}</span>.
          </div>
        </div>
      </div>
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
  const [status, setStatus] = useState("Questions used: 0 of 5.");
  const [flipped, setFlipped] = useState([]);
  const [imageGuessWindow, setImageGuessWindow] = useState(null);
  const [showSolvedBoard, setShowSolvedBoard] = useState(false);
  const [currentCeleb, setCurrentCeleb] = useState(() => drawRandomCeleb());
  const [currentImage, setCurrentImage] = useState(() => drawRandomGameImage());
  const [showCelebPeek, setShowCelebPeek] = useState(false);
  const [celebGuessPending, setCelebGuessPending] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [imageGuessInput, setImageGuessInput] = useState("");
  const [transitionGame, setTransitionGame] = useState(null);
  const [gamePageMounted, setGamePageMounted] = useState(false);
  const roundAdvanceTimeoutRef = useRef(null);

  const tileCount = BOARD_TILE_COUNT;
  const boardSize = Math.sqrt(tileCount);
  const isImageGuessPhase = imageGuessWindow !== null;
  const currentAnswerAliases = currentImage?.answers || [];
  const requiredWins = Math.ceil(format / 2);
  const winningScore = Math.max(score.A, score.B);
  const phaseLabel = showSolvedBoard
    ? winningScore >= requiredWins
      ? "match result"
      : "round result"
    : isImageGuessPhase
      ? "image guess"
      : celebGuessPending
        ? "celeb confirmation"
        : "question phase";

  const boardPrompt = showSolvedBoard
    ? winningScore >= requiredWins
      ? "MATCH WON"
      : "ROUND WON"
    : isImageGuessPhase
      ? `PLAYER ${imageGuessWindow}, ENTER THE IMAGE ANSWER`
      : celebGuessPending
        ? `PLAYER ${holder}, CONFIRM THE CELEB GUESS`
        : "HOLDER: ANSWER THE QUESTIONS";

  const boardSubPrompt = showSolvedBoard
    ? winningScore >= requiredWins
      ? "The match is complete."
      : "Full reveal stays on screen before the next round."
    : isImageGuessPhase
      ? `Only Player ${imageGuessWindow} can type the image answer.`
      : celebGuessPending
        ? `Waiting on Player ${holder}.`
        : null;

  const playerARole = holder === "A" ? "Holder" : "Guesser";
  const playerBRole = holder === "B" ? "Holder" : "Guesser";
  const questionDots = Array.from({ length: 5 }, (_, i) => i + 1);

  useEffect(() => {
    if (view !== "library") return;

    const interval = window.setInterval(() => {
      setSelectedGameIndex((prev) => (prev + 1) % gameLibrary.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [view]);

  useEffect(() => {
    return () => {
      if (roundAdvanceTimeoutRef.current) {
        window.clearTimeout(roundAdvanceTimeoutRef.current);
        roundAdvanceTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (view === "game") {
      setGamePageMounted(true);
    }
  }, [view]);

  const resetTurn = () => {
    setQuestionsUsed(0);
    setImageGuessWindow(null);
    setShowSolvedBoard(false);
    setShowCelebPeek(false);
    setCelebGuessPending(false);
    setImageGuessInput("");
    setStatus("Questions used: 0 of 5.");
  };

  const resetMatch = (nextFormat = format) => {
    if (roundAdvanceTimeoutRef.current) {
      window.clearTimeout(roundAdvanceTimeoutRef.current);
      roundAdvanceTimeoutRef.current = null;
    }
    setFormat(nextFormat);
    setRound(1);
    setScore({ A: 0, B: 0 });
    setActivePlayer("B");
    setHolder("A");
    setQuestionsUsed(0);
    setFlipped([]);
    setImageGuessWindow(null);
    setShowSolvedBoard(false);
    setShowCelebPeek(false);
    setCelebGuessPending(false);
    setImageGuessInput("");
    setStatus("Questions used: 0 of 5.");
    setCurrentCeleb(drawRandomCeleb());
    setCurrentImage(drawRandomGameImage());
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
    if (questionsUsed >= 5 || imageGuessWindow || showSolvedBoard || celebGuessPending) return;
    const next = questionsUsed + 1;
    setQuestionsUsed(next);
    setStatus(next === 5 ? "Questions used: 5 of 5. The guesser must guess the celeb now." : `Questions used: ${next} of 5.`);
  };

  const handleReadyToGuess = () => {
    if (imageGuessWindow || showSolvedBoard || celebGuessPending) return;
    setCelebGuessPending(true);
    setStatus(`Celeb guess spoken. Waiting on Player ${holder} to confirm.`);
  };

  const onCorrectCelebGuess = () => {
    if (showSolvedBoard) return;
    setCelebGuessPending(false);
    setImageGuessInput("");
    let revealCount = 2;
    if (questionsUsed <= 2) revealCount = 4;
    else if (questionsUsed === 3) revealCount = 3;
    flipRandomTiles(revealCount);
    setImageGuessWindow(activePlayer);
    setStatus(`Celeb guess correct. Player ${activePlayer} now has the image guess.`);
  };

  const onWrongCelebGuess = () => {
    if (showSolvedBoard) return;
    setCelebGuessPending(false);
    setImageGuessInput("");
    flipRandomTiles(1);
    const other = activePlayer === "A" ? "B" : "A";
    setImageGuessWindow(other);
    setStatus(`Celeb guess wrong. 1 tile revealed. Player ${other} now has the image guess.`);
  };

  const awardRound = (player) => {
    if (roundAdvanceTimeoutRef.current) {
      window.clearTimeout(roundAdvanceTimeoutRef.current);
      roundAdvanceTimeoutRef.current = null;
    }

    const nextScore = { ...score, [player]: score[player] + 1 };
    const nextRoundNumber = round + 1;
    const nextHolder = holder === "A" ? "B" : "A";
    const nextActivePlayer = activePlayer === "A" ? "B" : "A";

    setScore(nextScore);
    setShowSolvedBoard(true);
    setImageGuessWindow(null);
    setShowCelebPeek(false);
    setCelebGuessPending(false);
    setImageGuessInput("");

    if (nextScore[player] >= requiredWins) {
      setStatus(`Player ${player} guessed the image and wins the match.`);
      return;
    }

    setStatus(`Player ${player} wins the round. Full reveal stays up briefly.`);

    roundAdvanceTimeoutRef.current = window.setTimeout(() => {
      roundAdvanceTimeoutRef.current = null;
      setRound(nextRoundNumber);
      setFlipped([]);
      setShowSolvedBoard(false);
      setHolder(nextHolder);
      setActivePlayer(nextActivePlayer);
      setQuestionsUsed(0);
      setImageGuessWindow(null);
      setCelebGuessPending(false);
      setImageGuessInput("");
      setCurrentCeleb((prev) => drawRandomCeleb(prev?.name));
      setCurrentImage((prev) => drawRandomGameImage(prev?.id));
      setStatus(`Round ${nextRoundNumber} begins. Roles swapped. New celeb assigned.`);
    }, 7000);
  };

  const missImageGuess = () => {
    if (showSolvedBoard) return;
    const nextHolder = holder === "A" ? "B" : "A";
    const nextActivePlayer = activePlayer === "A" ? "B" : "A";
    setHolder(nextHolder);
    setActivePlayer(nextActivePlayer);
    resetTurn();
    setCurrentCeleb((prev) => drawRandomCeleb(prev?.name));
    setStatus("Image guess wrong. Roles switched. Same image stays in play.");
  };

  const submitImageGuess = (player) => {
    if (imageGuessWindow !== player || showSolvedBoard) return;
    const normalizedInput = normalizeGameImageGuess(imageGuessInput);

    if (!normalizedInput) {
      setStatus(`Player ${player}, enter an image answer on your phone.`);
      return;
    }

    const isCorrect = currentAnswerAliases.some((answer) => normalizeGameImageGuess(answer) === normalizedInput);

    if (isCorrect) {
      awardRound(player);
    } else {
      setImageGuessInput("");
      missImageGuess();
    }
  };

  const peekCelebCard = () => {
    if (!showSolvedBoard) setShowCelebPeek(true);
  };

  const hideCelebCard = () => {
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
    if (game.id === "five-to-flip") {
      setTransitionGame(game);
      setView("transition");
    }
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Anton&family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap'); html, body, #root { margin: 0; min-height: 100%; } body { overflow-x: hidden; background: #f3f7f9; }`}</style>
      <div
        className={`min-h-screen overflow-hidden text-[#173149] ${
          view === "library"
            ? "bg-transparent"
            : view === "game"
              ? "bg-[linear-gradient(180deg,#f7efe4_0%,#efe5d7_42%,#e7dccf_100%)]"
              : "bg-[linear-gradient(180deg,#f3f7f9_0%,#eaf1f4_100%)]"
        }`}
        style={view === "library" ? { backgroundImage: `url(${houseGuestAssets.gameRoomWall})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } : undefined}
      >
        <div className={`pointer-events-none absolute inset-0 ${view === "library" ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.20),transparent_26%),radial-gradient(circle_at_left,rgba(250,219,78,0.06),transparent_30%),radial-gradient(circle_at_right,rgba(157,204,226,0.06),transparent_32%)]" : view === "game" ? "bg-[radial-gradient(circle_at_top,rgba(255,208,128,0.22),transparent_24%),radial-gradient(circle_at_center,rgba(104,57,28,0.08),transparent_48%),radial-gradient(circle_at_bottom,rgba(86,48,26,0.10),transparent_36%)]" : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.94),transparent_26%),radial-gradient(circle_at_left,rgba(250,219,78,0.10),transparent_30%),radial-gradient(circle_at_right,rgba(157,204,226,0.10),transparent_32%)]"}`} />
        {view === "game" ? (
          <>
            <div className="pointer-events-none absolute inset-x-[10%] top-[10rem] h-[28rem] rounded-full bg-[rgba(255,192,110,0.18)] blur-3xl" />
            <div className="pointer-events-none absolute left-[-8%] top-[26%] h-[26rem] w-[26rem] rounded-full bg-[rgba(102,55,29,0.10)] blur-3xl" />
            <div className="pointer-events-none absolute right-[-6%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-[rgba(126,65,33,0.08)] blur-3xl" />
          </>
        ) : (
          <div className={`pointer-events-none absolute -top-16 left-1/2 h-[24rem] w-[64rem] -translate-x-1/2 rounded-full blur-3xl ${view === "library" ? "bg-white/12" : "bg-white/45"}`} />
        )}

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

          {view === "transition" ? (
            <TVZoomTransition
              game={transitionGame || gameLibrary[selectedGameIndex]}
              onComplete={() => {
                setView("game");
              }}
            />
          ) : null}

          {view === "game" ? (
            <div className={`transition-opacity duration-300 ${gamePageMounted ? "opacity-100" : "opacity-0"}`}>
              <div className="mb-6 flex items-center justify-between rounded-[1.8rem] border border-[#c9b39a]/55 bg-[linear-gradient(180deg,rgba(255,250,244,0.86)_0%,rgba(247,239,228,0.82)_100%)] px-5 py-4 shadow-[0_12px_28px_rgba(80,48,25,0.08)] backdrop-blur">
                <div>
                  <BrandWordmark srcOverride={houseGuestAssets.brandLockupGamesHorizontal} className="h-8" />
                  <div className="mt-1 text-3xl text-[#362116]" style={roundedDisplay}>Five to Flip</div>
                </div>
                <button
                  type="button"
                  onClick={() => setView("library")}
                  className="rounded-full border border-[#c7ab87] bg-[rgba(255,245,230,0.88)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6e4423] shadow-[0_6px_16px_rgba(80,48,25,0.06)]"
                  style={cleanSans}
                >
                  back
                </button>
              </div>

              <div className="flex flex-col gap-8 items-center">
                <div className="w-full max-w-3xl rounded-[1.9rem] border border-[#d8dde3] bg-[linear-gradient(180deg,#f7f8fa_0%,#edf1f4_100%)] p-4 shadow-[0_18px_40px_rgba(15,23,32,0.08)]">
                  <div className="rounded-[1.45rem] border border-[#dce2e8] bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fa_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                    <div className="relative rounded-[1.35rem] border border-[#4d3724] bg-[radial-gradient(circle_at_top,rgba(255,208,128,0.10),transparent_22%),linear-gradient(180deg,#2a1f18_0%,#17110e_100%)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                      <button
                        type="button"
                        onClick={() => setShowRules(true)}
                        className="absolute right-5 top-5 rounded-full border border-[#8b6642] bg-[rgba(255,248,238,0.08)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f2d49a] shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition hover:bg-[rgba(255,248,238,0.12)]"
                        style={cleanSans}
                      >
                        rules
                      </button>

                      <div className="text-center">
                        <GamePageMarqueeTitle>Five to Flip</GamePageMarqueeTitle>

                        <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d9b476]/76" style={cleanSans}>
                          questions used
                        </div>
                        <div className="mt-2 flex justify-center gap-2.5">
                          {questionDots.map((step) => {
                            const active = questionsUsed >= step;
                            return (
                              <div
                                key={step}
                                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold transition ${active ? "border-[#efc26a] bg-[#efc26a]/18 text-[#f5d79b] shadow-[0_0_16px_rgba(239,194,106,0.18)]" : "border-white/18 bg-white/6 text-white/60"}`}
                                style={cleanSans}
                              >
                                {step}
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-5 text-[clamp(1rem,2.2vw,1.6rem)] font-black uppercase tracking-[0.03em] text-[#f7d899]" style={cleanSans}>
                          {boardPrompt}
                        </div>
                        {boardSubPrompt ? (
                          <div className="mt-2 text-sm text-white/70" style={cleanSans}>
                            {boardSubPrompt}
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-6">
                        <GamePageRevealPanel
                          rows={boardSize}
                          cols={boardSize}
                          revealed={showSolvedBoard ? Array.from({ length: tileCount }, (_, i) => i) : flipped}
                          image={currentImage}
                          aspectClass="aspect-square"
                        />
                      </div>

                      <div className="mt-5 grid gap-3 md:grid-cols-3">
                        <div className="rounded-[0.95rem] border border-white/10 bg-white/6 px-4 py-3 text-center">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#cba86b]" style={cleanSans}>holder</div>
                          <div className="mt-1 text-lg text-[#f5ead7]" style={roundedDisplay}>Player {holder}</div>
                        </div>
                        <div className="rounded-[0.95rem] border border-white/10 bg-white/6 px-4 py-3 text-center">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#cba86b]" style={cleanSans}>round</div>
                          <div className="mt-1 text-lg text-[#f5ead7]" style={roundedDisplay}>{round}</div>
                        </div>
                        <div className="rounded-[0.95rem] border border-white/10 bg-white/6 px-4 py-3 text-center">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#cba86b]" style={cleanSans}>match</div>
                          <div className="mt-1 text-lg text-[#f5ead7]" style={roundedDisplay}>{format === 1 ? "1 round" : `${format} rounds`}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-[1rem] border border-[#dfe5eb] bg-[#fbfcfd] px-4 py-3 text-[#465261]" style={cleanSans}>
                      <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7b8896]">
                        <div>phase: {phaseLabel}</div>
                        <div>questions: {questionsUsed}/5</div>
                      </div>
                      <div className="mt-2 text-sm leading-6">
                        {status}
                      </div>
                    </div>

                    <GamePageMatchFormatPicker format={format} onChange={resetMatch} />
                  </div>
                </div>

                <div className="flex w-full max-w-4xl justify-between gap-6">
                  <GamePagePhoneShell tilt={-4} title="Player A Phone" subtitle={playerARole}>
                    {holder === "A" ? (
                      <>
                        <GamePageActionButton variant="accent" onClick={peekCelebCard}>Show Celeb</GamePageActionButton>
                        <GamePageActionButton variant="secondary" onClick={hideCelebCard}>Hide</GamePageActionButton>
                        {showCelebPeek && currentCeleb ? <GamePageCelebPreviewCard name={currentCeleb.name} /> : null}
                      </>
                    ) : null}

                    {isImageGuessPhase ? (
                      imageGuessWindow === "A" ? (
                        <>
                          <GamePageSurfaceNote>
                            You earned the image guess. Type the image answer here.
                          </GamePageSurfaceNote>
                          <GamePageTextInput
                            value={imageGuessInput}
                            onChange={setImageGuessInput}
                            onSubmit={() => submitImageGuess("A")}
                            placeholder="Type image answer"
                          />
                          <GamePageActionButton variant="primary" onClick={() => submitImageGuess("A")}>Submit Image Guess</GamePageActionButton>
                        </>
                      ) : (
                        <GamePageSurfaceNote>
                          The other phone has the image-guess input right now.
                        </GamePageSurfaceNote>
                      )
                    ) : celebGuessPending ? (
                      <>
                        <GamePageSurfaceNote>
                          You are the holder. Confirm whether the celeb guess is correct.
                        </GamePageSurfaceNote>
                        <GamePageActionButton variant="accent" onClick={onCorrectCelebGuess}>Confirm Correct</GamePageActionButton>
                        <GamePageActionButton variant="secondary" onClick={onWrongCelebGuess}>Confirm Wrong</GamePageActionButton>
                      </>
                    ) : (
                      <GamePageSurfaceNote>
                        Listen to the questions, keep the celeb private, and confirm the spoken guess when it happens.
                      </GamePageSurfaceNote>
                    )}
                  </GamePagePhoneShell>

                  <GamePagePhoneShell tilt={4} title="Player B Phone" subtitle={playerBRole}>
                    {holder === "B" ? (
                      <>
                        <GamePageActionButton variant="accent" onClick={peekCelebCard}>Show Celeb</GamePageActionButton>
                        <GamePageActionButton variant="secondary" onClick={hideCelebCard}>Hide</GamePageActionButton>
                        {showCelebPeek && currentCeleb ? <GamePageCelebPreviewCard name={currentCeleb.name} /> : null}
                      </>
                    ) : null}

                    {isImageGuessPhase ? (
                      imageGuessWindow === "B" ? (
                        <>
                          <GamePageSurfaceNote>
                            You earned the image guess. Type the image answer here.
                          </GamePageSurfaceNote>
                          <GamePageTextInput
                            value={imageGuessInput}
                            onChange={setImageGuessInput}
                            onSubmit={() => submitImageGuess("B")}
                            placeholder="Type image answer"
                          />
                          <GamePageActionButton variant="primary" onClick={() => submitImageGuess("B")}>Submit Image Guess</GamePageActionButton>
                        </>
                      ) : (
                        <GamePageSurfaceNote>
                          The other phone has the image-guess input right now.
                        </GamePageSurfaceNote>
                      )
                    ) : celebGuessPending ? (
                      <GamePageSurfaceNote>
                        Say your celeb guess out loud. The holder will confirm it from the other phone.
                      </GamePageSurfaceNote>
                    ) : (
                      <>
                        <GamePageSurfaceNote>
                          Ask your questions out loud, track the count, and decide when you are ready to guess.
                        </GamePageSurfaceNote>
                        <GamePageActionButton variant="primary" onClick={useQuestion}>Ask Question ({questionsUsed}/5)</GamePageActionButton>
                        <GamePageActionButton variant="accent" onClick={handleReadyToGuess}>Ready to Guess</GamePageActionButton>
                      </>
                    )}
                  </GamePagePhoneShell>
                </div>
              </div>

              <GamePageRulesOverlay open={showRules} onClose={() => setShowRules(false)} format={format} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
