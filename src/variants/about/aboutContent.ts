import type {
  AboutCardsVariantId,
  AboutCopyVariantId,
  AboutToneVariantId,
} from '../config/types';

export interface AboutFocusArea {
  id: string;
  label: string;
  title: string;
  body: string;
}

export const ABOUT_HEADING = 'A developer shaped by games, teaching, and design-driven web work.';

export const ABOUT_COPY: Record<AboutCopyVariantId, { primary: string; secondary: string | null }> = {
  full: {
    primary:
      'I started coding through game development when I was young, building projects from scratch and learning how systems, movement, physics, and player experience fit together. Later, I taught coding through youth programs and developed web projects for clients, which pushed me to think more deeply about clarity, usability, and communication. Today, I focus on front-end development and interactive experiences that feel polished, thoughtful, and alive.',
    secondary:
      "My background gives me a mix of strengths that doesn't come from one lane alone: visual problem-solving, custom logic, interface design, and an instinct for how people move through interactive systems.",
  },
  balanced: {
    primary:
      'I started coding through games, later taught programming through youth programs, and eventually moved into client-facing web work. That combination shaped how I think about systems, usability, communication, and polish.',
    secondary:
      'Today I focus on front-end development and interactive experiences that balance clarity, visual judgment, and custom logic.',
  },
  reduced: {
    primary:
      'Games, teaching, and web development each shaped how I approach front-end work: systems-minded, user-aware, and focused on polish.',
    secondary: null,
  },
};

export const ABOUT_FOCUS_AREAS: AboutFocusArea[] = [
  {
    id: 'web-applications',
    label: 'Application UI',
    title: 'Web Applications',
    body: 'React-driven interfaces, product-style UI, responsive systems, and polished implementation built for real use rather than one-off visuals.',
  },
  {
    id: 'game-development',
    label: 'Interaction Systems',
    title: 'Game Development',
    body: 'Games were the original training ground: systems thinking, interaction design, custom logic, motion, and the instinct to make complex behavior feel natural.',
  },
  {
    id: 'teaching-education',
    label: 'Education Practice',
    title: 'Teaching / Education',
    body: 'Years of coding instruction shaped how I structure information, communicate clearly, and design experiences that are approachable without feeling oversimplified.',
  },
] as const;

export const ABOUT_CARDS_LABELS: Record<AboutCardsVariantId, string> = {
  grid: 'Three-column grid',
  featured: 'Featured lead card',
  editorial: 'Editorial list format',
  split: 'Split feature rows',
  rail: 'Accent rail stack',
  panel: 'Split panel stack',
  beacon: 'Beacon cards',
};

export const ABOUT_TONE_LABELS: Record<AboutToneVariantId, string> = {
  neutral: 'Neutral surface',
  elevated: 'Elevated surface',
  chapter: 'Chapter separation',
};
