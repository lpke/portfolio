'use client';

import { useActionState, useEffect, useRef } from 'react';
import { Button } from '@/components/Button';
import { CONTACT_FORM_CONTENT, EMAIL_CONFIG } from '@/utils/constants';

type FormState = {
  message: string;
  success: boolean;
};

async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const details = formData.get('details')?.toString().trim() ?? '';

  if (!name || !email || !details) {
    return {
      message: CONTACT_FORM_CONTENT.feedback.missingFields,
      success: false,
    };
  }

  try {
    const response = await fetch(EMAIL_CONFIG.apiPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contact', name, email, details }),
    });

    if (!response.ok) {
      return {
        message: CONTACT_FORM_CONTENT.feedback.error,
        success: false,
      };
    }

    return { message: CONTACT_FORM_CONTENT.feedback.success, success: true };
  } catch {
    return {
      message: CONTACT_FORM_CONTENT.feedback.error,
      success: false,
    };
  }
}

const INITIAL_STATE: FormState = { message: '', success: false };

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitContact,
    INITIAL_STATE,
  );

  useEffect(() => {
    if (!state.success) return;
    formRef.current?.reset();
  }, [state.success]);

  const inputClassName =
    'bg-surface-container-lowest/70 text-on-surface placeholder:text-on-surface-variant/35 focus:border-primary/45 focus:bg-surface-container-lowest focus:shadow-[0_8px_18px_rgba(0,0,0,0.18)] w-full rounded-md border border-white/10 px-4 py-3 text-base transition-[background-color,border-color,box-shadow] outline-none';
  const labelClassName =
    'font-label text-on-surface-variant/82 text-xs tracking-widest uppercase';
  const feedbackClassName = state.success
    ? 'border-tertiary/25 bg-tertiary/10 text-tertiary shadow-[0_0_20px_rgba(158,228,147,0.08)]'
    : 'border-error/25 bg-error/10 text-error shadow-[0_0_20px_rgba(255,180,171,0.08)]';

  return (
    <form ref={formRef} action={formAction} className="relative z-10 space-y-5">
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
          <div
            role={state.success ? 'status' : 'alert'}
            aria-live="polite"
            className={`flex min-h-11 items-center gap-2.5 rounded-md border px-3.5 py-2.5 text-sm leading-snug ${feedbackClassName}`}
          >
            {state.success && (
              <span
                aria-hidden="true"
                className="bg-tertiary/18 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              >
                ✓
              </span>
            )}
            <span>{state.message}</span>
          </div>
        )}
      </div>
    </form>
  );
}
