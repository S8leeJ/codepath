// src/App.jsx
import { Link, useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators.jsx'
import ViewCreator from './pages/ViewCreator.jsx'
import AddCreator from './pages/AddCreator.jsx'
import EditCreator from './pages/EditCreator.jsx'
import './index.css'
import bg from './components/bg.jpg'
export default function App() {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/view/:id', element: <ViewCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
  ])

  return (
    <main className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="relative z-10">
        <header className="bg-black shadow-xl border-1 border-white flex justify-between items-center px-6 py-4 mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">💫 Creatorverse</h1>
          <nav className="flex gap-4">
            <Link to="/" className="text-gray-200 hover:text-white font-semibold px-3 py-2 rounded transition">Home</Link>
            <Link to="/new" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded shadow transition">Add Creator</Link>
          </nav>
        </header>
        <section className="container mx-auto px-4">{routes}</section>
      </div>
    </main>
  )
}
