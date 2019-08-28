import { authHeader } from "../utils/authHeader";
import API from "./api";
import { log } from "util";

export const registerService = {
  getDocument,
  getPersonal,
  getContact,
  getVehicle,
  getPayment,
  getSpecialitiesByUser,
  getSpeciality,
  savePersonal,
  saveContact,
  saveVehicle,
  savePayment,
  saveSpeciality,
  deleteSpeciality
};

async function getPersonal(id) {
  try {
    const resp = await API.get(`users/${id}`);

    return resp.data.data;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function getDocument(id) {
  try {
    const resp = await API.get(`register/documents/${id}`);

    return resp.data.data[0];
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function getContact(id) {
  try {
    const resp = await API.get(`register/contacts/${id}`);

    return resp.data.data[0];
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function getVehicle(id) {
  try {
    const resp = await API.get(`register/vehicles/${id}`);

    return resp.data.data[0];
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function getPayment(id) {
  try {
    const resp = await API.get(`register/payments/${id}`);

    return resp.data.data[0];
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function getSpeciality(id) {
  try {
    const resp = await API.get(`register/specialities/${id}`);

    return resp.data.data[0];
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function getSpecialitiesByUser(userId) {
  try {
    const resp = await API.get(`register/specialities/user/${userId}`);

    return resp.data;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function savePersonal(formData, userId) {
  try {
    const user = await API.put(`users/${userId}`, formData);
    const document = await this.getDocument(userId);

    return typeof document === "undefined"
      ? API.post(`register/documents`, { ...formData, user_id: userId })
      : API.put(`register/documents/${document.id}`, formData);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function saveContact(formData, userId) {
  try {
    const contact = await this.getContact(userId);

    return typeof contact === "undefined"
      ? API.post(`register/contacts`, { ...formData, user_id: userId })
      : API.put(`register/contacts/${contact.id}`, formData);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function saveVehicle(formData, userId) {
  try {
    const vehicle = await this.getVehicle(userId);

    return typeof vehicle === "undefined"
      ? API.post(`register/vehicles`, { ...formData, user_id: userId })
      : API.put(`register/vehicles/${vehicle.id}`, formData);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function savePayment(formData, userId) {
  try {
    const payment = await this.getPayment(userId);

    return typeof payment === "undefined"
      ? API.post(`register/payments`, { ...formData, user_id: userId })
      : API.put(`register/payments/${payment.id}`, formData);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function saveSpeciality(data, file) {
  try {
    let formData = new FormData();
    let settings = { headers: { "content-type": "multipart/form-data" } };
    const { speciality_id, user_id } = data;

    formData.append("file", file.file);
    formData.append("speciality_id", speciality_id);
    formData.append("user_id", user_id);

    return API.post(`register/specialities`, formData, settings);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function deleteSpeciality(id) {
  try {
    return await API.delete(`register/specialities/${id}`);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}
