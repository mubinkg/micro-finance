'use client'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../public/L-5.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

function AppNav() {
  const router = useRouter()

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home" onClick={()=>router.push('/')}>
          <Image src={logo} width={100}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link href="#home">History</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
            <Nav.Link href="#link">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default AppNav;