// src/App.jsx
import { Link, useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators.jsx'
import ViewCreator from './pages/ViewCreator.jsx'
import AddCreator from './pages/AddCreator.jsx'
import EditCreator from './pages/EditCreator.jsx'
import './index.css'
export default function App() {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creators/new', element: <AddCreator /> },
    { path: '/creators/:id', element: <ViewCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
  ])

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-500 to-purple-500">
      <header className="bg-black shadow-xl border-1 border-white flex justify-between items-center px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">💫 Creatorverse</h1>
        <nav className="flex gap-4">
          <Link to="/" className="text-gray-200 hover:text-white font-semibold px-3 py-2 rounded transition">Home</Link>
          <Link to="/creators/new" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded shadow transition">Add Creator</Link>
        </nav>
      </header>

      <section className="container mx-auto px-4">{routes}</section>
    </main>
  )
}
