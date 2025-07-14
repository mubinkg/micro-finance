'use client'

import Image from 'next/image'
import React from 'react'
import { Button } from 'reactstrap'
import { logoutAction } from '../../app/action'
import { removeItem } from '../../utils/storageUtils'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()
    const logOutHandler = async () => {
        await logoutAction()
        window.location = '/';
        removeItem('user')
        removeItem('token')
    }
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex gap-4 align-self-center'>
                <Image src={'/L-5.jpg'} width={200} alt='logo' height={40} />
                <h2>Admin Panel</h2>
            </div>
            <div className='d-flex gap-4'>
                <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
                <Button onClick={() => router.push('/admin-loan')}>Create Loan</Button>
                <Button onClick={logOutHandler}>Logout</Button>
            </div>
        </div>
    )
}

export default Header