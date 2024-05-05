'use client'
import { useState } from 'react'
import { Input, Label, Button } from 'reactstrap'
import {postData} from '../../../utils/axiosUtils'
import { useRouter } from 'next/navigation'
import {setItem} from '../../../utils/storageUtils'
import Swal from 'sweetalert2'

import AppNav from '../../../components/Navbar'

const prod_url = "http://54.236.12.28/api/login"
const local_url = "http://localhost:3000/api/login"

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const signinHandler = ()=>{
        postData(prod_url, {email, password}).then(res=>{
            setItem('user', JSON.stringify(res.user))
            setItem('token', JSON.stringify(res.token))
            setPassword('')
            setEmail('')
            window.location = ('/zimba-cash/loan')
        }).catch(err=>{
            Swal.fire({
                title: 'Log In',
                text: 'Please give valid credentials',
                icon: 'error'
            })
        })
    }

    return (
        <div>
            <AppNav/>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                height: "90vh"
            }}>
                <div style={{ width: "360px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", }}>
                    <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>log in</h2>
                    <div style={{ width: "100%", marginTop: "40px" }} >
                        <p  className='text-center'>
                            EMAIL
                        </p>
                        <Input value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div style={{ width: "100%", marginTop: "20px" }} >
                        <p className='text-center'>
                            PASSWORD
                        </p>
                        <Input value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <Button onClick={signinHandler} style={{ background: "#68069d" }} className='mt-4'>SIGN IN</Button>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                        <p style={{cursor: "pointer"}} onClick={()=>router.push('/authentication/forget-password')}>Forgot password?</p>
                        <p style={{cursor: "pointer", marginLeft: "10px"}} onClick={()=>router.push('/authentication/registration')}>Sign Up</p>
                    </div>
                </div>
            </div>
        </div>
    )
}