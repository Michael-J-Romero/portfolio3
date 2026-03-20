import type {
  ProjectsCardVariantId,
  ProjectsIntroVariantId,
} from '../config/types';

export interface FeaturedProject {
  id: string;
  title: string;
  meta: string;
  imageSrc: string;
  imageAlt: string;
  previewLabel: string;
  previewContext: string;
  summary: string;
  compactSummary: string;
  outcome: string;
  overview: string[];
  contributions: string[];
  tech: string[];
  liveUrl?: string;
}

export const PROJECTS_SECTION_COPY: Record<
  ProjectsIntroVariantId,
  { eyebrow: string; heading: string; intro: string }
> = {
  direct: {
    eyebrow: 'Featured Web Projects',
    heading: 'Featured Web Projects',
    intro:
      'Three portfolio-facing web builds that show how I approach front-end implementation, structured content systems, and more product-like application thinking.',
  },
  delivery: {
    eyebrow: 'Build And Delivery',
    heading: 'Web Projects Focused On Delivery',
    intro:
      'A tighter proof section focused on shipping polished interfaces, turning design direction into dependable front-end systems, and keeping content maintainable after launch.',
  },
  product: {
    eyebrow: 'Applications And Interfaces',
    heading: 'Web Work With Product Thinking',
    intro:
      'This version frames the section less like a gallery and more like a set of interface case studies: CMS builds, education-facing communication, and fuller-stack workflow tools.',
  },
  selective: {
    eyebrow: 'Selected Proof',
    heading: 'A Smaller Set Of Stronger Signals',
    intro:
      'This version treats the section as a deliberate proof cut: fewer assumptions about breadth, more emphasis on why each project earns its place in the story.',
  },
  casebook: {
    eyebrow: 'Project Casebook',
    heading: 'Three Projects, Three Different Kinds Of Proof',
    intro:
      'A casebook-style framing that centers what each piece demonstrates: front-end delivery, communication-heavy design, and more operational application thinking.',
  },
};

export const FEATURED_WEB_PROJECTS: FeaturedProject[] = [
  {
    id: 'artist-foundation-website',
    title: 'Artist Foundation Website',
    meta: 'Live Site - React - Sanity CMS - Front-End Development',
    imageSrc: '/suxiaobai.PNG',
    imageAlt: 'Screenshot of the Artist Foundation Website project',
    previewLabel: 'CMS Delivery',
    previewContext: 'Responsive publishing flow with reusable editorial blocks',
    summary:
      'A live CMS-driven website built with React and Sanity, focused on translating a refined visual direction into a reliable, client-manageable experience.',
    compactSummary:
      'Live React and Sanity build centered on polished front-end implementation and maintainable editing workflows.',
    outcome:
      'Shows production delivery: design interpretation, CMS structure, responsive QA, and a finished public-facing launch.',
    overview: [
      'This project focused on turning a visually refined direction into production-ready front-end code without flattening the original design intent.',
      'The build emphasized maintainable CMS modeling, responsive behavior, and editing flexibility so non-technical stakeholders could manage the site after handoff.',
    ],
    contributions: [
      'Front-end architecture and component implementation in React',
      'Design collaboration and visual fidelity refinement',
      'Sanity CMS integration for structured client-managed content',
      'Responsive and cross-device quality pass',
    ],
    tech: ['React', 'TypeScript', 'Sanity CMS', 'SCSS'],
    liveUrl: 'https://su-test-gamma.vercel.app/',
  },
  {
    id: 'code-teaching-program-site',
    title: 'Code Teaching Program Website',
    meta: 'Education Site - Content Strategy - Design + Development',
    imageSrc: '/yourtechclas.jpg',
    imageAlt: 'Screenshot of the Code Teaching Program Website project',
    previewLabel: 'Education Storytelling',
    previewContext: 'Program clarity, trust-building, and a cleaner enrollment path',
    summary:
      'A business site for coding instruction work, shaped to communicate programs, teaching experience, and the story behind a youth summer tech offering without losing clarity.',
    compactSummary:
      'Education-facing site balancing teaching credibility, program explanation, and a simple user flow.',
    outcome:
      'Shows communication-heavy UI work: shaping information architecture, balancing storytelling with utility, and designing for quick trust.',
    overview: [
      'This site balanced practical program information with storytelling around teaching experience, outcomes, and long-term work with young learners.',
      'Content structure was designed to support trust-building while keeping the page highly scannable for parents, students, and program partners.',
    ],
    contributions: [
      'Content architecture and UX flow planning',
      'UI design and front-end development',
      'Responsive and performance optimization',
    ],
    tech: ['React', 'TypeScript', 'SCSS'],
    liveUrl: 'https://www.yourtechclass.com/',
  },
  {
    title: 'Program Operations Platform',
    meta: 'Full-Stack Web App - Admin Workflows - Dashboard UI',
    imageSrc: '/chezmax.PNG',
    imageAlt: 'Screenshot used for the Program Operations Platform project card',
    previewLabel: 'Full-Stack Workflow',
    previewContext: 'Scheduling, admin views, and structured operational data',
    summary:
      'A product-style application concept for program operations, exploring authenticated dashboards, scheduling workflows, and interface systems that need more than a marketing-site mindset.',
    compactSummary:
      'Full-stack application direction centered on dashboard structure, workflow clarity, and more complex data states.',
    outcome:
      'Broadens the story beyond brochure-style websites and signals comfort with application UI, state, and workflow-heavy problem solving.',
    overview: [
      'This concept exists to represent the fuller-stack side of the portfolio: interfaces with denser data, sharper hierarchy needs, and more operational logic.',
      'The emphasis is less on visual flourish and more on making structured information, actions, and progress states easy to understand.',
    ],
    contributions: [
      'Dashboard information hierarchy and task flow design',
      'Component system planning for repeated admin patterns',
      'Application-state and workflow modeling direction',
    ],
    tech: ['React', 'TypeScript', 'Node', 'PostgreSQL'],
    liveUrl: 'https://www.chezmaxdorothea.com/',
  },
];

export const PROJECT_CARD_OPEN_LABELS: Record<ProjectsCardVariantId, string> = {
  detailed: 'Open Project',
  compact: 'View Project',
  outcomes: 'Read Case Study',
  minimal: 'Open Project',
  signals: 'Inspect Signals',
};