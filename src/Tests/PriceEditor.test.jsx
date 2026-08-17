import { test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PriceEditor from '../components/PriceEditor.jsx'

const mockProduct = { id: 1, price: 100, stock: 5 }

test('switches to edit mode when Quick edit is clicked', () => {
  render(<PriceEditor product={mockProduct} onSave={() => {}} busy={false} />)

  fireEvent.click(screen.getByText('Quick edit'))

  expect(screen.getByText('Save')).toBeInTheDocument()
  expect(screen.getByText('Cancel')).toBeInTheDocument()
})