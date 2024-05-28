const { useEffect } = require("react");
const { useState } = require("react");
import {getDataWtihAuth} from '../utils/axiosUtils'
import { totalLoanUrl } from '../utils/urls';

export function useTotalApprovedLoan(){
    const [totalApprovedLoan, setTotalApprovedLoan] = useState(0)

    function getTotalApprovedLoan(){
        getDataWtihAuth(totalLoanUrl).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getTotalApprovedLoan()
    },[])

    return {totalApprovedLoan}
}