'use client'
import { InputLable } from '@/components/InputLabel'
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
                minHeight: "90vh"
            }}>
                <div className='container' style={{ maxWidth: "500px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", }}>
                    <p className='my-2'>Emergency Loans: Life happens, use borrowed money wisely</p>
                    <div className='mb-2' style={{ width: "100%", display:"flex", gap: "10px" }}>
                        <InputLable label="FIRST NAME" placeholder="First name"/>
                        <InputLable label="LAST NAME" placeholder="Last name"/>
                    </div>
                    <InputLable label="CURRENT ADDRESS" placeholder="Current address"/>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Input placeholder='Address line 2'/>
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Input placeholder='City'/>
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Input placeholder='State'/>
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Input placeholder='Zip Code'/>
                    </div>
                    <InputLable label="CELL PHONE" placeholder="Cell phone"/>
                    <InputLable label="Email" placeholder="Email address"/>
                    <InputLable label="DRIVER'S LICENSE/ID" placeholder="Driver's lisence/id"/>
                    <InputLable label="SSN" placeholder="XXX-XXX-XXX"/>
                    <div className='mt-4' style={{ width: "100%", display:"flex", gap: "10px" , justifyContent: "space-between", alignContent: "center", alignItems: "center"}}>
                        <Label>DRIVER'S LICENSE / ID</Label>
                        <Button style={{background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px"}}>Choose a file</Button>
                    </div>
                    <div className='mt-4' style={{ width: "100%", display:"flex", gap: "10px" , justifyContent: "space-between", alignContent: "center", alignItems: "center"}}>
                        <Label>CHECK</Label>
                        <div style={{display: 'flex', gap: "10px"}}>
                        <Button style={{background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px"}}>Front Side</Button>
                        <Button style={{background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px"}}>Back Side</Button>
                        </div>
                    </div>
                    <Label className='my-2'>REFERENCE 1</Label>
                    <div style={{ width: "100%", display:"flex", gap: "10px" }}>
                        <Input placeholder="First name"/>
                        <Input  placeholder="Last name"/>
                        <Input  placeholder="Phone"/>
                    </div>
                    <Label className='my-2'>REFERENCE 2</Label>
                    <div style={{ width: "100%", display:"flex", gap: "10px" }}>
                        <Input placeholder="First name"/>
                        <Input  placeholder="Last name"/>
                        <Input  placeholder="Phone"/>
                    </div>
                    <Button style={{ background: "#68069d" }} className='mt-4'>SIGN UP</Button>
                </div>
            </div>
        </div>
    )
}