// src/components/CreatorCard.jsx
import { Link } from 'react-router-dom'
import { supabase } from '../client';
import { NavLink } from 'react-router-dom';

 

export default function CreatorCard({ creator, onDelete }) {
    const { id, name, url, description, imageURL } = creator;

    return (
        <article className="bg-slate-400 rounded-xl shadow-lg p-6 flex flex-col items-center transition shadow-lg hover:bg-slate-500 relative">
            {imageURL && (
                <img
                    src={imageURL}
                    alt={name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
            )}
            <h3 className="text-xl font-bold mb-2 text-blue-900 text-center">
                <a href={url} target="_blank" rel="noreferrer" className="hover:underline">{name}</a>
            </h3>
            <p className="mb-4 text-gray-700 text-center">{description}</p>
            <footer className="flex gap-3 w-full justify-center mt-auto">
                <Link
                    to={`/view/${id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                    role="button"
                >
                    View
                </Link>
                <Link
                    to={`/edit/${id}`}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                    role="button"
                >
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(id)}
                    className="bg-red-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    Delete
                </button>
            </footer>

        </article>
    );
}
