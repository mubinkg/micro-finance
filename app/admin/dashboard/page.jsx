import { DashboardItem } from '@/components/DahsboardItem'
import DataTable from '@/components/DataTable'
import CartIcon from '@/icons/CartIcon'
import DocumentIcon from '@/icons/DocumentIcon'
import GroupIcon from '@/icons/GroupIcon'
import { Container, Row, Col } from 'reactstrap'

export default function Page() {
    return (
        <Container fluid className='mt-4'>
            <h2>Dahsboard</h2>
            <hr />
            <Row className='g-4'>
                <Col lg={3}>
                    <DashboardItem title="Loan Applications" icon={<DocumentIcon/>}/>
                </Col>
                <Col lg={3}>
                    <DashboardItem title="Applicants/User" icon={<GroupIcon/>}/>
                </Col>
                <Col lg={3}>
                    <DashboardItem title="History" icon={<GroupIcon/>}/>
                </Col>
                <Col lg={3}>
                    <DashboardItem title="Bank Details" icon={<CartIcon/>}/>
                </Col>
            </Row>
            <DataTable/>
        </Container>
    )
}