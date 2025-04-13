import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/logo.ico?asset'
import { db, initDatabase } from './database'
import { addUser, checkPassword, getAllUsers, updatePassword } from './controller/userController'
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from './controller/productController'
import {
  addTransaction,
  getAllTransactions,
  getTransactionById
} from './controller/transactionController'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    fullscreen: true,
    show: false,
    autoHideMenuBar: true,
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  initDatabase()

  const columns = db.prepare('PRAGMA table_info(products)').all()
  console.log(columns)

  const products = db.prepare('SELECT * FROM products').all()
  console.log('Products: ', products)

  const users = db.prepare('SELECT * FROM users').all()
  console.log('Users:', users)

  const auth = db.prepare('SELECT * FROM auth').all()
  console.log('Auth:', auth)

  const transactions = db.prepare('SELECT * FROM transactions').all()
  console.log('Transaction:', transactions)

  const detail_transaction = db.prepare('SELECT * FROM detail_transaction').all()
  console.log('Detail_transaction:', detail_transaction)

  ipcMain.handle('get-users', () => getAllUsers())
  ipcMain.handle('add-user', (event, user) => addUser(user))

  //Product
  ipcMain.handle('get-products', () => getAllProducts())
  ipcMain.handle('get-product-by-id', (_event, id) => getProductById(id))
  ipcMain.handle('add-product', (event, product) => addProduct(product))
  ipcMain.handle('delete-product', (_event, id) => deleteProduct(id))
  ipcMain.handle('check-password', (event, inputPassword) => checkPassword(inputPassword))
  ipcMain.handle('update-password', (event, newPassword) => updatePassword(newPassword))
  ipcMain.handle('update-product', async (event, id, product) => {
    try {
      const result = updateProduct(id, product)
      return { success: true, data: result }
    } catch (error) {
      console.error('Error updating product:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('app-exit', () => {
    app.quit()
  })

  ipcMain.handle('add-transaction', (event, transaction, details) =>
    addTransaction(transaction, details)
  )
  ipcMain.handle('get-all-transactions', () => getAllTransactions())
  ipcMain.handle('get-transaction-by-id', async (event, id) => getTransactionById(id))
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
