import AppNav from "../../../components/Navbar";
import DataTable from '../../../components/DataTable'
import { Container } from "reactstrap";

export default function Page(){
    return (
        <Container>
            <AppNav />
            <div style={{
                
            }}>
                <DataTable data={[]}/> 
            </div>
        </Container>
    )
}