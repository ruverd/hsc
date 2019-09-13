import API from "./api";

async function getInfo() {
  try {
    const resp = await API.get("dashboard/report");

    return resp;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}

export const dashboardService = {
  getInfo
};
