import {
  ProofPointCard,
  SkillGrid,
  SkillPage,
  SkillPageShell,
  SkillPager,
} from './primitives';
import type { SkillPageProps } from './types';

export function ProductEngineeringSkill({
  isVisible = true,
  variant,
}: SkillPageProps) {
  return (
    <SkillPageShell
      intro="I build the apps people actually use — SPAs, portals, and interactive experiences shipped at scale. React and TypeScript frontend, with enough backend to own features end-to-end."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Product Engineering examples page 1">
          <SkillGrid>
            <ProofPointCard
              title="Healthcare Patient Portal"
              eyebrow="Health tech"
              description="Sole frontend architect of a greenfield React SPA serving ~1,500 new users daily across AU and NZ."
              image="/images/skills/pre-consultation-portal.png"
              imageAlt="Healthcare patient portal screenshot"
              imageFit="cover"
              imagePosition="right"
            />
            <ProofPointCard
              title="McDonald's Menu Boards"
              eyebrow="Retail"
              description="Built React components deployed to digital screens at 2,000+ McDonald's stores across Australia and New Zealand."
              cardSpan="full"
              image="/images/skills/mcdonalds-digital-menu.jpg"
              imageAlt="McDonald's digital menu board screenshot"
              imageFit="cover"
              imagePosition="right"
            />
            <ProofPointCard
              title="Nutricia / Danone"
              eyebrow="Commerce"
              description="SSO, loyalty program, and branded checkout on a headless React/Magento PWA for one of the world's largest food companies."
              href="https://www.nutriciastore.com.au"
              image="/images/skills/nutriciastore.jpg"
              imageAlt="Nutricia Store screenshot"
              imageFit="cover"
            />
          </SkillGrid>
        </SkillPage>
        <SkillPage label="Page 2" summary="Product Engineering examples page 2">
          <SkillGrid>
            <ProofPointCard
              title="Property Listings Portal"
              eyebrow="Full-stack"
              description="Full-stack Next.js/MongoDB app with auth, serverless functions, and a dynamic data grid for real estate launches."
              image="/images/skills/opt-releases.png"
              imageAlt="Property listings portal screenshot"
              imageFit="cover"
            />
            <ProofPointCard
              title="Milkrun"
              eyebrow="E-commerce"
              description="Senior frontend on a TypeScript/React Shopify site built with Next.js. Code reviews and mentoring."
              href="https://www.milkrun.com"
              image="/images/skills/milkrun.png"
              imageAlt="Milkrun website screenshot"
              imageFit="cover"
            />
            <ProofPointCard
              title="Stack"
              eyebrow="Stack"
              cardSpan="full"
              chips={[
                'React',
                'TypeScript',
                'Next.js',
                'Vite',
                'Node.js',
                'GraphQL',
                'MongoDB',
                'Tailwind',
                'Vercel',
                'Shopify',
              ]}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
