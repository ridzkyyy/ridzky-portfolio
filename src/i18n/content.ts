// Every visible word on the page, in English and Bahasa Indonesia.
// Public copy only: no employer, client or vendor names, no internal hosts.

export type Lang = 'en' | 'id';

export interface Step {
  label: string;
  detail: string;
}

export interface Photo {
  src: string;
  alt: string;
}

export interface System {
  photo?: Photo;
  title: string;
  chapter: string;
  desc: string;
  steps: Step[];
  stack: string[];
}

export interface Product {
  name: string;
  kind: string;
  desc: string;
  brief?: string;
  stack: string[];
  links: { label: string; href: string }[];
  media?: { src: string; alt: string };
}

const STACKS = {
  gateway: ['Python asyncio', 'uvloop', 'Redis', 'PostgreSQL'],
  pipeline: ['Java 17', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'WebSocket'],
  core: ['Java 17', 'Spring Boot', 'PostgreSQL', 'Redis', 'ClickHouse', 'OSRM'],
};

const LINKS = {
  rekap: [{ label: 'rekapmbg.id', href: 'https://rekapmbg.id' }],
  mcpLab: [
    { label: 'Live demo', href: 'https://mcp-lab.vercel.app' },
    { label: 'GitHub', href: 'https://github.com/ridzkyyy/mcp-lab' },
  ],
  fleetMcp: [
    { label: 'Live endpoint', href: 'https://fleet-mcp.vercel.app' },
    { label: 'GitHub', href: 'https://github.com/ridzkyyy/fleet-mcp' },
  ],
};

const WORLD = {
  truck: '/media/world/truk-pengangkut-barang.jpg',
  toll: '/media/world/trans-java-toll-road-asian-highway-2.jpg',
  mine: '/media/world/sunrise-dam-gold-mine-open-pit-04.jpg',
};

export const CREDITS = [
  { title: 'Truk Pengangkut Barang', by: 'SATELITBM', href: 'https://commons.wikimedia.org/wiki/File:Truk_Pengangkut_Barang.jpg' },
  { title: 'Trans-Java Toll Road, Jakarta', by: 'Firzafp', href: 'https://commons.wikimedia.org/wiki/File:Trans-Java_Toll_Road_(Asian_Highway_2;_Jakarta-Semarang_Toll_Road)_-_Jakarta_(01-06-2022).jpg' },
  { title: 'Sunrise Dam Gold Mine open pit 04', by: 'Calistemon', href: 'https://commons.wikimedia.org/wiki/File:Sunrise_Dam_Gold_Mine_open_pit_04.jpg' },
];

const MEDIA = {
  rekap: { src: '/media/rekapmbg-hero.jpg' },
  mcpLab: { src: '/media/mcp-lab.gif' },
  fleetMcp: { src: '/media/fleet-mcp.gif' },
};

const en = {
  nav: { systems: 'Systems', products: 'Products', about: 'About', email: 'Email me', lang: 'Bahasa Indonesia', langShort: 'ID' },
  hero: {
    title: ['Backends for', 'real fleets.'],
    text: "I'm Ridzky, a technical project manager with an engineer's hands, in Jakarta. I build the systems that track trucks, keep drivers awake and get reports to the people who pay for them.",
    primary: 'Email me',
    secondary: 'Follow one GPS fix',
    figureLabel: 'Telemetry bench. Drag or use the arrow keys to turn it.',
    readout: 'Simulated fix, one every 2.4 s',
    caption: 'Drag to turn. A tracker sends a position fix to the gateway, the start of everything below.',
  },
  impact: {
    label: 'Results from recent work',
    items: [
      { v: '~IDR 300M', k: 'estimated efficiency gain from one fleet management initiative' },
      { v: '50%', k: 'faster report processing through API and BI automation' },
      { v: '400%', k: 'faster facility-expansion monitoring deliverables' },
      { v: '>90%', k: 'order forecasting accuracy supported' },
      { v: '>85%', k: 'engagement on near real-time SLA dashboards' },
    ],
  },
  systems: {
    title: 'Follow one GPS fix',
    lead: 'A truck reports its position every few seconds. Here is what happens to one of those fixes on its way to a dispatcher, through three systems I lead and build. The flow is real; internals and client names stay private.',
    built: 'Built with',
    items: [
      {
        photo: { src: WORLD.truck, alt: 'Two loaded cargo trucks parked by a road in Java' },
        chapter: 'First, it has to be believed.',
        title: 'GPS device gateway',
        desc: 'An async multiprocess TCP proxy that speaks a binary tracker protocol end to end. It decodes every frame, throws out teleports and impossible speeds with a nine-rule quality gate, buffers when the network drops, and queues commands back to the device.',
        steps: [
          { label: 'Tracker fleet', detail: 'Binary frames over raw TCP after an IMEI handshake.' },
          { label: 'Protocol decode', detail: 'Three codec variants parsed into one shape.' },
          { label: 'Quality gate', detail: 'Drops teleports, jitter, zero fixes and impossible speeds.' },
          { label: 'Acknowledged relay', detail: 'A bounded queue into the tracking core.' },
          { label: 'Buffer and commands', detail: 'Redis offline buffer and over-the-air commands.' },
        ],
        stack: STACKS.gateway,
      },
      {
        photo: { src: WORLD.toll, alt: 'Traffic on the Trans-Java toll road in Jakarta under a storm sky' },
        chapter: 'Then, it has to mean something.',
        title: 'Fleet event pipeline',
        desc: 'A Kafka pipeline that turns the stream into typed alerts. Partition keys keep each vehicle in order, evaluators run in parallel, nothing is lost to a bad message, and a watchdog restarts the consumer rather than let it fall behind the road.',
        steps: [
          { label: 'Telemetry socket', detail: 'Positions and device events stream in.' },
          { label: 'Kafka ingest', detail: 'Partition-keyed topics with hours of retention.' },
          { label: 'Evaluators', detail: 'Geofence, speeding, harsh driving, jamming and power cut, in parallel.' },
          { label: 'Notification topic', detail: 'Typed events that can be replayed.' },
          { label: 'Persist and push', detail: 'Batch insert, then a push to the command centre.' },
        ],
        stack: STACKS.pipeline,
      },
      {
        chapter: 'Finally, someone has to act on it.',
        title: 'Fleet platform core',
        desc: 'The multi-tenant system of record that everything else orbits: five datastores, road-snapped trip reconstruction, alert rules, geofences, reports, and live WebSocket feeds to the dispatcher screens where a person makes the call.',
        steps: [
          { label: 'Positions in', detail: 'Device stream into a last-state cache.' },
          { label: 'System of record', detail: 'PostgreSQL primary with a columnar archive.' },
          { label: 'Trip rebuild', detail: 'Road snapping and gap bridging, checked for plausibility.' },
          { label: 'Business rules', detail: 'Alerts, geofences, tenant roles and reports.' },
          { label: 'Command centre', detail: 'REST and live WebSocket to dispatcher screens.' },
        ],
        stack: STACKS.core,
      },
    ] as System[],
    smallerTitle: 'And the systems around them',
    smallerPhoto: { src: WORLD.mine, alt: 'A loaded haul truck climbing the ramp of an open-pit mine' },
    smaller: [
      { name: 'Driver fatigue validator', what: 'Dashcam alarms arrive, clips download with retry, faces go through PyTorch inference, and only confident fatigue reaches the ops ticket queue.' },
      { name: 'Trip and idle engine', what: 'A stateful batch engine that writes trips from raw positions, merges micro-stops and uses deterministic IDs so reruns are safe.' },
      { name: 'Analytics partner bridge', what: 'Hourly MQTT telemetry, calibrated per device with fuel metrics and delivered to a partner API on a schedule.' },
      { name: 'Last-mile reporting suite', what: 'Nine scheduled detectors over a national delivery fleet, from unauthorised stops to out-of-route runs.' },
      { name: 'Compliance event store', what: 'Adaptive API sync, event classification and deadlock-aware upserts feeding first, middle and last-mile dashboards.' },
      { name: 'Mining fleet monitoring', what: 'Six MQTT topic families from heavy equipment, deduplicated, batched and pushed live to dashboards and maps.' },
      { name: 'Dispatch and tablet updates', what: 'Driver, machine and tracker assignments pushed to mining tablets, plus versioned app updates over the air.' },
      { name: 'Payload tablet', what: 'An offline-first Android app in the excavator cab reading RS485, GPS and voltage, syncing when signal returns.' },
    ],
  },
  products: {
    title: 'On my own time, I ship products',
    lead: 'My own products, open source, and tools for teams I keep unnamed. Point at one to see it.',
    built: 'Built with',
    walkthrough: 'Ask for a walkthrough',
    walkthroughSubject: 'Walkthrough',
    items: [
      {
        name: 'rekapmbg.id',
        kind: 'SaaS, solo-built, in production',
        desc: "Operational ERP for Indonesia's MBG school-meal program: supply chain, kitchen production, fleet distribution, finance that reconciles to the rupiah, and government reporting. Designed, built, shipped and sold by one person.",
        stack: ['React 19', 'TypeScript', 'Supabase', 'Playwright'],
        links: LINKS.rekap,
        media: { ...MEDIA.rekap, alt: 'rekapmbg.id landing page' },
      },
      {
        name: 'MCP Lab',
        kind: 'Open source, MCP client',
        desc: 'Postman for MCP servers: connect to any Model Context Protocol server, browse its tools, run them from schema-generated forms and read formatted results.',
        stack: ['TypeScript', 'React', 'MCP SDK', 'Vercel'],
        links: LINKS.mcpLab,
        media: { ...MEDIA.mcpLab, alt: 'MCP Lab connecting to a server and running a tool' },
      },
      {
        name: 'fleet-mcp',
        kind: 'Open source, MCP server',
        desc: 'Fleet telemetry as typed tools for AI agents: GPS positions, trips, geofence events and NMEA parsing, over a deterministic simulated city fleet. Where my day job meets the agent era.',
        stack: ['TypeScript', 'MCP', 'NMEA 0183', 'Vercel'],
        links: LINKS.fleetMcp,
        media: { ...MEDIA.fleetMcp, alt: 'MCP Lab connected to the fleet-mcp server' },
      },
      {
        name: 'CAN bus decoder',
        kind: 'Field tool, CLI',
        desc: 'Decodes CAN traffic from haul trucks, excavators and ordinary cars: SAE J1939 with 2,898 PGNs and 13,646 SPNs built in, any DBC file, and OBD-II. One binary for macOS and Windows, nothing to install.',
        brief: 'A technician plugs into a haul truck and reads its engine data in plain words, on a laptop, with nothing installed.',
        stack: ['Rust', 'SAE J1939', 'DBC', 'OBD-II'],
        links: [],
      },
      {
        name: 'Telematics hub',
        kind: 'Platform, self-hostable',
        desc: 'Receives GPS trackers across protocols, normalises every frame into one shape, then runs analytics and data forwarding you configure without writing code. The deployment of an open-source server with the abilities of a cloud platform.',
        brief: 'Any tracker in, one clean data shape out, on a server you own.',
        stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
        links: [],
      },
      {
        name: 'Mine control room',
        kind: 'FMS, open-pit operations',
        desc: 'Fleet management dashboard for an open-pit mine control room: a live map of the haul fleet, unit status and dispatch views, built to be read at a glance in a dark room.',
        brief: 'Every haul truck on one live map, readable from across a control room.',
        stack: ['Vite', 'JavaScript', 'Leaflet'],
        links: [],
      },
      {
        name: 'Ops command dashboard',
        kind: 'Internal tool, AI agent',
        desc: 'One workspace for presales, postsales, planning, stock and engineering, plus a management view. It replaced a drawer of separate spreadsheets and carries a tool-calling AI agent over read-only telemetry.',
        brief: 'Five teams stopped emailing spreadsheets and started asking one agent.',
        stack: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Tailwind v4'],
        links: [],
      },
      {
        name: 'Invitation and photobooth',
        kind: 'Personal, live event',
        desc: 'A digital wedding invitation with a personal link and RSVP for every guest, and a photobooth that replaces souvenirs: guests scan the invite QR, upload, pick a frame, and a 2×6" strip prints at the operator desk.',
        brief: 'Built for my own wedding: every guest leaves with a printed strip instead of a souvenir.',
        stack: ['React 19', 'Three Fiber', 'Vercel Blob', 'QR'],
        links: [],
      },
    ] as Product[],
  },
  about: {
    title: 'How I work',
    facts: [
      { k: 'Role', v: 'Technical project manager, GPS tracking and fleet' },
      { k: 'Based in', v: 'Jakarta, UTC+7, open to remote' },
      { k: 'Now exploring', v: 'MCP tooling, CV inference, agent-ready systems' },
    ],
    text: "I sit between field operations and engineering. I turn a dispatcher's complaint into an architecture, and an architecture into a system that holds up against real trucks, real drivers and real deadlines. Most weeks that means writing the spec and some of the code.",
    toolboxWord: 'Toolbox',
    toolbox: [
      { k: 'Backend', v: 'Python, Java and Spring, Node and TypeScript' },
      { k: 'Data', v: 'PostgreSQL, Redis, ClickHouse, Kafka, MQTT' },
      { k: 'Delivery', v: 'Docker, Jenkins, GitHub Actions, Grafana' },
      { k: 'Testing', v: 'Playwright end to end, CI on every change' },
      { k: 'Published', v: 'Jurnal Algoritma, sales analytics with a moving average method' },
    ],
  },
  contact: {
    title: 'Building something that moves?',
    prompt: 'Tell me what it is and where it breaks.',
    where: 'Jakarta, UTC+7. Open to remote work.',
  },
  footer: { what: 'Ridzky Guntur Nuriawan, systems for fleets', credit: '© 2026. Bench drawn with the Anatomy kit.', photos: 'Photos, CC BY-SA 4.0 via Wikimedia Commons:' },
};

export type Content = typeof en;

const id: Content = {
  nav: { systems: 'Sistem', products: 'Produk', about: 'Tentang', email: 'Kirim email', lang: 'English', langShort: 'EN' },
  hero: {
    title: ['Backend untuk', 'armada nyata.'],
    text: 'Saya Ridzky, technical project manager yang juga ngoding, di Jakarta. Saya membangun sistem yang memantau truk, menjaga sopir tetap terjaga, dan mengantar laporan ke orang yang membayarnya.',
    primary: 'Kirim email',
    secondary: 'Ikuti satu titik GPS',
    figureLabel: 'Meja uji telemetri. Geser atau pakai tombol panah untuk memutarnya.',
    readout: 'Simulasi titik, satu tiap 2,4 dtk',
    caption: 'Geser untuk memutar. Tracker mengirim titik posisi ke gateway, awal dari semua yang ada di bawah.',
  },
  impact: {
    label: 'Hasil dari pekerjaan terbaru',
    items: [
      { v: '~Rp300 jt', k: 'estimasi efisiensi dari satu inisiatif fleet management' },
      { v: '50%', k: 'pemrosesan laporan lebih cepat lewat otomasi API dan BI' },
      { v: '400%', k: 'deliverable pemantauan ekspansi fasilitas lebih cepat' },
      { v: '>90%', k: 'akurasi peramalan order yang didukung' },
      { v: '>85%', k: 'engagement pada dashboard SLA hampir real-time' },
    ],
  },
  systems: {
    title: 'Ikuti satu titik GPS',
    lead: 'Sebuah truk melaporkan posisinya tiap beberapa detik. Inilah perjalanan satu titik itu sampai ke layar dispatcher, melewati tiga sistem yang saya pimpin dan bangun. Alurnya nyata; detail internal dan nama klien tetap privat.',
    built: 'Dibangun dengan',
    items: [
      {
        photo: { src: WORLD.truck, alt: 'Dua truk barang bermuatan parkir di tepi jalan di Jawa' },
        chapter: 'Pertama, datanya harus bisa dipercaya.',
        title: 'Gateway perangkat GPS',
        desc: 'Proxy TCP async multiproses yang berbicara protokol biner tracker dari ujung ke ujung. Setiap frame didekode, lompatan posisi dan kecepatan mustahil dibuang lewat sembilan aturan quality gate, data ditampung saat jaringan putus, dan perintah dikirim balik ke perangkat.',
        steps: [
          { label: 'Armada tracker', detail: 'Frame biner lewat TCP setelah handshake IMEI.' },
          { label: 'Dekode protokol', detail: 'Tiga varian codec diurai jadi satu bentuk.' },
          { label: 'Quality gate', detail: 'Membuang lompatan, jitter, titik nol dan kecepatan mustahil.' },
          { label: 'Relay ber-ACK', detail: 'Antrean terbatas menuju tracking core.' },
          { label: 'Buffer dan perintah', detail: 'Buffer offline Redis dan perintah over-the-air.' },
        ],
        stack: STACKS.gateway,
      },
      {
        photo: { src: WORLD.toll, alt: 'Lalu lintas di jalan tol Trans-Jawa di Jakarta di bawah langit mendung' },
        chapter: 'Lalu, datanya harus berarti.',
        title: 'Pipeline event armada',
        desc: 'Pipeline Kafka yang mengubah aliran data jadi alert bertipe. Partition key menjaga urutan tiap kendaraan, evaluator berjalan paralel, tidak ada data hilang karena satu pesan rusak, dan watchdog me-restart consumer daripada membiarkannya tertinggal dari jalan.',
        steps: [
          { label: 'Socket telemetri', detail: 'Posisi dan event perangkat mengalir masuk.' },
          { label: 'Ingest Kafka', detail: 'Topik ber-partition key dengan retensi berjam-jam.' },
          { label: 'Evaluator', detail: 'Geofence, ngebut, mengemudi kasar, jamming dan putus daya, paralel.' },
          { label: 'Topik notifikasi', detail: 'Event bertipe yang bisa diputar ulang.' },
          { label: 'Simpan dan kirim', detail: 'Batch insert, lalu dikirim ke command centre.' },
        ],
        stack: STACKS.pipeline,
      },
      {
        chapter: 'Akhirnya, seseorang harus bertindak.',
        title: 'Inti platform armada',
        desc: 'Sistem pencatatan multi-tenant yang jadi pusat semuanya: lima datastore, rekonstruksi trip yang menempel ke jalan, aturan alert, geofence, laporan, dan feed WebSocket langsung ke layar dispatcher tempat seseorang mengambil keputusan.',
        steps: [
          { label: 'Posisi masuk', detail: 'Aliran perangkat ke cache status terakhir.' },
          { label: 'Sistem pencatatan', detail: 'PostgreSQL utama dengan arsip kolumnar.' },
          { label: 'Bangun ulang trip', detail: 'Road snapping dan penyambungan celah, dicek kewajarannya.' },
          { label: 'Aturan bisnis', detail: 'Alert, geofence, peran tenant dan laporan.' },
          { label: 'Command centre', detail: 'REST dan WebSocket langsung ke layar dispatcher.' },
        ],
        stack: STACKS.core,
      },
    ] as System[],
    smallerTitle: 'Dan sistem-sistem di sekitarnya',
    smallerPhoto: { src: WORLD.mine, alt: 'Haul truck bermuatan menanjak di ramp tambang terbuka' },
    smaller: [
      { name: 'Validator kelelahan sopir', what: 'Alarm dashcam masuk, klip diunduh dengan retry, wajah masuk inferensi PyTorch, dan hanya kelelahan yang meyakinkan yang sampai ke antrean tiket ops.' },
      { name: 'Mesin trip dan idle', what: 'Batch engine stateful yang menulis trip dari posisi mentah, menggabungkan berhenti singkat, dengan ID deterministik agar aman dijalankan ulang.' },
      { name: 'Jembatan mitra analitik', what: 'Telemetri MQTT per jam, dikalibrasi per perangkat dengan metrik BBM dan dikirim ke API mitra secara terjadwal.' },
      { name: 'Paket laporan last-mile', what: 'Sembilan detektor terjadwal untuk armada pengiriman nasional, dari berhenti tanpa izin sampai keluar rute.' },
      { name: 'Penyimpanan event kepatuhan', what: 'Sinkronisasi API adaptif, klasifikasi event dan upsert yang sadar deadlock untuk dashboard first, middle dan last-mile.' },
      { name: 'Pemantauan armada tambang', what: 'Enam keluarga topik MQTT dari alat berat, dideduplikasi, di-batch dan dikirim langsung ke dashboard dan peta.' },
      { name: 'Dispatch dan update tablet', what: 'Penugasan sopir, unit dan tracker dikirim ke tablet tambang, plus update aplikasi berversi lewat udara.' },
      { name: 'Tablet payload', what: 'Aplikasi Android offline-first di kabin ekskavator yang membaca RS485, GPS dan tegangan, lalu sinkron saat sinyal kembali.' },
    ],
  },
  products: {
    title: 'Di luar jam kerja, saya merilis produk',
    lead: 'Produk saya sendiri, open source, dan tool untuk tim yang tidak saya sebut namanya. Arahkan kursor untuk melihatnya.',
    built: 'Dibangun dengan',
    walkthrough: 'Minta demo singkat',
    walkthroughSubject: 'Demo',
    items: [
      {
        ...en.products.items[0],
        kind: 'SaaS, dibangun sendiri, sudah produksi',
        desc: 'ERP operasional untuk program Makan Bergizi Gratis: rantai pasok, produksi dapur, distribusi armada, keuangan yang cocok sampai rupiah terakhir, dan pelaporan ke pemerintah. Dirancang, dibangun, dirilis dan dijual oleh satu orang.',
        media: { ...MEDIA.rekap, alt: 'Halaman depan rekapmbg.id' },
      },
      {
        ...en.products.items[1],
        desc: 'Postman untuk server MCP: sambungkan ke server Model Context Protocol mana pun, jelajahi tool-nya, jalankan lewat form yang dibuat dari skema, dan baca hasil yang rapi.',
        media: { ...MEDIA.mcpLab, alt: 'MCP Lab tersambung ke server dan menjalankan tool' },
      },
      {
        ...en.products.items[2],
        desc: 'Telemetri armada sebagai tool bertipe untuk agen AI: posisi GPS, trip, event geofence dan parsing NMEA, di atas armada kota simulasi yang deterministik. Titik temu pekerjaan harian saya dengan era agen.',
        media: { ...MEDIA.fleetMcp, alt: 'MCP Lab tersambung ke server fleet-mcp' },
      },
      {
        ...en.products.items[3],
        kind: 'Tool lapangan, CLI',
        desc: 'Mendekode lalu lintas CAN dari haul truck, ekskavator sampai mobil biasa: SAE J1939 dengan 2.898 PGN dan 13.646 SPN bawaan, file DBC apa pun, dan OBD-II. Satu binary untuk macOS dan Windows, tanpa instalasi.',
        brief: 'Teknisi mencolok ke haul truck dan membaca data mesinnya dalam bahasa biasa, di laptop, tanpa memasang apa pun.',
      },
      {
        ...en.products.items[4],
        kind: 'Platform, bisa dipasang sendiri',
        desc: 'Menerima tracker GPS lintas protokol, menyeragamkan setiap frame jadi satu bentuk, lalu menjalankan analitik dan penerusan data yang bisa diatur tanpa menulis kode. Cara pasang server open-source dengan kemampuan platform cloud.',
        brief: 'Tracker apa pun masuk, satu bentuk data yang rapi keluar, di server milik sendiri.',
      },
      {
        ...en.products.items[5],
        kind: 'FMS, tambang terbuka',
        desc: 'Dashboard fleet management untuk control room tambang terbuka: peta langsung armada haul truck, status unit dan tampilan dispatch, dibuat agar terbaca sekilas di ruangan gelap.',
        brief: 'Semua haul truck di satu peta langsung, terbaca dari seberang control room.',
      },
      {
        ...en.products.items[6],
        kind: 'Tool internal, agen AI',
        desc: 'Satu workspace untuk presales, postsales, planning, stok dan engineering, plus tampilan manajemen. Menggantikan tumpukan spreadsheet terpisah dan punya agen AI yang memakai tool di atas telemetri read-only.',
        brief: 'Lima tim berhenti saling kirim spreadsheet dan mulai bertanya ke satu agen.',
      },
      {
        ...en.products.items[7],
        name: 'Undangan dan photobooth',
        kind: 'Pribadi, acara langsung',
        desc: 'Undangan pernikahan digital dengan link personal dan RSVP untuk setiap tamu, plus photobooth pengganti souvenir: tamu scan QR undangan, unggah foto, pilih frame, lalu strip 2×6" dicetak di meja operator.',
        brief: 'Dibuat untuk pernikahan saya sendiri: setiap tamu pulang membawa strip foto cetak, bukan souvenir.',
      },
    ],
  },
  about: {
    title: 'Cara saya bekerja',
    facts: [
      { k: 'Peran', v: 'Technical project manager, GPS tracking dan armada' },
      { k: 'Lokasi', v: 'Jakarta, UTC+7, terbuka untuk remote' },
      { k: 'Sedang mendalami', v: 'Tooling MCP, inferensi CV, sistem yang siap untuk agen' },
    ],
    text: 'Saya berada di antara operasional lapangan dan engineering. Keluhan dispatcher saya ubah jadi arsitektur, dan arsitektur jadi sistem yang tahan menghadapi truk sungguhan, sopir sungguhan dan tenggat sungguhan. Hampir setiap minggu itu berarti menulis spesifikasi dan sebagian kodenya.',
    toolboxWord: 'Perkakas',
    toolbox: [
      { k: 'Backend', v: 'Python, Java dan Spring, Node dan TypeScript' },
      { k: 'Data', v: 'PostgreSQL, Redis, ClickHouse, Kafka, MQTT' },
      { k: 'Delivery', v: 'Docker, Jenkins, GitHub Actions, Grafana' },
      { k: 'Testing', v: 'Playwright end to end, CI di setiap perubahan' },
      { k: 'Publikasi', v: 'Jurnal Algoritma, analitik penjualan dengan metode moving average' },
    ],
  },
  contact: {
    title: 'Membangun sesuatu yang bergerak?',
    prompt: 'Ceritakan apa itu dan di mana ia sering rusak.',
    where: 'Jakarta, UTC+7. Terbuka untuk kerja remote.',
  },
  footer: { what: 'Ridzky Guntur Nuriawan, sistem untuk armada', credit: '© 2026. Meja uji digambar dengan kit Anatomy.', photos: 'Foto, CC BY-SA 4.0 via Wikimedia Commons:' },
};

export const CONTENT: Record<Lang, Content> = { en, id };
export const EMAIL = 'ridzkyguntur12@gmail.com';
export const LINKEDIN = 'https://id.linkedin.com/in/ridzky-guntur-nuriawan-10346a1bb';
