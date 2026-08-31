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
  };
};

export const projects: Project[] = [
  {
    slug: 'havn',
    title: 'HAVN',
    subtitle: 'Logo Design for leading pc case and hardware brand.',
    tags: ['Logo Design', 'Print Collateral'],
    coverImage: '/projects/havn/havn-cover.jpg',
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
          src: '/projects/havn/havn-project-image-1-v1.jpg',
          alt: 'HAVN Logo + Wordmark',
          caption: 'HAVN Logo + Wordmark',
          subcaption: 'The final design for the HAVN brand logo.',
          layout: 'full',
        },
        { src: '/projects/havn/havn-project-image-2-v1.jpg', alt: 'The Mark, Embossed', caption: 'The Mark, Embossed', subcaption: "HAVN's logo on the production case.", layout: 'half' },
        { src: '/projects/havn/havn-project-image-3-v1.jpg', alt: 'Built In', caption: 'Built In', subcaption: 'The mark carried through to the chassis interior.', layout: 'half' },
        {
          src: '/projects/havn/havn-project-image-4-v1.jpg',
          alt: 'HAVN Logo + Wordmark',
          caption: 'HAVN Logo + Wordmark',
          subcaption: 'The final design for the HAVN brand logo.',
          layout: 'full',
        },
      ],
      credits: [{ role: '3D Render of logo on case', name: 'HAVN' }],
    },
  },
  {
    slug: 'overclockers-mouse-mats',
    title: 'Overclockers UK Mouse Mats',
    subtitle: '3D Renders / Packaging / Product and Packaging Design',
    coverImage: '/projects/mousemats/mm-cover.jpg',
    caseStudy: {
      tagline: "Product and packaging design for Overclockers UK's range of gaming mouse mats.",
      body: [
        'Overclockers UK needed a cohesive product line for their branded mouse mats — from 3D rendered product visuals to final print-ready packaging.',
        'We created a design system that carried across all sizes and variants, keeping the gaming aesthetic while staying clean enough for retail.',
      ],
      images: [],
    },
  },
  {
    slug: 'sun-king',
    title: 'Sun King',
    subtitle: 'Social Media / Brochures',
    coverImage: '/projects/sunking/sunking-cover-1.jpg',
    caseStudy: {
      tagline: 'Social media and brochure design for Sun King.',
      body: [
        'Sun King required a vibrant, on-brand presence across social media and print collateral.',
        'We developed templates and one-off pieces that balanced their bold yellow identity with clear communication.',
      ],
      images: [],
    },
  },
  {
    slug: 'tilt-house',
    title: 'Tilt House',
    subtitle: 'Communications',
    coverImage: '/projects/tilthouse/tilthouse-cover-1.jpg',
    caseStudy: {
      tagline: 'Communications design for Tilt House.',
      body: ['Tilt House is a communications agency with a story-first approach. We created a suite of materials that reflected their editorial, human tone.'],
      images: [],
    },
  },
  {
    slug: 'overclockers-uk',
    title: 'Overclockers UK',
    subtitle: 'Campaigns / Branding / Digital / Print / Landing Pages',
    website: 'https://overclockers.co.uk',
    caseStudy: {
      tagline: "Full-service creative output for one of the UK's leading PC hardware retailers.",
      body: [
        'An ongoing relationship covering campaign work, digital ads, print collateral, landing pages and brand consistency across all touchpoints.',
        'From product launches to seasonal campaigns, we produced high volumes of on-brand work at pace.',
      ],
      images: [],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
