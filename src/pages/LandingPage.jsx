import { Link } from 'react-router-dom'

export default function LandingPage({ products }) {
  const totalValue = products.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.stock),
    0,
  )

  return (
    <section className="landing-card">
      <span className="eyebrow">Welcome back</span>
      <h1>Manage your product catalog</h1>
      <p>
        This is the admin portal for Item Haven. From here you can add new
        products, search the existing catalog, open any product to review or
        update it, and adjust prices and stock levels all in the same page.
      </p>

      <div className="landing-stats">
        <div>
          <strong>{products.length}</strong>
          <span>products listed</span>
        </div>
        <div>
          <strong>KSH {Math.round(Number(totalValue))}</strong>
          <span>total inventory value</span>
        </div>
      </div>

      <div className="action-row">
        <Link className="button button-primary" to="/products/new">
          Add a product
        </Link>
        {products[0] && (
          <Link className="button button-ghost" to={`/products/${products[0].id}`}>
            View a product
          </Link>
        )}
      </div>
    </section>
  )
}