export default function HistoryItem() {
    return (
        <>
            <div className="d-flex justify-content-between mt-5">
                <div>
                    <div className="d-flex gap-4">
                        <p>Dec 31, 2021</p>
                        <p>SSN is fraudulent</p>
                    </div>
                    <p style={{color: "#62d0ab"}}>Pay by 01-01-2021</p>
                </div>
                <div>
                    <div className="d-flex gap-5">
                        <p>$13</p>
                        <p>Rejected</p>
                    </div>
                    <p style={{color: "#62d0ab"}}>Amount due: $13.89</p>
                </div>
            </div>
            <hr />
        </>
    )
}