'use client'

import { Table } from 'reactstrap'
import { useRouter } from 'next/navigation'

const statusMap = {
    approve: 'Approved',
    reject: "Rejected",
    resubmit: 'Resubmit',
    pending: 'Pending'
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
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((d) => (
                        <tr key={d._id} style={{cursor: "pointer"}} onClick={()=>router.push('/admin/loan-details'+ "?" + createQueryString('id',d._id))}>
                            <td>
                            {d.createdAt}
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
                                {statusMap[d.status]}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}