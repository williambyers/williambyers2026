export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
  subcaption?: string;
  layout?: 'full' | 'half';
};

export type Credit = {
  role: string;
  name: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tags?: string[];
  coverImage?: string;
  website?: string;
  caseStudy: {
    tagline: string;
    body: string[];
    images: CaseStudyImage[];
    credits?: Credit[];
    client?: string;
    role?: string;
    agency?: string;
    year?: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'havn',
    title: 'HAVN',
    subtitle: 'Logo Design for leading pc case and hardware brand.',
    tags: ['Logo Design', 'Print Collateral'],
    coverImage: '/havn-1.jpg',
    website: 'https://havn.global',
    caseStudy: {
      tagline: 'Logo design for HAVN — an award-winning PC case and hardware brand sold worldwide.',
      body: [
        'HAVN builds hardware for people who care how things are made. The brief pointed somewhere literal — a lighthouse, a beacon, the obvious read on the name — and we explored those directions properly.',
        "But we also added one more option the brief hadn't asked for: something stripped back to a single geometric move, a ray of light cutting through solid form. No imagery, no beacon — just restraint. That's the one they chose.",
        'The negative space carries the mark, so it holds up in one colour, at small sizes, and feels engineered rather than illustrated. The identity then ran through to a set of print pieces — brochures and supporting collateral — keeping the same minimal, light-led tone.',
      ],
      images: [
        {
          src: '/havn-1.jpg',
          alt: 'HAVN Logo + Wordmark',
          caption: 'HAVN Logo + Wordmark',
          subcaption: 'The final design for the HAVN brand logo.',
          layout: 'full',
        },
        { src: '/havn-2.jpg', alt: 'The Mark, Embossed', caption: 'The Mark, Embossed', subcaption: "HAVN's logo on the production case.", layout: 'half' },
        { src: '/havn-3.jpg', alt: 'Built In', caption: 'Built In', subcaption: 'The mark carried through to the chassis interior.', layout: 'half' },
      ],
      credits: [{ role: '3D Render of logo on case', name: 'HAVN' }],
      client: 'HAVN',
      role: 'Logo Design, Brand Identity',
      year: '2023',
    },
  },
  {
    slug: 'overclockers-black-friday',
    title: 'Overclockers UK Black Friday',
    subtitle: 'Campaign',
    tags: ['Campaign'],
    coverImage: '/bf-1.jpg',
    caseStudy: {
      tagline: "Black Friday campaign creative for Overclockers UK, one of the UK's leading PC hardware retailers.",
      body: [
        "Overclockers UK's biggest trading moment of the year needed creative that held up across every touchpoint at pace — on-site banners, email, paid social and print.",
        'A single bold visual system carried the whole campaign, built to flex across formats and to be rolled out quickly as deals changed through the week.',
      ],
      images: [
        { src: '/bf-1.jpg', alt: 'Overclockers UK Black Friday campaign' },
        { src: '/bf-2.jpg', alt: 'Overclockers UK Black Friday campaign' },
        { src: '/bf-3.jpg', alt: 'Overclockers UK Black Friday campaign' },
      ],
      client: 'Overclockers UK',
      role: 'Campaign Creative',
      year: '2024',
    },
  },
  {
    slug: 'overclockers-mouse-mats',
    title: 'Overclockers UK Mouse Mats',
    subtitle: '3D Renders / Packaging / Product and Packaging Design',
    coverImage: '/mm-1.jpg',
    caseStudy: {
      tagline: "Product and packaging design for Overclockers UK's range of gaming mouse mats.",
      body: [
        'Overclockers UK needed a cohesive product line for their branded mouse mats — from 3D rendered product visuals to final print-ready packaging.',
        'We created a design system that carried across all sizes and variants, keeping the gaming aesthetic while staying clean enough for retail.',
      ],
      images: [
        { src: '/mm-1.jpg', alt: 'Overclockers UK Mouse Mats' },
        { src: '/mm-2.jpg', alt: 'Overclockers UK Mouse Mats' },
        { src: '/mm-3.jpg', alt: 'Overclockers UK Mouse Mats' },
        { src: '/mm-4.jpg', alt: 'Overclockers UK Mouse Mats' },
        { src: '/mm-5.jpg', alt: 'Overclockers UK Mouse Mats' },
        { src: '/mm-6.jpg', alt: 'Overclockers UK Mouse Mats' },
      ],
    },
  },
  {
    slug: 'sun-king',
    title: 'Sun King',
    subtitle: 'Social Media / Brochures',
    coverImage: '/sunking-1.jpg',
    caseStudy: {
      tagline: 'Social media and brochure design for Sun King.',
      body: [
        'Sun King required a vibrant, on-brand presence across social media and print collateral.',
        'We developed templates and one-off pieces that balanced their bold yellow identity with clear communication.',
      ],
      images: [
        { src: '/sunking-1.jpg', alt: 'Sun King' },
        { src: '/sunking-2.jpg', alt: 'Sun King' },
        { src: '/sunking-3.jpg', alt: 'Sun King' },
        { src: '/sunking-4.jpg', alt: 'Sun King' },
        { src: '/sunking-5.jpg', alt: 'Sun King' },
      ],
    },
  },
  {
    slug: 'overclockers-uk',
    title: 'Overclockers UK',
    subtitle: 'Campaigns / Branding / Digital / Print / Landing Pages',
    coverImage: '/ocuk-1.jpg',
    website: 'https://overclockers.co.uk',
    caseStudy: {
      tagline: "Full-service creative output for one of the UK's leading PC hardware retailers.",
      body: [
        'An ongoing relationship covering campaign work, digital ads, print collateral, landing pages and brand consistency across all touchpoints.',
        'From product launches to seasonal campaigns, we produced high volumes of on-brand work at pace.',
      ],
      images: [
        { src: '/ocuk-1.jpg', alt: 'Overclockers UK' },
        { src: '/ocuk-2.jpg', alt: 'Overclockers UK' },
        { src: '/ocuk-3.jpg', alt: 'Overclockers UK' },
        { src: '/ocuk-4.jpg', alt: 'Overclockers UK' },
      ],
    },
  },
  {
    slug: 'vinciworks',
    title: 'VinciWorks',
    subtitle: 'Socials / Print Collateral / Brochures',
    tags: ['Socials', 'Print Collateral', 'Brochures and more'],
    coverImage: '/vinciworks-1.jpg',
    caseStudy: {
      tagline: 'Design work for VinciWorks, a compliance and regulatory training provider.',
      body: [
        'Freelance design across brand and digital touchpoints, translating dense regulatory subject matter into something clear and approachable.',
        'The work needed to carry authority without feeling cold — readable, considered, and consistent across every piece.',
      ],
      images: [
        { src: '/vinciworks-1.jpg', alt: 'VinciWorks' },
        { src: '/vinciworks-2.jpg', alt: 'VinciWorks' },
        { src: '/vinciworks-3.jpg', alt: 'VinciWorks' },
        { src: '/vinciworks-4.jpg', alt: 'VinciWorks' },
      ],
      client: 'VinciWorks',
    },
  },
];

