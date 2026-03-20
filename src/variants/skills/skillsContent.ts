import type {
  SkillsChipVariantId,
  SkillsIntroVariantId,
} from '../config/types';

export interface SkillGroup {
  id: string;
  title: string;
  label: string;
  summary: string;
  skills: string[];
}

export const SKILLS_SECTION_COPY: Record<
  SkillsIntroVariantId,
  { eyebrow: string; heading: string; intro: string }
> = {
  capabilities: {
    eyebrow: 'Capabilities',
    heading: 'Capabilities',
    intro:
      'Selected projects shown here represent a focused sample of my work. Additional experience details and samples are available upon request.',
  },
  strengths: {
    eyebrow: 'Working Strengths',
    heading: 'How I Tend To Work',
    intro:
      'This version treats the section less like a resume list and more like a compact map of the strengths that recur across the rest of the portfolio.',
  },
  toolkit: {
    eyebrow: 'Tools And Methods',
    heading: 'A Practical Toolkit Across Front-End, Systems, And Communication',
    intro:
      'A more direct framing that highlights the methods, tools, and working habits behind the project sections above.',
  },
  proof: {
    eyebrow: 'Supporting Proof',
    heading: 'A Broader View Of The Work Behind The Projects',
    intro:
      'Instead of repeating the project sections, this framing shows the supporting range behind them: implementation, design judgment, systems thinking, and communication.',
  },
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'front-end',
    title: 'Front-End',
    label: 'Implementation',
    summary: 'The production side of the work: React, component architecture, responsive behavior, and maintainable UI implementation.',
    skills: ['React', 'TypeScript', 'Responsive UI', 'Component systems', 'CMS integration', 'Motion and interaction'],
  },
  {
    id: 'design-ux',
    title: 'Design & UX',
    label: 'Interface judgment',
    summary: 'The side concerned with visual hierarchy, layout clarity, and turning design direction into readable, useful interfaces.',
    skills: ['Layout systems', 'Visual hierarchy', 'Design implementation', 'Collaborative design refinement', 'Interaction-focused UI thinking'],
  },
  {
    id: 'interactive-systems',
    title: 'Interactive Systems',
    label: 'Systems thinking',
    summary: 'The systems layer underneath the visuals: motion logic, gameplay-adjacent interaction, mechanics, and performance-minded iteration.',
    skills: ['Gameplay logic', 'Animation systems', 'Custom mechanics', 'Performance-minded problem solving', 'Prototyping'],
  },
  {
    id: 'professional-strengths',
    title: 'Professional Strengths',
    label: 'Communication',
    summary: 'The connective layer that keeps projects usable: communication, teaching instincts, collaboration, and translating complexity into clarity.',
    skills: ['Client collaboration', 'Communication', 'Teaching and mentorship', 'Translating complexity into clarity'],
  },
];

export const SKILL_CHIP_OPENERS: Record<SkillsChipVariantId, string> = {
  chips: 'Chip grid',
  minimal: 'Minimal list',
  grouped: 'Grouped stack',
};