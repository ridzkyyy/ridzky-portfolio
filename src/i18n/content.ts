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

export interface Outcome {
  value: string;
  unit: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  outcome: Outcome;
  before?: string;
  after?: string;
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
  hub: ['Java 21', 'Spring Boot', 'Netty', 'PostgreSQL', 'MQTT', 'React', 'Docker'],
  video: ['Java 21', 'Spring Boot', 'Netty', 'JT/T 808 and 1078', 'MQTT', 'React'],
};

const en = {
  nav: { work: 'Work', projects: 'Projects', about: 'About', contact: 'Contact', switchTo: 'Baca dalam Bahasa Indonesia', switchShort: 'ID', tagline: 'Fleet, IoT and AI systems', status: 'Open to remote work', cta: 'Email me' },
  hero: {
    name: 'Ridzky Guntur Nuriawan',
    role: 'Technical Project Manager and backend engineer for fleet, IoT and AI systems.',
    intro: 'I lead and build the software behind GPS tracking, telemetry pipelines and driver-safety AI, and I ship my own products on the side. Based in Jakarta, open to remote work.',
    primary: 'Email me',
    secondary: 'See my work',
    statement: 'I replace rented fleet software with platforms the company owns.',
    outcomesTitle: 'What changed',
    estimate: 'Estimates from licence prices and fleet size.',
  },
  work: {
    title: 'Selected work',
    lede: 'Three platforms we stopped renting, and one product I built and sold myself.',
    before: 'Before',
    after: 'After',
    did: 'What I did',
    private: 'Private system. I can walk you through it on a call.',
    blurred: 'Blurred for privacy',
    stageHint: 'Parts of the system',
    benchLabel: 'A GPS tracker cabled to a gateway. Drag or use the arrow keys to turn it.',
    benchReadout: 'Simulated fix, one every 2.4 s',
    items: [
      {
        id: 'fleet',
        outcome: { value: '~$19k', unit: 'a month', label: 'in device licences no longer rented, across 19,000 devices' },
        before: 'Every tracker ran on a rented platform, at about $1 per device each month.',
        after: 'Our own gateway, event pipeline and platform core now carry the whole fleet.',
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
        id: 'hub',
        outcome: { value: '~Rp18M', unit: 'a month', label: 'hosted hub subscription replaced, about Rp216M a year' },
        before: 'Device data passed through a hosted telematics hub billed at about Rp18 million a month.',
        after: 'One self-hosted hub: any tracker protocol in, one clean data shape out to every system.',
        tag: 'Work, led and built',
        title: 'Telematics hub',
        summary: 'The layer between every GPS tracker and the systems that use its data, now running on our own servers.',
        points: [
          'Raw packets and the messages decoded from them, per device, side by side.',
          'Connectors, handlers, rules, zones and webhooks set up from the toolbox, without code.',
          'Logs, MQTT sessions and webhook delivery history in one place, with quotas per subaccount.',
        ],
        stack: STACK.hub,
        links: [],
        shots: [{ src: '/media/private/telematics-hub.jpg', alt: 'Blurred screenshot of a device page in the telematics hub', blurred: true }],
      },
      {
        id: 'video',
        outcome: { value: '~$5', unit: 'per licence', label: 'no longer bought from video vendors, on projects of around 1,000 units' },
        before: 'Dashcams were split across three vendor platforms, each with its own licence and a decoder we could not inspect.',
        after: 'One gateway and media server whose decoding we can audit, and one console for every brand.',
        tag: 'Work, led and built',
        title: 'Video telematics platform',
        summary: 'Live video, alarms, evidence and driver safety for dashcams from several vendors, in one place.',
        points: [
          'A dashboard of alarms per hour by source: road, driver, vehicle IO and geofence.',
          'Evidence in one menu: alarm clips, snapshots, historical video, audio, tracks and intercom.',
          'Prevention tools on top of the video: fatigue limits, pre-start checks and driver risk.',
        ],
        stack: STACK.video,
        links: [],
        shots: [{ src: '/media/private/video-telematics.jpg', alt: 'Blurred screenshot of the video telematics dashboard', blurred: true }],
      },
      {
        id: 'rekap',
        outcome: { value: '84+', unit: 'pull requests', label: 'shipped alone to production, from the data model to the sales demo' },
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
    ] as CaseStudy[],
  },
  projects: {
    title: 'Also built',
    more: 'Show all',
    filters: { all: 'All', fleet: 'Fleet and maps', ai: 'AI', platform: 'Platforms and tools', web: 'Web and personal' },
    items: [
      { group: 'ai', name: 'Driver fatigue validator', kind: 'AI, computer vision', what: 'Checks dashcam fatigue alarms with face inference, so the ops console only shows the alarms that hold up.', image: { src: '/media/private/fatigue-monitor.jpg', alt: 'Blurred screenshot of the fatigue monitoring console', blurred: true } },
      { group: 'fleet', name: 'Mine control room', kind: 'Dashboard', what: 'A live map of an open-pit haul fleet, built to be read at a glance in a dark room.', image: { src: '/media/private/mine-map.jpg', alt: 'Blurred screenshot of the mine fleet map', blurred: true } },
      { group: 'fleet', name: 'Mine idle map', kind: 'Dashboard, mining', what: 'Idle time and speed by zone, drawn over a drone orthophoto of the pit, for every dashcam unit on site.', image: { src: '/media/private/idle-map.jpg', alt: 'Blurred screenshot of the mine idle map over an orthophoto', blurred: true } },
      { group: 'fleet', name: 'Harvest control tower', kind: 'Prototype, agritech', what: 'Palm-oil harvest blocks, crews and haul trucks on one live map, from field progress to profit per block.', image: { src: '/media/private/harvest-map.jpg', alt: 'Blurred screenshot of the plantation harvest map', blurred: true } },
      { group: 'ai', name: 'MCP Lab', kind: 'Open source', what: 'Postman for MCP servers: connect, browse tools and run them from forms generated from their schema.', image: { src: '/media/mcp-lab.gif', alt: 'MCP Lab connecting to a server and running a tool' } },
      { group: 'ai', name: 'fleet-mcp', kind: 'Open source', what: 'Fleet telemetry as typed tools for AI agents, with a simulated city fleet that works with zero setup.', image: { src: '/media/fleet-mcp.gif', alt: 'MCP Lab calling a tool on the fleet-mcp server' } },
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
      { v: '~$240k', k: 'a year saved by moving off rented fleet and hub platforms, about IDR 4 billion' },
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

const byId = (key: string): CaseStudy => en.work.items.find((item) => item.id === key) as CaseStudy;

const id: Content = {
  nav: { work: 'Kerjaan', projects: 'Proyek', about: 'Tentang', contact: 'Kontak', switchTo: 'Read in English', switchShort: 'EN', tagline: 'Sistem armada, IoT dan AI', status: 'Terbuka untuk remote', cta: 'Email saya' },
  hero: {
    name: 'Ridzky Guntur Nuriawan',
    role: 'Technical Project Manager sekaligus backend engineer, fokus di armada, IoT dan AI.',
    intro: 'Saya yang pegang dan ngebangun software di balik GPS tracking, pipeline telemetri dan AI keselamatan sopir. Di luar kerjaan, saya juga bikin produk sendiri. Tinggal di Jakarta, bisa kerja remote.',
    primary: 'Email saya',
    secondary: 'Lihat kerjaan saya',
    statement: 'Software armada yang tadinya sewa, saya ganti jadi platform punya sendiri.',
    outcomesTitle: 'Hasilnya',
    estimate: 'Angka perkiraan, dihitung dari harga lisensi dan jumlah armada.',
  },
  work: {
    title: 'Kerjaan pilihan',
    lede: 'Tiga platform yang sekarang nggak perlu disewa lagi, plus satu produk yang saya bikin dan jual sendiri.',
    before: 'Sebelum',
    after: 'Sesudah',
    did: 'Yang saya kerjain',
    private: 'Sistemnya privat. Kalau mau, bisa saya jelasin lewat call.',
    blurred: 'Sengaja diblur',
    stageHint: 'Bagian sistem',
    benchLabel: 'Tracker GPS nyambung ke gateway lewat kabel. Geser atau pakai tombol panah buat muterin.',
    benchReadout: 'Simulasi, satu titik tiap 2,4 detik',
    items: [
      {
        ...byId('fleet'),
        outcome: { value: '~$19rb', unit: 'per bulan', label: 'biaya lisensi yang nggak perlu dibayar lagi, buat 19.000 perangkat' },
        before: 'Semua tracker jalan di platform sewaan, kira-kira $1 per perangkat tiap bulan.',
        after: 'Sekarang seluruh armada jalan di gateway, pipeline event dan platform buatan sendiri.',
        tag: 'Kerjaan, saya pimpin dan bangun',
        shots: [
          { src: '/media/private/fleet-map.jpg', alt: 'Tangkapan layar buram peta monitoring langsung dengan panel pemutaran trip', blurred: true },
          { src: '/media/private/fleet-table.jpg', alt: 'Tangkapan layar buram tabel kendaraan fleet operations', blurred: true },
        ],
        title: 'Platform telematika armada',
        summary: 'Backend yang ngolah sinyal GPS mentah dari tracker jadi alert yang langsung bisa ditindak dispatcher.',
        points: [
          'Gateway yang ngedekode frame biner dari tracker, lalu buang titik GPS jelek lewat sembilan aturan quality gate.',
          'Pipeline event di Kafka yang jaga urutan data tiap kendaraan, sambil ngecek alert geofence, ngebut dan cara nyetir secara paralel.',
          'Platform inti multi-tenant: trip yang nempel ke jalan, laporan, dan feed live ke command centre.',
        ],
        stages: [
          {
            name: 'Gateway perangkat',
            steps: [
              { label: 'Armada tracker', detail: 'Frame biner masuk lewat TCP, habis handshake IMEI.' },
              { label: 'Dekode', detail: 'Tiga varian codec dibaca jadi satu format.' },
              { label: 'Quality gate', detail: 'Buang titik loncat, jitter, sama kecepatan yang nggak masuk akal.' },
              { label: 'Relay', detail: 'Antrean ber-ACK yang dibatasi, lalu diteruskan ke core.' },
            ],
          },
          {
            name: 'Pipeline event',
            steps: [
              { label: 'Ingest', detail: 'Topik Kafka, satu partition key per kendaraan.' },
              { label: 'Cek', detail: 'Geofence, ngebut, nyetir kasar, jamming, power putus.' },
              { label: 'Notifikasi', detail: 'Event bertipe yang bisa di-replay.' },
              { label: 'Kirim', detail: 'Disimpan per batch, di-push live ke dispatch.' },
            ],
          },
          {
            name: 'Inti platform',
            steps: [
              { label: 'Status terakhir', detail: 'Posisi terakhir tiap perangkat langsung di-cache.' },
              { label: 'Simpan', detail: 'PostgreSQL utama, plus arsip kolumnar.' },
              { label: 'Trip', detail: 'Nempel ke jalan, celah datanya disambung dan dicek.' },
              { label: 'Dispatch', detail: 'REST dan WebSocket ke command centre.' },
            ],
          },
        ],
      },
      {
        ...byId('hub'),
        outcome: { value: '~Rp18 jt', unit: 'per bulan', label: 'langganan hub yang udah nggak dibayar lagi, sekitar Rp216 jt setahun' },
        before: 'Data perangkat lewat hub telematika langganan, tagihannya sekitar Rp18 juta sebulan.',
        after: 'Satu hub di server sendiri: tracker protokol apa pun masuk, keluar jadi satu format rapi ke semua sistem.',
        tag: 'Kerjaan, saya pimpin dan bangun',
        summary: 'Lapisan di antara semua tracker GPS dan sistem yang pakai datanya. Sekarang jalan di server sendiri.',
        points: [
          'Paket mentah dan hasil dekodenya bisa dilihat berdampingan, per perangkat.',
          'Connector, handler, rule, zone dan webhook diatur dari toolbox, nggak perlu ngoding.',
          'Log, sesi MQTT dan riwayat webhook ada di satu tempat, lengkap dengan kuota per subaccount.',
        ],
        shots: [{ src: '/media/private/telematics-hub.jpg', alt: 'Tangkapan layar buram halaman perangkat di telematics hub', blurred: true }],
      },
      {
        ...byId('video'),
        outcome: { value: '~$5', unit: 'per lisensi', label: 'yang nggak perlu dibeli lagi dari vendor video, di proyek sekitar 1.000 unit' },
        before: 'Dashcam kepisah di tiga platform vendor. Lisensinya beda-beda, decoder-nya juga nggak bisa kami cek.',
        after: 'Satu gateway dan media server yang decode-nya bisa kami audit, plus satu konsol buat semua merek.',
        tag: 'Kerjaan, saya pimpin dan bangun',
        title: 'Platform video telematika',
        summary: 'Video live, alarm, bukti dan keselamatan sopir dari dashcam berbagai vendor, semua di satu tempat.',
        points: [
          'Dashboard alarm per jam, dipisah per sumber: jalan, sopir, IO kendaraan dan geofence.',
          'Semua bukti di satu menu: klip alarm, snapshot, video lama, audio, track sampai interkom.',
          'Fitur pencegahan di atas video: batas capek, cek sebelum jalan, dan skor risiko sopir.',
        ],
        shots: [{ src: '/media/private/video-telematics.jpg', alt: 'Tangkapan layar buram dashboard video telematika', blurred: true }],
      },
      {
        ...byId('rekap'),
        outcome: { value: '84+', unit: 'pull request', label: 'saya rilis sendiri sampai live, dari model data sampai demo jualan' },
        tag: 'Produk sendiri, udah live',
        summary: 'ERP buat operasional program Makan Bergizi Gratis (MBG).',
        points: [
          'Saya rancang, bangun dan jual sendiri, dari model data sampai demo jualan.',
          'Pengadaan, produksi dapur, distribusi, keuangan sampai laporan ke pemerintah, semua di satu tempat.',
          'Keuangannya cocok sampai rupiah terakhir. Dirilis lewat 84+ pull request, lengkap dengan tes end-to-end.',
        ],
        links: [{ label: 'Buka rekapmbg.id', href: 'https://rekapmbg.id' }],
        shots: [
          { src: '/media/rekapmbg-hero.jpg', alt: 'Halaman depan rekapmbg.id dengan pratinjau dashboard' },
          { src: '/media/rekapmbg-features.jpg', alt: 'Ringkasan modul operasional rekapmbg.id' },
        ],
      },
    ],
  },
  projects: {
    title: 'Yang lain juga saya bangun',
    more: 'Lihat semua',
    filters: { all: 'Semua', fleet: 'Armada dan peta', ai: 'AI', platform: 'Platform dan tool', web: 'Web dan pribadi' },
    items: [
      { group: 'ai', name: 'Validator kelelahan sopir', kind: 'AI, computer vision', what: 'Ngecek alarm capek dari dashcam pakai inferensi wajah, jadi yang muncul di konsol ops cuma alarm yang beneran.', image: { src: '/media/private/fatigue-monitor.jpg', alt: 'Tangkapan layar buram konsol monitoring kelelahan', blurred: true } },
      { group: 'fleet', name: 'Control room tambang', kind: 'Dashboard', what: 'Peta live armada haul truck di tambang terbuka, dibikin supaya kebaca sekilas di ruangan gelap.', image: { src: '/media/private/mine-map.jpg', alt: 'Tangkapan layar buram peta armada tambang', blurred: true } },
      { group: 'fleet', name: 'Peta idle tambang', kind: 'Dashboard, tambang', what: 'Waktu idle dan kecepatan per zona, digambar di atas foto drone area tambang, buat tiap unit dashcam di site.', image: { src: '/media/private/idle-map.jpg', alt: 'Tangkapan layar buram peta idle tambang di atas ortofoto', blurred: true } },
      { group: 'fleet', name: 'Menara kendali panen', kind: 'Prototipe, agritech', what: 'Blok panen sawit, kemandoran dan truk angkut di satu peta live, dari progres lapangan sampai profit per blok.', image: { src: '/media/private/harvest-map.jpg', alt: 'Tangkapan layar buram peta panen perkebunan', blurred: true } },
      { group: 'ai', name: 'MCP Lab', kind: 'Open source', what: 'Kayak Postman, tapi buat server MCP: sambungin, lihat tool-nya, terus jalanin lewat form yang otomatis dibuat dari schema.', image: { src: '/media/mcp-lab.gif', alt: 'MCP Lab tersambung ke server dan menjalankan tool' } },
      { group: 'ai', name: 'fleet-mcp', kind: 'Open source', what: 'Data telemetri armada jadi tool buat agen AI. Ada armada simulasi, jadi langsung bisa dicoba tanpa setup.', image: { src: '/media/fleet-mcp.gif', alt: 'MCP Lab memanggil tool di server fleet-mcp' } },
      { group: 'web', name: 'Aplikasi arsip kantor', kind: 'Web app, sektor publik', what: 'Surat masuk dan keluar, cari arsip, sampai daftar inventaris buat kantor pemerintah.', image: { src: '/media/private/office-archive.jpg', alt: 'Tangkapan layar buram form unggah surat', blurred: true } },
      { group: 'web', name: 'Undangan dan photobooth', kind: 'Pribadi', what: 'Undangan nikahan saya, RSVP-nya per tamu, plus photobooth yang nyetak strip foto buat ganti souvenir.', image: { src: '/media/private/wedding.jpg', alt: 'Tangkapan layar buram undangan pernikahan', blurred: true } },
      { group: 'ai', name: 'Konsol AI keselamatan tambang', kind: 'AI, dashboard', what: 'Validasi alarm, klip bukti, live stream sampai interkom buat dashcam di site tambang.' },
      { group: 'ai', name: 'Dashboard komando ops', kind: 'Tool internal, agen AI', what: 'Satu workspace buat lima tim, gantiin spreadsheet yang kepisah-pisah, plus agen AI yang cuma bisa baca data.' },
      { group: 'fleet', name: 'Konsol video dashcam', kind: 'Web dan mobile', what: 'Front end custom di atas server video telematika. Modul yang belum jadi sengaja disembunyiin, biar nggak ada menu yang buntu.' },
      { group: 'fleet', name: 'Pemantau unit support', kind: 'Full-stack, peta langsung', what: 'Peta live, track dan replay buat armada support tambang. Data dashcam dan GPS digabung jadi satu legenda status.' },
      { group: 'fleet', name: 'Konsol trip payload', kind: 'Full-stack', what: 'Peta armada dengan panel objek dan timeline trip. Tiap trip kelihatan rata-rata muatannya.' },
      { group: 'fleet', name: 'Tablet payload', kind: 'Android, offline-first', what: 'Baca sensor di kabin ekskavator, terus sinkron sendiri begitu sinyal balik.' },
      { group: 'platform', name: 'Dekoder CAN bus', kind: 'Tool CLI', what: 'Baca data mesin truk dan alat berat: J1939, DBC dan OBD-II, cukup satu binary.' },
      { group: 'platform', name: 'Mesin trip dan idle', kind: 'Data engineering', what: 'Ubah posisi mentah jadi trip yang rapi. Penulisannya idempoten, jadi aman di-rerun.' },
      { group: 'platform', name: 'Jembatan data', kind: 'Layanan backend', what: 'Service-service kecil yang mindahin telemetri antara tracker, database analitik dan API partner: batch per jam, terusin alarm, proxy FMS.' },
    ],
  },
  impact: {
    title: 'Hasil kerjaan terakhir',
    items: [
      { v: '~Rp4 miliar', k: 'hemat setahun setelah nggak sewa platform armada dan hub lagi' },
      { v: '50%', k: 'laporan lebih cepat diproses berkat otomasi API dan BI' },
      { v: '400%', k: 'pemantauan ekspansi fasilitas kelar lebih cepat' },
      { v: '>90%', k: 'akurasi forecast order' },
    ],
  },
  about: {
    title: 'Tentang saya',
    text: [
      'Kerjaan saya ada di tengah-tengah tim lapangan dan engineering. Keluhan dispatcher saya ubah jadi arsitektur, terus saya kawal sampai jadi sistem yang kuat dipakai truk, sopir dan deadline beneran.',
      'Hampir tiap minggu saya nulis spesifikasi, sering sekalian kodenya. Belakangan lagi ngulik tooling MCP, inferensi computer vision, dan sistem yang aman dipakai agen AI.',
    ],
    facts: [
      { k: 'Peran', v: 'Technical Project Manager, GPS tracking dan armada' },
      { k: 'Lokasi', v: 'Jakarta, Indonesia (UTC+7)' },
      { k: 'Publikasi', v: 'Jurnal Algoritma, analitik penjualan dengan metode moving average' },
    ],
    toolboxTitle: 'Tools',
    toolbox: [
      { k: 'Backend', v: 'Python, Java dan Spring Boot, Node.js dan TypeScript' },
      { k: 'Data', v: 'PostgreSQL, Redis, ClickHouse, Kafka, MQTT' },
      { k: 'Frontend', v: 'React, Next.js, Vite' },
      { k: 'Delivery', v: 'Docker, GitHub Actions, Jenkins, Grafana, Playwright' },
    ],
  },
  contact: {
    title: 'Lagi pusing soal armada, IoT atau data?',
    text: 'Ceritain lagi bikin apa, dan bagian mana yang sering bermasalah.',
    email: 'Email saya',
  },
  footer: { copy: '© 2026 Ridzky Guntur Nuriawan', credit: 'Gambar tracker-nya dibuat pakai kit Anatomy.' },
};

export const CONTENT: Record<Lang, Content> = { en, id };
