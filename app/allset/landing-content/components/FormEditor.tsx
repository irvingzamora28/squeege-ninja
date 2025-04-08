'use client'

import { useState, useEffect } from 'react'
import { LandingContent } from '../types'

interface FormEditorProps {
  content: LandingContent
  onSave: (content: LandingContent) => void
  isSaving: boolean
}

export default function FormEditor({ content, onSave, isSaving }: FormEditorProps) {
  const [formData, setFormData] = useState<LandingContent>(content)
  const [activeSection, setActiveSection] = useState<
    'hero' | 'mainFeatures' | 'features' | 'cta' | 'faqs' | 'pricing'
  >('hero')

  useEffect(() => {
    setFormData(content)
  }, [content])

  const handleChange = <T extends keyof LandingContent>(
    section: T,
    field: string,
    value: unknown
  ) => {
    setFormData((prev) => {
      const sectionData = { ...(prev[section] as unknown as Record<string, unknown>) }
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value,
        },
      } as LandingContent
    })
  }

  const handleNestedChange = <T extends keyof LandingContent>(
    section: T,
    subsection: string,
    field: string,
    value: unknown
  ) => {
    setFormData((prev) => {
      const sectionData = { ...(prev[section] as unknown as Record<string, unknown>) }
      const subsectionData = { ...((sectionData[subsection] as Record<string, unknown>) || {}) }

      return {
        ...prev,
        [section]: {
          ...sectionData,
          [subsection]: {
            ...subsectionData,
            [field]: value,
          },
        },
      } as LandingContent
    })
  }

  const handleArrayChange = <T extends keyof LandingContent>(
    section: T,
    index: number,
    field: string,
    value: unknown
  ) => {
    setFormData((prev) => {
      // Special case for faqs.questions
      if (section === 'faqs') {
        const newQuestions = [...prev.faqs.questions]
        const updatedQuestion = { ...newQuestions[index] }
        // Type-safe way to update the field
        if (field === 'question') {
          updatedQuestion.question = value as string
        } else if (field === 'answer') {
          updatedQuestion.answer = value as string
        }
        newQuestions[index] = updatedQuestion
        return {
          ...prev,
          faqs: {
            ...prev.faqs,
            questions: newQuestions,
          },
        } as LandingContent
      } else {
        // Normal array handling for other array types
        const newArray = [...(prev[section] as unknown as unknown[])]
        // Create a safe copy of the item
        const updatedItem = { ...(newArray[index] as unknown as Record<string, unknown>) }
        // Update the specific field
        updatedItem[field] = value
        newArray[index] = updatedItem
        return {
          ...prev,
          [section]: newArray,
        } as LandingContent
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="rounded-lg bg-slate-100 p-6 shadow-md dark:bg-gray-800">
      <div className="mb-4">
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveSection('hero')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeSection === 'hero'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Hero Section
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('mainFeatures')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeSection === 'mainFeatures'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Main Features
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('features')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeSection === 'features'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('cta')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeSection === 'cta'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            CTA
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('faqs')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeSection === 'faqs'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            FAQs
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('pricing')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeSection === 'pricing'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Pricing
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Hero Section */}
          {activeSection === 'hero' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Hero Section</h3>

              <div>
                <label
                  htmlFor="hero-title"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <input
                  id="hero-title"
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) => handleChange('hero', 'title', e.target.value)}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  HTML tags like &lt;span&gt; are supported for styling
                </p>
              </div>

              <div>
                <label
                  htmlFor="hero-description"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="hero-description"
                  value={formData.hero.description}
                  onChange={(e) => handleChange('hero', 'description', e.target.value)}
                  rows={3}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Primary CTA
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label
                        htmlFor="hero-primary-cta-text"
                        className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        Text
                      </label>
                      <input
                        id="hero-primary-cta-text"
                        type="text"
                        value={formData.hero.primaryCta.text}
                        onChange={(e) =>
                          handleNestedChange('hero', 'primaryCta', 'text', e.target.value)
                        }
                        className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="hero-primary-cta-link"
                        className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        Link
                      </label>
                      <input
                        id="hero-primary-cta-link"
                        type="text"
                        value={formData.hero.primaryCta.link}
                        onChange={(e) =>
                          handleNestedChange('hero', 'primaryCta', 'link', e.target.value)
                        }
                        className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Secondary CTA
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label
                        htmlFor="hero-secondary-cta-text"
                        className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        Text
                      </label>
                      <input
                        id="hero-secondary-cta-text"
                        type="text"
                        value={formData.hero.secondaryCta.text}
                        onChange={(e) =>
                          handleNestedChange('hero', 'secondaryCta', 'text', e.target.value)
                        }
                        className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="hero-secondary-cta-link"
                        className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        Link
                      </label>
                      <input
                        id="hero-secondary-cta-link"
                        type="text"
                        value={formData.hero.secondaryCta.link}
                        onChange={(e) =>
                          handleNestedChange('hero', 'secondaryCta', 'link', e.target.value)
                        }
                        className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Features Section */}
          {activeSection === 'mainFeatures' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Main Features</h3>

              {formData.mainFeatures.map((feature, index: number) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                >
                  <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Feature {index + 1}
                  </h4>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor={`feature-title-${index}`}
                        className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        Title
                      </label>
                      <input
                        id={`feature-title-${index}`}
                        type="text"
                        value={feature.title}
                        onChange={(e) =>
                          handleArrayChange('mainFeatures', index, 'title', e.target.value)
                        }
                        className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`feature-icon-${index}`}
                        className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        Icon
                      </label>
                      <input
                        id={`feature-icon-${index}`}
                        type="text"
                        value={feature.icon}
                        onChange={(e) =>
                          handleArrayChange('mainFeatures', index, 'icon', e.target.value)
                        }
                        className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Use Feather icon names (e.g., FiUsers, FiSmartphone)
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor={`feature-description-${index}`}
                        className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        Description
                      </label>
                      <textarea
                        id={`feature-description-${index}`}
                        value={feature.description}
                        onChange={(e) =>
                          handleArrayChange('mainFeatures', index, 'description', e.target.value)
                        }
                        rows={2}
                        className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`feature-image-${index}`}
                        className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        Image
                      </label>
                      <input
                        id={`feature-image-${index}`}
                        type="text"
                        value={feature.image}
                        onChange={(e) =>
                          handleArrayChange('mainFeatures', index, 'image', e.target.value)
                        }
                        className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features Section */}
          {activeSection === 'features' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Features Section</h3>

              <div>
                <label
                  htmlFor="feature-section-title"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Section Title
                </label>
                <input
                  id="feature-section-title"
                  type="text"
                  value={formData.featureTitle}
                  onChange={(e) => handleChange('featureTitle', '', e.target.value)}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="feature-section-description"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Section Description
                </label>
                <textarea
                  id="feature-section-description"
                  value={formData.featureDescription}
                  onChange={(e) => handleChange('featureDescription', '', e.target.value)}
                  rows={2}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Feature Items
                </h4>

                {formData.features.map((feature, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor={`features-title-${index}`}
                          className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                        >
                          Title
                        </label>
                        <input
                          id={`features-title-${index}`}
                          type="text"
                          value={feature.title}
                          onChange={(e) =>
                            handleArrayChange('features', index, 'title', e.target.value)
                          }
                          className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`features-icon-${index}`}
                          className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                        >
                          Icon
                        </label>
                        <input
                          id={`features-icon-${index}`}
                          type="text"
                          value={feature.icon}
                          onChange={(e) =>
                            handleArrayChange('features', index, 'icon', e.target.value)
                          }
                          className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor={`features-description-${index}`}
                          className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                        >
                          Description
                        </label>
                        <textarea
                          id={`features-description-${index}`}
                          value={feature.description}
                          onChange={(e) =>
                            handleArrayChange('features', index, 'description', e.target.value)
                          }
                          rows={2}
                          className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          {activeSection === 'cta' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Call to Action Section</h3>

              <div>
                <label
                  htmlFor="cta-title"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <input
                  id="cta-title"
                  type="text"
                  value={formData.cta.title}
                  onChange={(e) => handleChange('cta', 'title', e.target.value)}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="cta-description"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="cta-description"
                  value={formData.cta.description}
                  onChange={(e) => handleChange('cta', 'description', e.target.value)}
                  rows={2}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="cta-button-text"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Button Text
                  </label>
                  <input
                    id="cta-button-text"
                    type="text"
                    value={formData.cta.button.text}
                    onChange={(e) => handleNestedChange('cta', 'button', 'text', e.target.value)}
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cta-button-link"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Button Link
                  </label>
                  <input
                    id="cta-button-link"
                    type="text"
                    value={formData.cta.button.link}
                    onChange={(e) => handleNestedChange('cta', 'button', 'link', e.target.value)}
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {activeSection === 'faqs' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">FAQs Section</h3>

              <div>
                <label
                  htmlFor="faqs-title"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <input
                  id="faqs-title"
                  type="text"
                  value={formData.faqs.title}
                  onChange={(e) => handleChange('faqs', 'title', e.target.value)}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="faqs-description"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="faqs-description"
                  value={formData.faqs.description}
                  onChange={(e) => handleChange('faqs', 'description', e.target.value)}
                  rows={2}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  HTML tags like &lt;a&gt; are supported for links
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Questions</h4>

                {formData.faqs.questions.map((faq, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor={`faq-question-${index}`}
                          className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                        >
                          Question
                        </label>
                        <input
                          id={`faq-question-${index}`}
                          type="text"
                          value={faq.question}
                          onChange={(e) =>
                            handleArrayChange('faqs', index, 'question', e.target.value)
                          }
                          className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`faq-answer-${index}`}
                          className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                        >
                          Answer
                        </label>
                        <textarea
                          id={`faq-answer-${index}`}
                          value={faq.answer}
                          onChange={(e) =>
                            handleArrayChange('faqs', index, 'answer', e.target.value)
                          }
                          rows={3}
                          className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Section */}
          {activeSection === 'pricing' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pricing Section</h3>

              <div>
                <label
                  htmlFor="pricing-title"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <input
                  id="pricing-title"
                  type="text"
                  value={formData.pricing.title}
                  onChange={(e) => handleChange('pricing', 'title', e.target.value)}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="pricing-description"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="pricing-description"
                  value={formData.pricing.description}
                  onChange={(e) => handleChange('pricing', 'description', e.target.value)}
                  rows={2}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Pricing Plans
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  For detailed pricing plan editing, please use the JSON editor
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
