/* =====================================================
   Portfolio data — edit titles / add projects here.
   type:      'youtube' | 'drive' | 'link'
   category:  'reels' | 'videos' | 'ai' | 'history'
   orientation: 'vertical' (9:16) | 'wide' (16:9)
   ===================================================== */

const PROJECTS = [
  /* ---------- Featured / Wide videos ---------- */
  {
    id: 'video-1', type: 'drive', driveId: '1NDA9FNJ1A5OJ_MhqhCt8fzSX_Ajfx2PS',
    category: 'videos', orientation: 'wide',
    title: { en: 'Egypt in World Cup 2026', ar: 'مصر في كأس العالم 2026' },
    role: { en: 'Full Edit • Color • Sound', ar: 'مونتاج كامل • ألوان • صوت' }
  },
  {
    id: 'video-2', type: 'drive', driveId: '1Tp9F9KV_sZ0MMH_WmZZ8jqe7etChLO_C',
    category: 'videos', orientation: 'wide',
    title: { en: 'Welcome Back to School', ar: 'Welcome Back to School' },
    role: { en: 'Full Edit • Color • Sound', ar: 'مونتاج كامل • ألوان • صوت' }
  },
  {
    id: 'ai-1', type: 'youtube', ytId: '4jqHWSdqwNA',
    category: 'ai', orientation: 'wide',
    title: { en: 'H - Cola Ad', ar: 'إعلان H - Cola' },
    role: { en: 'Generative AI • Editing • Sound', ar: 'ذكاء اصطناعي • مونتاج • صوت' }
  },
  {
    id: 'ai-koky-watch', type: 'drive', driveId: '1uLoz7kxs2waIaqFNR9B5cZ_MHcZ7snXg',
    category: 'ai', orientation: 'wide',
    title: { en: 'Koky Smart Watch', ar: 'Koky Smart Watch' },
    role: { en: 'Generative AI • Editing • Sound', ar: 'ذكاء اصطناعي • مونتاج • صوت' }
  },

  /* ---------- Short-form Reels ---------- */
  /* Order here = display order in the "Vertical" grid */
  {
    id: 'reel-kasrzero', type: 'youtube', ytId: 'pvs2JnE_9x8',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Kasr Zero', ar: 'قصر زيرو' },
    role: { en: 'Editing • Pacing • SFX', ar: 'مونتاج • إيقاع • مؤثرات' }
  },
  {
    id: 'reel-1', type: 'youtube', ytId: 'AKb3jazODnU',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Quick Fix', ar: 'Quick Fix' },
    role: { en: 'Editing • Pacing • SFX', ar: 'مونتاج • إيقاع • مؤثرات صوتية' }
  },
  {
    id: 'reel-makkah', type: 'youtube', ytId: 'lARBWhyeRBg',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Makkah Store', ar: 'مكة ستور' },
    role: { en: 'Fashion Store • Editing • Color', ar: 'محل ملابس • مونتاج • ألوان' }
  },
  {
    id: 'reel-rowad-1', type: 'youtube', ytId: 'eKa5Agmj3f0',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Rowad Al-Sham', ar: 'رواد الشام' },
    role: { en: 'Restaurant • Editing • SFX', ar: 'مطعم • مونتاج • مؤثرات' }
  },
  {
    id: 'reel-rowad-2', type: 'youtube', ytId: 'aJyp22AEWl4',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Rowad Al-Sham', ar: 'رواد الشام' },
    role: { en: 'Restaurant • Editing • Color', ar: 'مطعم • مونتاج • ألوان' }
  },
  {
    id: 'reel-mstore', type: 'youtube', ytId: '-TKX0ogOBAc',
    category: 'reels', orientation: 'vertical',
    title: { en: 'M Store', ar: 'M Store' },
    role: { en: 'Fashion Store • Editing • SFX', ar: 'محل ملابس • مونتاج • مؤثرات' }
  },
  {
    id: 'reel-fitclinic', type: 'youtube', ytId: 'kilQ2y-T1vA',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Fit Clinic', ar: 'Fit Clinic' },
    role: { en: 'Clinic • Editing • Pacing', ar: 'عيادة • مونتاج • إيقاع' }
  },
  {
    id: 'reel-koshary', type: 'youtube', ytId: 'X0r7gXkmpaI',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Koshary Hend', ar: 'كشري هند' },
    role: { en: 'Restaurant • Editing • SFX', ar: 'مطعم • مونتاج • مؤثرات' }
  },
  {
    id: 'reel-4', type: 'youtube', ytId: '1tMEE6sj24Y',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Julia Store', ar: 'Julia Store' },
    role: { en: 'Fashion Store • Editing • Sound', ar: 'محل ملابس • مونتاج • صوت' }
  },
  {
    id: 'reel-5', type: 'youtube', ytId: 'vTQCwONbNDA',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Shawwara Dental Clinic', ar: 'عيادة شوارة للأسنان' },
    role: { en: 'Clinic • Editing • Pacing', ar: 'عيادة • مونتاج • إيقاع' }
  },

  /* Before & After — always the last two before AI */
  {
    id: 'reel-2', type: 'youtube', ytId: 'FQqKzISfxj4',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Rowad Al-Sham B&A', ar: 'رواد الشام — قبل وبعد' },
    role: { en: 'Before & After • Color Grading', ar: 'قبل وبعد • تصحيح ألوان' }
  },
  {
    id: 'reel-3', type: 'youtube', ytId: 'RaC8wMOZjTY',
    category: 'reels', orientation: 'vertical',
    title: { en: 'Kasr Zero B&A', ar: 'قصر زيرو — قبل وبعد' },
    role: { en: 'Before & After • Motion Graphics', ar: 'قبل وبعد • موشن جرافيك' }
  },

  /* ---------- AI Shorts ---------- */
  {
    id: 'ai-2', type: 'youtube', ytId: 'O1Lo3C0QJ9g',
    category: 'ai', orientation: 'vertical',
    title: { en: 'AI Short - Smash Burger', ar: 'AI Short - Smash Burger' },
    role: { en: 'Generative AI • Editing', ar: 'ذكاء اصطناعي • مونتاج' }
  },
  {
    id: 'ai-3', type: 'youtube', ytId: '6rPo0Yqfo6Q',
    category: 'ai', orientation: 'vertical',
    title: { en: 'AI Short - Koky Glasses', ar: 'AI Short - Koky Glasses' },
    role: { en: 'Generative AI • Editing', ar: 'ذكاء اصطناعي • مونتاج' }
  },
  {
    id: 'ai-4', type: 'youtube', ytId: '-73tf6drUCg',
    category: 'ai', orientation: 'vertical',
    title: { en: 'AI Short - Koky Watches', ar: 'AI Short - Koky Watches' },
    role: { en: 'Generative AI • Editing', ar: 'ذكاء اصطناعي • مونتاج' }
  },
  {
    id: 'ai-icecream', type: 'youtube', ytId: 'WS5_kMJBtPc',
    category: 'ai', orientation: 'vertical',
    title: { en: 'AI Short - Ice Cream Hadouta', ar: 'AI Short - Ice Cream Hadouta' },
    role: { en: 'Generative AI • Editing', ar: 'ذكاء اصطناعي • مونتاج' }
  }
];

/* ---------- "التاريخ يُحكى" — history series (own show) ---------- */
const HISTORY_SERIES = {
  name: { en: 'Al-Tarikh Yohka', ar: 'التَّارِيخُ يُحْكَى' },
  tagline: { en: 'History, Retold', ar: 'حكايات وأحداث من التاريخ' },
  desc: {
    en: 'My own YouTube show: standalone stories and events from history across different fields, produced in a distinctive collage editing style. Season 1 is in production.',
    ar: 'برنامجي على يوتيوب: حكايات وأحداث تاريخية متفرقة في مجالات مختلفة، معمولة بستايل الكولاج المميز. الموسم الأول قيد الإنتاج.'
  },
  episodes: [
    {
      id: 'hist-1', type: 'drive', driveId: '1RNNHJux3A0Jd_9A0VYiOM7e9_6zshDF9',
      category: 'history', orientation: 'wide', ep: 1,
      title: { en: 'Hatshepsut', ar: 'حتشبسوت' },
      role: { en: 'Episode 01 • Collage Style', ar: 'الحلقة 01 • ستايل كولاج' }
    },
    {
      id: 'hist-2', type: 'drive', driveId: '16KBNh8uj1c3VxrDm6cWrJQuhrtWuD6ZQ',
      category: 'history', orientation: 'wide', ep: 2,
      title: { en: 'Zodiac', ar: 'زودياك' },
      role: { en: 'Episode 02 • Collage Style', ar: 'الحلقة 02 • ستايل كولاج' }
    }
  ]
};

/* ---------- Results: real view counts (screenshots) ----------
   These show the INDUSTRY (not the client name) — the client names live in the Portfolio.
   The label printed on each card = the industry's `card` label below (singular).
   `label` = filter-button text (plural).
   Cards are auto-sorted by the industry order below, then by views (desc).
   pos (optional): 'left' | 'right' → shows one half of a side-by-side screenshot
   note (internal only, not displayed): which video the screenshot belongs to
---------------------------------------------------------------- */
const RESULT_INDUSTRIES = [
  { id: 'all',         label: { en: 'All',                 ar: 'الكل' } },
  { id: 'restaurants', label: { en: 'Restaurants',         ar: 'مطاعم' },          card: { en: 'Restaurant',         ar: 'مطعم' } },
  { id: 'fashion',     label: { en: 'Fashion Stores',      ar: 'محلات ملابس' },    card: { en: 'Fashion Store',      ar: 'محل ملابس' } },
  { id: 'furniture',   label: { en: 'Furniture Showrooms', ar: 'معارض مفروشات' },  card: { en: 'Furniture Showroom', ar: 'معرض مفروشات' } },
  { id: 'factories',   label: { en: 'Factories',           ar: 'مصانع' },          card: { en: 'Factory',            ar: 'مصنع' } },
  { id: 'stores',      label: { en: 'Stores',              ar: 'ستور' },           card: { en: 'Store',              ar: 'ستور' } },
  { id: 'beauty',      label: { en: 'Beauty Salons',       ar: 'صالونات تجميل' },  card: { en: 'Beauty Salon',       ar: 'صالون تجميل' } },
  { id: 'cosmetics',   label: { en: 'Cosmetics',           ar: 'كوزمتكس' },         card: { en: 'Cosmetics',          ar: 'كوزمتكس' } },
  { id: 'clinics',     label: { en: 'Clinics',             ar: 'عيادات' },         card: { en: 'Clinic',             ar: 'عيادة' } },
  { id: 'ai',          label: { en: 'AI Reels',            ar: 'ريلز AI' },         card: { en: 'AI Reels',           ar: 'ريلز AI' } }
];

const RESULTS = [
  /* Restaurants */
  { img: 'images/views/restaurant-166k.png', views: '166K', industry: 'restaurants', note: 'Restaurant' },
  { img: 'images/views/dar-alsham-1.png',    views: '105K', industry: 'restaurants', note: 'Dar Al-Sham' },
  { img: 'images/views/hyper-91k.png',       views: '91K',  industry: 'restaurants', note: 'Restaurant' },
  { img: 'images/views/dar-alsham-2.png',    views: '76K',  industry: 'restaurants', note: 'Dar Al-Sham' },
  { img: 'images/views/italiano-73k.png',    views: '73K',  industry: 'restaurants', note: 'Italiano Broast' },
  { img: 'images/views/city-minaret.png',    views: '68K',  industry: 'restaurants', note: 'Restaurant' },
  { img: 'images/views/italiano-48k.png',    views: '48K',  industry: 'restaurants', note: 'Italiano Broast' },

  /* Fashion stores */
  { img: 'images/views/fashion-store-90k.png', views: '90K', industry: 'fashion', note: 'Fashion store (abaya)' },
  { img: 'images/views/makkah-store-72k.png',  views: '72K', industry: 'fashion', note: 'Makkah Store' },
  { img: 'images/views/m-store-43k.png',       views: '43K', industry: 'fashion', note: 'M Store' },

  /* Furniture showrooms */
  { img: 'images/views/kafr-elsheikh-pair.png', views: '94K', industry: 'furniture', pos: 'left',  note: 'Furniture showroom (left half)' },
  { img: 'images/views/kafr-elsheikh-pair.png', views: '91K', industry: 'furniture', pos: 'right', note: 'Furniture showroom (right half)' },

  /* Factories */
  { img: 'images/views/factory-55k.png', views: '55K', industry: 'factories', note: 'Wood Factory' },

  /* Stores */
  { img: 'images/views/tech-67k.png', views: '67K', industry: 'stores', note: 'Tech Store' },

  /* Beauty salons */
  { img: 'images/views/beauty-41k.png', views: '41K', industry: 'beauty', note: 'Beauty Salon' },

  /* Cosmetics */
  { img: 'images/views/cosmetics-88k.png', views: '88K', industry: 'cosmetics', note: 'Cosmetics shop' },

  /* Clinics */
  { img: 'images/views/fit-clinic-55k.png',    views: '55K', industry: 'clinics', note: 'Fit Clinic' },
  { img: 'images/views/beauty-clinic-36k.png', views: '36K', industry: 'clinics', note: 'Beauty clinic' },

  /* AI Reels (always last) */
  { img: 'images/views/ai-supermarket-48k.png', views: '48K', industry: 'ai', note: 'AI reel — supermarket' }
];

/* ---------- Testimonials (placeholders until real ones arrive) ---------- */
const TESTIMONIALS = [
  {
    name: { en: 'Ahmed M.', ar: 'أحمد م.' },
    role: { en: 'Restaurant Owner', ar: 'صاحب مطعم' },
    text: {
      en: 'Our reels went from a few thousand views to over 100K after Hossam took over the editing. The pacing and sound design made a huge difference.',
      ar: 'الريلز حقنا قفزت من كم ألف مشاهدة لأكثر من 100 ألف بعد ما حسام استلم المونتاج. الإيقاع والصوت فرقوا كثير.'
    }
  },
  {
    name: { en: 'Sara K.', ar: 'سارة ك.' },
    role: { en: 'Content Creator', ar: 'صانعة محتوى' },
    text: {
      en: 'Fast turnaround, clean cuts, and he really understands what hooks people in the first 3 seconds. My retention rate improved noticeably.',
      ar: 'تسليم سريع، مونتاج نظيف، وفاهم تمامًا وش اللي يشد الناس في أول 3 ثواني. نسبة المشاهدة عندي تحسنت بشكل واضح.'
    }
  },
  {
    name: { en: 'Mohamed R.', ar: 'محمد ر.' },
    role: { en: 'Marketing Manager', ar: 'مدير تسويق' },
    text: {
      en: 'The AI-generated concept video he produced for our campaign looked premium and got us more engagement than any previous ad.',
      ar: 'فيديو الذكاء الاصطناعي اللي عمله لحملتنا كان شكله فخم وجاب تفاعل أكثر من أي إعلان قبله.'
    }
  }
];