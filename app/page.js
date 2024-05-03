import Hero from "../components/Hero";
import LockIcon from "../icons/LockIcon";
import { Row, Col, Container } from 'reactstrap'
import './page.module.css'
import Content from "../components/Content";
import { RightIcon } from "../icons/RightIcon";
import { CardIcon } from "../icons/CardIcon";
import Image from 'next/image'
import mailLogo from '../public/l-5-t.png'

export default function Home() {

  return (
    <main>
      <div className="main">
        <Image className="m-4" style={{cursor: 'pointer'}} src={mailLogo} width={200}/>
        <Hero />
      </div>
      <Container>
        <Row style={{marginTop: "100px", marginBottom: "100px"}}>
          <h1 style={{textAlign: "center", marginBottom: "100px"}}>How <span style={{textDecoration:"underline"}}>We</span> Work</h1>
          <Col md={6} sm={12} lg={4} content="center">
            <Content
              url="/authentication/registration"
              icon={<LockIcon />} 
              title="SIGN UP" 
              body="Create a quick account. Joining ZimbaCash couldn't be more simple, just enter your email and password." 
            />
          </Col>
          <Col md={6} sm={12} lg={4} content="center">
            <Content
              url="/zimba-cash/loan"
              icon={<RightIcon />}
              title="SUBMIT APPLICATION"
              body="Complete a simple, secure 3 to 5 min online application, no paperwork or phone calls - and get a decision on minutes."
            />
          </Col>
          <Col md={6} sm={12} lg={4} content="center">
            <Content
              url="/authentication/login"
              icon={<CardIcon />}
              title="GET YOUR MONEY"
              body="Receive your money within minutes. We offer a number of different payment options to suit all clients."
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
