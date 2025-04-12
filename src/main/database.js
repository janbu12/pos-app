import { app } from 'electron'
import path from 'path'
import Database from 'better-sqlite3'

let db

function initDatabase() {
  const dbPath = path.join(app.getPath('userData'), 'app.db')
  db = new Database(dbPath)
  db.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)').run()
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price DOUBLE NOT NULL,
      quantity INTEGER NOT NULL,
      description TEXT
    )
  `
  ).run()
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price DOUBLE NOT NULL,
      quantity INTEGER NOT NULL,
      description TEXT
    )
  `
  ).run()
}

export { initDatabase, db }
