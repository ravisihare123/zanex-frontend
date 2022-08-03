import React, { createContext, useContext,useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
const MyContext = createContext(null);

export function GetContext() {
  return useContext(MyContext);
}

export default function Context({ children }) {
 
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState({
      name: null,
      email:null
    })

    useEffect(() => {
        async function fetchData() {
            var token = await localStorage.getItem("token");
            if (token) {
              const admin = jwtDecode(token);
              // alert(JSON.stringify(admin))
              // var test = {
              //   name: admin?.name,
              //   email:admin?.email
              // };
              setUserInfo({
                name: admin?.name,
                email: admin?.email,
              });
              // setUserInfo(test)
              // alert(JSON.stringify(userInfo.name))
            }
      }
        fetchData();
     
    }, [])
    
 

    // const values = useMemo(
    //   () => ({
        
    //     token,
    //     setToken,
    //     userInfo,
    //     setUserInfo,
    //    }),
    //   [token,userInfo]
  // );
  alert(JSON.stringify({"conext":userInfo.name}))
    
  return (
    <MyContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
      {children}
    </MyContext.Provider>
  );
}
