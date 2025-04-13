import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (user) => ipcRenderer.invoke('add-user', user),
  getProducts: () => ipcRenderer.invoke('get-products'),
  getProductById: (id) => ipcRenderer.invoke('get-product-by-id', id),
  addProduct: (product) => ipcRenderer.invoke('add-product', product),
  deleteProduct: (id) => ipcRenderer.invoke('delete-product', id),
  updateProduct: (id, product) => ipcRenderer.invoke('update-product', id, product),
  checkPassword: (inputPassword) => ipcRenderer.invoke('check-password', inputPassword),
  updatePassword: (newPassword) => ipcRenderer.invoke('update-password', newPassword),
  exitApp: () => ipcRenderer.invoke('app-exit')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
