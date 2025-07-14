'use client'

import { useEffect, useState } from 'react'
import { DashboardItem } from '../../../components/DahsboardItem'
import DataTable from '../../../components/DataTable'
import CartIcon from '../../../icons/CartIcon'
import DocumentIcon from '../../../icons/DocumentIcon'
import GroupIcon from '../../../icons/GroupIcon'
import LoanIcon from '../../../icons/LoanIcon'
import { Row, Col } from 'reactstrap'
import { getData, getDataWtihAuth } from '../../../utils/axiosUtils'
import ApplicantsDataTable from '../../../components/ApplicantsDataTable'
import AdminPaymentHistoryData from '../../../components/AdminPaymentHistoryData'
import ClientDataTable from '../../../components/ClientDataTable'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [loans, setLoans] = useState([])
    const [countLoan, setCountLoan] = useState(0)
    const [dashboardItem, setDashboardItem] = useState('loan')
    const [data, setData] = useState([])
    const [userCount, setUserCount] = useState(0)
    const [paymentHistory, setPaymentHistory] = useState([])
    const [paymentCount, setPaymentCount] = useState(0)

    function getUserData() {
        getDataWtihAuth('/user/user-list').then(res => {
            setData(res.data.users)
            setUserCount(res.data.count)
        }).catch()
    }

    function getLoanData() {
        getData('/loan/').then(res => {
            setLoans(res.loans)
            setCountLoan(res.count)
        })
    }

    function paymentHistoryData() {
        getData('/payments/findPaymentHistory').then(res => {
            setPaymentHistory(res.history)
            setPaymentCount(res.count)
        })
    }

    useEffect(() => {
        getLoanData()
        getUserData()
        paymentHistoryData()
    }, [])

    const [adminLoan, setAdminLoans] = useState([])
    const getAdminLoanData = () => {
        getDataWtihAuth('/loan/user-loan').then((res) => {
            setAdminLoans(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getAdminLoanData()
    }, [])

    const router = useRouter()

    return (
        <>
            <hr />
            <Row className='g-4'>
                <Col>
                    <DashboardItem onClick={() => setDashboardItem('loan')} count={countLoan} title="Loan Applications" icon={<DocumentIcon />} />
                </Col>
                <Col>
                    <DashboardItem count={userCount} onClick={() => setDashboardItem('user')} title="Applicants/User" icon={<GroupIcon />} />
                </Col>
                <Col>
                    <DashboardItem onClick={() => setDashboardItem('history')} count={paymentCount} title="Payment History" icon={<GroupIcon />} />
                </Col>
                <Col>
                    <DashboardItem onClick={() => setDashboardItem('loans')} title="Loans" count={adminLoan.length} icon={<LoanIcon />} />
                </Col>
                <Col>
                    <DashboardItem onClick={() => setDashboardItem('loan')} title="Bank Details" icon={<CartIcon />} />
                </Col>
            </Row>
            {
                dashboardItem === 'loan' ? <DataTable data={loans} /> : ""
            }
            {
                dashboardItem === 'user' ? <ApplicantsDataTable data={data} /> : ""
            }
            {
                dashboardItem === 'loans' ? <ClientDataTable data={adminLoan} getLoanData={getAdminLoanData} /> : ""
            }
            {
                dashboardItem === 'history' ? <AdminPaymentHistoryData data={paymentHistory} /> : ""
            }
        </>
    )
}