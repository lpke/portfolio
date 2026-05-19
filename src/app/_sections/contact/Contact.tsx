import { PageHero } from '@/components/PageHero';
import { CONTACT_SECTION_CONTENT, SECTION_IDS } from '@/utils/constants';
import { ContactContent } from './components/ContactContent';

export function Contact() {
  return (
    <section
      id={SECTION_IDS.contact}
      className="mx-auto max-w-7xl px-5 pt-24 pb-24 md:px-8 md:pt-32 lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
    >
      <PageHero
        title={
          <>
            {CONTACT_SECTION_CONTENT.title.lead}{' '}
            <span className="text-primary">
              {CONTACT_SECTION_CONTENT.title.accent}
            </span>
          </>
        }
      />
      <ContactContent />
    </section>
  );
}
