import { db } from './database'

function generateProductID() {
  const lastRow = db.prepare('SELECT id FROM products ORDER BY id DESC LIMIT 1').get()
  const lastNumber = lastRow ? parseInt(lastRow.id.slice(3)) : 0
  const nextNumber = lastNumber + 1
  const newId = `PRD${String(nextNumber).padStart(4, '0')}`
  return newId
}

export { generateProductID }
