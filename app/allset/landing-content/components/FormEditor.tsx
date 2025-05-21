'use client'

import { useEffect } from 'react'
import { useFormData } from './useFormData'
import { FieldRenderer } from './FieldRenderer'

interface FormEditorProps<T> {
  content: T
  onSave: (content: T) => void
  isSaving: boolean
}

export default function FormEditor<T extends Record<string, unknown>>({
  content,
  onSave,
  isSaving,
}: FormEditorProps<T>) {
  const {
    formData,
    setFormData,
    getValueAtPath,
    handleFieldChange,
    handleArrayAdd,
    handleArrayRemove,
  } = useFormData<T>(content)

  useEffect(() => {
    setFormData(content)
  }, [content, setFormData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.entries(formData).map(([fieldKey, value]) => (
          <FieldRenderer
            key={fieldKey}
            fieldKey={fieldKey}
            value={value}
            parentKeys={[]}
            getValueAtPath={getValueAtPath}
            handleFieldChange={handleFieldChange}
            handleArrayAdd={handleArrayAdd}
            handleArrayRemove={handleArrayRemove}
            formData={formData}
          />
        ))}
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
  )
}
