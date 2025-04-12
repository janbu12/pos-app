import { db } from '../database.js'

function generateProductID() {
  const lastRow = db.prepare('SELECT id FROM products ORDER BY id DESC LIMIT 1').get()
  const lastNumber = lastRow ? parseInt(lastRow.id.slice(3)) : 0
  const nextNumber = lastNumber + 1
  return `PRD${String(nextNumber).padStart(4, '0')}`
}

function getAllProducts() {
  return db.prepare('SELECT * FROM products').all()
}

function addProduct(product) {
  const newId = generateProductID()
  const stmt = db.prepare(`
    INSERT INTO products (id, name, price, quantity, description)
    VALUES (?, ?, ?, ?, ?)
  `)
  return stmt.run(newId, product.name, product.price, product.quantity, product.description)
}

function updateProduct(product) {
  const stmt = db.prepare(`
    UPDATE products
    SET name = ?, price = ?, quantity = ?, description = ?
    WHERE id = ?
    `)
  return stmt.run(product.name, product.price, product.quantity, product.description, product.id)
}

function deleteProduct(id) {
  console.log('Deleting product with id:', id)
  const stmt = db.prepare('DELETE FROM products WHERE id = ?')
  return stmt.run(id)
}

export { getAllProducts, addProduct, updateProduct, deleteProduct }
