'use client'

import { Table,Button } from 'reactstrap'
import { useRouter } from 'next/navigation'
import { convertUTCToCST } from '../utils/dateTime'
import ViewText from './ViewText'
import Swal from 'sweetalert2'
import { postDataWithAuth } from '../utils/axiosUtils'


const statusMap = {
    approve: 'Approved',
    reject: "Rejected",
    resubmit: 'Resubmit',
    pending: 'Pending',
    paid: 'Paid'
}

export default function ClientDataTable({ data }) {

    const router = useRouter()
    const createQueryString = (name, value) => {
        const params = new URLSearchParams();
        params.set(name, value);
        return params.toString();
    };

    function onlyInterestPay({loanId, amount}) {
        Swal.fire({
            title: "Only Interest Pay!",
            text: "You are paying Interest only. Your loan principal will roll over 14 more days",
            icon: "warning",
            confirmButtonText:"Yes",
            showCancelButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                postDataWithAuth('/payments', {
                    "loanId":loanId,
                    "amount": amount,
                    "paymentType": "interestPay"
                }).then(()=>{
                    
                }).catch(err=>{
                    console.log(err)
                })
            }
        })
    }
    function totalAmountPay(status) {
        Swal.fire({
            title: "Total Amount Pay!",
            text: "You are paying theTotal balance. Thank you!",
            icon: "warning",
            confirmButtonText:"Yes",
            showCancelButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                postDataWithAuth('/payments', {
                    "loanId":loanId,
                    "amount": amount,
                    "paymentType": "loanPay"
                }).then(()=>{
                    
                }).catch(err=>{
                    console.log(err)
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
                                {d.amountRequested}
                            </td>
                            <td>
                                {<Button onClick={()=>onlyInterestPay({loanId:d._id, amount:d.intersetDue})} color='primary'>{d.intersetDue}</Button>}
                            </td>
                            <td>
                                {<Button onClick={()=>totalAmountPay({loanId:d._id, amount:d.totalDue})} color='primary'>{d.totalDue}</Button>}
                            </td>
                            <td>
                                <ViewText text={d?.comments}/>
                            </td>
                            <td>
                                {d.status === 'resubmit'?<Button onClick={()=>router.push('/zimba-cash/resubmit'+ "?" + createQueryString('id',d._id))} color='primary'>{statusMap[d.status]}</Button>:statusMap[d.status]}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}