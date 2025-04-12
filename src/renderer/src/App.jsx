import React, { Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'

const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))
const Products = React.lazy(() => import('./pages/Products'))
const AddProduct = React.lazy(() => import('./pages/AddProduct'))
const EditProduct = React.lazy(() => import('./pages/EditProduct'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/product/edit/:id" element={<EditProduct />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Suspense>
    </Router>
  )
}

export default App
