'use server'

import { cookies } from 'next/headers'
import { postData } from '../utils/axiosUtils'
import { signinApiUrl } from '../utils/urls'

export async function exampleAction(email, password) {
    try {
        const getSignin = (email, password) => new Promise((resolve, reject) => {
            postData("/user/signin", { email, password }).then(res => resolve(res)).catch(err => reject(err))
        })
        const res = await getSignin(email, password)
        cookies().set('access_token', res.token)
        return res
    } catch (err) {
        throw err
    }
}

export async function logoutAction(){
    cookies().delete('access_token')
}