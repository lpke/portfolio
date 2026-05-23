import { SkillCard } from '@/components/skills/SkillCard/SkillCard';
import {
  SkillGrid,
  SkillPage,
  SkillPageShell,
  SkillPager,
} from '@/components/skills/SkillPagePrimitives';
import type { SkillPageProps } from '@/components/skills/types';

export function ShippingTestingSkill({
  isVisible = true,
  variant,
}: SkillPageProps) {
  return (
    <SkillPageShell
      intro="It’s not a product without production. I write the tests, build the pipelines, and make sure what ships is solid."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Shipping & Testing examples">
          <SkillGrid>
            <SkillCard
              title="Experimentation"
              titleSize="lg"
              description="Most recently, at Montu, I shipped experiments with VWO and LaunchDarkly: eligibility logic, variant handling, analytics events, and campaign launch."
              cardSpan="full"
              image="/images/skills/vwo-logo-dark.jpg"
              imageAlt="VWO logo"
              imageColor="#12172A"
              imageFit="contain"
              imageBlurBackground={false}
              imagePosition={{
                base: 'top',
                md: 'right',
              }}
              imageSize={{
                base: '8rem',
                md: '45%',
                lg: '48%',
              }}
              imageObjectPosition="center"
            />
            <SkillCard
              title="Accessibility"
              titleSize="lg"
              description="I factor keyboard navigation, ARIA labelling, and contrast ratios into every component I write."
              cardSpan="half"
              image="/images/skills/pre-consultation-portal.png"
              imageAlt="Patient portal screenshot"
              imageFit="cover"
              imageObjectPosition="center top"
              imagePosition={{
                base: 'top',
                md: 'left',
                lg: 'top',
              }}
              imageSize={{
                base: '7rem',
                md: '45%',
                lg: '9rem',
              }}
            />
            <SkillCard
              title="Deployment"
              titleSize="lg"
              description="I set up CI/CD pipelines with GitHub Actions and AWS CDK, ensuring smooth deployments and reliable releases."
              cardSpan="half"
              chips={['AWS CDK', 'S3', 'CloudFront', 'GitHub Actions']}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
