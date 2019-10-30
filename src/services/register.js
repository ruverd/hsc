import API from "./api";
import axios from "axios";
import router from "../services/router";

export const registerService = {
  getDocument,
  getPersonal,
  getContact,
  getVehicle,
  getPayment,
  getSpecialitiesByUser,
  getSpeciality,
  getFilesByUser,
  getFile,
  savePersonal,
  saveContact,
  saveVehicle,
  savePayment,
  saveSpeciality,
  deleteSpeciality,
  approveSpeciality,
  downloadSpeciality,
  saveFile,
  deleteFile,
  downloadFile,
  approveFile,
  getAddress,
  completed,
  validateUser,
  approveUser,
  redirect
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

async function getFile(id) {
  try {
    const resp = await API.get(`register/files/${id}`);

    return resp.data.data[0];
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function getFilesByUser(userId) {
  try {
    const resp = await API.get(`register/files/user/${userId}`);

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
      ? await API.post(`register/documents`, { ...formData, user_id: userId })
      : await API.put(`register/documents/${document.id}`, formData);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function saveContact(formData, userId) {
  try {
    const contact = await this.getContact(userId);

    return typeof contact === "undefined"
      ? await API.post(`register/contacts`, { ...formData, user_id: userId })
      : await API.put(`register/contacts/${contact.id}`, formData);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function saveVehicle(formData, userId) {
  try {
    const vehicle = await this.getVehicle(userId);

    return typeof vehicle === "undefined"
      ? await API.post(`register/vehicles`, { ...formData, user_id: userId })
      : await API.put(`register/vehicles/${vehicle.id}`, formData);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function savePayment(formData, userId) {
  try {
    const payment = await this.getPayment(userId);

    return typeof payment === "undefined"
      ? await API.post(`register/payments`, { ...formData, user_id: userId })
      : await API.put(`register/payments/${payment.id}`, formData);
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

    return await API.post(`register/specialities`, formData, settings);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function approveSpeciality(formData, id) {
  try {
    return await API.put(`register/specialities/${id}`, formData);
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

async function downloadSpeciality(id) {
  try {
    return await API.get(`register/specialities/${id}/download`);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function saveFile(data, file) {
  try {
    let formData = new FormData();
    let settings = { headers: { "content-type": "multipart/form-data" } };
    const { file_id, user_id } = data;

    formData.append("file", file.file);
    formData.append("file_id", file_id);
    formData.append("user_id", user_id);

    return await API.post(`register/files`, formData, settings);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function deleteFile(id) {
  try {
    return await API.delete(`register/files/${id}`);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function downloadFile(id) {
  try {
    return await API.get(`register/files/${id}/download`);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function approveFile(formData, id) {
  try {
    return await API.put(`register/files/${id}`, formData);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function validateUser(formData, id) {
  try {
    return await API.put(`register/validate/${id}`, formData);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function approveUser(formData, id) {
  try {
    return await API.put(`register/approve/${id}`, formData);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function getAddress(cep) {
  try {
    if (/^[0-9]{5}-[0-9]{3}$/.test(cep)) {
      return await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    }

    return;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function completed(userId) {
  try {
    return await API.put(`registers/${userId}`);
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function redirect() {
  try {
    router.push("/dashboard");

    return;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}
