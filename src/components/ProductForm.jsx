import { useId, useState } from 'react';

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  image_url: '',
  stock: '',
};

export default function ProductForm({
  initialValues = {},
  onSubmit,
  submitLabel = 'Save Product',
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState({ ...emptyProduct, ...initialValues });
  const [errors, setErrors] = useState({});

  // useId keeps every label/input pair unique even if ProductForm is
  // rendered more than once on the same page.
  const idPrefix = useId();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate(data) {
    const nextErrors = {};
    if (!data.name.trim()) nextErrors.name = 'Product name is required.';
    if (!data.description.trim()) nextErrors.description = 'Description is required.';
    if (data.price === '' || Number.isNaN(Number(data.price)) || Number(data.price) < 0) {
      nextErrors.price = 'Enter a valid price.';
    }
    if (data.stock !== '' && (Number.isNaN(Number(data.stock)) || Number(data.stock) < 0)) {
      nextErrors.stock = 'Stock must be a non-negative number.';
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: formData.stock === '' ? 0 : Number(formData.stock),
    });
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor={`${idPrefix}-name`}>Product Name</label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="form-field">
        <label htmlFor={`${idPrefix}-description`}>Description</label>
        <textarea
          id={`${idPrefix}-description`}
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.description && <p className="field-error">{errors.description}</p>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor={`${idPrefix}-price`}>Price</label>
          <input
            id={`${idPrefix}-price`}
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.price && <p className="field-error">{errors.price}</p>}
        </div>

        <div className="form-field">
          <label htmlFor={`${idPrefix}-stock`}>Stock</label>
          <input
            id={`${idPrefix}-stock`}
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.stock && <p className="field-error">{errors.stock}</p>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`${idPrefix}-image_url`}>Image URL</label>
        <input
          id={`${idPrefix}-image_url`}
          name="image_url"
          type="text"
          value={formData.image_url}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}