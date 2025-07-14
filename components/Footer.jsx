'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Footer() {
    const [isClient, setIsClient] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsClient(true)
    }, [])
    return isClient ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "20px" }}>
            <p onClick={() => router.push('/contact')} style={{ cursor: "pointer", marginRight: '10px' }}>Contact Us</p>
            <p>|</p>
            <p onClick={() => router.push('/terms-conditions')} style={{ marginLeft: '10px', cursor: "pointer", marginRight: '10px' }}>Terms and Conditions</p>
            <p>|</p>
            <p onClick={() => router.push('/sms-policy')} style={{ marginLeft: '10px', cursor: "pointer", marginRight: '10px' }}>SMS Policy</p>
            <p>|</p>
            <p onClick={() => router.push('/privacy-policy')} style={{ marginLeft: '10px', cursor: "pointer" }}>Privacy Policy</p>
        </div>
    ) : ""
}