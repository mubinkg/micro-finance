'use client'

import { useEffect, useState } from 'react'
import ApplicantsDataTable from '../../../components/ApplicantsDataTable'
import { DashboardItem } from '../../../components/DahsboardItem'
import DocumentIcon from '../../../icons/DocumentIcon'
import { Container, Row, Col } from 'reactstrap'
import {getData} from '../../../utils/axiosUtils'

export default function Page() {
    const [data, setData] = useState({})
    
    async function getUserData(){
        getData('user').then(res=>{
            setData(res.data)
        }).catch()
    }
    useEffect(()=>{
        getUserData()
    },[])

    return (
        <Container fluid className='mt-4'>
            <h2>Applicants</h2>
            <hr />
            <Row className='g-4'>
                <Col lg={3}>
                    <DashboardItem title="Applicants/User" icon={<DocumentIcon/>}/>
                </Col>
            </Row>
            <ApplicantsDataTable data={data}/>
        </Container>
    )
}