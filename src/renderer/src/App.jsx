import React, { Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))
const Products = React.lazy(() => import('./pages/Products'))
const AddProduct = React.lazy(() => import('./pages/AddProduct'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/add" element={<AddProduct />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
