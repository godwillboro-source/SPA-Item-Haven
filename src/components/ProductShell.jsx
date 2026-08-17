import React from 'react'
import { Outlet } from 'react-router-dom'
import ProductSidebar from './ProductSidebar.jsx'

export default function ProductShell({ products, loading, error, onReload }) {
  return (
    <div className="app-shell">
      <ProductSidebar products={products} loading={loading} />

      <main className="main-stage">
        {error ? (
          <section className="error-card" role="alert">
            <span className="error-emoji">⚠️</span>
            <div>
              <h2>Connection problem</h2>
              <p>{error}</p>
              <button className="button button-primary" onClick={onReload}>
                Try again
              </button>
            </div>
          </section>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}