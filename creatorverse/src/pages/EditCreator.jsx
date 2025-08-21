// src/pages/EditCreator.jsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { UserIcon, LinkIcon, PencilSquareIcon, PhotoIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
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
    <main className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white/60 shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-8 border border-blue-100">
        <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-blue-700">
          <PencilIcon className="w-8 h-8 inline-block text-blue-500" /> Edit Creator
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-blue-400 mb-2" />
              <label className="block font-semibold mb-1">Name</label>
            </div>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Ada Lovelace" className="w-full border rounded bg-blue-100 px-3 py-2 shadow-md placeholder-blue-100 focus:ring focus:ring-blue-200" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-6 h-6 text-blue-400 mb-2" />
              <label className="block font-semibold mb-1">URL</label>
            </div>
            <input name="url" value={form.url} onChange={handleChange} required type="url" placeholder="e.g. https://adalovelace.com" className="w-full border bg-blue-100 rounded px-3 py-2 shadow-md focus:ring" />
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
            <input name="imageURL" value={form.imageURL} onChange={handleChange} type="url" placeholder="e.g. https://adalovelace.com/photo.jpg" className="w-full border rounded px-3 py-2 bg-blue-100 shadow-md focus:ring focus:ring-blue-200" />
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2">
            <PencilIcon className="w-5 h-5" /> {saving ? 'Saving…' : 'Save'}
          </button>
          <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2">
            <TrashIcon className="w-5 h-5" /> Delete
          </button>
          <Link to={`/creators/${id}`} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  )
}
