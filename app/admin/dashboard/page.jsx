'use client'

import { useEffect, useState } from 'react'
import { DashboardItem } from '../../../components/DahsboardItem'
import DataTable from '../../../components/DataTable'
import CartIcon from '../../../icons/CartIcon'
import DocumentIcon from '../../../icons/DocumentIcon'
import GroupIcon from '../../../icons/GroupIcon'
import { Container, Row, Col } from 'reactstrap'
import {getData} from '../../../utils/axiosUtils'

export default function Page() {
    const [loans, setLoans] = useState([])
    useEffect(()=>{
        getData('/loan/').then(res=>{
            setLoans(res.loans)
        })
    }, [])

    return (
        <Container fluid className='mt-4'>
            <h2>Dahsboard</h2>
            <hr />
            <Row className='g-4'>
                <Col lg={3}>
                    <DashboardItem title="Loan Applications" icon={<DocumentIcon/>} url='/admin/dashboard/'/>
                </Col>
                <Col lg={3}>
                    <DashboardItem title="Applicants/User" icon={<GroupIcon/>} url='/admin/applicants/'/>
                </Col>
                <Col lg={3}>
                    <DashboardItem title="History" icon={<GroupIcon/>} url='/admin/history/'/>
                </Col>
                <Col lg={3}>
                    <DashboardItem title="Bank Details" icon={<CartIcon/>} url="#"/>
                </Col>
            </Row>
            <DataTable data={loans}/>
        </Container>
    )
}