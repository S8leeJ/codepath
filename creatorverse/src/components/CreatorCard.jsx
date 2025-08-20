// src/components/CreatorCard.jsx
import { Link } from 'react-router-dom'

export default function CreatorCard({ creator }) {
    const { id, name, url, description, imageURL } = creator;

    return (
        <article className="card">
            {imageURL && (
                <img
                    src={imageURL}
                    alt={name}
                    style={{ width: '100%', borderRadius: 'var(--pico-border-radius)', objectFit: 'cover', maxHeight: 220 }}
                />
            )}
            <h3><a href={url} target="_blank" rel="noreferrer">{name}</a></h3>
            <p>{description}</p>
            <footer style={{ display: 'flex', gap: 8 }}>
                <Link
                    to={`/creators/${id}`}
                    className="secondary"
                    role="button"
                    style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none' }}
                >
                    View
                </Link>
                <Link
                    to={`/creators/${id}/edit`}
                    className="contrast"
                    role="button"
                    style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none' }}
                >
                    Edit
                </Link>
            </footer>
        </article>
    );
}
