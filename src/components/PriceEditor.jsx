import { useState } from 'react'

export default function PriceEditor({ product, onSave, busy }) {
  const [editing, setEditing] = useState(false)
  const [price, setPrice] = useState(product.price)
  const [stock, setStock] = useState(product.stock)
  const [error, setError] = useState('')

  function startEditing() {
    setPrice(product.price)
    setStock(product.stock)
    setError('')
    setEditing(true)
  }

  async function handleSave(event) {
    event.preventDefault()

    const nextPrice = Number(price)
    const nextStock = Number(stock)

    if (Number.isNaN(nextPrice) || nextPrice < 0) {
      setError('Price must be a valid non-negative number.')
      return
    }
    if (Number.isNaN(nextStock) || nextStock < 0) {
      setError('Stock must be a valid non-negative number.')
      return
    }

    setError('')
    await onSave({ price: nextPrice, stock: nextStock })
    setEditing(false)
  }

  if (!editing) {
    return (
      <div className="price-editor">
        <div className="price-editor-readout">
          <div>
            <span className="eyebrow">Price</span>
            <strong>KSH {Math.round(Number(product.price))}</strong>
          </div>
          <div>
            <span className="eyebrow">In stock</span>
            <strong>{product.stock}</strong>
          </div>
        </div>
        <button type="button" className="button button-ghost" onClick={startEditing}>
          Quick edit
        </button>
      </div>
    )
  }

  return (
    <form className="price-editor price-editor-active" onSubmit={handleSave}>
      <label>
        <span>Price</span>
        <input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>
      <label>
        <span>Stock</span>
        <input
          type="number"
          step="1"
          min="0"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
        />
      </label>
      {error && <p className="form-error">{error}</p>}
      <div className="price-editor-actions">
        <button className="button button-primary" disabled={busy}>
          {busy ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          className="button button-ghost"
          onClick={() => setEditing(false)}
          disabled={busy}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}