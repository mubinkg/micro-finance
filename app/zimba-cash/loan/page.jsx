'use client'
import { useForm, Controller } from 'react-hook-form'
import { Input, Label, Button, Row, Col } from 'reactstrap'
import {postData} from '../../../utils/axiosUtils'

export default function Page() {
    const { handleSubmit, register, control, watch } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            currentAddress: "",
            city: '',
            state: "",
            zipCode: "",
            cellPhone: "",
            email: "",
            driverLicense: "",
            ssn: "",
            referenceOneFirstName: ""
        }
    })

    function submitHandler(values) {
        const formData = new FormData()

        for (const [key, value] of Object.entries(values)) {
            if(key === 'driverLicenseImage' || key === 'checkFront' || key === "checkBack" || key === "paystubs"){
                formData.append(key,value[0])
            }else{
                formData.append(key, value)
            }
        }
        formData.append('paymentMethod', "TEst")
        postData('loan', formData).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

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
                <div className='container' style={{ maxWidth: "800px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", }}>
                    <p className='my-2'>Emergency Loans: Life happens, use borrowed money wisely</p>
                    <Row>
                        <Col lg={6} md={12}>
                            <Label>
                                FIRST NAME
                            </Label>
                            <Controller
                                control={control}
                                name='firstName'
                                render={({ field }) => (
                                    <Input {...field} placeholder='First Name' />
                                )}
                            />
                        </Col>
                        <Col lg={6} md={12}>
                            <Label>
                                LAST NAME
                            </Label>
                            <Controller
                                control={control}
                                name='lastName'
                                render={({ field }) => (
                                    <Input {...field} placeholder='Last name' />
                                )}
                            />
                        </Col>
                    </Row>
                    <div className='mt-2'>
                        <Label>
                            CURRENT ADDRESS
                        </Label>
                        <Controller
                            control={control}
                            name='currentAddress'
                            render={({ field }) => (
                                <Input {...field} placeholder='Current address' />
                            )}
                        />
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Controller
                            control={control}
                            name='currentAddress2'
                            render={({ field }) => (
                                <Input {...field} placeholder='Address line 2' />
                            )}
                        />
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Controller
                            control={control}
                            name='city'
                            render={({ field }) => (
                                <Input {...field} placeholder='City' />
                            )}
                        />
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Controller
                            control={control}
                            name='state'
                            render={({ field }) => (
                                <Input {...field} placeholder='State' />
                            )}
                        />
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Controller
                            control={control}
                            name='zipCode'
                            render={({ field }) => (
                                <Input {...field} placeholder='Zip Code' />
                            )}
                        />
                    </div>
                    <div className='mt-2'>
                        <Label>
                            CELL PHONE
                        </Label>
                        <Controller
                            control={control}
                            name='cellPhone'
                            render={({ field }) => (
                                <Input {...field} placeholder='Cell phone' />
                            )}
                        />
                    </div>
                    <div className='mt-2'>
                        <Label>
                            Email
                        </Label>
                        <Controller
                            control={control}
                            name='email'
                            render={({ field }) => (
                                <Input {...field} placeholder='Email address' />
                            )}
                        />
                    </div>
                    <div className='mt-2'>
                        <Label>
                            DRIVER'S LICENSE/ID
                        </Label>
                        <Controller
                            control={control}
                            name='driverLicense'
                            render={({ field }) => (
                                <Input {...field} placeholder="Driver's lisence/id" />
                            )}
                        />
                    </div>
                    <div className='mt-2'>
                        <Label>
                            SSN
                        </Label>
                        <Controller
                            control={control}
                            name='ssn'
                            render={({ field }) => (
                                <Input {...field} placeholder="XXX-XXX-XXX" />
                            )}
                        />
                    </div>
                    <div className='mt-4' style={{ width: "100%", display: "flex", gap: "10px", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                        <Label>DRIVERS LICENSE / ID</Label>
                        <label style={{ cursor: "pointer", padding: '5px 10px', color: "white", background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>
                            <input type="file" {...register('driverLicenseImage')} style={{ display: 'none' }} />
                            Choose a File
                        </label>
                        {watch('driverLicenseImage')?.length ? <img width={250} height="auto"  src={URL.createObjectURL(watch('driverLicenseImage')[0])}/> : ""}
                    </div>
                    <div className='mt-4' style={{ width: "100%", display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                        <Label>CHECK</Label>
                        <div style={{ display: 'flex', gap: "10px" }}>
                            <label style={{ cursor: "pointer", padding: '5px 10px', color: "white", background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>
                                <input {...register('checkFront')} type="file" style={{ display: 'none' }} />
                                Front Side
                            </label>
                            <label style={{ cursor: "pointer", padding: '5px 10px', color: "white", background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>
                                <input {...register('checkBack')} type="file" style={{ display: 'none' }} />
                                Back Side
                            </label>
                        </div>
                        {watch('checkFront')?.length ? <img width={150} height="auto"  src={URL.createObjectURL(watch('checkFront')[0])}/> : ""}
                        {watch('checkBack')?.length ? <img width={150} height="auto"  src={URL.createObjectURL(watch('checkBack')[0])}/> : ""}
                    </div>
                    <div className='mt-4' style={{ width: "100%", display: "flex", gap: "10px", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                        <Label>RECENT PAYSTUBS</Label>
                        <label style={{ cursor: "pointer", padding: '5px 10px', color: "white", background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>
                            <input {...register('paystubs')} type="file" style={{ display: 'none' }} />
                            Choose a File
                        </label>
                        {watch('paystubs')?.length ? <img width={250} height="auto"  src={URL.createObjectURL(watch('paystubs')[0])}/> : ""}
                    </div>
                    <Label className='my-2'>REFERENCE 1</Label>
                    <div style={{ width: "100%", display: "flex", gap: "10px" }}>
                        <Controller
                            control={control}
                            name='referenceOneFirstName'
                            render={({ field }) => (
                                <Input {...field} placeholder="First Name" />
                            )}
                        />
                        <Controller
                            control={control}
                            name='referenceOneLastName'
                            render={({ field }) => (
                                <Input {...field} placeholder="Last Name" />
                            )}
                        />
                        <Controller
                            control={control}
                            name='referenceOnePhone'
                            render={({ field }) => (
                                <Input {...field} placeholder="Phone" />
                            )}
                        />
                    </div>
                    <Label className='my-2'>REFERENCE 2</Label>
                    <div style={{ width: "100%", display: "flex", gap: "10px" }}>
                        <Controller
                            control={control}
                            name='referenceTwoFirstName'
                            render={({ field }) => (
                                <Input {...field} placeholder="First Name" />
                            )}
                        />
                        <Controller
                            control={control}
                            name='referenceTwoLastName'
                            render={({ field }) => (
                                <Input {...field} placeholder="Last Name" />
                            )}
                        />
                        <Controller
                            control={control}
                            name='referenceTwoPhone'
                            render={({ field }) => (
                                <Input {...field} placeholder="Phone" />
                            )}
                        />
                    </div>
                    <Label className='my-2'>AMOUNT REQUESTED</Label>
                    <div style={{ width: "100%", display: "flex", gap: "10px" }}>
                        <Controller
                            control={control}
                            name='amountRequested'
                            render={({ field }) => (
                                <Input {...field} placeholder="0" />
                            )}
                        />
                        <Button style={{ background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>11/04/2024</Button>
                    </div>
                    <Label className='my-2'>AMOUNT DUE</Label>
                    <div style={{ width: "100%", display: "flex", gap: "10px" }}>
                        <Controller
                            control={control}
                            name='amountDue'
                            render={({ field }) => (
                                <Input {...field} placeholder="0" />
                            )}
                        />
                        <Button style={{ background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>11/04/2024</Button>
                    </div>
                    <Label className='my-2 text-center mt-2'>CHOOSE HOW WE PAY</Label>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: 'flex', gap: "9px" }}>
                            <Input
                                type="checkbox"
                                onChange={(e) => console.log(e.target.checked)}
                            />
                            <p>Mobile Banking (enter email or phone)</p>
                        </div>
                        <div style={{ display: 'flex', gap: "9px" }}>
                            <Input
                                type="checkbox"
                                onChange={(e) => console.log(e.target.checked)}
                            />
                            <p>Cash App (enter $cashtag or username)</p>
                        </div>
                        <Input
                            placeholder='Enter details of your prefered payment method'
                            onChange={(e) => console.log(e.target.checked)}
                        />
                    </div>
                    <div className='mt-3' style={{ display: 'flex', gap: "9px", justifyContent: "center" }}>
                        <Input
                            type="checkbox"
                            onChange={(e) => console.log(e.target.checked)}
                        />
                        <p>Check Box to Agree Terms ans Conditions</p>
                    </div>
                    <Button style={{ background: "#62d0ab" }} className='mt-4'>Save</Button>
                    <Button
                        style={{ background: "#68069d" }}
                        className='my-4'
                        onClick={handleSubmit(submitHandler)}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}