import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Authlayout = ({children,Authentication}) => {

    const navigate=useNavigate();
    const[loading,setloading]=useState(true);
const authstatus = useSelector((state) => state.Auth.status);

   useEffect(() => {
    if (Authentication && authstatus !== true) {
        navigate('/login');
    } else if (!Authentication && authstatus === true) {
        navigate('/');
    }
    setloading(false);
}, [authstatus, navigate, Authentication]);

return loading ? <h1>Loading</h1> : <>{children}</>;
}

export default Authlayout
