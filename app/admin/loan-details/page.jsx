'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getData, patchDataWtihAuth } from "../../../utils/axiosUtils";
import { Container, Row, Col, Button, Input } from 'reactstrap'
import Image from 'next/image'
import Swal from 'sweetalert2'
import {formatNumber} from "../../../utils/formatNumber"

const statusMap = {
    approve: 'Approved',
    reject: "Rejected",
    resubmit: 'Resubmit',
    pending: 'Pending',
    process: "Processing",
    paid: 'Paid'
}

export default function LoanDetils() {
    const searchParams = useSearchParams();
    const router = useRouter()
    const [data, setData] = useState({})
    const [comments, setComments] = useState("")

    function updateLoan(status) {
        Swal.fire({
            title: "Update Loan Status!",
            text: "Are you sure about this action?",
            icon: "warning",
            showCancelButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                patchDataWtihAuth('loan/' + searchParams.get('id'), { status, comments }).then(res => {
                    Swal.fire({
                        title: 'Loan',
                        text: 'Loan status updated successfully',
                        icon: 'success'
                    })
                    setData(res.data)
                }).catch(err => {
                    Swal.fire({
                        title: 'Loan',
                        text: 'Error on update loan',
                        icon: 'error'
                    })
                })
            }
        })
    }

    useEffect(() => {
        getData('/loan/' + searchParams.get('id')).then(res => {
            setData(res)
            setComments(res?.comments)
        })
    }, [searchParams.get('id')])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Container>
                <div className="d-flex justify-content-between my-4">
                    <h2>Loan Details</h2>
                    <Button onClick={() => router.push('/admin/dashboard')}>Dashboard</Button>
                </div>
                <Row className="justify-content-center">
                    <Col lg={6} sm={12}>
                        <h5 style={{ marginBottom: "20px", fontSize: "25px", color: "blue", fontWeight: "bold" }}>Status : {statusMap[data?.status]}</h5>
                        <h5>Applicant Name : {data?.firstName} {data?.lastName}</h5>
                        <h5>Amount : {data?.amountRequested}</h5>
                        <h5>Current Address : {data?.currentAddress}</h5>
                        <h5>Address Line2 : {data?.currentAddress2 ? data?.currentAddress2 : ""}</h5>
                        <h5>State: {data?.state}</h5>
                        <h5>City: {data?.city}</h5>
                        <h5>Zip Code: {data?.zipCode}</h5>
                        <h5>Cell Phone: {data?.cellPhone}</h5>
                        <h5>Email : {data?.email}</h5>
                        <h5>Driver&rsquo;s License/Id: {data?.driverLicense}</h5>
                        <h5>SSN: {data?.ssn}</h5>
                        <h5>Reference One</h5>
                        <div className="d-flex justify-content-center gap-3">
                            <p>First Name : {data?.referenceOneFirstName}</p>
                            <p>Last Name: {data?.referenceOneLastName}</p>
                            <p>Phone: {data?.referenceOnePhone}</p>
                        </div>
                        <h5>Reference Two</h5>
                        <div className="d-flex justify-content-center gap-3">
                            <p>First Name : {data?.referenceTwoFirstName}</p>
                            <p>Last Name: {data?.referenceTwoLastName}</p>
                            <p>Phone: {data?.referenceTwoPhone}</p>
                        </div>
                        <h5>Amount Request: {data?.amountRequested}</h5>
                        <h5>Amount Due: {formatNumber(data?.amountDue)}</h5>
                        <h5>Payment Method: {data?.paymentMethod === 'mobile' ? "Mobile Banking (enter email or phone)" : "Cash App (enter $cashtag or username)"}</h5>
                        <h5>Payment Method Details: {data?.paymentDetails}</h5>
                        <h5>Signature: {data?.signature}</h5>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col lg={12} sm={12} align="center">
                        <hr />
                        <Row className="mt-4">
                            <Col lg={6} sm={12}>
                                <h5>Driver License Image</h5>
                                <Image alt="Driver License Image" src={data?.driverLicenseImage || ""} width={300} height={200} />
                            </Col>
                            <Col lg={6} sm={12}>
                                <h5>Check Front</h5>
                                <Image alt="Check Front" src={data?.checkFront || ""} width={300} height={200} />
                            </Col>
                            <Col lg={6} sm={12}>
                                <h5>Check Back</h5>
                                <Image alt="Check Back" src={data?.checkBack || ""} width={300} height={200} />
                            </Col>
                            <Col lg={6} sm={12}>
                                <h5>Pay Stubs</h5>
                                <Image alt="Pay Stubs" src={data?.paystubs || ""} height={200} width={300} />
                            </Col>
                        </Row>
                        <Input
                            className="mt-4"
                            placeholder="Add Comments"
                            id="exampleText"
                            name="text"
                            type="textarea"
                            onChange={(e)=>setComments(e.target.value)}
                            value={comments}
                        />
                        <div className="my-4">
                            <Button onClick={() => updateLoan('approve')} style={{ marginRight: "10px" }} color="primary">Approve</Button>
                            <Button onClick={() => updateLoan('reject')} style={{ marginRight: "10px" }} color="danger">Reject</Button>
                            <Button onClick={() => updateLoan('resubmit')} style={{ marginRight: "10px" }} color="info">Request Resubmit</Button>
                            <Button
                                color="warning"
                                outline
                                onClick={() => updateLoan('paid')}
                                style={{
                                    color: "green",
                                    fontWeight: "bold",
                                    padding: "6px 30px"
                                }}
                            >
                                Paid
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Suspense>
    )
}