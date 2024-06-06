'use client'

import { Table } from 'reactstrap'
import { useRouter } from 'next/navigation'
import { convertUTCToCST } from '../utils/dateTime'
import ViewText from '../components/ViewText'
import { formatNumber } from '../utils/formatNumber'

const statusMap = {
    approve: 'Approved',
    reject: "Rejected",
    resubmit: 'Resubmit',
    process:'Processing',
    pending: 'Pending',
    paid: 'Paid'
}

export default function DataTable({ data }) {
    const router = useRouter()
    const createQueryString = (name, value) => {
        const params = new URLSearchParams();
        params.set(name, value);
        return params.toString();
    };
    
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
                        Late Fee
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
                        <tr key={d._id} style={{cursor: "pointer"}} onClick={()=>router.push('/admin/loan-details'+ "?" + createQueryString('id',d._id))}>
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
                                {"$"+d.amountRequested}
                            </td>
                            <td>
                                {"$"+formatNumber(d.amountRequested)}
                            </td>
                            <td>
                                {"$"+(formatNumber(d.lateFee))}
                            </td>
                            <td>
                                {"$"+(formatNumber(d.amountDue))}
                            </td>
                            <td>
                                <ViewText text={d?.comments}/>
                            </td>
                            <td>
                                {statusMap[d.status]}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}