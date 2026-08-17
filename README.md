# Product Showcase — Item Haven Admin Portal

A React admin portal for managing the Item Haven catalog. Add, view, edit, search, and delete products, with a fake backend for data that persists between reloads.

## Features

- Landing page describing the site
- Add new products via a form
- View a single product's details
- Edit full product details, or quick-edit just the price/stock
- Search products by name
- Responsive layout

## Tech Stack

- React
- React Router (client-side routing)
- json-server (simulated backend)
- Vitest + React Testing Library (tests)

## Getting Started

- Run the following command to install dependencies

npm install

- This runs the fake API (port 3000) and the app (port 5173) together. Open http://localhost:5173.

npm start

This runs the fake API (port 3000) and the app (port 5173) together. Open http://localhost:5173.

- If you want To run them separately, run the following in different terminals


npm run server   # To activate the server
npm run dev      # To activate the link to the page

## Testing

There are test files for each component/feature, covering things like the 404 page, the landing page product count, sidebar search filtering, product form validation, and the price editor.

To run them:

npm test

src/tests/
├── NotFound.test.jsx
├── LandingPage.test.jsx
├── ProductSidebar.test.jsx
├── ProductForm.test.jsx
└── PriceEditor.test.jsx

## Project Structure

src/
├── api/            API calls to the fake backend
├── components/     Reusable pieces (form, sidebar, price editor, etc.)
├── pages/          Route-level pages (landing, product detail, edit, new)
├── tests/          Test files
├── App.jsx         Routes and top-level state
└── main.jsx        Entry point
db.json             Fake database