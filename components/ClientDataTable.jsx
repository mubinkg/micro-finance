'use client'

import { Table, Button } from 'reactstrap'
import { useRouter } from 'next/navigation'
import { convertUTCToCST } from '../utils/dateTime'
import ViewText from './ViewText'
import Swal from 'sweetalert2'
import { postDataWithAuth } from '../utils/axiosUtils'
import { formatNumber } from '../utils/formatNumber'


const statusMap = {
    approve: 'Approved',
    reject: "Rejected",
    resubmit: 'Resubmit',
    pending: 'Pending',
    process: "Processing",
    paid: 'Paid'
}

export default function ClientDataTable({ data , getLoanData}) {

    const router = useRouter()
    const createQueryString = (name, value) => {
        const params = new URLSearchParams();
        params.set(name, value);
        return params.toString();
    };

    function onlyInterestPay({ loanId, amount, lateFee }) {
        Swal.fire({
            title: "Pay Interest + Late Fees!",
            text: `You are paying $${lateFee} late fees and $${amount} interest. Your loan principal will roll over 14 more days`,
            icon: "warning",
            confirmButtonText: "Yes",
            showCancelButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                postDataWithAuth('/payments', {
                    "loanId": loanId,
                    "amount": amount + lateFee,
                    "paymentType": "interestPay"
                }).then(() => {
                    Swal.fire({
                        title: "Pay Interest + Late Fees!",
                        text: "Once payment is verified, loan status will update to PAID. Thank you!",
                        icon: "success",
                        confirmButtonText: "Yes",
                    });
                    getLoanData()
                }).catch(err => {
                    Swal.fire({
                        title: "Pay Interest + Late Fees!",
                        text: `At this time you are not able to pay this loan. Only loans in "Approved" status can be paid.`,
                        icon: "warning",
                        confirmButtonText: "Yes",
                    })
                })
            }
        })
    }
    function totalAmountPay({ loanId, amount }) {
        Swal.fire({
            title: "Pay Total Amount!",
            text: "You are paying the total balance. Thank you!",
            icon: "warning",
            confirmButtonText: "Yes",
            showCancelButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                postDataWithAuth('/payments', {
                    "loanId": loanId,
                    "amount": amount,
                    "paymentType": "loanPay"
                }).then(() => {
                    Swal.fire({
                        title: "Pay Total Amount!",
                        text: "Once payment is verified, loan status will update to PAID. Thank you!",
                        icon: "success",
                        confirmButtonText: "Yes",
                    });
                    getLoanData()
                }).catch(err => {
                    Swal.fire({
                        title: "Pay Total Amount!",
                        text: `At this time you are not able to pay this loan. Only loans in "Approved" status can be paid.`,
                        icon: "warning",
                        confirmButtonText: "Yes",
                    })
                })
            }
        })
    }

    return (
        <Table hover className='mt-4'>
            <thead>
                <tr>
                    <th>
                        Date
                    </th>
                    <th>
                        Due Date
                    </th>
                    <th>
                        Loan Number
                    </th>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        SSN
                    </th>
                    <th>
                        Amount
                    </th>
                    <th>
                        Interest Due
                    </th>
                    <th>
                        Total Due
                    </th>
                    <th>
                        Comments
                    </th>
                    <th>
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((d) => (
                        <tr key={d._id}>
                            <td>
                                {convertUTCToCST(d.createdAt)}
                            </td>
                            <td>
                                {d.amountDueDate}
                            </td>
                            <td>
                                {d?.loanNumber}
                            </td>
                            <td>
                                {d.firstName}
                            </td>
                            <td>
                                {d.lastName}
                            </td>
                            <td>
                                {d.ssn}
                            </td>
                            <td>
                                {"$"+(formatNumber(d.amountRequested))}
                            </td>
                            <td>
                                {
                                    <Button 
                                        onClick={() => onlyInterestPay({ loanId: d._id, amount: d.intersetDue, lateFee: d.lateFee })} 
                                        color={d?.isIntersetPays ? "success" : "primary"}
                                    >
                                            {"$"+(formatNumber(d.intersetDue + d.lateFee))} PAY
                                    </Button>
                                }
                            </td>
                            <td>
                                {
                                    <Button
                                        onClick={() => totalAmountPay({ loanId: d._id, amount: d.totalDue })}
                                        color={d?.isLoanPays ? "success" : "primary"}
                                    >
                                        {"$"+(formatNumber(d.totalDue))} PAY
                                    </Button>
                                }
                            </td>
                            <td>
                                <ViewText text={d?.comments} />
                            </td>
                            <td>
                                {d.status === 'resubmit' ? <Button onClick={() => router.push('/zimba-cash/resubmit' + "?" + createQueryString('id', d._id))} color='primary'>{statusMap[d.status]}</Button> : statusMap[d.status]}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}