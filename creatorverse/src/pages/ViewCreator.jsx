// src/pages/ViewCreator.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)

  useEffect(() => {
    async function fetchOne() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()
      if (error) console.error(error)
      else setCreator(data)
    }
    fetchOne()
  }, [id])

  if (!creator) return <p>Loading…</p>

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <article className="bg-white shadow rounded-lg p-8 w-full max-w-lg flex flex-col items-center">
        {creator.imageURL && (
          <img
            src={creator.imageURL}
            alt={creator.name}
            className="w-full max-w-xs h-48 object-cover rounded mb-4"
          />
        )}
        <h2 className="text-2xl font-bold mb-2">{creator.name}</h2>
        <p className="mb-2"><a href={creator.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{creator.url}</a></p>
        <p className="mb-4 text-gray-700">{creator.description}</p>
        <div className="flex gap-3">
          <Link to={`/creators/${creator.id}/edit`} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">Edit</Link>
          <Link to="/" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition">Back</Link>
        </div>
      </article>
    </main>
  )
}
