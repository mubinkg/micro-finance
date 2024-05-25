'use client'
import { useForm, Controller } from 'react-hook-form'
import { Input, Label, Button, Row, Col, FormGroup } from 'reactstrap'
import { postDataWithAuth, getData, putDataWtihAuth } from '../../../utils/axiosUtils'
import AppNav from '../../../components/Navbar'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { isArray } from 'util'
import { useRouter, useSearchParams } from 'next/navigation'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getItem, removeItem, setItem } from '../../../utils/storageUtils'

export default function Page() {
    const searchParams = useSearchParams()
    const schema = yup.object().shape({
        firstName: yup.string().min(2).required(),
        lastName: yup.string().min(2).required(),
        currentAddress: yup.string().min(2).required(),
        city: yup.string().min(2).required(),
        state: yup.string().min(2).required(),
        zipCode: yup.string().min(5).max(5).required(),
        cellPhone: yup.string().min(10).max(10).required(),
        email: yup.string().email().required(),
        driverLicense: yup.string().min(2).required(),
        ssn: yup.string().min(9).max(9).required(),
        referenceOneFirstName: yup.string().min(2).required(),
        referenceOneLastName: yup.string().min(2).required(),
        referenceOnePhone: yup.string().min(10).max(10).required(),
        referenceTwoFirstName: yup.string().min(2).required(),
        referenceTwoLastName: yup.string().min(2).required(),
        referenceTwoPhone: yup.string().min(10).max(10).required(),
        amountRequested: yup.number().required(),
        paymentDetails: yup.string().min(2).required(),
        signature: yup.string().min(2).required(),
        paymentMethod: yup.string().min(2).required(),
    });


    const router = useRouter()
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();

    const amoundRequestedDate = `${mm}/${dd}/${yyyy}`;

    const fourteenDaysInMilliseconds = 14 * 24 * 60 * 60 * 1000;
    today =  new Date(today.getTime()+fourteenDaysInMilliseconds);
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    yyyy = today.getFullYear();

    const amountDueDate = `${mm}/${dd}/${yyyy}`;

    const [loading, setLoading] = useState(false)
    const [aggree, setAgree] = useState(false)
    const { handleSubmit, register, control, watch, reset, setValue, formState: { errors, dirtyFields } } = useForm({
        defaultValues: {
        },
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        getData('/loan/' + searchParams.get('id')).then(loan => {
            if (loan) {
                for (const [key, value] of Object.entries(loan)) {
                    setValue(key, value)
                    setValue('amoundRequestedDate', amoundRequestedDate)
                    setValue('amountDueDate', amountDueDate)
                }
            }
        })
    }, [searchParams.get('id')])

    function submitHandler(data) {

        if (!aggree) {
            return Swal.fire({
                title: 'Request Loan',
                text: 'Please accept Terms and Conditions to proceed',
                icon: 'error'
            })
        }

        console.log(dirtyFields)

        const dirtyValues = Object.keys(dirtyFields)
            .reduce((acc, field) => {
                acc[field] = data[field];
                return acc;
            }, {});
        dirtyValues['amoundRequestedDate'] = amoundRequestedDate
        dirtyValues['amountDueDate'] = amountDueDate

        setLoading(true)

        const formData = new FormData()
        formData.append('id', searchParams.get('id'))

        for (const [key, value] of Object.entries(dirtyValues)) {

            if (key === 'driverLicenseImage' || key === 'checkFront' || key === "checkBack" || key === "paystubs") {
                formData.append(key, value[0])
            } else {
                formData.append(key, value)
            }
        }

        formData.append('amountRequested', watch('amountRequested'))
        formData.append('amountDue', watch('amountRequested')*1.25)

        putDataWtihAuth('loan', formData).then(res => {
            setLoading(false)
            reset()
            Swal.fire({
                title: "Loan Application",
                text: `Loan successfully submitted.
                Our team is reviewing, and will respond shortly. You may get an SMS notification about
                loan status. You can also check status under "History"`,
                icon: "success"
            }).then(() => {
                removeItem('loan')
                router.push('/zimba-cash/history')
            })
        }).catch(err => {
            let errorHtml = ''
            setLoading(false)
            if (isArray(err.message)) {
                err.message.map(m => {
                    errorHtml = errorHtml + `<li>${m}</li>`
                    return m
                })
            } else {
                console.log(err.message)
                errorHtml = errorHtml + `<li>${err.message}</li>`
            }
            Swal.fire({
                title: 'Request Loan',
                html: `
                    <ol>
                        ${errorHtml}
                    </ol>
                `,
                icon: 'error'
            })
        }).finally(()=>{
            setLoading(false)
        })
    }

    return (
        <div style={{ marginBottom: "200px" }}>
            <AppNav />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                minHeight: "90vh"
            }}>
                <div className='container' style={{ maxWidth: "800px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", }}>
                    <h5 style={{ textAlign: "center" }} className='my-4'>Emergency Loans: Life happens</h5>
                    <Row>
                        <h6 style={{color: "#68069d"}}>PERSONAL INFORMATION</h6>
                        <Col lg={6} md={12}>
                            <Label className='text-success'>
                                FIRST NAME
                            </Label>
                            <Controller
                                control={control}
                                name='firstName'
                                render={({ field }) => (
                                    <Input style={{
                                        border: errors.firstName ? "1px solid red" : ""
                                    }} {...field} placeholder='First Name' />
                                )}
                            />
                        </Col>
                        <Col lg={6} md={12}>
                            <Label className='text-success'>
                                LAST NAME
                            </Label>
                            <Controller
                                control={control}
                                name='lastName'
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder='Last name'
                                        style={{
                                            border: errors.lastName ? "1px solid red" : ""
                                        }}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <div className='mt-2'>
                        <Label className='text-success'>
                            CURRENT ADDRESS
                        </Label>
                        <Controller
                            control={control}
                            name='currentAddress'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    style={{
                                        border: errors.currentAddress ? "1px solid red" : ""
                                    }}
                                    placeholder='Current address'
                                />
                            )}
                        />
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Controller
                            control={control}
                            name='currentAddress2'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder='Address line 2'
                                />
                            )}
                        />
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Controller
                            control={control}
                            name='city'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    style={{
                                        border: errors.city ? "1px solid red" : ""
                                    }}
                                    placeholder='City'
                                />
                            )}
                        />
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Controller
                            control={control}
                            name='state'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder='State'
                                    style={{
                                        border: errors.state ? "1px solid red" : ""
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }} >
                        <Controller
                            control={control}
                            name='zipCode'
                            render={({ field }) => (
                                <Input
                                    type='number'
                                    style={{
                                        border: errors.zipCode ? "1px solid red" : ""
                                    }}
                                    {...field}
                                    placeholder='Zip Code'
                                />
                            )}
                        />
                    </div>
                    <div className='mt-2'>
                        <Label className='text-success'>
                            CELL PHONE
                        </Label>
                        <Controller
                            control={control}
                            name='cellPhone'
                            render={({ field }) => (
                                <Input
                                    type='number'
                                    style={{
                                        border: errors.cellPhone ? "1px solid red" : ""
                                    }}
                                    {...field}
                                    placeholder='Cell phone'
                                />
                            )}
                        />
                    </div>
                    <div className='mt-2'>
                        <Label className='text-success'>
                            Email
                        </Label>
                        <Controller
                            control={control}
                            name='email'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    style={{
                                        border: errors.email ? "1px solid red" : ""
                                    }}
                                    placeholder='Email address'
                                />
                            )}
                        />
                    </div>
                    <div className='mt-2'>
                        <Label className='text-success'>
                            DRIVER&rsquo;S LICENSE/ID
                        </Label>
                        <Controller
                            control={control}
                            name='driverLicense'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    style={{
                                        border: errors.driverLicense ? "1px solid red" : ""
                                    }}
                                    placeholder="Driver&rsquo;s License / ID"
                                />
                            )}
                        />
                    </div>
                    <div className='mt-2'>
                        <Label className='text-success'>
                            SSN
                        </Label>
                        <Controller
                            control={control}
                            name='ssn'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type='number'
                                    style={{
                                        border: errors.ssn ? "1px solid red" : ""
                                    }}
                                    placeholder="XXX-XXX-XXX"
                                />
                            )}
                        />
                    </div>
                    <h6 style={{color: "#68069d", marginTop: "20px"}}>REQUIRED DOCUMENTS</h6>
                    <div className='mt-2' style={{ width: "100%", display: "flex", gap: "10px", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                        <Label className='text-success'>DRIVER&rsquo;S LICENSE / ID</Label>
                        <label style={{ cursor: "pointer", padding: '5px 10px', color: "white", background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>
                            <input required type="file" {...register('driverLicenseImage')} style={{ display: 'none' }} />
                            Choose a File
                        </label>
                        {typeof watch('driverLicenseImage') === 'string' ? <img width={250} height="auto" src={watch('driverLicenseImage')} /> : ""}
                        {typeof watch('driverLicenseImage') === 'object' ? <img width={250} height="auto" src={URL.createObjectURL(watch('driverLicenseImage')[0])} /> : ""}
                    </div>
                    <div className='mt-4' style={{ width: "100%", display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                        <Label className='text-success'>CHECK (Blank and Signed on the back)</Label>
                        <div style={{ display: 'flex', gap: "10px" }}>
                            <label style={{ cursor: "pointer", padding: '5px 10px', color: "white", background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>
                                <input required {...register('checkFront')} type="file" style={{ display: 'none' }} />
                                Front Side
                            </label>
                            <label style={{ cursor: "pointer", padding: '5px 10px', color: "white", background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>
                                <input required {...register('checkBack')} type="file" style={{ display: 'none' }} />
                                Back Side
                            </label>
                        </div>
                        {typeof watch('checkFront') === 'string' ? <img width={150} height="auto" src={watch('checkFront')} /> : ""}
                        {typeof watch('checkFront') === 'object' ? <img width={250} height="auto" src={URL.createObjectURL(watch('checkFront')[0])} /> : ""}
                        {typeof watch('checkBack') === 'string' ? <img width={150} height="auto" src={watch('checkBack')} /> : ""}
                        {typeof watch('checkBack') === 'object' ? <img width={250} height="auto" src={URL.createObjectURL(watch('checkBack')[0])} /> : ""}
                    </div>
                    <div className='mt-4' style={{ width: "100%", display: "flex", gap: "10px", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                        <Label className='text-success'>RECENT PAYSTUB</Label>
                        <label style={{ cursor: "pointer", padding: '5px 10px', color: "white", background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>
                            <input required {...register('paystubs')} type="file" style={{ display: 'none' }} />
                            Choose a File
                        </label>
                        {typeof watch('paystubs') === 'string' ? <img width={250} height="auto" src={watch('paystubs')} /> : ""}
                        {typeof watch('paystubs') === 'object' ? <img width={250} height="auto" src={URL.createObjectURL(watch('paystubs')[0])} /> : ""}
                    </div>
                    <h6 style={{color: "#68069d", marginTop: "20px"}}>REFERENCES</h6>
                    <Label className='my-2 text-success'>REFERENCE 1</Label>
                    <div style={{ width: "100%", display: "flex", gap: "10px" }}>
                        <Controller
                            control={control}
                            name='referenceOneFirstName'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    style={{
                                        border: errors.referenceOneFirstName ? "1px solid red" : ""
                                    }}
                                    placeholder="First Name"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='referenceOneLastName'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    style={{
                                        border: errors.referenceOneLastName ? "1px solid red" : ""
                                    }}
                                    placeholder="Last Name"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='referenceOnePhone'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Phone"
                                    type='number'
                                    style={{
                                        border: errors.referenceOnePhone ? "1px solid red" : ""
                                    }}
                                />
                            )}
                        />
                    </div>
                    <Label className='my-2 text-success'>REFERENCE 2</Label>
                    <div style={{ width: "100%", display: "flex", gap: "10px" }}>
                        <Controller
                            control={control}
                            name='referenceTwoFirstName'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    style={{
                                        border: errors.referenceTwoFirstName ? "1px solid red" : ""
                                    }}
                                    placeholder="First Name"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='referenceTwoLastName'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    style={{
                                        border: errors.referenceTwoLastName ? "1px solid red" : ""
                                    }}
                                    placeholder="Last Name"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='referenceTwoPhone'
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type='number'
                                    style={{
                                        border: errors.referenceTwoPhone ? "1px solid red" : ""
                                    }}
                                    placeholder="Phone"
                                />
                            )}
                        />
                    </div>
                    <h6 style={{color: "#68069d", marginTop: "20px"}}>PAYMENT INFORMATION</h6>
                    <Label className='my-2 text-success'>AMOUNT REQUESTED</Label>
                    <div style={{ width: "100%", display: "flex", gap: "10px" }}>
                        <Controller
                            control={control}
                            name='amountRequested'
                            render={({ field }) => (
                                <Input
                                    type='number'
                                    {...field}
                                    style={{
                                        border: errors.amountRequested ? "1px solid red" : ""
                                    }}
                                    onChange={(e) => {
                                        setValue('amountRequested', e.target.value)
                                        setValue('amountDue', e.target.value * 1.25)
                                    }}
                                    placeholder="0"
                                />
                            )}
                        />
                        <Button style={{ background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" }}>{watch('amoundRequestedDate')}</Button>
                    </div>
                    <Label className='my-2 text-success'>AMOUNT DUE</Label>
                    <div style={{ width: "100%", display: "flex", gap: "10px", justifyContent:"space-between" }}>
                        <div style={{display:'flex', flexDirection:"column", width:"80%"}}>
                            <Controller
                                control={control}
                                name='amountDue'
                                render={({ field }) => (
                                    <Input 
                                        disabled={true} 
                                        type='number'
                                        {...field} 
                                        placeholder="0" 
                                    />
                                )}
                            />
                            <span style={{fontSize:"small"}}>25% Interest. Additional fees can apply for late payments</span>
                        </div>
                        <Button style={{ background: "#62d0ab", border: 'none', outline: "none", borderRadius: "50px" , height:"40px"}}>{watch('amountDueDate')}</Button>
                    </div>
                    <Label className='my-2 text-success'>CHOOSE HOW WE PAY YOU</Label>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                        <Controller
                            control={control}
                            name='paymentMethod'
                            render={({ field }) => (
                                <>
                                    <FormGroup check>
                                        <Input
                                            {...field}
                                            style={{
                                                border: errors.paymentMethod ? "1px solid red" : ""
                                            }}
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
                                            style={{
                                                border: errors.paymentMethod ? "1px solid red" : ""
                                            }}
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
                                    style={{
                                        border: errors.paymentDetails ? "1px solid red" : ""
                                    }}
                                    {...field}
                                    placeholder='Enter details of your prefered payment method'
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='signature'
                            render={({ field }) => (
                                <Input
                                    className='mt-3'
                                    {...field}
                                    style={{
                                        border: errors.signature ? "1px solid red" : ""
                                    }}
                                    placeholder='Signature'
                                />
                            )}
                        />
                    </div>
                    <div className='mt-3' style={{ display: 'flex', gap: "9px", justifyContent: "center" }}>
                        <Input
                            type="checkbox"
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        <p>Check Box to Agree <span onClick={() => router.push('/zimba-cash/terms-conditions')} style={{ color: "blue", cursor: "pointer" }}>Terms ans Conditions</span></p>
                    </div>

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