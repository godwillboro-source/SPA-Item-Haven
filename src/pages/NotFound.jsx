import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="detail-card empty-card">
      <span>🧭</span>
      <h1>Page not found</h1>
      <p>That route doesn't exist in this admin portal.</p>
      <Link className="button button-primary" to="/">
        Back to home
      </Link>
    </section>
  )
}