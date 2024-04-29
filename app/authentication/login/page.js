'use client'
import { useState } from 'react'
import { Input, Label, Button } from 'reactstrap'
import {postData} from '../../../utils/axiosUtils'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const signinHandler = ()=>{
        postData('user/signin', {email, password}).then(res=>{
            router.push('/zimba-cash/loan')
            setPassword('')
            setEmail('')
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <hr/>
            <h5 style={{textTransform: "uppercase", textAlign: "center", color: "#62d0ab"}}>Zimba Cash</h5>
            <hr/>
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
                        <p for="exampleEmail" className='text-center'>
                            EMAIL
                        </p>
                        <Input value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div style={{ width: "100%", marginTop: "20px" }} >
                        <p for="exampleEmail" className='text-center'>
                            PASSWORD
                        </p>
                        <Input value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <Button onClick={signinHandler} style={{ background: "#68069d" }} className='mt-4'>SIGN IN</Button>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                        <p>Forget your password?</p>
                        <p>Sign Up</p>
                    </div>
                </div>
            </div>
        </div>
    )
}