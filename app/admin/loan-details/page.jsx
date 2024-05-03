'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getData } from "../../../utils/axiosUtils";
import {Container, Row,Col, Button} from 'reactstrap'


export default function LoanDetils(){
    const searchParams = useSearchParams();
    const router = useRouter()
    const [data, setData] = useState({})
    useEffect(()=>{
        getData('/loan/'+searchParams.get('id')).then(res=>{
            setData(res)
        })
    }, [searchParams.get('id')])

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between my-4">
                    <h2>Loan Details</h2>
                    <Button onClick={()=>router.push('/admin/dashboard')}>Dashboard</Button>
                </div>
                <Row className="justify-content-center">
                    <Col lg={6} sm={12} align="center">
                        <h2>Applicant Name : {data?.firstName} {data?.lastName}</h2>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}