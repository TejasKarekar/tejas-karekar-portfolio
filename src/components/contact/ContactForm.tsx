import { useState } from 'react'
import { personalInfo } from '../../data/portfolio'

type FormValues = { name: string; email: string; message: string }
type FormErrors = Partial<Record<keyof FormValues, string>>
const initialValues: FormValues = { name: '', email: '', message: '' }

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.message.trim()) errors.message = 'Please enter a message.'
  else if (values.message.trim().length < 20) errors.message = 'Please add at least 20 characters so there is enough context.'
  return errors
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const updateValue = (field: keyof FormValues, value: string) => setValues((current) => ({ ...current, [field]: value }))

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) { setStatus('error'); setStatusMessage('Please correct the highlighted fields.'); return }
    setStatus('submitting')
    setStatusMessage('Preparing your message…')
    window.setTimeout(() => {
      if (!personalInfo.email) { setStatus('error'); setStatusMessage('No contact email is configured yet. Add a verified email in src/data/portfolio.ts to enable the email fallback.'); return }
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`)
      const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`)
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
      setStatus('success')
      setStatusMessage('Your email client should open with the message prepared. It has not been sent yet.')
    }, 350)
  }

  return <form noValidate onSubmit={onSubmit} className="contact-form rounded-2xl border border-[var(--color-border-strong)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] p-5 shadow-[var(--shadow-glass)] sm:p-7"><div className="grid gap-5"><Field label="Name" id="contact-name" value={values.name} error={errors.name} autoComplete="name" onChange={(value) => updateValue('name', value)} /><Field label="Email" id="contact-email" type="email" value={values.email} error={errors.email} autoComplete="email" onChange={(value) => updateValue('email', value)} /><Field label="Message" id="contact-message" value={values.message} error={errors.message} autoComplete="off" multiline onChange={(value) => updateValue('message', value)} /></div><button type="submit" disabled={status === 'submitting'} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[var(--color-accent)] px-5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)] disabled:cursor-wait disabled:opacity-70">{status === 'submitting' ? 'Preparing Message…' : 'Send Message'}</button>{status !== 'idle' && <p role="status" aria-live="polite" className={`mt-4 text-sm leading-6 ${status === 'error' ? 'text-[#f2a0a0]' : status === 'success' ? 'text-[#a9dbbd]' : 'text-[var(--color-text-muted)]'}`}>{statusMessage}</p>}</form>
}

type FieldProps = { label: string; id: string; type?: 'text' | 'email'; value: string; error?: string; autoComplete: string; multiline?: boolean; onChange: (value: string) => void }
function Field({ label, id, type = 'text', value, error, autoComplete, multiline = false, onChange }: FieldProps) {
  const classes = `mt-2 block w-full rounded-lg border bg-black/10 px-3.5 py-3 text-sm text-white placeholder:text-[var(--color-text-subtle)] transition-colors focus:border-[var(--color-accent)] focus:outline-none ${error ? 'border-[#d77a7a]' : 'border-[var(--color-border)]'}`
  return <div><label htmlFor={id} className="text-sm font-medium text-white">{label}</label>{multiline ? <textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} autoComplete={autoComplete} rows={5} className={`${classes} resize-y`} /> : <input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} autoComplete={autoComplete} className={classes} />}{error && <p id={`${id}-error`} className="mt-1.5 text-xs text-[#f2a0a0]">{error}</p>}</div>
}
