import axios from "axios"
import { getToken } from "./storageUtils";

const local_url = 'http://localhost:3001'
const prod_url = 'http://54.236.12.28/backend/api/'
const BASE_URL = local_url

const publicRequest = axios.create({ baseURL: BASE_URL });
publicRequest.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const originalErrorMessage =
      error.message || "Oops!!! Something Went Wrong !";
    if (error.response && error.response.data) {
      const newError = error.response.data;
      if (!newError.message) {
        newError.message = originalErrorMessage;
      }
      return Promise.reject(newError);
    }
    return Promise.reject(error);
  }
);

export const getData = publicRequest.get;
export const postData = publicRequest.post;
export const putData = publicRequest.put;
export const deleteData = publicRequest.delete;

const privateRequest = axios.create({
  baseURL: BASE_URL,
});

privateRequest.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${getToken()}`;
  return req;
});

export const postDataWithAuth = privateRequest.post;
export const getDataWtihAuth = privateRequest.get
export const putDataWtihAuth = privateRequest.put
export const patchDataWtihAuth = privateRequest.patch

