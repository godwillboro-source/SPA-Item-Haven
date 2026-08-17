import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductForm from '../components/ProductForm.jsx'

test('shows an error when submitting an empty form', () => {
  render(<ProductForm onSubmit={() => {}} submitLabel="Create product" />)

  fireEvent.click(screen.getByText('Create product'))

  expect(
    screen.getByText('Give the product a name and a description first.')
  ).toBeInTheDocument()
})