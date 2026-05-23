import { Button } from '@/components/Button';
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
              showExternalLinkIndicator
              modal={{
                title: 'Heads Up!',
                titleSize: 'lg',
                children: (
                  <div>
                    <p className="mt-2">
                      This opens the live patient portal, but without a token
                      for authentication, expect to see an error.
                    </p>
                    <p className="mt-2 mb-8">
                      To see the portal, you need to go through the
                      pre-screening process on the main Alternaleaf website.
                    </p>
                    <Button
                      href="https://my.alternaleaf.com.au/pre-consult"
                      target="_blank"
                      rel="noreferrer"
                      className="mr-2"
                    >
                      Go to Portal
                    </Button>
                    <Button
                      href="https://www.alternaleaf.com.au"
                      target="_blank"
                      rel="noreferrer"
                      className="mr-2"
                      variant="secondary"
                    >
                      Go to Alternaleaf
                    </Button>
                  </div>
                ),
              }}
              cardSpan="half"
              image="/images/skills/alternaleaf-logo-square-dark.png"
              imageAlt="Healthcare patient portal screenshot"
              imageColor="#2F0431"
              imageObjectPosition="center"
              imageSize={{
                base: '9rem',
                md: '45%',
                lg: '10rem',
              }}
              imagePosition={{
                lg: 'top',
              }}
              imageFit={{
                base: 'contain',
                md: 'cover',
              }}
              imageBlurBackground={false}
              imageObjectScale={{
                base: 3.3,
                md: 1.3,
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
                lg: 'left top',
              }}
              imageSize={{
                base: '9rem',
                md: '45%',
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
                base: '9rem',
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
              eyebrow="Acidgreen"
              title="Milkrun"
              titleSize="lg"
              description="Lead Frontend Engineer on a Shopify site built with Next.js. Provided code reviews, training, and mentoring."
              href="https://www.milkrun.com"
              image="/images/skills/milkrun.png"
              imagePosition="top"
              imageAlt="Milkrun website screenshot"
              imageFit="cover"
              imageSize={{
                base: '9rem',
                lg: '10rem',
              }}
            />
            <SkillCard
              eyebrow="Greenfields DC"
              title="Property Releases Portal"
              titleSize="lg"
              description="Full-stack Next.js/MongoDB app with auth, serverless functions, and a dynamic data grid for capturing EOI data."
              image="/images/skills/opt-releases.png"
              imageAlt="Property releases portal screenshot"
              imagePosition="top"
              imageFit="cover"
              imageObjectScale={1.2}
              imageObjectPosition="left top"
              imageSize={{
                base: '9rem',
                lg: '10rem',
              }}
            />
            <SkillCard
              title="Frontend Tech"
              cardSpan="half"
              chips={[
                'HTML/CSS',
                'JavaScript',
                'TypeScript',
                'React',
                'Next.js',
                'Vite',
                'Tailwind',
                'Material UI',
                'Headless CMS',
                'Shopify',
              ]}
            />
            <SkillCard
              title="Backend Tech"
              cardSpan="half"
              chips={[
                'Node.js',
                'REST',
                'GraphQL',
                'TanStack',
                'Zod',
                'Serverless',
                'Vercel',
                'MongoDB',
                'GitHub Actions',
                'AWS CDK',
              ]}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
