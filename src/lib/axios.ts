import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_LOCAL as string,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
