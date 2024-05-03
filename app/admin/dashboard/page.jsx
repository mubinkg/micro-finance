'use client'

import { useEffect, useState } from 'react'
import { DashboardItem } from '../../../components/DahsboardItem'
import DataTable from '../../../components/DataTable'
import CartIcon from '../../../icons/CartIcon'
import DocumentIcon from '../../../icons/DocumentIcon'
import GroupIcon from '../../../icons/GroupIcon'
import { Container, Row, Col } from 'reactstrap'
import {getData} from '../../../utils/axiosUtils'
import ApplicantsDataTable from '../../../components/ApplicantsDataTable'


export default function Page() {
    const [loans, setLoans] = useState([])
    const [countLoan, setCountLoan] = useState(0)
    const [dashboardItem, setDashboardItem] = useState('loan')
    const [data, setData] = useState([])
    const [userCount, setUserCount] = useState(0)
    
    function getUserData(){
        getData('user').then(res=>{
            setData(res.users)
            setUserCount(res.count)
        }).catch()
    }

    function getLoanData(){
        getData('/loan/').then(res=>{
            setLoans(res.loans)
            setCountLoan(res.count)
        })
    }

    useEffect(()=>{
        getLoanData()
        getUserData()
    }, [])

    return (
        <Container fluid className='mt-4'>
            <h2>Dahsboard</h2>
            <hr />
            <Row className='g-4'>
                <Col lg={3}>
                    <DashboardItem onClick={()=>setDashboardItem('loan')} count={countLoan} title="Loan Applications" icon={<DocumentIcon/>}/>
                </Col>
                <Col lg={3}>
                    <DashboardItem count={userCount} onClick={()=>setDashboardItem('user')}  title="Applicants/User" icon={<GroupIcon/>} />
                </Col>
                <Col lg={3}>
                    <DashboardItem onClick={()=>setDashboardItem('history')} title="History" icon={<GroupIcon/>}/>
                </Col>
                <Col lg={3}>
                    <DashboardItem onClick={()=>setDashboardItem('loan')} title="Bank Details" icon={<CartIcon/>} />
                </Col>
            </Row>
            {
                dashboardItem === 'loan' ? <DataTable data={loans}/> : ""
            }
            {
                dashboardItem === 'user' ? <ApplicantsDataTable data={data}/> : ""
            }
            {
                dashboardItem === 'history' ? <DataTable data={loans}/> : ""
            }
        </Container>
    )
}