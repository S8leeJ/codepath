// src/pages/EditCreator.jsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', url:'', description:'', imageURL:'' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('creators').select('*').eq('id', id).single()
      if (error) alert(error.message)
      else {
        setForm({
          name: data.name ?? '',
          url: data.url ?? '',
          description: data.description ?? '',
          imageURL: data.imageURL ?? '',
        })
      }
      setLoading(false)
    }
    load()
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase
      .from('creators')
      .update({
        name: form.name,
        url: form.url,
        description: form.description,
        imageURL: form.imageURL || null,
      })
      .eq('id', id)

    setSaving(false)
    if (error) alert(error.message)
    else navigate(`/creators/${id}`)
  }

  async function handleDelete() {
    if (!confirm('Delete this creator?')) return
    const { error } = await supabase.from('creators').delete().eq('id', id)
    if (error) alert(error.message)
    else navigate('/')
  }

  if (loading) return <p className="text-center mt-8">Loading…</p>

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8 w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Creator</h1>

        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">URL</label>
          <input
            name="url"
            value={form.url}
            onChange={handleChange}
            required
            type="url"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Image URL (optional)</label>
          <input
            name="imageURL"
            value={form.imageURL}
            onChange={handleChange}
            type="url"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-3 justify-center">
          <button
            disabled={saving}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Delete
          </button>

          <Link
            to={`/creators/${id}`}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  )
}
