import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm.jsx';
import { createProduct } from '../api/products.js';

export default function NewProduct() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  async function handleCreate(productData) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const newProduct = await createProduct(productData);
      navigate(`/products/${newProduct.id}`);
    } catch (error) {
      setSubmitError('Could not save the product. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <section className="new-product-page">
      <h1>Add a New Product</h1>
      {submitError && <p className="field-error">{submitError}</p>}
      <ProductForm
        onSubmit={handleCreate}
        submitLabel="Add Product"
        isSubmitting={isSubmitting}
      />
    </section>
  );
}