// const env = 'production';
const env = 'dev';
// const env = 'uat'

export const baseUrl = process.env.BASE_URL
export const totalLoanUrl = `${baseUrl}/loan/total-approved-loan`