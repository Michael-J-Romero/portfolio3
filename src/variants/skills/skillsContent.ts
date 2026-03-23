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
    id: 'full-stack-web-development',
    title: 'Full Stack Web Development',
    label: 'Product-minded build work',
    summary: 'I build complete web experiences across interface development, application structure, responsive systems, and the integration work needed to ship something stable and usable.',
    skills: ['React', 'TypeScript', 'Responsive UI', 'Component systems', 'Application architecture', 'CMS integration'],
  },
  {
    id: 'educator-coding-curriculum',
    title: 'Educator / Coding Curriculum',
    label: 'Clear technical teaching',
    summary: 'My teaching background includes coding instruction, curriculum development, and breaking complex ideas into approachable lessons without flattening the real substance.',
    skills: ['Coding instruction', 'Curriculum design', 'Lesson planning', 'Mentorship', 'Technical communication'],
  },
  {
    id: 'app-and-game-development',
    title: 'App And Game Development',
    label: 'Systems and interaction',
    summary: 'Apps and games have been the strongest training ground for systems thinking, interaction design, mechanics, and the kind of iteration required to make behavior feel right.',
    skills: ['Gameplay logic', 'Interactive prototyping', 'Animation systems', 'Custom mechanics', 'Performance-minded problem solving'],
  },
];

export const SKILL_CHIP_OPENERS: Record<SkillsChipVariantId, string> = {
  chips: 'Chip grid',
  minimal: 'Minimal list',
  grouped: 'Grouped stack',
};