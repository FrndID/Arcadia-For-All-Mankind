// frontend/src/utils/api.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787/api'

export async function post(path, body){
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return res.json()
}

export async function get(path){
  const res = await fetch(API_BASE + path)
  return res.json()
}
