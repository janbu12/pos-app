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
      id TEXT NOT NULL,
      name TEXT NOT NULL,
      price DOUBLE NOT NULL,
      quantity INTEGER NOT NULL,
      description TEXT
    )
  `
  ).run()
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS auth (
      id INTEGER PRIMARY KEY,
      password TEXT NOT NULL
    )
  `
  ).run()

  const row = db.prepare('SELECT * FROM auth LIMIT 1').get()
  if (!row) {
    db.prepare('INSERT INTO auth (password) VALUES (?)').run('1234')
    console.log('Password default "1234" berhasil ditambahkan ke database.')
  }

  db.prepare(
    `CREATE TABLE IF NOT EXISTS transactions (
      id TEXT NOT NULL,
      date TEXT,
      total REAL
    );`
  ).run()

  db.prepare(
    `CREATE TABLE IF NOT EXISTS detail_transaction (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transaction_id TEXT,
      product_id TEXT,
      quantity INTEGER,
      price REAL,
      FOREIGN KEY (transaction_id) REFERENCES transactions(id)
    );`
  ).run()
}

export { initDatabase, db }
