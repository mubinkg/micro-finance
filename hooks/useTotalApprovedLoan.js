const { useEffect } = require("react");
const { useState } = require("react");
import Swal from 'sweetalert2';
import {getDataWtihAuth} from '../utils/axiosUtils'
import { totalLoanUrl } from '../utils/urls';

export function useTotalApprovedLoan(){
    const [totalApprovedLoan, setTotalApprovedLoan] = useState(0)

    function getTotalApprovedLoan(){
        getDataWtihAuth(totalLoanUrl).then(res=>{
            setTotalApprovedLoan(res.data)
        }).catch(err=>{
            // console.log("err",err)
            // Swal.fire({
            //     title: 'Request Loan',
            //     text: `${err.message}`,
            //     icon: 'error'
            // })
        })
    }

    useEffect(()=>{
        getTotalApprovedLoan()
    },[])

    return {totalApprovedLoan}
}