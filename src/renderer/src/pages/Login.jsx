import React, { useState } from 'react'
import '../styles/Login.css'

function Login({ onLoginSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    const isValid = await window.api.checkPassword(password)
    if (isValid) {
      onLoginSuccess()
    } else {
      setError('Password salah!')
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="login-password-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin()
            }
          }}
          className="login-input"
        />
        <button onClick={toggleShowPassword} className="toggle-password-button">
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      {error && <p className="login-error">{error}</p>}
    </div>
  )
}

export default Login
