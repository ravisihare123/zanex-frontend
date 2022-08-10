import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import jwt_decode from "jwt-decode";
export const MyContext = createContext(null);

export function GetContext() {
  return useContext(MyContext);
}

export default function Context({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    async function fetchData() {
      var token = await localStorage.getItem("token");
      if (token) {
        const admin = jwt_decode(token);
        // alert(JSON.stringify(admin))
        
        setUserInfo({
          name: admin?.name,
          email: admin?.email,
          // adminid: admin?.admin
        });
        // setUserInfo(test)
        // alert(JSON.stringify(userInfo.name))
      }
    }
    fetchData();
  }, []);

    const values = useMemo(
      () => ({

        token,
        setToken,
        userInfo,
        setUserInfo,
       }),
      [token,userInfo]
  );
  // alert(JSON.stringify({ "conext": userInfo.name }));

  return (
    <MyContext.Provider
      value={values}
    >
      {children}
    </MyContext.Provider>
  );
}
