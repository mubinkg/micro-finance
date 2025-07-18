import axios from "axios"
import { getToken } from "./storageUtils";
import { baseUrl } from "./urls";

console.log('Base url === ', baseUrl)
export const publicRequest = axios.create({ baseURL: baseUrl });
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
  baseURL: baseUrl,
});

privateRequest.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${getToken()}`;
  return req;
});

export const postDataWithAuth = privateRequest.post;
export const getDataWtihAuth = privateRequest.get
export const putDataWtihAuth = privateRequest.put
export const patchDataWtihAuth = privateRequest.patch
export const searchUserWithAuth = privateRequest.post

