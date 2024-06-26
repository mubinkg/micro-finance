'use client'
import { useForm, Controller } from 'react-hook-form'
import { Input, Label, Button, Row, Col } from 'reactstrap'
import { postData } from '../../../utils/axiosUtils'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppNav from '../../../components/Navbar'



export default function Page() {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        subject: yup.string().required(),
        body: yup.string().required(),
    });


    const router = useRouter()

    const { handleSubmit,reset, control, formState: { errors } } = useForm({
        defaultValues: {

        },
        resolver: yupResolver(schema),
    })

    function submitMail(values) {
        postData('mail', values).then(res=>{
            Swal.fire({
                title:'Contact Us',
                text: 'Mail sent successfully. Thank you!',
                icon :"success"
            }).then(()=>{
                reset()
                router.push('/')
            })
        }).catch(err=>{
            Swal.fire({
                title:'Contact Us',
                text: 'Error on sending gmail',
                icon :"error"
            })
        })
    }

    return (
        <div style={{ marginBottom: "200px" }}>
            <AppNav hideSideNav={true}/>
            <div style={{
                minHeight: "70vh"
            }}>
                <div className='container' style={{ maxWidth: "800px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", }}>
                    <h5 style={{ textAlign: "center" }} className='my-4'>Contact Us</h5>
                    <Row>
                        <Col lg={12}>
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
                                    <Input style={{
                                        border: errors.lastName ? "1px solid red" : ""
                                    }} {...field} placeholder='Last Name' />
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
                                    <Input style={{
                                        border: errors.email ? "1px solid red" : ""
                                    }} {...field} placeholder='Email' />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col lg={12}>
                            <Label className='text-success'>
                                SUBJECT
                            </Label>
                            <Controller
                                control={control}
                                name='subject'
                                render={({ field }) => (
                                    <Input style={{
                                        border: errors.subject ? "1px solid red" : ""
                                    }} {...field} placeholder='Subject' />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col lg={12}>
                            <Label className='text-success'>
                                BODY
                            </Label>
                            <Controller
                                control={control}
                                name='body'
                                render={({ field }) => (
                                    <Input 
                                        type='textarea'
                                        style={{
                                            border: errors.body ? "1px solid red" : ""
                                        }} 
                                        {...field} 
                                        placeholder='Body' 
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