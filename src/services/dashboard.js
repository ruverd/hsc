import { authHeader } from '../utils/authHeader'
import API  from './api'

export const dashboardService = {
    getInfo
};

async function getInfo() {
  try {
    const resp = await API.get("dashboard/report");
    return resp
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
}