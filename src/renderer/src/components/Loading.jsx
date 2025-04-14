// components/Loading.jsx
import React from 'react'
import { LoaderCircle } from 'lucide-react'
import '../styles/Loading.css'

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-content">
        <LoaderCircle className="loading-icon" />
        <p className="loading-text">Sedang memuat...</p>
      </div>
    </div>
  )
}

export default Loading
