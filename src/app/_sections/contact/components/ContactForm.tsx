'use client';

import { useActionState } from 'react';

type FormState = {
  message: string;
  success: boolean;
};

async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // TODO: Wire up to a real endpoint (e.g. API route, Resend, etc.)
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const details = formData.get('details') as string;

  if (!name || !email || !details) {
    return { message: 'Please fill in all fields.', success: false };
  }

  // Placeholder — replace with actual submission logic
  return { message: 'Message sent! I\'ll be in touch soon.', success: true };
}

const INITIAL_STATE: FormState = { message: '', success: false };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    INITIAL_STATE,
  );

  return (
    <form action={formAction} className="relative z-10 space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="font-label text-xs uppercase tracking-widest text-on-surface-variant/60"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Enter your name"
          className="w-full rounded-sm border border-white/10 bg-surface-container-lowest px-4 py-3 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="font-label text-xs uppercase tracking-widest text-on-surface-variant/60"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full rounded-sm border border-white/10 bg-surface-container-lowest px-4 py-3 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Project Details */}
      <div className="space-y-2">
        <label
          htmlFor="details"
          className="font-label text-xs uppercase tracking-widest text-on-surface-variant/60"
        >
          Project Details
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={4}
          placeholder="Tell me about your project..."
          className="w-full resize-none rounded-sm border border-white/10 bg-surface-container-lowest px-4 py-3 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="signature-gradient flex w-full items-center justify-center gap-2 rounded-full py-4 font-headline font-bold text-on-primary transition-all hover:shadow-[0_10px_30px_rgba(123,208,255,0.2)] disabled:opacity-50"
      >
        {isPending ? 'Sending…' : 'Send Message'} ➤
      </button>

      {/* Feedback */}
      {state.message && (
        <p
          className={`text-center text-sm ${state.success ? 'text-tertiary' : 'text-error'}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
