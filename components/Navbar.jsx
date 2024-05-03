'use client'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../public/L-5.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getData } from '../utils/axiosUtils';
import { removeItem } from '../utils/storageUtils';

function AppNav() {
  const [isAuth, setAuth] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("user");
      if (storage) {
        const products = JSON.parse(storage);
        setAuth(products ? true : false)
      }
    }
  }, []);

  const router = useRouter()
  const routerHandler = (path)=>{
    router.push(path)
  }

  const logOutHandler = ()=>{
    getData('http://localhost:3000/api/logout')
    router.push('/')
    removeItem('user')
  }

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home" onClick={() => routerHandler('/')}>
          <Image src={logo} width={100} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            {
              isAuth ? (
                <>
                  <Nav.Link href="#home">History</Nav.Link>
                  <Nav.Link href="#link">Contact</Nav.Link>
                  <Nav.Link href="#link" onClick={logOutHandler}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="#home">Contact</Nav.Link>
                  <Nav.Link href="#link" onClick={()=>routerHandler('/authentication/login')}>Login</Nav.Link>
                  <Nav.Link href="#link" onClick={()=>routerHandler('/authentication/registration')}>Register</Nav.Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNav;