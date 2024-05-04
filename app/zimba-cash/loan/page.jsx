'use client'
import { useForm, Controller } from 'react-hook-form'
import { Input, Label, Button, Row, Col, FormGroup } from 'reactstrap'
import { postData } from '../../../utils/axiosUtils'
import AppNav from '../../../components/Navbar'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { isArray } from 'util'

export default function Page() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    const formattedDate = `${mm}/${dd}/${yyyy}`;

    const [loading, setLoading] = useState(false)
    const [aggree, setAgree] = useState(false)
    const { handleSubmit, register, control, watch, reset, setValue } = useForm({
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
            referenceOneFirstName: "",
            amountRequested: 0
        }
    })

    function submitHandler(values) {
        if (!aggree) {
            return Swal.fire({
                title: 'Request Loan',
                text: 'Please select terms and conditions',
                icon: 'error'
            })
        }
        setLoading(true)
        const formData = new FormData()

        for (const [key, value] of Object.entries(values)) {
            if (key === 'driverLicenseImage' || key === 'checkFront' || key === "checkBack" || key === "paystubs") {
                formData.append(key, value[0])
            } else {
                formData.append(key, value)
            }
        }
        postData('loan', formData).then(res => {
            setLoading(false)
            reset()
            Swal.fire({
                title: 'Request Loan',
                text: 'Loan request accepted',
                icon: "success"
            })
        }).catch(err => {
            let errorHtml = ''
            if(isArray(err.message)){
                err.message.map(m => {
                    errorHtml = errorHtml + `<li>${m}</li>`
                    return m
                })
            }else{
                errorHtml = errorHtml + `<li>${err.message}</li>`
            }
            setLoading(false)
            Swal.fire({
                title: 'Request Loan',
                html: `
                    <ol>
                        ${errorHtml}
                    </ol>
                `,
                icon: 'error'
            })
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
                minHeight: "90vh"
            }}>
                <div className='container' style={{ maxWidth: "800px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", }}>
                    <h5 style={{ textAlign: "center" }} className='my-4'>Emergency Loans: Life happens, use borrowed money wisely</h5>
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
                            DRIVERS LICENSE/ID
                        </Label>
                        <Controller
                            control={control}
                            name='driverLicense'
                            render={({ field }) => (
                                <Input {...field} placeholder="Drivers lisence/id" />
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
                        {watch('driverLicenseImage')?.length ? <img width={250} height="auto" src={URL.createObjectURL(watch('driverLicenseImage')[0])} /> : ""}
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
                        {watch('checkFront')?.length ? <img width={150} height="auto" src={URL.createObjectURL(watch('checkFront')[0])} /> : ""}
                        {watch('checkBack')?.length ? <img width={150} height="auto" src={URL.createObjectURL(watch('checkBack')[0])} /> : ""}
                    </div>
                    <div className='mt-4' style={{ width: "100%", display: "flex", gap: "10px", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                        <Label>RECENT PAYSTUBS</Label>
                        <label style={{ cursor: "pointer", padding: '5px 10px', color: "white", background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>
                            <input {...register('paystubs')} type="file" style={{ display: 'none' }} />
                            Choose a File
                        </label>
                        {watch('paystubs')?.length ? <img width={250} height="auto" src={URL.createObjectURL(watch('paystubs')[0])} /> : ""}
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
                                <Input type='number' {...field} onChange={(e)=>{
                                   setValue('amountRequested',e.target.value)
                                   setValue('amountDue',e.target.value*1.25)
                                }} placeholder="0" />
                            )}
                        />
                        <Button style={{ background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>{formattedDate}</Button>
                    </div>
                    <Label className='my-2'>AMOUNT DUE</Label>
                    <div style={{ width: "100%", display: "flex", gap: "10px" }}>
                        <Controller
                            control={control}
                            name='amountDue'
                            render={({ field }) => (
                                <Input disabled={true} {...field} placeholder="0" />
                            )}
                        />
                        <Button style={{ background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>{formattedDate}</Button>
                    </div>
                    <Label className='my-2'>CHOOSE HOW WE PAY</Label>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                        <Controller
                            control={control}
                            name='paymentMethod'
                            render={({ field }) => (
                                <>
                                    <FormGroup check>
                                        <Input
                                            {...field}
                                            value="mobile"
                                            name="paymentMethod"
                                            type="radio"

                                        />
                                        {' '}
                                        <Label check>
                                            Mobile Banking (enter email or phone)
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input
                                            {...field}
                                            value="cashapp"
                                            name="paymentMethod"
                                            type="radio"
                                        />
                                        {' '}
                                        <Label check>
                                            Cash App (enter $cashtag or username)
                                        </Label>
                                    </FormGroup>
                                </>
                            )}
                        />
                        <Controller
                            control={control}
                            name='paymentDetails'
                            render={({ field }) => (
                                <Input
                                    className='mt-3'
                                    {...field}
                                    placeholder='Enter details of your prefered payment method'
                                />
                            )}
                        />
                    </div>
                    <div className='mt-3' style={{ display: 'flex', gap: "9px", justifyContent: "center" }}>
                        <Input
                            type="checkbox"
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        <p>Check Box to Agree Terms ans Conditions</p>
                    </div>
                    <Button style={{ background: "#62d0ab" }} className='mt-4'>Save</Button>
                    <Button
                        style={{ background: "#68069d" }}
                        className='my-4'
                        onClick={handleSubmit(submitHandler)}
                        disabled={loading}
                    >
                        {
                            loading ? "Submitting...." : "Submit"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}