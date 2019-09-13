import API from "../services/api";
import router from "../services/router";

async function login(username, password) {
  try {
    const resp = await API.post("auth/login", {
      email: username,
      password: password
    });
    const { access_token } = resp.data;

    sessionStorage.setItem("access_token", access_token);
    router.push("/dashboard");

    return access_token;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

function logout() {
  sessionStorage.removeItem("access_token");
  router.push("/login");
}

async function me() {
  const resp = await API.get("auth/me");

  return resp;
}

async function register(form) {
  try {
    const { name, email, password, password_confirmation } = form;
    const resp = await API.post("auth/register", {
      name,
      email,
      password,
      password_confirmation
    });
    const { access_token } = resp.data;

    sessionStorage.setItem("access_token", access_token);
    router.push("/step-register");

    return access_token;
  } catch (error) {
    return Promise.reject(err.response.data.error);
  }
}

export const authService = {
  login,
  me,
  logout,
  register
};
