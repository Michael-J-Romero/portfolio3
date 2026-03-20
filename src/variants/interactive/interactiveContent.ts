import type {
  InteractiveFeaturedVariantId,
  InteractiveIntroVariantId,
} from '../config/types';
import bloodRedImg from '../../assets/BLOODRED3.png';
import droidTeam2Img from '../../assets/droidteam2.png';

export interface InteractiveProject {
  id: string;
  title: string;
  meta: string;
  imageSrc?: string;
  imageAlt?: string;
  summary: string;
  detail: string;
  signals: string[];
}

export const INTERACTIVE_SECTION_COPY: Record<
  InteractiveIntroVariantId,
  {
    eyebrow: string;
    heading: string;
    intro: string;
    legacyHeading: string;
    legacyIntro: string;
  }
> = {
  roots: {
    eyebrow: 'Games & Interactive Work',
    heading: 'Games & Interactive Work',
    intro:
      'A selection of projects that reflect my roots in game development and my continued interest in systems, motion, and interaction design.',
    legacyHeading: 'Legacy Game Projects',
    legacyIntro:
      'Before moving into professional web work, I spent years building games from scratch, handling gameplay logic, custom physics, and much of the art and animation myself.',
  },
  current: {
    eyebrow: 'Interactive Practice',
    heading: 'Current Interactive Work And Game Roots',
    intro:
      'This section connects current interactive experiments with the game projects that originally shaped how I think about motion, systems, and user response.',
    legacyHeading: 'Earlier Game Work',
    legacyIntro:
      'The older projects matter because they built the instincts behind my current work: state, feedback, timing, and how interaction should feel moment to moment.',
  },
  systems: {
    eyebrow: 'Systems And Play',
    heading: 'Gameplay Systems, Motion, And Responsive Interaction',
    intro:
      'Framed this way, the section reads less like a game archive and more like evidence of how I think through systems, feedback loops, and interactive behavior.',
    legacyHeading: 'Archived Game Systems',
    legacyIntro:
      'These projects are older, but each one still shows a useful kind of systems thinking: custom movement, enemy behavior, puzzle logic, and player-facing feedback.',
  },
  play: {
    eyebrow: 'Play And Prototyping',
    heading: 'Interactive Work With A Stronger Prototyping Lens',
    intro:
      'This version treats the section as a set of interaction prototypes, from a current WebVR build to earlier games that focused on moment-to-moment feel.',
    legacyHeading: 'Prototype Archive',
    legacyIntro:
      'The archive here is less about nostalgia and more about the habits it trained: building rules, testing feel, and making mechanics readable under pressure.',
  },
};

export const FEATURED_INTERACTIVE_PROJECT: InteractiveProject = {
  id: 'rhythm-drumming-vr',
  title: 'Rhythm Drumming VR Game',
  meta: 'In Development - Web VR - Gameplay Systems',
  imageSrc: '/drum_game.png',
  imageAlt: 'Screenshot of the Rhythm Drumming VR Game project',
  summary:
    'A rhythm-based drumming game in development for the web, combining timing-focused gameplay and performance-driven interaction in a more immersive format.',
  detail:
    'The project explores timing accuracy, player feedback, movement rhythm, and a more physical interaction model than the rest of the portfolio currently shows.',
  signals: ['In development', 'Web VR', 'Timing systems', 'Interaction feel'],
};

export const FEATURED_VARIANT_OPEN_LABELS: Record<InteractiveFeaturedVariantId, string> = {
  spotlight: 'Open Project',
  split: 'View Prototype',
  lab: 'Inspect Prototype',
};

export const LEGACY_GAMES: InteractiveProject[] = [
  {
    id: 'blood-red',
    title: 'Blood Red',
    meta: 'Action Game - Legacy Project',
    imageSrc: bloodRedImg,
    imageAlt: 'Screenshot of the Blood Red game project',
    summary:
      'A zombie survival shooter built from scratch, where I explored hit reactions, dynamic animation combinations, and instant bullet collision detection along a traced line.',
    detail:
      'This project was useful for combat feedback, enemy pressure, and the feel of fast-response weapons.',
    signals: ['Combat feel', 'Hit reactions', 'Animation combos'],
  },
  {
    id: 'toxic-tides',
    title: 'Toxic Tides',
    meta: 'Action Game - Legacy Project',
    imageSrc: '/toxic tides.PNG',
    imageAlt: 'Screenshot of the Toxic Tides game project',
    summary:
      'An underwater multidirectional shooter focused on wave survival, enemy variety, and performance optimization for large numbers of active enemies on screen.',
    detail:
      'It pushed on pacing under load, handling multiple threats, and keeping the screen readable during heavier action.',
    signals: ['Wave survival', 'Performance', 'Enemy variety'],
  },
  {
    id: 'droid-team',
    title: 'Droid Team',
    meta: 'Puzzle Game - Legacy Project',
    imageSrc: droidTeam2Img,
    imageAlt: 'Screenshot of the Droid Team game project',
    summary:
      'A puzzle game built around custom character physics, stacking mechanics, and level design that forced cooperative problem-solving without allowing players to bypass the intended challenge.',
    detail:
      'This one shows a different side of the work: puzzle communication, rule clarity, and constraint-driven design.',
    signals: ['Puzzle logic', 'Custom physics', 'Level constraints'],
  },
];