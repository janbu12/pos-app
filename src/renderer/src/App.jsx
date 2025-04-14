import React, { Suspense, useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PasswordSetting from './pages/Setting/PasswordSetting'
import Loading from './components/Loading'

const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))
const Products = React.lazy(() => import('./pages/Products/Products'))
const AddProduct = React.lazy(() => import('./pages/Products/AddProduct'))
const EditProduct = React.lazy(() => import('./pages/Products/EditProduct'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const Login = React.lazy(() => import('./pages/Login'))
const Setting = React.lazy(() => import('./pages/Setting/Setting'))
const Transactions = React.lazy(() => import('./pages/Transactions/Transactions'))
const Transaction = React.lazy(() => import('./pages/Transactions/Transaction'))
const AddTransaction = React.lazy(() => import('./pages/Transactions/AddTransaction'))

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (!loggedIn) {
    return <Login onLoginSuccess={() => setLoggedIn(true)} />
  }

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/product/edit/:id" element={<EditProduct />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transaction/:id" element={<Transaction />} />
              <Route path="/transaction/add" element={<AddTransaction />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/setting/password" element={<PasswordSetting />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Suspense>
    </Router>
  )
}

export default App
