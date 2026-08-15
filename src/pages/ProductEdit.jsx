<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm.jsx';
import { getProduct, updateProduct } from '../api/products.js';

export default function ProductEdit() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setLoadError(null);

    getProduct(productId)
      .then((data) => {
        if (isMounted) setProduct(data);
      })
      .catch(() => {
        if (isMounted) setLoadError('Could not load this product.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  async function handleUpdate(productData) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await updateProduct(productId, productData);
      navigate(`/products/${productId}`);
    } catch (error) {
      setSubmitError('Could not save your changes. Please try again.');
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <p>Loading product...</p>;
  if (loadError) return <p className="field-error">{loadError}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="product-edit-page">
      <h1>Edit {product.name}</h1>
      {submitError && <p className="field-error">{submitError}</p>}
      <ProductForm
        initialValues={product}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
        isSubmitting={isSubmitting}
      />
    </section>
  );
=======
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm.jsx'
import { getProduct, updateProduct } from '../api/products.js'

export default function ProductEdit({ products, setProducts }) {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        const data = await getProduct(productId)
        setProduct(data)
      } catch {
        setError('Could not load this product for editing.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  async function handleSubmit(changes) {
    setBusy(true)
    setError('')
    try {
      const updated = await updateProduct(product.id, changes)
      setProducts(products.map((item) => (String(item.id) === String(updated.id) ? updated : item)))
      navigate(`/products/${updated.id}`)
    } catch {
      setError('Could not update this product. Check that the API is running.')
      setBusy(false)
    }
  }

  if (loading) {
    return <div className="detail-card loading-card">Loading product details…</div>
  }

  if (error && !product) {
    return (
      <div className="detail-card empty-card">
        <span>📦</span>
        <h2>Couldn't load product</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <section className="form-page-card">
      <div className="form-page-copy">
        <span className="eyebrow">Update listing</span>
        <h1>Edit {product.name}</h1>
        <p>Change the name, price, stock, image, or description.</p>
        <Link to={`/products/${product.id}`} className="text-link">
          ← Back to product
        </Link>
      </div>
      <div className="form-card">
        <ProductForm initialProduct={product} onSubmit={handleSubmit} submitLabel="Save changes" busy={busy} />
        {error && <p className="form-error">{error}</p>}
      </div>
    </section>
  )
>>>>>>> origin/Josephhh
}