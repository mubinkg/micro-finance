'use client'
import { useState } from 'react'
import { Input, Label, Button } from 'reactstrap'
import Swal from 'sweetalert2'
import { postData } from '../../../utils/axiosUtils'
import AppNav from '../../../components/Navbar'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const signupHandler = () => {
        if (!email) {
            Swal.fire({
                title: "Registration",
                text: "Please give all the input values.",
                icon: "error"
            })
        }
        setLoading(true)
        postData('user/reset-password', {
            email,
        }).then(data => {
            setEmail('')
            setLoading(false)
            Swal.fire({
                title: "Registration",
                text: "Please check your email to complete the reset process. Check spam folder, if needed. Thank you!",
                icon: "success"
            }).then(() => {
                router.push('/login')
            })
        }).catch(err => {
            Swal.fire({
                title: 'Registration',
                text: 'Error on registering new user.',
                icon: "error"
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div>
            <AppNav />
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
                        <p className='text-center text-success'>
                            Email
                        </p>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <Button disabled={loading} style={{ background: "#68069d" }} className='mt-4' onClick={signupHandler}>
                        {loading ? "Loading..." : "Reset"}
                    </Button>
                </div>
            </div>
        </div>
    )
}