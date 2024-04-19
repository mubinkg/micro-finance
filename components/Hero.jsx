'use client'

import {Button} from 'reactstrap'

export default function Hero() {
    return (
        <div className="container" style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", alignContent: "center", marginTop: "200px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <h2 style={{textAlign: "justify"}}>Because Life Happens</h2>
                <p style={{textAlign:"justify"}}>Emergency cash sent to you within 5 minutes of approval.</p>
                <Button style={{
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