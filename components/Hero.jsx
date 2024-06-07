'use client'

import {Button} from 'reactstrap';
import {useRouter} from 'next/navigation'

export default function Hero() {
    const router = useRouter()
    return (
        <div className="container" style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", alignContent: "center", marginTop: "200px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <h2 style={{textAlign: "justify", color:"purple",borderRadius:"30px", backgroundColor:"white", padding:"5px 40px 5px 40px"}}>Because Life Happens</h2>
                <p style={{textAlign:"center", color:"purple",borderRadius:"20px", backgroundColor:"white", padding:"5px 20px 5px 20px"}}>Emergency cash sent to you within 5 minutes of approval</p>
                <Button 
                    onClick={()=>router.push('/zimba-cash/loan')}
                    style={{
                    background: "#62d0ab",
                    textTransform: "uppercase",
                    padding: "10px 50px",
                    outline: "none",
                    border: "none",
                    borderRadius: "50px"
                }}>Get Started</Button>
            </div>
        </div>
    )
}