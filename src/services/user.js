import { authHeader } from '../utils/authHeader'
import API  from '../services/api'

export const userService = {
    getAll,
    getById,
    update,
    create,
    updatePassword,
    delete: _delete
};


async function updatePassword(password) {
    try {
      const resp = await API.put("user/password", {
        password: password
      });
      return resp
    } catch (err) {
      return Promise.reject(err.response.data.error);
    }
}

async function getAll() {
    try {
      const resp = await API.get("users");
      return resp.data
    } catch (err) {
      return Promise.reject(err.response.data.error);
    }
  }
  
  async function getById(id) {
    try {
      const resp = await API.get(`users/${id}`);
      return resp.data
    } catch (err) {
      return Promise.reject(err.response.data.error);
    }
  }
  
  async function create(formData) {
    try {
      const resp = await API.post("users", formData);
      return resp.data
    } catch (err) {
        return Promise.reject(err.response.data.error)
    }
  }
  
  async function update(formData,id) {
    try {
      const resp = await API.put(`users/${id}`, formData);
      return resp.data
    } catch (err) {
        return Promise.reject(err.response.data.error)
    }
  }
  
  // prefixed function name with underscore because delete is a reserved word in javascript
  async function _delete(id) {
    try {
        const resp = await API.delete("users/"+id);
        return resp
    } catch (err) {
        return Promise.reject(err.response.data.error)
    }
  }
