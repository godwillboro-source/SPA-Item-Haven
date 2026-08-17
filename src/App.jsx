import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductShell from './components/ProductShell.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import ProductEdit from './pages/ProductEdit.jsx'
import NewProduct from './pages/NewProduct.jsx'
import NotFound from './pages/NotFound.jsx'
import { getProducts } from './api/products.js'

export default function App() {
  // Top-level state, shared with every page via props passed down through
  // the nested routes below. This is the "single source of truth" for
  // the product list — pages update it after create/edit/delete so the
  // sidebar and other views stay in sync without re-fetching.
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError('')
        const data = await getProducts()
        setProducts(data)
      } catch {
        setError('Could not reach the product API')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  function reload() {
    setError('')
    setLoading(true)
    getProducts()
      .then(setProducts)
      .catch(() => setError('Still could not reach the product API'))
      .finally(() => setLoading(false))
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProductShell
            products={products}
            loading={loading}
            error={error}
            onReload={reload}
          />
        }
      >
        <Route index element={<LandingPage products={products} />} />
        <Route path="products/new" element={<NewProduct products={products} setProducts={setProducts} />} />
        <Route path="products/:productId" element={<ProductDetails products={products} setProducts={setProducts} />} />
        <Route path="products/:productId/edit" element={<ProductEdit products={products} setProducts={setProducts} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}