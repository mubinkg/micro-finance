'use client'

import { Table } from 'reactstrap'

export default function ClientDataTable({ data }) {

    
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
                        <tr key={d._id}>
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
                                {d.status}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}