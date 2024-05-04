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
        <div style={{display:'flex', justifyContent: 'center', marginBottom: "20px"}}>
            <p style={{cursor: "pointer", marginRight: '10px'}}>Contact Us</p>
            <p>|</p>
            <p onClick={()=>router.push('/zimba-cash/terms-conditions')} style={{marginLeft: '10px', cursor: "pointer"}}>Terms and Conditions</p>
        </div>
    ) : ""
}