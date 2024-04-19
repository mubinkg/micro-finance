'use client'
import { Input, Label, Button } from 'reactstrap'

export default function Page() {
    return (
        <div>
            <hr />
            <h5 style={{ textTransform: "uppercase", textAlign: "center", color: "#62d0ab" }}>Loan app</h5>
            <hr />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                height: "90vh"
            }}>
                <div className='container' style={{ maxWidth: "500px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", }}>
                    <p className='my-2'>Emergency Loans: Life happens, use borrowed money wisely</p>
                    <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>Registration</h2>
                    <div style={{ width: "100%", marginTop: "40px" }} >
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        <Input />
                    </div>
                    <Button style={{ background: "#68069d" }} className='mt-4'>SIGN UP</Button>
                </div>
            </div>
        </div>
    )
}