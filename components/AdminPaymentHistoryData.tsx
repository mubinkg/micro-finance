'use client'

import { Table } from 'reactstrap'
import { useRouter } from 'next/navigation'
import { convertUTCToCST } from '../utils/dateTime'


export default function AdminPaymentHistoryData({ data }) {
    const router = useRouter()
 
    
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
                        Loan Amount
                    </th>
                    <th>
                        Interest Due Amount
                    </th>
                    <th>
                        Total Due Amount
                    </th>
                    <th>
                        Date Paid
                    </th>
                    <th>
                        Amount Paid
                    </th>
                    <th>
                       Date Paid Balance
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((d) => (
                        <tr key={d._id} >
                            <td>
                            {convertUTCToCST(d.loan.createdAt)}
                            </td>
                            <td>
                                {d.loan.amountDueDate}
                            </td>
                            <td>
                                {d.loan.loanNumber}
                            </td>
                            <td>
                                {d.user.firstName}
                            </td>
                            <td>
                                {d.user.lastName}
                            </td>
                            <td>
                                {d.loan.amountRequested}
                            </td>
                            <td>
                                {d.loan.amountDue-d.loan.amountRequested}
                            </td>
                            <td>
                                {d.loan.amountDue}
                            </td>
                            <td>
                                {convertUTCToCST(d.createdAt)}
                            </td>
                            <td>
                                {d.paidAmount}
                            </td>
                            <td>
                                {d.loan.amountDue-d.paidAmount}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}