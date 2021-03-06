import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import router from "../services/router";

// create an axios instance
const API = axios.create({
  baseURL: "http://45.55.19.199/hsc-api",
  timeout: 50000
});

API.interceptors.request.use(
  config => {
    const _URL = `/api/${config.url}`;

    config.url = _URL;

    // Do something before request is sent
    if (sessionStorage.getItem("access_token")) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(
        "access_token"
      )}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// respone interceptor
API.interceptors.response.use(
  response => response,
  error => {
    if (error) {

      if(error.response === undefined){
        let message = error.message;

        if (error.response.status === 401) {
          sessionStorage.removeItem("access_token");
          router.push("/login");
        }
      } else {
        let message = error.response.data.error;
      }

      Message({
        message: message,
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(error);
    }
  }
);

export default API;
