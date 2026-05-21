/**
 * Renders an inline <script> that scrolls to the target section
 * synchronously during HTML parsing — before the browser paints.
 *
 * This eliminates the flicker where the Hero is briefly visible
 * when landing on a deep section route.
 *
 * IMPORTANT: Place this component AFTER all <section> components in the
 * route page so the target element already exists in the DOM when the
 * script executes.
 *
 * This is a Server Component (no 'use client' directive).
 */
export function ScrollToSection({ sectionId }: { sectionId: string }) {
  const code = `document.getElementById(${JSON.stringify(sectionId)})?.scrollIntoView();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
