'use client'
import { useState } from 'react'
import { Input, Label, Button } from 'reactstrap'
import Swal from 'sweetalert2'
import {postData} from '../../../utils/axiosUtils'
import AppNav from '../../../components/Navbar'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const signupHandler = () => {
        if (!email || !firstName || !lastName) {
            Swal.fire({
                title: "Registration",
                text: "Please give all the input values.",
                icon: "error"
            })
        }
        let isInvalidPhone = false
        if(phone.length !== 10){
            isInvalidPhone = true
        }
        for(let i=0;i<phone.length;i++){
            if(!Number.isInteger(parseInt(phone[i]))){
                isInvalidPhone = true
            }
        }
        if(isInvalidPhone){
            Swal.fire({
                title: "Registration",
                text: "Please give a correct phone number.",
                icon: "error"
            })
            return
        }
        postData('/user/registration', {
            email,
            firstName,
            lastName,
            phone
        }).then(data=>{
            setLastName('')
            setFirstName('')
            setEmail('')
            
            Swal.fire({
                title: "Registration",
                text: "Please check your email to complete the sign up process. Check spam folder, if needed. Thank you!",
                icon: "success"
            }).then(()=>{
                router.push('/authentication/login')
            })
        }).catch(err=>{
            Swal.fire({
                title: 'Registration',
                text:'Error on registering new user. Make sure all information is correct',
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
                    <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>Registration</h2>
                    <div style={{ width: "100%", marginTop: "40px" }} >
                        <p  className='text-center text-success'>
                            First Name
                        </p>
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div style={{ width: "100%", marginTop: '20px' }} >
                        <p className='text-center text-success'>
                            Last Name
                        </p>
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div style={{ width: "100%", marginTop: '20px' }} >
                        <p  className='text-center text-success'>
                            Email
                        </p>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div style={{ width: "100%", marginTop: '20px' }} >
                        <p  className='text-center text-success'>
                            Phone
                        </p>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <Button style={{ background: "#68069d" }} className='mt-4' onClick={signupHandler}>SIGN UP</Button>
                    <div style={{display: 'flex',marginTop: "10px", justifyContent: "center" }}>
                        <p style={{cursor: "pointer"}} onClick={()=>router.push('/authentication/forget-password')}>Already have an account?</p>
                        <p style={{cursor: "pointer",marginLeft: "10px", color: "blue"}} onClick={()=>router.push('/authentication/login')}>Log In</p>
                    </div>
                </div>
            </div>
        </div>
    )
}