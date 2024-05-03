'use client'

import RightArrow from "../icons/Arrow";
import { useRouter } from "next/navigation"


export function DashboardItem({icon, title, url, count}) {
    const router = useRouter()
    return (
        <div  onClick={()=>router.push(url)} style={{ border: "2px solid #45148f", cursor:"pointer" }}>
            <div style={{ backgroundColor: "#45148f", display: "flex", justifyContent: "space-between", alignItems: "center" }} className='p-3'>
                {icon}
                <div>
                    <h3 className='mb-4' style={{ color: "white", fontWeight: "bold", textAlign: "end" }}>{count}</h3>
                    <p style={{ color: "white" }}>{title}</p>
                </div>
            </div>
            <div style={{ display: "flex", padding: "10px", justifyContent: "space-between", alignItems: "center" }}>
                <h5 style={{ fontWeight: "bolder" }}>View More</h5>
                <RightArrow/>
            </div>
        </div>
    )
}