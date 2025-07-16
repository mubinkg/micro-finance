import Hero from "../components/Hero";
import LockIcon from "../icons/LockIcon";
import { Row, Col, Container } from 'reactstrap'
import './page.module.css'
import Content from "../components/Content";
import { RightIcon } from "../icons/RightIcon";
import { CardIcon } from "../icons/CardIcon";
import Image from 'next/image'
import mailLogo from '../public/l-5-t.png'

export default async function Home() {

  return (
    <main>
      <div className="main">
        <Image className="m-4" style={{ cursor: 'pointer' }} src={mailLogo} width={200} />
        <Hero />
      </div>
      <Container>
        <Row style={{ marginTop: "100px", marginBottom: "100px" }}>
          <h1 style={{ textAlign: "center", marginBottom: "100px" }}>How <span style={{ textDecoration: "underline" }}>We</span> Work</h1>
          <Col md={6} sm={12} lg={4} content="center">
            <Content
              url="/registration"
              icon={<LockIcon />}
              title="SIGN UP"
              body="Create a quick account. Joining ZimbaCash couldn't be more simple, just enter
              your name and email. We value your security."
            />
          </Col>
          <Col md={6} sm={12} lg={4} content="center">
            <Content
              url="/loan"
              icon={<RightIcon />}
              title="SUBMIT APPLICATION"
              body="Complete a simple yet secure 3 to 5 minutes online application. No paperwork
              or phone calls - and get a decision in minutes."
            />
          </Col>
          <Col md={6} sm={12} lg={4} content="center">
            <Content
              url="/login"
              icon={<CardIcon />}
              title="GET YOUR MONEY"
              body="Receive your money within minutes. We offer different payment options to suit
              diverse customers."
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} sm={12}>
            <img src='sidebar.jpg' style={{ width: "100%" }} />
          </Col>
          <Col lg={6} sm={12}>
            <div style={{ margin: "40px" }}>
              <h3 className="mt-4" style={{ color: "purple" }}>
                How are We different?
              </h3>
              <p style={{ textAlign: "justify" }}>
                ZimbaCash was created on the premise “Life happens”. Why
                should a single mother or anyone spend the night without
                electricity all because of a past due electric bill? We all can use
                some help at some point. We provide access to emergency cash
                when someone needs to cover small expenses.
                Our installment loans range from $100 – $2,000 depending on
                qualification.
              </p>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "80px", marginBottom: "80px" }}>
          <Col lg={6} sm={12}>
            <div style={{ margin: "40px" }}>
              <h3 style={{ color: "purple" }} className="mt-4 mb-3">
                Find yourself in a bind? Get the cash you need fast!
              </h3>
              <h5 className="mb-2">ZimbaCash can help with emergency expenses such as:</h5>
              <ul>
                <li>
                  Water Bill
                </li>
                <li>
                  Phone Bill
                </li>
                <li>Electric Bill</li>
                <li>Internet Bill</li>
                <li>Car expenses</li>
                <li>Medical expenses</li>
              </ul>
            </div>
          </Col>
          <Col lg={6} sm={12}>
            <img src='sidebar1.jpg' style={{ width: "100%" }} />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
