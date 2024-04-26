
'use client'

import { Table } from 'reactstrap'
import {getDateTime} from '../utils/dateTime'

export default function ApplicantsDataTable({ data }) {
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
                        Email
                    </th>
                    <th>
                        Last Active Date
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data?.length ? data.map(d => (
                        <tr key={d?._id}>
                            <td>
                                {getDateTime(d?.createdAt?.toString())}
                            </td>
                            <td>
                                {d?.firstName}
                            </td>
                            <td>
                                {d?.lastName}
                            </td>
                            <td>
                                {d?.email}
                            </td>
                            <td>
                                {getDateTime(d?.updatedAt?.toString())}
                            </td>
                        </tr>
                    )):""
                }
            </tbody>
            {
                data?"": <p>No Data Found.</p>
            }
        </Table>
    )
}