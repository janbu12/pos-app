import React from 'react'
import '../styles/NotFound.css'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! Halaman yang Anda cari tidak ditemukan.</p>
      <Link to={'/'} className="not-found-link">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound
