import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/Setting.css'

function Setting() {
  const navigate = useNavigate()

  const goToPasswordSetting = () => {
    navigate('/setting/password')
  }

  return (
    <div className="setting-container">
      <h2 className="setting-title">Setting</h2>
      <div className="setting-options">
        <button onClick={goToPasswordSetting} className="setting-button">
          Change Password
        </button>
      </div>
    </div>
  )
}

export default Setting
