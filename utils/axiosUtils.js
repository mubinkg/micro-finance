import axios from "axios"

const LOCAL_SERVER = 'http://localhost:3001'
const PROD_SERVER = 'http://16.171.47.81/api/graphql'
const BASE_URL = PROD_SERVER

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

// privateRequest.interceptors.request.use((req) => {
//   req.headers.Authorization = `bearer ${getToken()}`;
//   return req;
// });

// export const postDataWithAuth = privateRequest.post;
// export const getDataWtihAuth = privateRequest.get

