// ShowCreators.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import CreatorCard from '../components/CreatorCard.jsx';

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
const onDelete = async (id) => {
  if (!window.confirm('Delete this creator?')) return;
  const { error } = await supabase
    .from('creators')
    .delete()
    .eq('id', id);
  if (error) {
    console.error(error);
    alert('Error deleting creator.');
  } else {
    setCreators(creators.filter((c) => c.id !== id));
  }
};

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="text-center">
  <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-blue-400 to-purple-200 bg-clip-text text-transparent drop-shadow-lg animate-pulse">💫 Creatorverse</h1>
        <p className="text-lg text-slate-300 bg-black/40 max-w-6xl mx-auto p-8 rounded-lg mb-12 shadow-lg">
          Creatorverse is a platform to discover, celebrate, and share the stories of inspiring creators from all walks of life. Add your favorite creators, explore their work, and learn more about the people shaping our world.
        </p>
      </div>


      <h1 className="text-3xl font-bold mb-8 text-slate-400">✨ Check out these creators!</h1>
       {creators.length === 0 ? (
        <p className="text-center text-gray-500">No creators found!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} onDelete={onDelete} />))}
        </div>
      )}
    </main>
  );
}
