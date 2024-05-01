import axios from 'axios'

export async function POST(request) {
    try {
        const { password, email } = await request.json()

        const prod_url = "http://35.208.204.126/api/graphql/user/signin"
        const local_url = "http://localhost:3001/user/signin"

        const res = await axios.post(local_url, {
            email,
            password
        })


        const token = res.data?.token
        const user_role = res.data?.user?.role ? res.data.user.role : "user"
        
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

        if (!token) {
            return new Response(JSON.stringify({
                'data': res.data
            }), {
                status: 400
            })
        }
        console.log(token)

        return new Response(JSON.stringify(res.data), {
            status: 200,
            headers: {
                'Set-Cookie': `access_token = ${token}; expires=${expires.toUTCString()};path=/`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        })
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify({
            'message': 'Error on sing in'
        }), {
            status: 400
        })
    }
}