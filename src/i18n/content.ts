// Every visible word on the page, in English and Bahasa Indonesia.
// Public copy only: no employer, client or vendor names, no internal hosts.

export type Lang = 'en' | 'id';

export interface Step {
  label: string;
  detail: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface Shot {
  src: string;
  alt: string;
  blurred?: boolean;
}

export interface Stage {
  name: string;
  steps: Step[];
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  summary: string;
  points: string[];
  stack: string[];
  links: Link[];
  shots?: Shot[];
  stages?: Stage[];
}

export type ProjectGroup = 'fleet' | 'ai' | 'platform' | 'web';

export interface Project {
  group: ProjectGroup;
  name: string;
  kind: string;
  what: string;
  image?: Shot;
}

export const EMAIL = 'ridzkyguntur12@gmail.com';
export const LINKEDIN = 'https://id.linkedin.com/in/ridzky-guntur-nuriawan-10346a1bb';
export const GITHUB = 'https://github.com/ridzkyyy';

const STACK = {
  rekap: ['React 19', 'TypeScript', 'Supabase', 'Playwright', 'CI/CD'],
  fleet: ['Java 17', 'Spring Boot', 'Kafka', 'Python asyncio', 'PostgreSQL', 'Redis', 'ClickHouse'],
  mcpLab: ['TypeScript', 'React', 'MCP SDK', 'Vercel'],
  fleetMcp: ['TypeScript', 'MCP', 'NMEA 0183', 'Vercel'],
};

const en = {
  nav: { work: 'Work', projects: 'Projects', about: 'About', contact: 'Contact', switchTo: 'Baca dalam Bahasa Indonesia', switchShort: 'ID' },
  hero: {
    name: 'Ridzky Guntur Nuriawan',
    role: 'Technical Project Manager and backend engineer for fleet, IoT and AI systems.',
    intro: 'I lead and build the software behind GPS tracking, telemetry pipelines and driver-safety AI, and I ship my own products on the side. Based in Jakarta, open to remote work.',
    primary: 'Email me',
    secondary: 'See my work',
    readout: { label: 'Where I am', base: 'Base, Jakarta', time: 'Local time', count: 'Projects on this page' },
  },
  work: {
    title: 'Selected work',
    private: 'Private system. I can walk you through it on a call.',
    blurred: 'Blurred for privacy',
    stageHint: 'Parts of the system',
    benchLabel: 'A GPS tracker cabled to a gateway. Drag or use the arrow keys to turn it.',
    benchReadout: 'Simulated fix, one every 2.4 s',
    items: [
      {
        id: 'rekap',
        tag: 'Own product, in production',
        title: 'rekapmbg.id',
        summary: "An operations ERP for Indonesia's free school-meal program (MBG).",
        points: [
          'Designed, built and sold it alone, from the data model to the sales demo.',
          'Covers procurement, kitchen production, distribution, finance and government reporting in one place.',
          'Finance reconciles to the rupiah, shipped through 84+ pull requests with end-to-end tests.',
        ],
        stack: STACK.rekap,
        links: [{ label: 'Visit rekapmbg.id', href: 'https://rekapmbg.id' }],
        shots: [
          { src: '/media/rekapmbg-hero.jpg', alt: 'rekapmbg.id landing page with a dashboard preview' },
          { src: '/media/rekapmbg-features.jpg', alt: 'rekapmbg.id overview of its operations modules' },
        ],
      },
      {
        id: 'fleet',
        tag: 'Work, led and built',
        title: 'Fleet telematics platform',
        summary: 'The backend that turns raw GPS signals from a tracker fleet into alerts a dispatcher can act on.',
        points: [
          'A device gateway that decodes binary tracker frames and drops bad fixes with a nine-rule quality gate.',
          'A Kafka event pipeline that keeps every vehicle in order and evaluates geofence, speeding and driving alerts in parallel.',
          'A multi-tenant platform core with road-snapped trips, reports and live feeds to the command centre.',
        ],
        stack: STACK.fleet,
        links: [],
        shots: [
          { src: '/media/private/fleet-map.jpg', alt: 'Blurred screenshot of the live monitoring map with trip playback panels', blurred: true },
          { src: '/media/private/fleet-table.jpg', alt: 'Blurred screenshot of the fleet operations vehicle table', blurred: true },
        ],
        stages: [
          {
            name: 'Device gateway',
            steps: [
              { label: 'Tracker fleet', detail: 'Binary frames over TCP after an IMEI handshake.' },
              { label: 'Decode', detail: 'Three codec variants parsed into one shape.' },
              { label: 'Quality gate', detail: 'Drops teleports, jitter and impossible speeds.' },
              { label: 'Relay', detail: 'Acknowledged, bounded queue into the core.' },
            ],
          },
          {
            name: 'Event pipeline',
            steps: [
              { label: 'Ingest', detail: 'Partition-keyed Kafka topics, one key per vehicle.' },
              { label: 'Evaluate', detail: 'Geofence, speeding, harsh driving, jamming, power cut.' },
              { label: 'Notify', detail: 'Typed events that can be replayed.' },
              { label: 'Push', detail: 'Stored in batches, pushed live to dispatch.' },
            ],
          },
          {
            name: 'Platform core',
            steps: [
              { label: 'Last state', detail: 'Every device position cached as it lands.' },
              { label: 'Record', detail: 'PostgreSQL primary with a columnar archive.' },
              { label: 'Trips', detail: 'Road-snapped with checked gap bridging.' },
              { label: 'Dispatch', detail: 'REST and WebSocket to the command centre.' },
            ],
          },
        ],
      },
      {
        id: 'mcp-lab',
        tag: 'Open source',
        title: 'MCP Lab',
        summary: 'Postman for MCP servers: connect, explore and test any Model Context Protocol server from the browser.',
        points: [
          "Browse a server's tools and run them from forms generated from their JSON schema.",
          'Readable results instead of raw JSON-RPC, with a built-in demo server to try.',
          'MIT licensed, live on Vercel, CI on every change.',
        ],
        stack: STACK.mcpLab,
        links: [
          { label: 'Open the demo', href: 'https://mcp-lab.vercel.app' },
          { label: 'Source on GitHub', href: 'https://github.com/ridzkyyy/mcp-lab' },
        ],
        shots: [{ src: '/media/mcp-lab.gif', alt: 'MCP Lab connecting to a server and running a tool' }],
      },
      {
        id: 'fleet-mcp',
        tag: 'Open source',
        title: 'fleet-mcp',
        summary: 'Fleet telemetry as typed tools for AI agents, where my day job meets the agent era.',
        points: [
          'GPS positions, trips, geofence events and NMEA parsing exposed as MCP tools.',
          'A deterministic simulated city fleet, so it works with zero setup.',
          'Pairs with MCP Lab: one is the client, the other the server it talks to.',
        ],
        stack: STACK.fleetMcp,
        links: [
          { label: 'Live endpoint', href: 'https://fleet-mcp.vercel.app' },
          { label: 'Source on GitHub', href: 'https://github.com/ridzkyyy/fleet-mcp' },
        ],
        shots: [{ src: '/media/fleet-mcp.gif', alt: 'MCP Lab connected to the fleet-mcp server and calling a tool' }],
      },
    ] as CaseStudy[],
  },
  projects: {
    title: 'Everything else I built',
    filters: { all: 'All', fleet: 'Fleet and maps', ai: 'AI', platform: 'Platforms and tools', web: 'Web and personal' },
    items: [
      { group: 'fleet', name: 'Video telematics platform', kind: 'Platform, live video', what: 'One gateway and media server for dashcams from several vendors: live video, alarms and evidence clips in one console.', image: { src: '/media/private/video-telematics.jpg', alt: 'Blurred screenshot of the live video telematics map', blurred: true } },
      { group: 'platform', name: 'Telematics hub', kind: 'Self-hosted platform', what: 'Any GPS tracker in, one clean data shape out, with analytics and forwarding set up without code.', image: { src: '/media/private/telematics-hub.jpg', alt: 'Blurred screenshot of the telematics hub summary page', blurred: true } },
      { group: 'ai', name: 'Driver fatigue validator', kind: 'AI, computer vision', what: 'Checks dashcam fatigue alarms with face inference, so the ops console only shows the alarms that hold up.', image: { src: '/media/private/fatigue-monitor.jpg', alt: 'Blurred screenshot of the fatigue monitoring console', blurred: true } },
      { group: 'fleet', name: 'Mine control room', kind: 'Dashboard', what: 'A live map of an open-pit haul fleet, built to be read at a glance in a dark room.', image: { src: '/media/private/mine-map.jpg', alt: 'Blurred screenshot of the mine fleet map', blurred: true } },
      { group: 'fleet', name: 'Mine idle map', kind: 'Dashboard, mining', what: 'Idle time and speed by zone, drawn over a drone orthophoto of the pit, for every dashcam unit on site.', image: { src: '/media/private/idle-map.jpg', alt: 'Blurred screenshot of the mine idle map over an orthophoto', blurred: true } },
      { group: 'fleet', name: 'Harvest control tower', kind: 'Prototype, agritech', what: 'Palm-oil harvest blocks, crews and haul trucks on one live map, from field progress to profit per block.', image: { src: '/media/private/harvest-map.jpg', alt: 'Blurred screenshot of the plantation harvest map', blurred: true } },
      { group: 'web', name: 'Office records app', kind: 'Web app, public sector', what: 'Incoming and outgoing letters, archive search and an asset register for a government office.', image: { src: '/media/private/office-archive.jpg', alt: 'Blurred screenshot of the office records upload form', blurred: true } },
      { group: 'web', name: 'Invitation and photobooth', kind: 'Personal', what: 'My wedding invitation with RSVP per guest, plus a photobooth that prints strips instead of souvenirs.', image: { src: '/media/private/wedding.jpg', alt: 'Blurred screenshot of the wedding invitation', blurred: true } },
      { group: 'ai', name: 'Mine safety AI console', kind: 'AI, dashboard', what: 'Alarm validation, evidence clips, live streams and intercom for the dashcams on a mining site.' },
      { group: 'ai', name: 'Ops command dashboard', kind: 'Internal tool, AI agent', what: 'One workspace for five teams, replacing scattered spreadsheets, with an agent over read-only data.' },
      { group: 'fleet', name: 'Dashcam video console', kind: 'Web and mobile', what: 'A custom front end over a video telematics server. Unfinished modules are hidden instead of left as dead ends.' },
      { group: 'fleet', name: 'Unit support tracker', kind: 'Full-stack, live map', what: 'Live map, tracks and replay for a mine support fleet, merging dashcam and GPS sources into one status legend.' },
      { group: 'fleet', name: 'Payload trip console', kind: 'Full-stack', what: 'A fleet map with an objects panel and a trip timeline, where every trip carries the average payload it hauled.' },
      { group: 'fleet', name: 'Payload tablet', kind: 'Android, offline-first', what: 'Reads sensors in an excavator cab and syncs when the signal comes back.' },
      { group: 'platform', name: 'CAN bus decoder', kind: 'CLI tool', what: 'Reads engine data from trucks and heavy equipment: J1939, DBC and OBD-II in one binary.' },
      { group: 'platform', name: 'Trip and idle engine', kind: 'Data engineering', what: 'Turns raw positions into structured trips, with idempotent writes so reruns are safe.' },
      { group: 'platform', name: 'Data bridges', kind: 'Backend services', what: 'Small services that move telemetry between trackers, analytics stores and partner APIs: hourly batches, alarm forwarding, an FMS proxy.' },
    ] as Project[],
  },
  impact: {
    title: 'Results from recent work',
    items: [
      { v: '~IDR 300M', k: 'estimated efficiency gain from one fleet management initiative' },
      { v: '50%', k: 'faster report processing through API and BI automation' },
      { v: '400%', k: 'faster facility-expansion monitoring deliverables' },
      { v: '>90%', k: 'order forecasting accuracy supported' },
    ],
  },
  about: {
    title: 'About',
    text: [
      "I work between field operations and engineering. I take a dispatcher's complaint, turn it into an architecture, and see that architecture through to a system that holds up against real trucks, real drivers and real deadlines.",
      'Most weeks that means writing the spec and some of the code. Lately I am exploring MCP tooling, computer-vision inference and systems that AI agents can use safely.',
    ],
    facts: [
      { k: 'Role', v: 'Technical Project Manager, GPS tracking and fleet' },
      { k: 'Location', v: 'Jakarta, Indonesia (UTC+7)' },
      { k: 'Published', v: 'Jurnal Algoritma, sales analytics with a moving average method' },
    ],
    toolboxTitle: 'Toolbox',
    toolbox: [
      { k: 'Backend', v: 'Python, Java and Spring Boot, Node.js and TypeScript' },
      { k: 'Data', v: 'PostgreSQL, Redis, ClickHouse, Kafka, MQTT' },
      { k: 'Frontend', v: 'React, Next.js, Vite' },
      { k: 'Delivery', v: 'Docker, GitHub Actions, Jenkins, Grafana, Playwright' },
    ],
  },
  contact: {
    title: 'Have a fleet, IoT or data problem?',
    text: 'Tell me what you are building and where it breaks.',
    email: 'Email me',
  },
  footer: { copy: '© 2026 Ridzky Guntur Nuriawan', credit: 'Tracker bench drawn with the Anatomy kit.' },
};

export type Content = typeof en;

const id: Content = {
  nav: { work: 'Karya', projects: 'Proyek', about: 'Tentang', contact: 'Kontak', switchTo: 'Read in English', switchShort: 'EN' },
  hero: {
    name: 'Ridzky Guntur Nuriawan',
    role: 'Technical Project Manager dan backend engineer untuk sistem armada, IoT dan AI.',
    intro: 'Saya memimpin dan membangun software di balik pemantauan GPS, pipeline telemetri dan AI keselamatan pengemudi, dan merilis produk saya sendiri di luar jam kerja. Berbasis di Jakarta, terbuka untuk kerja remote.',
    primary: 'Kirim email',
    secondary: 'Lihat karya saya',
    readout: { label: 'Posisi saya', base: 'Basis, Jakarta', time: 'Waktu lokal', count: 'Proyek di halaman ini' },
  },
  work: {
    title: 'Karya pilihan',
    private: 'Sistem privat. Saya bisa menjelaskannya lewat panggilan.',
    blurred: 'Diburamkan demi privasi',
    stageHint: 'Bagian sistem',
    benchLabel: 'Tracker GPS tersambung kabel ke gateway. Geser atau pakai tombol panah untuk memutarnya.',
    benchReadout: 'Simulasi titik, satu tiap 2,4 dtk',
    items: [
      {
        ...en.work.items[0],
        tag: 'Produk sendiri, sudah produksi',
        summary: 'ERP operasional untuk program Makan Bergizi Gratis (MBG).',
        points: [
          'Dirancang, dibangun dan dijual sendiri, dari model data sampai demo penjualan.',
          'Mencakup pengadaan, produksi dapur, distribusi, keuangan dan pelaporan ke pemerintah dalam satu tempat.',
          'Keuangan cocok sampai rupiah terakhir, dirilis lewat 84+ pull request dengan tes end-to-end.',
        ],
        links: [{ label: 'Kunjungi rekapmbg.id', href: 'https://rekapmbg.id' }],
        shots: [
          { src: '/media/rekapmbg-hero.jpg', alt: 'Halaman depan rekapmbg.id dengan pratinjau dashboard' },
          { src: '/media/rekapmbg-features.jpg', alt: 'Ringkasan modul operasional rekapmbg.id' },
        ],
      },
      {
        ...en.work.items[1],
        tag: 'Pekerjaan, saya pimpin dan bangun',
        shots: [
          { src: '/media/private/fleet-map.jpg', alt: 'Tangkapan layar buram peta monitoring langsung dengan panel pemutaran trip', blurred: true },
          { src: '/media/private/fleet-table.jpg', alt: 'Tangkapan layar buram tabel kendaraan fleet operations', blurred: true },
        ],
        title: 'Platform telematika armada',
        summary: 'Backend yang mengubah sinyal GPS mentah dari armada tracker menjadi alert yang bisa langsung ditindaklanjuti dispatcher.',
        points: [
          'Gateway perangkat yang mendekode frame biner tracker dan membuang titik buruk lewat sembilan aturan quality gate.',
          'Pipeline event Kafka yang menjaga urutan tiap kendaraan dan mengevaluasi alert geofence, ngebut dan cara mengemudi secara paralel.',
          'Inti platform multi-tenant dengan trip yang menempel ke jalan, laporan dan feed langsung ke command centre.',
        ],
        stages: [
          {
            name: 'Gateway perangkat',
            steps: [
              { label: 'Armada tracker', detail: 'Frame biner lewat TCP setelah handshake IMEI.' },
              { label: 'Dekode', detail: 'Tiga varian codec diurai jadi satu bentuk.' },
              { label: 'Quality gate', detail: 'Membuang lompatan, jitter dan kecepatan mustahil.' },
              { label: 'Relay', detail: 'Antrean terbatas ber-ACK menuju inti.' },
            ],
          },
          {
            name: 'Pipeline event',
            steps: [
              { label: 'Ingest', detail: 'Topik Kafka ber-partition key, satu per kendaraan.' },
              { label: 'Evaluasi', detail: 'Geofence, ngebut, mengemudi kasar, jamming, putus daya.' },
              { label: 'Notifikasi', detail: 'Event bertipe yang bisa diputar ulang.' },
              { label: 'Kirim', detail: 'Disimpan per batch, dikirim langsung ke dispatch.' },
            ],
          },
          {
            name: 'Inti platform',
            steps: [
              { label: 'Status terakhir', detail: 'Posisi tiap perangkat di-cache saat masuk.' },
              { label: 'Pencatatan', detail: 'PostgreSQL utama dengan arsip kolumnar.' },
              { label: 'Trip', detail: 'Menempel ke jalan dengan penyambungan celah yang dicek.' },
              { label: 'Dispatch', detail: 'REST dan WebSocket ke command centre.' },
            ],
          },
        ],
      },
      {
        ...en.work.items[2],
        summary: 'Postman untuk server MCP: sambungkan, jelajahi dan uji server Model Context Protocol apa pun dari browser.',
        points: [
          'Jelajahi tool sebuah server dan jalankan lewat form yang dibuat dari JSON schema-nya.',
          'Hasil yang mudah dibaca, bukan JSON-RPC mentah, plus server demo bawaan untuk dicoba.',
          'Lisensi MIT, live di Vercel, CI di setiap perubahan.',
        ],
        links: [
          { label: 'Buka demo', href: 'https://mcp-lab.vercel.app' },
          { label: 'Kode di GitHub', href: 'https://github.com/ridzkyyy/mcp-lab' },
        ],
        shots: [{ src: '/media/mcp-lab.gif', alt: 'MCP Lab tersambung ke server dan menjalankan tool' }],
      },
      {
        ...en.work.items[3],
        summary: 'Telemetri armada sebagai tool bertipe untuk agen AI, titik temu pekerjaan harian saya dengan era agen.',
        points: [
          'Posisi GPS, trip, event geofence dan parsing NMEA tersedia sebagai tool MCP.',
          'Armada kota simulasi yang deterministik, jadi langsung jalan tanpa setup.',
          'Berpasangan dengan MCP Lab: satu client, satunya server yang diajak bicara.',
        ],
        links: [
          { label: 'Endpoint live', href: 'https://fleet-mcp.vercel.app' },
          { label: 'Kode di GitHub', href: 'https://github.com/ridzkyyy/fleet-mcp' },
        ],
        shots: [{ src: '/media/fleet-mcp.gif', alt: 'MCP Lab tersambung ke server fleet-mcp dan memanggil tool' }],
      },
    ],
  },
  projects: {
    title: 'Semua proyek lainnya',
    filters: { all: 'Semua', fleet: 'Armada dan peta', ai: 'AI', platform: 'Platform dan tool', web: 'Web dan pribadi' },
    items: [
      { group: 'fleet', name: 'Platform video telematika', kind: 'Platform, video langsung', what: 'Satu gateway dan media server untuk dashcam dari beberapa vendor: video langsung, alarm dan klip bukti dalam satu konsol.', image: { src: '/media/private/video-telematics.jpg', alt: 'Tangkapan layar buram peta video telematika', blurred: true } },
      { group: 'platform', name: 'Telematics hub', kind: 'Platform self-hosted', what: 'Tracker GPS apa pun masuk, satu bentuk data rapi keluar, dengan analitik dan penerusan tanpa kode.', image: { src: '/media/private/telematics-hub.jpg', alt: 'Tangkapan layar buram halaman ringkasan telematics hub', blurred: true } },
      { group: 'ai', name: 'Validator kelelahan sopir', kind: 'AI, computer vision', what: 'Memeriksa alarm kelelahan dari dashcam dengan inferensi wajah, jadi konsol ops hanya menampilkan alarm yang terbukti.', image: { src: '/media/private/fatigue-monitor.jpg', alt: 'Tangkapan layar buram konsol monitoring kelelahan', blurred: true } },
      { group: 'fleet', name: 'Control room tambang', kind: 'Dashboard', what: 'Peta langsung armada haul truck tambang terbuka, dibuat agar terbaca sekilas di ruangan gelap.', image: { src: '/media/private/mine-map.jpg', alt: 'Tangkapan layar buram peta armada tambang', blurred: true } },
      { group: 'fleet', name: 'Peta idle tambang', kind: 'Dashboard, tambang', what: 'Waktu idle dan kecepatan per zona, digambar di atas ortofoto drone area tambang, untuk setiap unit dashcam di site.', image: { src: '/media/private/idle-map.jpg', alt: 'Tangkapan layar buram peta idle tambang di atas ortofoto', blurred: true } },
      { group: 'fleet', name: 'Menara kendali panen', kind: 'Prototipe, agritech', what: 'Blok panen sawit, kemandoran dan truk angkut di satu peta langsung, dari progres lapangan sampai profit per blok.', image: { src: '/media/private/harvest-map.jpg', alt: 'Tangkapan layar buram peta panen perkebunan', blurred: true } },
      { group: 'web', name: 'Aplikasi arsip kantor', kind: 'Web app, sektor publik', what: 'Surat masuk dan keluar, pencarian arsip dan daftar inventaris untuk sebuah kantor pemerintah.', image: { src: '/media/private/office-archive.jpg', alt: 'Tangkapan layar buram form unggah surat', blurred: true } },
      { group: 'web', name: 'Undangan dan photobooth', kind: 'Pribadi', what: 'Undangan pernikahan saya dengan RSVP per tamu, plus photobooth yang mencetak strip foto pengganti souvenir.', image: { src: '/media/private/wedding.jpg', alt: 'Tangkapan layar buram undangan pernikahan', blurred: true } },
      { group: 'ai', name: 'Konsol AI keselamatan tambang', kind: 'AI, dashboard', what: 'Validasi alarm, klip bukti, live stream dan interkom untuk dashcam di sebuah site tambang.' },
      { group: 'ai', name: 'Dashboard komando ops', kind: 'Tool internal, agen AI', what: 'Satu workspace untuk lima tim, menggantikan spreadsheet yang tercecer, dengan agen di atas data read-only.' },
      { group: 'fleet', name: 'Konsol video dashcam', kind: 'Web dan mobile', what: 'Front end kustom di atas server video telematika. Modul yang belum jadi disembunyikan, bukan dibiarkan jadi jalan buntu.' },
      { group: 'fleet', name: 'Pelacak unit support', kind: 'Full-stack, peta langsung', what: 'Peta langsung, track dan replay untuk armada support tambang, menggabungkan sumber dashcam dan GPS dalam satu legenda status.' },
      { group: 'fleet', name: 'Konsol trip payload', kind: 'Full-stack', what: 'Peta armada dengan panel objek dan timeline trip, setiap trip membawa rata-rata muatan yang diangkut.' },
      { group: 'fleet', name: 'Tablet payload', kind: 'Android, offline-first', what: 'Membaca sensor di kabin ekskavator dan sinkron saat sinyal kembali.' },
      { group: 'platform', name: 'Dekoder CAN bus', kind: 'Tool CLI', what: 'Membaca data mesin truk dan alat berat: J1939, DBC dan OBD-II dalam satu binary.' },
      { group: 'platform', name: 'Mesin trip dan idle', kind: 'Data engineering', what: 'Mengubah posisi mentah menjadi trip terstruktur, dengan penulisan idempoten agar aman dijalankan ulang.' },
      { group: 'platform', name: 'Jembatan data', kind: 'Layanan backend', what: 'Layanan kecil yang memindahkan telemetri antara tracker, penyimpanan analitik dan API mitra: batch per jam, penerusan alarm, proxy FMS.' },
    ],
  },
  impact: {
    title: 'Hasil dari pekerjaan terbaru',
    items: [
      { v: '~Rp300 jt', k: 'estimasi efisiensi dari satu inisiatif fleet management' },
      { v: '50%', k: 'pemrosesan laporan lebih cepat lewat otomasi API dan BI' },
      { v: '400%', k: 'deliverable pemantauan ekspansi fasilitas lebih cepat' },
      { v: '>90%', k: 'akurasi peramalan order yang didukung' },
    ],
  },
  about: {
    title: 'Tentang saya',
    text: [
      'Saya bekerja di antara operasional lapangan dan engineering. Keluhan dispatcher saya ubah jadi arsitektur, lalu saya kawal sampai jadi sistem yang tahan menghadapi truk sungguhan, sopir sungguhan dan tenggat sungguhan.',
      'Hampir setiap minggu itu berarti menulis spesifikasi dan sebagian kodenya. Belakangan saya mendalami tooling MCP, inferensi computer vision dan sistem yang aman dipakai agen AI.',
    ],
    facts: [
      { k: 'Peran', v: 'Technical Project Manager, GPS tracking dan armada' },
      { k: 'Lokasi', v: 'Jakarta, Indonesia (UTC+7)' },
      { k: 'Publikasi', v: 'Jurnal Algoritma, analitik penjualan dengan metode moving average' },
    ],
    toolboxTitle: 'Perkakas',
    toolbox: [
      { k: 'Backend', v: 'Python, Java dan Spring Boot, Node.js dan TypeScript' },
      { k: 'Data', v: 'PostgreSQL, Redis, ClickHouse, Kafka, MQTT' },
      { k: 'Frontend', v: 'React, Next.js, Vite' },
      { k: 'Delivery', v: 'Docker, GitHub Actions, Jenkins, Grafana, Playwright' },
    ],
  },
  contact: {
    title: 'Punya masalah armada, IoT atau data?',
    text: 'Ceritakan apa yang sedang Anda bangun dan di mana ia sering bermasalah.',
    email: 'Kirim email',
  },
  footer: { copy: '© 2026 Ridzky Guntur Nuriawan', credit: 'Meja tracker digambar dengan kit Anatomy.' },
};

export const CONTENT: Record<Lang, Content> = { en, id };
