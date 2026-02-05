import { useState } from 'react'
import Admins from '../components/HightLight'
import Navbar from '../components/Navbar'
import LeaveTables from '../components/Table'
import EmployeeDetail from '../components/EmployeeDetail';

export default function AdminsD(){

   
    return (
        <>
    <Navbar/>
    <Admins/>
    <LeaveTables  />
    </>
    )
}