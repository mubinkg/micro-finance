const env = 'production';
// const env = 'dev';

export const logoutUrl = (env === 'dev' ? "http://localhost:3000/api/logout" : "http://54.236.12.28/api/logout");
export const signinApiUrl =  (env === 'dev' ? "http://localhost:3001/user/signin" :  "http://54.236.12.28/backend/api/user/signin");
export const signinUrl = (env === 'dev' ? "http://localhost:3000/api/login" : "http://54.236.12.28/api/login");
export const baseUrl = (env === 'dev' ? 'http://localhost:3001': 'http://54.236.12.28/backend/api/');