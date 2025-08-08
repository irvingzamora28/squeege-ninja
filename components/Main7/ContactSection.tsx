'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ContactSection as ContactSectionType } from '../../app/allset/landing-content/types'
import { containerVariants, fadeInUpVariants } from '@/components/Main5/AnimationVariants'
import { useContactSubmission } from '@/lib/useContactSubmission'

interface Props {
  contact: ContactSectionType
}

const ContactSection: React.FC<Props> = ({ contact }) => {
  const {
    form,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    validate,
    status,
    message,
    formRef,
    containerHeight,
  } = useContactSubmission(contact.fields)

  const hasInfo = Boolean(
    contact.contactInfo?.phone?.number ||
      contact.contactInfo?.email?.address ||
      (contact.contactInfo?.location?.address && contact.contactInfo.location.address.length > 0)
  )

  return (
    <section id="contact" className="relative bg-white py-24 dark:bg-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_90%,rgba(59,130,246,0.06),transparent_40%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            {contact.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">{contact.description}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Info */}
          <div className={`${hasInfo ? 'md:col-span-1' : 'hidden'}`}>
            {contact.contactInfo?.title && (
              <h3 className="mb-4 text-xl font-semibold">{contact.contactInfo.title}</h3>
            )}
            {contact.contactInfo?.phone?.number && (
              <div className="mb-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
                <div className="text-sm font-medium text-slate-500">
                  {contact.contactInfo.phone.label}
                </div>
                <div className="text-lg font-semibold">{contact.contactInfo.phone.number}</div>
                {contact.contactInfo.phone.hours && (
                  <div className="text-sm text-slate-500">{contact.contactInfo.phone.hours}</div>
                )}
              </div>
            )}
            {contact.contactInfo?.email?.address && (
              <div className="mb-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
                <div className="text-sm font-medium text-slate-500">
                  {contact.contactInfo.email.label}
                </div>
                <div className="text-lg font-semibold">{contact.contactInfo.email.address}</div>
                {contact.contactInfo.email.responseTime && (
                  <div className="text-sm text-slate-500">
                    {contact.contactInfo.email.responseTime}
                  </div>
                )}
              </div>
            )}
            {contact.contactInfo?.location?.address && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
                <div className="text-sm font-medium text-slate-500">
                  {contact.contactInfo.location.label}
                </div>
                <div className="mt-2 space-y-1">
                  {contact.contactInfo.location.address.map((line, i) => (
                    <div key={i} className="text-lg font-semibold">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={`${hasInfo ? 'md:col-span-2' : 'md:col-span-3'} relative rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800`}
            style={{ minHeight: containerHeight }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`space-y-6 transition-opacity duration-300 ${status === 'success' ? 'pointer-events-none absolute inset-0 opacity-0' : 'relative opacity-100'}`}
            >
              {contact.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label htmlFor={field.name} className="font-medium">
                    {field.label}
                    {field.required && <span className="text-primary-600 ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={5}
                      required={field.required}
                      value={form[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="focus:border-primary-500 focus:ring-primary-300 rounded-lg border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      value={form[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="focus:border-primary-500 focus:ring-primary-300 rounded-lg border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
                    />
                  )}
                  {touched[field.name] && !form[field.name]?.trim() && field.required && (
                    <span className="text-sm text-red-500">This field is required.</span>
                  )}
                </div>
              ))}

              {status === 'error' && (
                <div className="text-center font-medium text-red-500">{message}</div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !validate()}
                className="bg-primary-600 hover:bg-primary-700 w-full rounded-lg py-3 font-semibold text-white shadow-sm transition disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : contact.submitLabel}
              </button>
            </form>

            <div
              className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${status === 'success' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              <p className="text-primary-600 text-2xl font-semibold">
                {contact.successMessage || message}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
