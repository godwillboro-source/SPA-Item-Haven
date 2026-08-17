import { test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductForm from '../components/ProductForm.jsx'

test('shows an error when submitting an empty form', () => {
  const handleSubmit = () => {}
  render(<ProductForm onSubmit={handleSubmit} submitLabel="Create product" />)

  fireEvent.click(screen.getByText('Create product'))

  expect(screen.getByText('Give the product a name and a description first.')).toBeInTheDocument()
})