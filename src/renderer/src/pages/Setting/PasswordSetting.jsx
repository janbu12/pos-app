import React, { useState } from 'react'
import '../../styles/Setting.css'

function PasswordSetting() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Password baru dan konfirmasi tidak cocok!')
      setMessageType('error')
      return
    }

    const isValid = await window.api.checkPassword(currentPassword)
    if (!isValid) {
      setMessage('Password saat ini salah!')
      setMessageType('error')
      return
    }

    await window.api.updatePassword(newPassword)
    setMessage('Password berhasil diubah!')
    setMessageType('success')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="setting-container">
      <h2 className="setting-title">Ubah Password</h2>
      <input
        type="password"
        placeholder="Password Saat Ini"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="setting-input"
      />
      <input
        type="password"
        placeholder="Password Baru"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="setting-input"
      />
      <input
        type="password"
        placeholder="Konfirmasi Password Baru"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="setting-input"
      />
      <button onClick={handlePasswordChange} className="setting-button">
        Simpan Password
      </button>
      {message && (
        <p className={`setting-message ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  )
}

export default PasswordSetting
