import ApplicantsDataTable from '../../../components/ApplicantsDataTable'
import { DashboardItem } from '../../../components/DahsboardItem'
import DocumentIcon from '../../../icons/DocumentIcon'
import { Container, Row, Col } from 'reactstrap'
import Swal from 'sweetalert2'

export default async function Page() {
    const res = await fetch('http://localhost:3001/user')
    const data = await res.json()

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