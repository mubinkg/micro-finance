'use client'

import AppNav from "../../../components/Navbar";
import ClientDataTable from '../../../components/ClientDataTable'
import { Container } from "reactstrap";
import { useEffect, useState } from "react";
import { getDataWtihAuth } from "../../../utils/axiosUtils";

export default function Page(){
    const [data, setData] = useState([])
    useEffect(()=>{
        getDataWtihAuth('/loan/user-loan').then((res)=>{
            setData(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }, [])
    return (
        <Container style={{
            minHeight: "90vh"
        }}>
            <AppNav hideSideNav={false}/>
            <div style={{
                
            }}>
                <ClientDataTable data={data}/> 
            </div>
        </Container>
    )
}