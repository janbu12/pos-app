import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Sidebar.css'

const Sidebar = () => {
  // Mendapatkan lokasi/route saat ini
  const location = useLocation()
  let path = location.pathname

  const [page, setPage] = useState('Home')

  useEffect(() => {
    if (path === '/') {
      setPage('Home')
    } else if (path === '/about') {
      setPage('About')
    } else if (path === '/products') {
      setPage('Products')
    } else if (path.startsWith('/product/edit/')) {
      setPage('Edit Product')
    } else if (path === '/product/add') {
      setPage('Add Product')
    } else if (path === '/setting') {
      setPage('Setting')
    } else if (path === '/setting/password') {
      setPage('Setting Password')
    } else if (path === '/transactions') {
      setPage('Transactions')
    } else if (path === '/transaction') {
      setPage('Detail Transaction')
    } else if (path === '/transaction/add') {
      setPage('Add Transaction')
    } else {
      setPage('NotFound')
    }
  }, [path])

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>{page}</h3>
      </div>
      <ul className="sidebar-menu">
        <Link to="/" className={location.pathname === '/' ? 'menu-item active' : 'menu-item'}>
          <span className="menu-icon">🏠</span>
          <span className="menu-label">Home</span>
        </Link>
        <Link
          to="/products"
          className={
            location.pathname.startsWith('/product') || location.pathname === '/products'
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <span className="menu-icon">💼</span>
          <span className="menu-label">Products</span>
        </Link>
        <Link
          to="/analytics"
          className={location.pathname === '/analytics' ? 'menu-item active' : 'menu-item'}
        >
          <span className="menu-icon">📊</span>
          <span className="menu-label">Analytics</span>
        </Link>
        <Link
          to="/transactions"
          className={
            location.pathname.startsWith('/transaction') || location.pathname === '/transactions'
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <span className="menu-icon">📑</span>
          <span className="menu-label">Transactions</span>
        </Link>
        <Link
          to="/setting"
          className={location.pathname === '/setting' ? 'menu-item active' : 'menu-item'}
        >
          <span className="menu-icon">⚙️</span>
          <span className="menu-label">Setting</span>
        </Link>
      </ul>
      <button className="menu-item exit-button" onClick={() => window.api.exitApp()}>
        <span className="menu-icon">❌</span>
        <span className="menu-label">Exit</span>
      </button>
    </div>
  )
}

export default Sidebar
