'use client'

import { useForm, Controller } from 'react-hook-form'
import { Input, Label, Button, Row, Col } from 'reactstrap'
import { getDataWtihAuth, postDataWithAuth } from '../../../utils/axiosUtils'
import Swal from 'sweetalert2'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppNav from '../../../components/Navbar'
import { useEffect } from 'react'
import { logoutAction } from '../../action'
import { removeItem } from '../../../utils/storageUtils'



export default function Page() {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        oldPassword: yup.string().required(),
        newPassword: yup.string()
            .required()
            .min(8)
            .matches(/(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~-])/),
        confirmNewPassword: yup.string().test('test-confing', function () {
            const { newPassword, confirmNewPassword } = this.parent
            return newPassword === confirmNewPassword
        })
    });

    const { handleSubmit, control, setValue, formState: { errors } } = useForm({
        defaultValues: {

        },
        resolver: yupResolver(schema),
    })

    const logOutHandler = async () => {
        await logoutAction()
        removeItem('user')
        removeItem('token')
        window.location = '/login'
    }


    function submitMail(values) {
        postDataWithAuth('/user/changePassword', { oldPassword: values.oldPassword, newPassword: values.newPassword }).then(res => {
            logOutHandler()
        }).catch(err => {
            Swal.fire({
                title: 'Change Password',
                text: 'Old password not matched',
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
                                render={({ field }) => (
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
                            <Label className='text-success text-uppercase'>
                                Old Password
                            </Label>
                            <Controller
                                control={control}
                                name='oldPassword'
                                render={({ field }) => (
                                    <Input
                                        style={{
                                            border: errors.oldPassword ? "1px solid red" : ""
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
                            <div style={{ display: 'flex', gap: "20px", color: "green" }}>
                                <Label className='text-success text-uppercase'>
                                    New Password
                                </Label>
                                <span>
                                    [ At least 8 characters, a capital letter, a special character ]
                                </span>
                            </div>
                            <Controller
                                control={control}
                                name='newPassword'
                                render={({ field }) => (
                                    <Input
                                        style={{
                                            border: errors.newPassword ? "1px solid red" : ""
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
                            <Label className='text-success text-uppercase'>
                                Confirm New Password
                            </Label>
                            <Controller
                                control={control}
                                name='confirmNewPassword'
                                render={({ field }) => (
                                    <Input
                                        style={{
                                            border: errors.confirmNewPassword ? "1px solid red" : ""
                                        }}
                                        {...field}

                                        placeholder='Confirm New Password'
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Button onClick={handleSubmit(submitMail)} className='mt-4' color='primary'>SAVE</Button>
                </div>
            </div>
        </div>
    )
}