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
  return { message: "Message sent! I'll be in touch soon.", success: true };
}

const INITIAL_STATE: FormState = { message: '', success: false };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    INITIAL_STATE,
  );

  const inputClassName =
    'bg-surface-container-lowest/70 text-on-surface placeholder:text-on-surface-variant/35 focus:border-primary/35 focus:bg-surface-container-lowest focus:shadow-[0_8px_18px_rgba(0,0,0,0.18)] w-full rounded-md border border-white/10 px-4 py-3 text-base transition-[background-color,border-color,box-shadow] outline-none';
  const labelClassName =
    'font-label text-on-surface-variant/82 text-xs tracking-widest uppercase';

  return (
    <form action={formAction} className="relative z-10 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className={labelClassName}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClassName}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClassName}
          />
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-2">
        <label htmlFor="details" className={labelClassName}>
          Message
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={5}
          placeholder="A few details, goals, timeline, or links."
          className={`${inputClassName} min-h-40 resize-y leading-relaxed`}
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="signature-gradient font-headline text-on-primary inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full px-7 text-base font-bold transition-all hover:shadow-[0_0_18px_rgba(123,208,255,0.28)] disabled:cursor-default disabled:opacity-50"
        >
          {isPending ? 'Sending...' : 'Send message'}
        </button>

        {/* Feedback */}
        {state.message && (
          <p
            className={`text-base ${state.success ? 'text-tertiary' : 'text-error'}`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
