import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm.jsx'
import { createProduct } from '../api/products.js'

export default function NewProduct({ products, setProducts }) {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(product) {
    setBusy(true)
    setError('')
    try {
      const created = await createProduct(product)
      setProducts([...products, created])
      navigate(`/products/${created.id}`)
    } catch {
      setError('Could not create the product. Check that json-server is running.')
      setBusy(false)
    }
  }

  return (
    <section className="form-page-card">
      <div className="form-page-copy">
        <span className="eyebrow">New listing</span>
        <h1>Add a new product</h1>
        <p>Fill in the details in the provided spaces.</p>
        <Link to="/" className="text-link">
          ← Back to home
        </Link>
      </div>
      <div className="form-card">
        <ProductForm onSubmit={handleSubmit} submitLabel="Create product" busy={busy} />
        {error && <p className="form-error">{error}</p>}
      </div>
    </section>
  )
}