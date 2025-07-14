'use client'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../public/L-5.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { removeItem } from '../utils/storageUtils';
import { logoutAction } from '../app/action'

function AppNav({ hideSideNav }) {
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
  const routerHandler = (path) => {
    router.push(path)
  }

  const logOutHandler = async () => {
    await logoutAction()
    window.location = '/';
    removeItem('user')
    removeItem('token')
  }

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand onClick={() => routerHandler('/')} style={{ cursor: "pointer" }}>
          <Image src={logo} width={100} />
        </Navbar.Brand>
        {
          !hideSideNav ? (<>        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end" style={{ width: "100%" }}>
                {
                  isAuth ? (
                    <>
                      <Nav.Link onClick={() => routerHandler('/history')}>Loans List</Nav.Link>
                      <Nav.Link onClick={() => routerHandler('/loan')}>Loan</Nav.Link>
                      <Nav.Link onClick={() => routerHandler('/profile')}>Profile</Nav.Link>
                      <Nav.Link onClick={() => routerHandler('/contact')}>Contact</Nav.Link>
                      <Nav.Link onClick={logOutHandler}>Logout</Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link onClick={() => routerHandler('/contact')} >Contact</Nav.Link>
                      <Nav.Link onClick={() => routerHandler('/login')}>Login</Nav.Link>
                      <Nav.Link onClick={() => routerHandler('/registration')}>Register</Nav.Link>
                    </>
                  )
                }
              </Nav>
            </Navbar.Collapse></>) : ""
        }
      </Container>
    </Navbar>
  );
}

export default AppNav;