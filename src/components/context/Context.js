import React, {
  createContext,
  useCallback,
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
  const [isLoading , setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    userName: null,
    uid: null,
  });

  useEffect(() => {
    async function fetchData() {
      var token = await localStorage.getItem("token");
      if (token) {
        const admin = jwt_decode(token);
        // alert(JSON.stringify(admin))
        
        setUserInfo({
          userName: admin?.name,
          uid: admin.id,
        });
        // setUserInfo(test)
        // alert(JSON.stringify(userInfo.name))
      }
    }
    fetchData();
  }, []);

  const handleLoading = useCallback(
    (state) => {
      setIsLoading(state)
    },[isLoading]
  )

    const values = useMemo(
      () => ({
        isLoading,
        setIsLoading,
        token,
        setToken,
        userInfo,
        setUserInfo,
       }),
      [token,userInfo,isLoading]
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
