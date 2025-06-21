import axios from 'axios'

// Créer une instance axios avec la configuration de base
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://yatlapi.kelelabs.com:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withXSRFToken: true,
})
