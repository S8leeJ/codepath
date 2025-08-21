// src/pages/AddCreator.jsx
import { useState } from 'react'
import { UserIcon, LinkIcon, PencilSquareIcon, PhotoIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const payload = {
      name: form.name,
      url: form.url,
      description: form.description,
      imageURL: form.imageURL || null,
    }
    const { data, error } = await supabase.from('creators').insert(payload).select().single()
    setSaving(false)
    if (error) alert(error.message)
    else navigate(`/`)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-8 border border-blue-100">
        <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-blue-700">
          <PlusIcon className="w-8 h-8 inline-block text-blue-500" /> Add Creator
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-blue-400 mb-2" />
              <label className="block font-semibold mb-1">Name</label>
            </div>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Ada Lovelace" className="w-full border bg-blue-100 shadow-md rounded px-3 py-2 focus:ring focus:ring-blue-200" />
           </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-6 h-6 text-blue-400 mb-2" />
              <label className="block font-semibold mb-1">URL</label>
            </div>
            <input name="url" value={form.url} onChange={handleChange} required type="url" placeholder="https://example.com" className="w-full border bg-blue-100 shadow-md rounded px-3 py-2 focus:ring focus:ring-blue-200" />

          </div>
        </div>
        <div className="flex items-center gap-3">


          <div className="w-full">
            <div className="flex items-center gap-2">
              <PencilSquareIcon className="w-6 h-6 text-blue-400 mb-2" />
              <label className="block font-semibold mb-1">Description</label>
            </div>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4} placeholder="e.g. First computer programmer and mathematician." className="w-full border bg-blue-100 shadow-md rounded px-3 py-2 focus:ring focus:ring-blue-200" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <PhotoIcon className="w-6 h-6 text-blue-400 mb-2" />
              <label className="block font-semibold mb-1">Image URL (optional)</label>
            </div>

            <input name="imageURL" value={form.imageURL} onChange={handleChange} type="url" placeholder="e.g. https://adalovelace.com/photo.jpg" className="w-full border bg-blue-100 shadow-md rounded px-3 py-2 focus:ring focus:ring-blue-200" />
          </div>
        </div>
        <button disabled={saving} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2">
          <PlusIcon className="w-5 h-5" /> {saving ? 'Saving…' : 'Add Creator'}
        </button>
      </form>
    </main>
  )
}
