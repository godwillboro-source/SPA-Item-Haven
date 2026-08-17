import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductSidebar from '../components/ProductSidebar.jsx'

const mockProducts = [
  { id: 1, name: 'Keyboard', price: 100 },
  { id: 2, name: 'Mouse', price: 50 },
]

test('filters products when searching', () => {
  render(
    <BrowserRouter>
      <ProductSidebar products={mockProducts} loading={false} />
    </BrowserRouter>
  )

  const input = screen.getByPlaceholderText('Search products...')
  fireEvent.change(input, { target: { value: 'Mouse' } })

  expect(screen.getByText('Mouse')).toBeInTheDocument()
  expect(screen.queryByText('Keyboard')).not.toBeInTheDocument()
})