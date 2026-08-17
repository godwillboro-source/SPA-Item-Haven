import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/LandingPage.jsx'

const mockProducts = [
  { id: 1, name: 'Keyboard', price: 100, stock: 5 },
]

test('shows the number of products listed', () => {
  render(<BrowserRouter><LandingPage products={mockProducts} /></BrowserRouter>)
  expect(screen.getByText('1')).toBeInTheDocument()
  expect(screen.getByText('products listed')).toBeInTheDocument()
})