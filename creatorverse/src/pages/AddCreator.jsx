// src/pages/AddCreator.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const [form, setForm] = useState({ name:'', url:'', description:'', imageURL:'' })
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
    else navigate(`/creators/${data.id}`)
  }

    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8 w-full max-w-lg space-y-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Add Creator</h1>
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">URL</label>
            <input name="url" value={form.url} onChange={handleChange} required type="url" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Image URL (optional)</label>
            <input name="imageURL" value={form.imageURL} onChange={handleChange} type="url" className="w-full border rounded px-3 py-2" />
          </div>
          <button disabled={saving} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">{saving ? 'Saving…' : 'Add Creator'}</button>
        </form>
      </main>
  )
}
