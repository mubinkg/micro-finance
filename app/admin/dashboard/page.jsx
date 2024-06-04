'use client'

import { useEffect, useState } from 'react'
import { DashboardItem } from '../../../components/DahsboardItem'
import DataTable from '../../../components/DataTable'
import CartIcon from '../../../icons/CartIcon'
import DocumentIcon from '../../../icons/DocumentIcon'
import GroupIcon from '../../../icons/GroupIcon'
import { Container, Row, Col ,Button} from 'reactstrap'
import {getData} from '../../../utils/axiosUtils'
import ApplicantsDataTable from '../../../components/ApplicantsDataTable'
import logo from '../../../public/L-5.jpg'
import Image from 'next/image'
import { removeItem } from '../../../utils/storageUtils'
import { logoutUrl } from '../../../utils/urls'
import AdminPaymentHistoryData from '../../../components/AdminPaymentHistoryData'

export default function Page() {
    const [loans, setLoans] = useState([])
    const [countLoan, setCountLoan] = useState(0)
    const [dashboardItem, setDashboardItem] = useState('loan')
    const [data, setData] = useState([])
    const [userCount, setUserCount] = useState(0)
    const [paymentHistory,setPaymentHistory]=useState([])
    const [paymentCount,setPaymentCount]=useState(0)

    const logOutHandler = ()=>{
        getData(logoutUrl).then(res=>{
            window.location = '/';
            removeItem('user')
            removeItem('token')
        }).catch(err=>{
            console.log(err)
        })
      }
    
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

    function paymentHistoryData(){
        getData('/payments/findPaymentHistory').then(res=>{
            setPaymentHistory(res.history)
            setPaymentCount(res.count)
        })
    }

    useEffect(()=>{
        getLoanData()
        getUserData()
        paymentHistoryData()
    }, [])

    return (
        <Container fluid className='mt-4'>
            <div className='d-flex justify-content-between align-items-center'>
                <Image src={logo} width={200}/>
                <h2>Dashboard</h2>
                <Button onClick={logOutHandler}>Logout</Button>
            </div>
            <hr />
            <Row className='g-4'>
                <Col lg={3}>
                    <DashboardItem onClick={()=>setDashboardItem('loan')} count={countLoan} title="Loan Applications" icon={<DocumentIcon/>}/>
                </Col>
                <Col lg={3}>
                    <DashboardItem count={userCount} onClick={()=>setDashboardItem('user')}  title="Applicants/User" icon={<GroupIcon/>} />
                </Col>
                <Col lg={3}>
                    <DashboardItem count={paymentCount} onClick={()=>setDashboardItem('history')} title="Payment History" icon={<GroupIcon/>}/>
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
                dashboardItem === 'history' ? <AdminPaymentHistoryData data={paymentHistory}/> : ""
            }
        </Container>
    )
}