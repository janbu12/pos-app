import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Sidebar.css'

const Sidebar = () => {
  // Mendapatkan lokasi/route saat ini
  const location = useLocation()
  let path = location.pathname

  const [page, setPage] = useState('Home')

  useEffect(() => {
    switch (path) {
      case '/':
        setPage('Home')
        break
      case '/about':
        setPage('About')
        break
      case '/products':
        setPage('Products')
        break
      default:
        setPage('NotFound')
    }
  }, [setPage, path])

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>{page}</h3>
      </div>
      <ul className="sidebar-menu">
        <li className={location.pathname === '/' ? 'menu-item active' : 'menu-item'}>
          <Link to="/" className="menu-link">
            <span className="menu-icon">🏠</span>
            <span className="menu-label">Home</span>
          </Link>
        </li>
        <li className={location.pathname === '/analytics' ? 'menu-item active' : 'menu-item'}>
          <Link to="/analytics" className="menu-link">
            <span className="menu-icon">📊</span>
            <span className="menu-label">Analytics</span>
          </Link>
        </li>
        <li className={location.pathname === '/products' ? 'menu-item active' : 'menu-item'}>
          <Link to="/products" className="menu-link">
            <span className="menu-icon">💼</span>
            <span className="menu-label">Products</span>
          </Link>
        </li>
        <li className={location.pathname === '/profile' ? 'menu-item active' : 'menu-item'}>
          <Link to="/profile" className="menu-link">
            <span className="menu-icon">👤</span>
            <span className="menu-label">Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar
