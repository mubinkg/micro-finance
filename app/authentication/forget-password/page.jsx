'use client'
import { useState } from 'react'
import { Input, Label, Button } from 'reactstrap'
import Swal from 'sweetalert2'
import {postData} from '../../../utils/axiosUtils'
import AppNav from '../../../components/Navbar'
import { useRouter } from 'next/navigation'
import { resetPasswordUlr } from '../../../utils/urls'

export default function Page() {
    const router = useRouter()
    const [email, setEmail] = useState('')

    const signupHandler = () => {
        if (!email) {
            Swal.fire({
                title: "Registration",
                text: "Please give all the input values.",
                icon: "error"
            })
        }
        postData(resetPasswordUlr, {
            email,
        }).then(data=>{
            setEmail('')
            
            Swal.fire({
                title: "Registration",
                text: "Please check your email to complete the reset process. Check spam folder, if needed. Thank you!",
                icon: "success"
            }).then(()=>{
                router.push('/authentication/login')
            })
        }).catch(err=>{
            Swal.fire({
                title: 'Registration',
                text:'Error on register new user.',
                icon: "error"
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
                    <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>Reset Password</h2>
                    <div style={{ width: "100%", marginTop: '20px' }} >
                        <p  className='text-center text-success'>
                            Email
                        </p>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <Button style={{ background: "#68069d" }} className='mt-4' onClick={signupHandler}>Reset</Button>
                </div>
            </div>
        </div>
    )
}