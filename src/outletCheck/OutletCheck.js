import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function OutletCheck() {
    // const [time, setTime] =useState(true)
    // setTimeout(() => {
    //     setTime(false)
    // },10000);
    var token = localStorage.getItem("token")
    // alert(JSON.stringify(token))
  return (
    <div>
        {token==null?<Navigate to={`${process.env.PUBLIC_URL}/custompages/login`}/>:<Outlet/>}
    </div>
  )
}
