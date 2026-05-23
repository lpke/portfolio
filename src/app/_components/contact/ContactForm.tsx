'use client';

import { useActionState } from 'react';
import { Button } from '@/components/Button';
import { CONTACT_FORM_CONTENT } from '@/utils/constants';

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
    return {
      message: CONTACT_FORM_CONTENT.feedback.missingFields,
      success: false,
    };
  }

  // Placeholder — replace with actual submission logic
  return { message: CONTACT_FORM_CONTENT.feedback.success, success: true };
}

const INITIAL_STATE: FormState = { message: '', success: false };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    INITIAL_STATE,
  );

  const inputClassName =
    'bg-surface-container-lowest/70 text-on-surface placeholder:text-on-surface-variant/35 focus:border-primary/45 focus:bg-surface-container-lowest focus:shadow-[0_8px_18px_rgba(0,0,0,0.18)] w-full rounded-md border border-white/10 px-4 py-3 text-base transition-[background-color,border-color,box-shadow] outline-none';
  const labelClassName =
    'font-label text-on-surface-variant/82 text-xs tracking-widest uppercase';

  return (
    <form action={formAction} className="relative z-10 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className={labelClassName}>
            {CONTACT_FORM_CONTENT.fields.name.label}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={CONTACT_FORM_CONTENT.fields.name.placeholder}
            className={inputClassName}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className={labelClassName}>
            {CONTACT_FORM_CONTENT.fields.email.label}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={CONTACT_FORM_CONTENT.fields.email.placeholder}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-2">
        <label htmlFor="details" className={labelClassName}>
          {CONTACT_FORM_CONTENT.fields.details.label}
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={5}
          placeholder={CONTACT_FORM_CONTENT.fields.details.placeholder}
          className={`${inputClassName} min-h-40 resize-y leading-relaxed`}
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? CONTACT_FORM_CONTENT.submit.pending
            : CONTACT_FORM_CONTENT.submit.idle}
        </Button>

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
