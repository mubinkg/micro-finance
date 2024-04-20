import ApplicantsDataTable from '@/components/ApplicantsDataTable'
import { DashboardItem } from '@/components/DahsboardItem'
import HistoryItem from '@/components/HistoryItem'
import DocumentIcon from '@/icons/DocumentIcon'
import { Container, Row, Col } from 'reactstrap'

export default function Page() {
    return (
        <Container fluid className='mt-4'>
            <h2>History</h2>
            <hr />
            <Row className='g-4'>
                <Col lg={3}>
                    <DashboardItem title="History" icon={<DocumentIcon/>}/>
                </Col>
            </Row>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
        </Container>
    )
}