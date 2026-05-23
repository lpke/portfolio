import { PageHero } from '@/components/PageHero';
import { CONTACT_SECTION_CONTENT, SECTION_IDS } from '@/utils/constants';
import { ContactAmbientCanvas } from '@/components/contact/ContactAmbientCanvas';
import { ContactContent } from '@/components/contact/ContactContent';

export function Contact() {
  return (
    <section
      id={SECTION_IDS.contact}
      className="relative isolate overflow-hidden px-5 pt-24 pb-24 md:px-8 md:pt-32 lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
    >
      <ContactAmbientCanvas />

      <div
        data-contact-contents
        className="relative z-10 mx-auto w-full max-w-7xl"
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
      </div>
    </section>
  );
}
