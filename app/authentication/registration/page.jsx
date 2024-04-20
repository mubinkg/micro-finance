'use client'
import { Input, Label, Button } from 'reactstrap'
import Swal from 'sweetalert2'


export default function Page() {
    return (
        <div>
            <hr />
            <h5 style={{ textTransform: "uppercase", textAlign: "center", color: "#62d0ab" }}>Zimba Cash</h5>
            <hr />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                height: "90vh"
            }}>
                <div style={{ width: "400px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", }}>
                    <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>Registration</h2>
                    <div style={{ width: "100%", marginTop: "40px" }} >
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        <Input />
                    </div>
                    <Button style={{ background: "#68069d" }} className='mt-4' onClick={()=>Swal.fire({
                        title: "Registration",
                        text: "Please check your email to complete the sign up process. Check spam folder, if needed. Thank you!",
                        icon: "success"
                    })}>SIGN UP</Button>
                </div>
            </div>
        </div>
    )
}