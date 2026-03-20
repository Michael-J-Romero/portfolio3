import type {
  HeroHeadlineVariantId,
  HeroSupportVariantId,
  HeroVisualVariantId,
} from '../config/types';

export const HERO_HEADLINES: Record<HeroHeadlineVariantId, string> = {
  current:
    'I build polished web experiences with a foundation in interactive systems and game development.',
  concise:
    'I build polished front-end experiences with an interactive mindset.',
  systems:
    'Front-end development shaped by systems thinking, motion, and interaction.',
  direct:
    'Polished front-end work with design sensitivity and interactive depth.',
  editorial:
    'Front-end experiences shaped by interaction, systems, and visual refinement.',
};

export const HERO_SUPPORT_COPY: Record<HeroSupportVariantId, string> = {
  current:
    "I'm a Los Angeles-based developer with roots in game development, years of coding instruction, and a current focus on modern front-end work using React. My work blends design sensitivity, custom logic, and interaction-driven thinking.",
  trimmed:
    "Los Angeles-based, with roots in games and years of coding instruction, I now focus on React-driven front-end work that blends design sensitivity, custom logic, and interaction-first thinking.",
  minimal:
    'Los Angeles-based developer focused on modern front-end work, interaction systems, and polished implementation.',
};

export const HERO_STACK_PREVIEWS = [
  {
    label: 'Live Site Mockup',
    title: 'Artist Foundation Website',
    detail: 'React + Sanity CMS',
    tone: 'primary',
  },
  {
    label: 'Design Concept Crop',
    title: 'Editorial Layout Direction',
    detail: 'UI Concept + Front-End',
    tone: 'secondary',
  },
  {
    label: 'Game Still',
    title: 'Rhythm Drumming VR',
    detail: 'Web VR Prototype',
    tone: 'tertiary',
  },
] as const;

export const HERO_VISUAL_LABELS: Record<HeroVisualVariantId, string> = {
  stack: 'Stacked previews',
  dominant: 'Dominant mockup',
  collage: 'Unified collage',
  minimal: 'Minimal abstract panel',
};
