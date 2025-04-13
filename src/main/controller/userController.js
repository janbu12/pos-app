import { db } from '../database.js'

function getAllUsers() {
  return db.prepare('SELECT * FROM users').all()
}

function addUser(user) {
  const stmt = db.prepare('INSERT INTO users (name) VALUES (?)')
  return stmt.run(user.name)
}

function checkPassword(inputPassword) {
  const result = db.prepare('SELECT password FROM auth WHERE id = 1').get()
  if (!result) return false
  return inputPassword === result.password
}

function updatePassword(newPassword) {
  const stmt = db.prepare('UPDATE auth SET password = ? WHERE id = 1')
  return stmt.run(newPassword)
}

export { getAllUsers, addUser, checkPassword, updatePassword }
