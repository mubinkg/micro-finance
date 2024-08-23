'use client'

import { useForm, Controller } from 'react-hook-form'
import { Input, Label, Button, Row, Col } from 'reactstrap'
import { getDataWtihAuth, postData } from '../../../utils/axiosUtils'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppNav from '../../../components/Navbar'
import { useEffect } from 'react'



export default function Page() {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
    });


    const router = useRouter()

    const { handleSubmit, reset, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            
        },
        resolver: yupResolver(schema),
    })

    function submitMail(values) {
        postData('mail', values).then(res => {
            Swal.fire({
                title: 'Contact Us',
                text: 'Mail sent successfully. Thank you!',
                icon: "success"
            }).then(() => {
                reset()
                router.push('/')
            })
        }).catch(err => {
            Swal.fire({
                title: 'Contact Us',
                text: 'Error on sending gmail',
                icon: "error"
            })
        })
    }

    useEffect(() => {
        getDataWtihAuth('/user').then((res) => {
            console.log(res.data)
            setValue('firstName', res.data.firstName)
            setValue('lastName', res.data.lastName)
            setValue('email', res.data.email)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div style={{ marginBottom: "200px" }}>
            <AppNav hideSideNav={false} />
            <div style={{
                minHeight: "70vh"
            }}>
                <div className='container' style={{ maxWidth: "800px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", }}>
                    <h5 style={{ textAlign: "center" }} className='my-4'>Profile</h5>
                    <Row>
                        <Col lg={12}>
                            <Label className='text-success'>
                                FIRST NAME
                            </Label>
                            <Controller
                                control={control}
                                name='firstName'
                                render={({ field}) => (
                                    <Input
                                        style={{
                                            border: errors.firstName ? "1px solid red" : ""
                                        }}
                                        {...field}
                                        disabled
                                        placeholder='First Name'
                                    />
                                )}
                            />
                        </Col>
                    </Row>

                    <Row className='mt-4'>
                        <Col lg={12}>
                            <Label className='text-success'>
                                LAST NAME
                            </Label>
                            <Controller
                                control={control}
                                name='lastName'
                                render={({ field }) => (
                                    <Input
                                        style={{
                                            border: errors.lastName ? "1px solid red" : ""
                                        }}
                                        {...field}
                                        disabled
                                        placeholder='Last Name'
                                    />
                                )}
                            />
                        </Col>
                    </Row>

                    <Row className='mt-4'>
                        <Col lg={12}>
                            <Label className='text-success'>
                                EMAIL
                            </Label>
                            <Controller
                                control={control}
                                name='email'
                                render={({ field }) => (
                                    <Input 
                                        style={{
                                            border: errors.email ? "1px solid red" : ""
                                        }} 
                                        {...field}
                                        disabled
                                        placeholder='Email' 
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col lg={12}>
                            <Label className='text-success'>
                                Old Password
                            </Label>
                            <Controller
                                control={control}
                                name='oldPassword'
                                render={({ field }) => (
                                    <Input 
                                        style={{
                                            border: errors.email ? "1px solid red" : ""
                                        }} 
                                        {...field}
                                        placeholder='Old Password' 
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col lg={12}>
                            <Label className='text-success'>
                                New Password
                            </Label>
                            <Controller
                                control={control}
                                name='newPassword'
                                render={({ field }) => (
                                    <Input 
                                        style={{
                                            border: errors.email ? "1px solid red" : ""
                                        }} 
                                        {...field}
                                        placeholder='New Password' 
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col lg={12}>
                            <Label className='text-success'>
                                Confirm New Password
                            </Label>
                            <Controller
                                control={control}
                                name='confirmNewPassword'
                                render={({ field }) => (
                                    <Input 
                                        style={{
                                            border: errors.email ? "1px solid red" : ""
                                        }} 
                                        {...field}
                                    
                                        placeholder='Confirm New Password' 
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Button onClick={handleSubmit(submitMail)} className='mt-4' color='primary'>Submit</Button>
                </div>
            </div>
        </div>
    )
}