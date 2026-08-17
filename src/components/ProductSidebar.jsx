import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function ProductSidebar({ products, loading }) {
  const [search, setSearch] = useState('')

  // filter products by name (converts to lowercase)
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase()),
  )

  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/">
        <span className="brand-mark">🛒</span>
        <span>
          <strong>Item Haven</strong>
          <small>Product management</small>
        </span>
      </NavLink>

      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />
      </label>
     
      <NavLink to="/products/new" className="button button-primary button-wide">
        <span>＋</span> Add product
      </NavLink>
     
      <div className="menu-heading">
        <span>Catalog</span>
        <span className="count-pill">{products.length}</span>
      </div>
     
     
      <nav className="product-nav" aria-label="Product menu">
        {loading && <div className="nav-skeleton">Loading products…</div>}
        {!loading && filtered.length === 0 && (
          <div className="nav-empty">No matching products.</div>
        )}
        {filtered.map((product, index) => (
          <NavLink
            key={product.id}
            to={`/products/${product.id}`}
            className={({ isActive }) => `product-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="product-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="product-nav-copy">
              <strong>{product.name}</strong>
              <small>KSH {Math.round(Number(product.price))}</small>
            </span>
            <span aria-hidden="true">→</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}