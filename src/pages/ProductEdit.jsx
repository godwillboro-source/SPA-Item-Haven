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
}