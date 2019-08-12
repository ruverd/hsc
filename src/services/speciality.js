import { authHeader } from '../utils/authHeader'
import API  from '../services/api'

export const specialityService = {
    getAll,
    getById,
    update,
    create,
    delete: _delete
};

async function getAll() {
  try {
    const resp = await API.get("specialities");
    return resp.data
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function getById(id) {
  try {
    const resp = await API.get(`specialities/${id}`);
    return resp.data
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function create(formData) {
  try {
    const resp = await API.post("specialities", formData);
    return resp.data
  } catch (err) {
      return Promise.reject(err.response.data.error)
  }
}

async function update(formData,id) {
  try {
    const resp = await API.put(`specialities/${id}`, formData);
    return resp.data
  } catch (err) {
      return Promise.reject(err.response.data.error)
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  try {
      const resp = await API.delete("specialities/"+id);
  return resp
  } catch (err) {
      return Promise.reject(err.response.data.error)
  }
}