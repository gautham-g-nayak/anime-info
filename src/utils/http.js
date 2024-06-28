import axios from 'axios'

const BASE_URL = 'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/'
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.Z2F1dGhhbWcyMDAwQGdtYWlsLmNvbQ.RJ5zkM0dIMv7Dv4UUW0V-2KF-oS4344K8FUokfZgtnk'

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${TOKEN}`
  return config
})

export { http }
