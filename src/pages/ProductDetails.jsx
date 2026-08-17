import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PriceEditor from '../components/PriceEditor.jsx'
import { getProduct, deleteProduct, updateProduct } from '../api/products.js'

const fallbackImage =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'

export default function ProductDetails({ products, setProducts }) {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        setError('')
        const data = await getProduct(productId)
        setProduct(data)
      } catch {
        setError('That product could not be found.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  // Used by the inline PriceEditor for a fast, targeted update — separate
  // from the full ProductEdit form.
  async function handleQuickSave(changes) {
    setBusy(true)
    setMessage('')
    try {
      const updated = await updateProduct(product.id, changes)
      setProduct(updated)
      setProducts(products.map((item) => (String(item.id) === String(updated.id) ? updated : item)))
    } catch {
      setMessage('Could not save that change.')
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    setBusy(true)
    try {
      await deleteProduct(product.id)
      const remaining = products.filter((item) => String(item.id) !== String(product.id))
      setProducts(remaining)
      navigate(remaining[0] ? `/products/${remaining[0].id}` : '/products/new', { replace: true })
    } catch {
      setMessage('Could not delete this product.')
      setBusy(false)
    }
  }

  if (loading) {
    return <div className="detail-card loading-card">Loading product…</div>
  }

  if (error || !product) {
    return (
      <div className="detail-card empty-card">
        <span>📦</span>
        <h2>Not found</h2>
        <p>{error || 'This product does not exist.'}</p>
      </div>
    )
  }

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src={product.image_url || fallbackImage}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.src = fallbackImage
            }}
          />
        </div>

        <div className="hero-copy">
          <span className="eyebrow">Product detail</span>
          <h1>{product.name}</h1>
          <p className="hero-description">{product.description}</p>

          <PriceEditor product={product} onSave={handleQuickSave} busy={busy} />

          {message && <p className="form-error">{message}</p>}

          <div className="action-row">
            <Link className="button button-primary" to="edit">
              Edit full details
            </Link>
            <button className="button button-ghost danger-text" onClick={handleDelete} disabled={busy}>
              Delete product
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}