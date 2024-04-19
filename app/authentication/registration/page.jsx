'use client'
import { Input, Label, Button } from 'reactstrap'

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
                    <Button style={{ background: "#68069d" }} className='mt-4'>SIGN UP</Button>
                </div>
            </div>
        </div>
    )
}