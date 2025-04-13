export function generateTransactionId() {
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
