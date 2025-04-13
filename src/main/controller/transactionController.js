import { db } from '../database'
function generateTransactionId() {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const id =
    'TR' +
    pad(now.getDate()) +
    pad(now.getMonth() + 1) +
    now.getFullYear() +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  return id
}

function getAllTransactions() {
  return db.prepare('SELECT * FROM transactions ORDER BY date DESC').all()
}

function getTransactionById(id) {
  const transaction = db.prepare('SELECT * FROM transactions WHERE id = ?').get(id)
  const details = db
    .prepare(
      `
      SELECT dt.*, p.name as product_name
      FROM detail_transaction dt
      JOIN products p ON dt.product_id = p.id
      WHERE dt.transaction_id = ?
    `
    )
    .all(id)
  return { transaction, details }
}

function addTransaction(transaction, details) {
  const insertTransaction = db.prepare(
    'INSERT INTO transactions (id, date, total) VALUES (?, ?, ?)'
  )
  const insertDetail = db.prepare(
    'INSERT INTO detail_transaction (transaction_id, product_id, quantity, price) VALUES (?, ?, ?, ?)'
  )

  const trx = db.transaction(() => {
    insertTransaction.run(transaction.id, transaction.date, transaction.total)
    details.forEach((d) => {
      insertDetail.run(transaction.id, d.product_id, d.quantity, d.price)
    })
  })

  try {
    trx()
    return { success: true }
  } catch (err) {
    console.error(err)
    return { success: false, error: err.message }
  }
}

export { generateTransactionId, addTransaction, getAllTransactions, getTransactionById }
