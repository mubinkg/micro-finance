const env = 'production';
// const env = 'dev';
// const env = 'uat'

export const logoutUrl = (
    env === 'dev' 
    ? "http://localhost:3000/api/logout" 
    : env === 'uat' 
    ? "http://52.201.228.135/api/logout" 
    : "https://www.zimbacash.com/api/logout"
);

export const signinApiUrl =  (env === 'dev' ? "http://localhost:3001/user/signin" : env === 'uat' ? "http://52.201.228.135/backend/api/user/signin" : "https://www.zimbacash.com/backend/api/user/signin");

export const signinUrl = (env === 'dev' ? "http://localhost:3000/api/login" : env === 'uat'? "http://52.201.228.135/api/login" : "https://www.zimbacash.com/api/login");
export const baseUrl = (env === 'dev' ? 'http://localhost:3001': env === 'uat' ? "http://52.201.228.135/backend/api" :'https://www.zimbacash.com/backend/api');
export const totalLoanUrl = `${baseUrl}/loan/total-approved-loan`