import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound.jsx'

test('renders the not found message', () => {
  render(<BrowserRouter><NotFound /></BrowserRouter>)
  expect(screen.getByText('Page not found')).toBeInTheDocument()
})