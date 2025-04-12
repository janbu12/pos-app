import { db } from '../database.js'

function getAllUsers() {
  return db.prepare('SELECT * FROM users').all()
}

function addUser(user) {
  const stmt = db.prepare('INSERT INTO users (name) VALUES (?)')
  return stmt.run(user.name)
}

export { getAllUsers, addUser }
