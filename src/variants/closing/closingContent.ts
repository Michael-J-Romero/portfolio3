import type {
  ContactFooterVariantId,
  ContactIntroVariantId,
} from '../config/types';

export interface ClosingCopy {
  eyebrow: string;
  heading: string;
  body: string;
  availability: string;
  primaryLabel: string;
  secondaryLabel: string;
  footerLine: string;
}

export const CONTACT_COPY: Record<ContactIntroVariantId, ClosingCopy> = {
  direct: {
    eyebrow: 'Contact',
    heading: 'Let\'s build something thoughtful, polished, and interactive.',
    body:
      'I\'m interested in front-end, UI, and interactive development work where design quality, usability, and implementation all matter.',
    availability: 'Available for front-end, interactive, and creative development opportunities.',
    primaryLabel: 'Email Me',
    secondaryLabel: 'View Resume',
    footerLine: 'Built with React, TypeScript, and custom motion.',
  },
  conversational: {
    eyebrow: 'Get In Touch',
    heading: 'If the work feels aligned, let\'s talk.',
    body:
      'I\'m interested in roles and collaborations where front-end craft, interaction quality, and clear implementation all need to work together.',
    availability: 'Open to front-end, interactive, and design-sensitive development work.',
    primaryLabel: 'Start A Conversation',
    secondaryLabel: 'Resume',
    footerLine: 'Designed and built in React, TypeScript, and custom motion systems.',
  },
  opportunities: {
    eyebrow: 'Opportunities',
    heading: 'Open to thoughtful front-end and interactive work.',
    body:
      'This framing is more direct about availability, with a stronger emphasis on the kinds of projects and teams I\'m interested in joining.',
    availability: 'Available for front-end, UI, interactive, and creative technology opportunities.',
    primaryLabel: 'Email',
    secondaryLabel: 'Resume',
    footerLine: 'Portfolio built with React, TypeScript, and custom motion.',
  },
  editorial: {
    eyebrow: 'Closing Note',
    heading: 'Interested in the intersection of design, systems, and polished front-end execution.',
    body:
      'A quieter closing option that reads more like a final note than a sales pitch, while still making contact paths easy to find.',
    availability: 'Available for select front-end and interactive opportunities.',
    primaryLabel: 'Email',
    secondaryLabel: 'Resume',
    footerLine: 'Built in React and TypeScript with custom motion and section-level prototypes.',
  },
};

export const FOOTER_LINE_VARIANTS: Record<ContactFooterVariantId, string> = {
  simple: 'Minimal footer with direct contact links.',
  network: 'Direct links for email, LinkedIn, and GitHub.',
  build: 'Built with React, TypeScript, and custom motion.',
};