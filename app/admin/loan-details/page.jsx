'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState,Suspense } from "react";
import { getData, patchDataWtihAuth } from "../../../utils/axiosUtils";
import { Container, Row, Col, Button } from 'reactstrap'
import Image from 'next/image'
import Swal from 'sweetalert2'


export default function LoanDetils() {
    const searchParams = useSearchParams();
    const router = useRouter()
    const [data, setData] = useState({})

    function updateLoan(status){
        console.log(status)
        patchDataWtihAuth('loan/'+searchParams.get('id') , {status}).then(res=>{
            Swal.fire({
                title: 'Loan',
                text: 'Loan status update successfull',
                icon:'success'
            })
            setData(res.data)
        }).catch(err=>{
            Swal.fire({
                title: 'Loan',
                text: 'Error on update loan',
                icon:'error'
            })
        })
    }
    
    useEffect(() => {
        getData('/loan/' + searchParams.get('id')).then(res => {
            setData(res)
        })
    }, [searchParams.get('id')])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Container>
                <div className="d-flex justify-content-between my-4">
                    <h2>Loan Details</h2>
                    <Button onClick={() => router.push('/admin/dashboard')}>Dashboard</Button>
                </div>
                <Row className="justify-content-center">
                    <Col lg={12} sm={12} align="center">
                        <h5>Applicant Name : {data?.firstName} {data?.lastName}</h5>
                        <h5>Amount : {data?.amountRequested}</h5>
                        <h5>Status : {data?.status}</h5>
                        <h5>Current Address : {data?.currentAddress}</h5>
                        <h5>Address Line2 : {data?.currentAddress2}</h5>
                        <Row>
                            <Col lg={6} sm={12}>
                                <h5>Driver License Image</h5>
                                <Image alt="Driver License Image" src={data?.driverLicenseImage || ""} width={300} height={200} />
                            </Col>
                            <Col lg={6} sm={12}>
                                <h5>Check Front</h5>
                                <Image alt="Check Front" src={data?.checkFront || ""} width={300} height={200} />
                            </Col>
                            <Col lg={6} sm={12}>
                                <h5>Check Back</h5>
                                <Image alt="Check Back" src={data?.checkBack || ""} width={300} height={200}/>
                            </Col>
                            <Col lg={6} sm={12}>
                                <h5>Pay Stubs</h5>
                                <Image alt="Pay Stubs" src={data?.paystubs || ""} height={200} width={300} />
                            </Col>
                        </Row>
                        <div className="my-4">
                            <Button onClick={()=>updateLoan('approve')} style={{marginRight: "10px"}} color="primary">Approve</Button>
                            <Button onClick={()=>updateLoan('reject')} style={{marginRight: "10px"}} color="danger">Reject</Button>
                            <Button onClick={()=>updateLoan('resubmit')} style={{marginRight: "10px"}} color="info">Request Resubmit</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Suspense>
    )
}