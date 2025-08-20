// ShowCreators.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('name', { ascending: true });
      if (error) console.error(error);
      else setCreators(data);
    };

    fetchCreators();
  }, []);

  const deleteCreator = async (name) => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('name', name); // replace with id if you add a unique id column
    if (error) console.error(error);
    else setCreators(creators.filter((c) => c.name !== name));
  };

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">Creatorverse</h1>

      <div className="text-center mb-8">
        <button
          onClick={() => navigate('/creators/new')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Add Creator
        </button>
      </div>

      {creators.length === 0 ? (
        <p className="text-center text-gray-500">No creators found!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-white">
          {creators.map((c) => (
            <div
              key={c.name}
              className="bg-slate-300/30 hover:shadow-xl rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
                              <h2 className="text-xl font-semibold mb-2">{c.name}</h2>

              {c.imageURL && (
                <img
                  src={c.imageURL}
                  alt={c.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
               <p className="text-gray-200 mb-2 text-center">{c.description}</p>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:underline mb-4"
              >
                Visit Page
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit/${c.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCreator(c.name)}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
