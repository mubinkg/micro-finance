'use client'

import { useRouter } from "next/navigation";


export default function Content({icon, title, body, url}) {
    const router = useRouter()
    return (
        <div onClick={()=>router.push(url || "#")} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0px 40px 0px 40px", cursor: "pointer" }}>
            {icon}
            <h4 className="mt-4">{title}</h4>
            <p className="mt-3" style={{ textAlign: 'justify' }}>{body}</p>
        </div>
    )
}