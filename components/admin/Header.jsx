'use client'

import Image from 'next/image'
import React from 'react'
import { Button } from 'reactstrap'
import { logoutAction } from '../../app/action'
import { removeItem } from '../../utils/storageUtils'

const Header = () => {
    const logOutHandler = async () => {
        await logoutAction()
        window.location = '/';
        removeItem('user')
        removeItem('token')
    }
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex gap-4 align-items-center'>
                <Image src={'/L-5.jpg'} width={200} alt='logo' height={40} />
                <Button onClick={() => router.push('/admin-loan')}>Create Loan</Button>
            </div>
            <h2>Dashboard</h2>
            <Button onClick={logOutHandler}>Logout</Button>
        </div>
    )
}

export default Header