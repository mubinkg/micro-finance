import AppNav from '@/components/Navbar'
import CreateLoan from '../../../components/CreateLoan'

export default function page() {
    return (
        <div style={{ marginBottom: "200px" }}>
            <AppNav />
            <CreateLoan />
        </div>
    )
}