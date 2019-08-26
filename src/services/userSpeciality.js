import { authHeader } from "../utils/authHeader";
import API from "../services/api";

export const userSpecialityService = {
  create
};

function create(formData) {
  API.post("user/1/specialities", formData);
  // try {
  //   const resp = await API.post("user/1/specialities", {});
  //   return resp;
  // } catch (err) {
  //   return Promise.reject(err);
  //   // return Promise.reject(err.response.data.error);
  // }
}
