import { authHeader } from '../utils/authHeader'
import API  from './api'
import { log } from 'util';

export const registerService = {  
  getDocument,
  getPersonal,
  getContact,
  getVehicle,
  getPayment,
  savePersonal,
  saveContact,
  saveVehicle,
  savePayment
}

async function getPersonal(id) {
  try {
    const resp = await API.get(`users/${id}`)

    return resp.data.data
  } catch (err) {
    return Promise.reject(err.response.data.error)
  }
}

async function getDocument(id) {
  try {
    const resp = await API.get(`register/documents/${id}`)

    return resp.data.data[0]
  } catch (err) {
    return Promise.reject(err.response.data.error)
  }
}

async function getContact(id) {
  try {
    const resp = await API.get(`register/contacts/${id}`)

    return resp.data.data[0]
  } catch (err) {
    return Promise.reject(err.response.data.error)
  }
}

async function getVehicle(id) {
  try {
    const resp = await API.get(`register/vehicles/${id}`)

    return resp.data.data[0]
  } catch (err) {
    return Promise.reject(err.response.data.error)
  }
}

async function getPayment(id) {
  try {
    const resp = await API.get(`register/payments/${id}`)

    return resp.data.data[0]
  } catch (err) {
    return Promise.reject(err.response.data.error)
  }
}

async function savePersonal(formData,id) {
  try {
    const user = await API.put(`users/${id}`, formData)
    const document = await this.getDocument(id)

    return (typeof document === 'undefined') ? API.post(`register/documents`, { ...formData, user_id: id } ) : API.put(`register/documents/${document.id}`, formData)
  } catch (err) {
      return Promise.reject(err.response.data.error)
  }
}

async function saveContact(formData,id) {
  try {
    const contact = await this.getContact(id)
    
    return (typeof contact === 'undefined') ? API.post(`register/contacts`, { ...formData, user_id: id } ) : API.put(`register/contacts/${contact.id}`, formData)
  } catch (err) {
      return Promise.reject(err.response.data.error)
  }
}

async function saveVehicle(formData,id) {
  try {
    const vehicle = await this.getVehicle(id)
    
    return (typeof vehicle === 'undefined') ? API.post(`register/vehicles`, { ...formData, user_id: id } ) : API.put(`register/vehicles/${vehicle.id}`, formData)
  } catch (err) {
      return Promise.reject(err.response.data.error)
  }
}

async function savePayment(formData,id) {
  try {
    const payment = await this.getPayment(id)
    
    return (typeof payment === 'undefined') ? API.post(`register/payments`, { ...formData, user_id: id } ) : API.put(`register/payments/${payment.id}`, formData)
  } catch (err) {
      return Promise.reject(err.response.data.error)
  }
}