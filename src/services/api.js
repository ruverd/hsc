import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// import { getToken } from '@/services/auth'

// create an axios instance
const API = axios.create({
  baseURL: 'http://localhost:8000', // api的base_url
  timeout: 5000 // request timeout
})

API.interceptors.request.use(config => {

  const _URL = `/api/${config.url}`

  config.url = _URL

  // Do something before request is sent
  if (sessionStorage.getItem('access_token')) {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('access_token')}`
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
API.interceptors.response.use(
  response => response,
  error => {
    const message = error.response.data.error || error.message 
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default API
