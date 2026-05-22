import { SkillCard } from '@/components/skills/SkillCard/SkillCard';
import {
  SkillGrid,
  SkillPage,
  SkillPageShell,
  SkillPager,
} from '@/components/skills/SkillPagePrimitives';
import type { SkillPageProps } from '@/components/skills/types';

export function ProductEngineeringSkill({
  isVisible = true,
  variant,
}: SkillPageProps) {
  return (
    <SkillPageShell
      intro="I build web apps that serve thousands of users daily. Interactive SPAs, dashboards, portals, marketing sites, and integrations across the stack."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Product Engineering examples page 1">
          <SkillGrid>
            <SkillCard
              eyebrow="Montu"
              title="Alternaleaf Patient Portal"
              titleSize="lg"
              description="Sole frontend architect of a greenfield React SPA serving ~1,500 new users daily."
              cardSpan="half"
              image="/images/skills/pre-consultation-portal.png"
              imageAlt="Healthcare patient portal screenshot"
              imageObjectPosition={{
                base: 'center top',
                lg: '25% top',
              }}
              imageSize={{
                lg: '10rem',
              }}
              imagePosition={{
                lg: 'top',
              }}
              imageFit={{
                base: 'contain',
                lg: 'cover',
              }}
              imageObjectScale={{
                base: 2,
                md: 1,
                lg: 1.25,
              }}
            />
            <SkillCard
              eyebrow="Acidgreen"
              title="Nutricia / Danone"
              titleSize="lg"
              description="SSO, loyalty program, and branded checkout on a headless React/Magento PWA for one of the world's largest food companies."
              href="https://www.nutriciastore.com.au"
              cardSpan="half"
              image="/images/skills/nutriciastore.jpg"
              imageAlt="Nutricia Store screenshot"
              imageFit="cover"
              imagePosition={{
                md: 'left',
                lg: 'top',
              }}
              imageObjectPosition={{
                lg: 'left top'
              }}
              imageSize={{
                lg: '10rem',
              }}
              imageObjectScale={{
                lg: 1.8,
              }}
            />
            <SkillCard
              eyebrow="Akcelo"
              title="McDonald's Menu Boards"
              titleSize="lg"
              description="Built React components deployed to digital screens at 2,000+ McDonald's stores across Australia and New Zealand."
              cardSpan="full"
              cardMinHeight={{
                direction: 'up',
                values: {
                  lg: '17rem',
                },
              }}
              image="/images/skills/mcdonalds-digital-menu.jpg"
              imageAlt="McDonald's digital menu board screenshot"
              imageFit="cover"
              imageObjectPosition={{
                base: 'center top',
                md: 'left top',
              }}
              imagePosition={{
                base: 'top',
                md: 'right',
              }}
              imageSize={{
                base: '10rem',
                md: '50%',
                lg: '53%',
                1250: '58%',
              }}
            />
          </SkillGrid>
        </SkillPage>
        <SkillPage label="Page 2" summary="Product Engineering examples page 2">
          <SkillGrid>
            <SkillCard
              title="Property Releases Portal"
              description="Full-stack Next.js/MongoDB app with auth, serverless functions, and a dynamic data grid for capturing EOI data."
              image="/images/skills/opt-releases.png"
              imageAlt="Property releases portal screenshot"
              imageFit="cover"
              imageObjectScale={1.2}
              imageObjectPosition="left top"
            />
            <SkillCard
              eyebrow="Acidgreen"
              title="Milkrun"
              description="Senior engineer on a Shopify site built with Next.js. Provided code reviews and mentoring."
              href="https://www.milkrun.com"
              image="/images/skills/milkrun.png"
              imageAlt="Milkrun website screenshot"
              imageFit="cover"
            />
            <SkillCard
              eyebrow="Stack"
              title="Stack"
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
