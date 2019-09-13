import API from "../services/api";

async function getAll() {
  try {
    const resp = await API.get("files");

    return resp.data;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function getById(id) {
  try {
    const resp = await API.get(`files/${id}`);

    return resp.data;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function create(formData) {
  try {
    const resp = await API.post("files", formData);

    return resp.data;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

async function update(formData, id) {
  try {
    const resp = await API.put(`files/${id}`, formData);

    return resp.data;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  try {
    const resp = await API.delete("files/" + id);

    return resp;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

export const fileService = {
  getAll,
  getById,
  update,
  create,
  delete: _delete
};
