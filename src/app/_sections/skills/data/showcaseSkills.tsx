import type { ReactNode } from 'react';
import {
  ArchitectureGraphic,
  ContentModelGraphic,
  DesignSystemGraphic,
  DeveloperExperienceGraphic,
  ExperimentationGraphic,
  PerformanceGraphic,
  TestingGraphic,
} from '../components/SkillShowcaseContent';

export type SkillShowcaseData = {
  id: string;
  title: string;
  titleMobile?: string;
  description: string;
  backgroundColor: string;
  content: ReactNode;
};

export const SHOWCASE_SKILLS: SkillShowcaseData[] = [
  {
    id: 'frontend-architecture',
    title: 'Frontend Architecture',
    titleMobile: 'Architecture',
    description:
      'React, TypeScript, monorepo design, build tooling, and composable foundations for complex web apps.',
    backgroundColor: '#07101f',
    content: <ArchitectureGraphic />,
  },
  {
    id: 'ui-ux-engineering',
    title: 'UI/UX Engineering',
    titleMobile: 'UI/UX',
    description:
      'Design systems, responsive implementation, accessibility, and product UI that respects the original design intent.',
    backgroundColor: '#10131d',
    content: <DesignSystemGraphic />,
  },
  {
    id: 'developer-experience',
    title: 'Developer Experience',
    titleMobile: 'DX',
    description:
      'CI/CD, linting, local workflow, internal tooling, and automation that helps teams ship without drag.',
    backgroundColor: '#061a18',
    content: <DeveloperExperienceGraphic />,
  },
  {
    id: 'automated-testing',
    title: 'Automated Testing',
    titleMobile: 'Testing',
    description:
      'Testing strategy across unit, integration, E2E, and visual regression for confident product changes.',
    backgroundColor: '#17131c',
    content: <TestingGraphic />,
  },
  {
    id: 'experimentation',
    title: 'Experimentation',
    titleMobile: 'Experiments',
    description:
      'A/B testing, feature flags, analytics, personalisation, and measurement systems for product decisions.',
    backgroundColor: '#17160d',
    content: <ExperimentationGraphic />,
  },
  {
    id: 'performance',
    title: 'Performance',
    titleMobile: 'Performance',
    description:
      'Core Web Vitals, bundle analysis, build optimisation, and practical speed work for real users.',
    backgroundColor: '#101406',
    content: <PerformanceGraphic />,
  },
  {
    id: 'cms-content',
    title: 'CMS & Content',
    titleMobile: 'CMS',
    description:
      'Headless CMS integration, content modelling, previews, and editor-friendly component systems.',
    backgroundColor: '#111116',
    content: <ContentModelGraphic />,
  },
];
