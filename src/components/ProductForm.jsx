import React, { useState } from 'react'

const fallbackImage =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'

export default function ProductForm({ initialProduct, onSubmit, submitLabel, busy = false }) {
  const [form, setForm] = useState({
    name: initialProduct?.name || '',
    price: initialProduct?.price ?? '',
    stock: initialProduct?.stock ?? '',
    image_url: initialProduct?.image_url || '',
    description: initialProduct?.description || '',
  })

  const [formError, setFormError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!form.name.trim() || !form.description.trim()) {
      setFormError('Give the product a name and a description first.')
      return
    }

    const price = Number(form.price)
    const stock = Number(form.stock)

    if (Number.isNaN(price) || price < 0) {
      setFormError('Price must be a valid non-negative number.')
      return
    }

    if (Number.isNaN(stock) || stock < 0) {
      setFormError('Stock must be a valid non-negative number.')
      return
    }

    setFormError('')

    await onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      stock,
      image_url: form.image_url.trim() || fallbackImage,
    })
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        <span>Product name</span>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Wireless Keyboard"
        />
      </label>

      <div className="form-row">
        <label>
          <span>Price</span>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="0.00"
          />
        </label>
        <label>
          <span>Stock quantity</span>
          <input
            name="stock"
            type="number"
            step="1"
            min="0"
            value={form.stock}
            onChange={handleChange}
            placeholder="0"
          />
        </label>
      </div>

      <label>
        <span>Image URL</span>
        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          rows="6"
          value={form.description}
          onChange={handleChange}
          placeholder="What makes this product worth buying?"
        />
      </label>

      {formError && <p className="form-error">{formError}</p>}

      <button className="button button-primary" disabled={busy}>
        {busy ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}