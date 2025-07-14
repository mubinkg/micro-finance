import { Container } from 'reactstrap';
import Header from '../../components/admin/Header'

export default function RootLayout({ children }) {
    return (
        <Container fluid className='mt-4'>
            <Header />
            {children}
        </Container>
    );
}
