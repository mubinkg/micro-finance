'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getData } from "../../../utils/axiosUtils";
import { Container, Row, Col, Button } from 'reactstrap'
import bg from '../../../public/bg.jpg'
import Image from 'next/image'


export default function LoanDetils() {
    const searchParams = useSearchParams();
    const router = useRouter()
    const [data, setData] = useState({})
    useEffect(() => {
        getData('/loan/' + searchParams.get('id')).then(res => {
            setData(res)
        })
    }, [searchParams.get('id')])

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between my-4">
                    <h2>Loan Details</h2>
                    <Button onClick={() => router.push('/admin/dashboard')}>Dashboard</Button>
                </div>
                <Row className="justify-content-center">
                    <Col lg={12} sm={12} align="center">
                        <h2>Applicant Name : {data?.firstName} {data?.lastName}</h2>
                        <h2>Amount : {data?.amountRequested}</h2>
                        <Row>
                            <Col lg={6} sm={12}>
                                <h5>Driver License Image</h5>
                                <Image src={bg} width={300} />
                            </Col>
                            <Col lg={6} sm={12}>
                                <h5>Check Front</h5>
                                <Image src={bg} width={300} />
                            </Col>
                            <Col lg={6} sm={12}>
                                <h5>Check Back</h5>
                                <Image src={bg} width={300} />
                            </Col>
                            <Col lg={6} sm={12}>
                                <h5>Pay Stubs</h5>
                                <Image src={bg} width={300} />
                            </Col>
                        </Row>
                        <div className="my-4">
                            <Button style={{marginRight: "10px"}} color="primary">Approve</Button>
                            <Button style={{marginRight: "10px"}} color="danger">Reject</Button>
                            <Button style={{marginRight: "10px"}} color="info">Request Resubmit</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}