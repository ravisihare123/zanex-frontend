import React, { createContext, useContext,useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
const MyContext = createContext(null);

export function GetContext() {
  return useContext(MyContext);
}

export default function Context({ children }) {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState({
        email: null,
        password:null
    })

    useEffect(() => {
        function fetchData() {
            var token = localStorage.getItem("token");
            if (token) {
                const admin = jwtDecode(token);
                setUserInfo({
                    email: admin?.email,
                    password: admin?.password
                });
            }
      }
        fetchData();
     
    }, [])
    
 

    const values = useMemo(
      () => ({
        email,
        setEmail,
        password,
        setPassword,
        token,
        setToken,
        userInfo,
        setUserInfo
      }),
      [email, password,token, userInfo]
    );
    
  return (
    <MyContext.Provider
      value={{values}}
    >
      {children}
    </MyContext.Provider>
  );
}
