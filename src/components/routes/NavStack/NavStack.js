import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import PostLogin from "../PostLogin";
import PreLogin from "../PreLogin";
import Login from "../../login";
import Signup from "../../registatration";

export const AuthContext = createContext();

const NavStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <PostLogin /> : <PreLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default NavStack;

// import { BrowserRouter } from "react-router-dom";
// import PreLogin from "../PreLogin";
// import PostLogin from "../PostLogin";
// import { createContext, useEffect, useState } from "react";

// export const LogContext=createContext()

// const NavStack=()=>{

//   const islogin=sessionStorage.getItem('user');
//   const [user,setuser]=useState(islogin)
//   useEffect(()=>{
//     setuser(sessionStorage.getItem('user'))
//   },[user])

//   const handlelogout=()=>{
//     sessionStorage.removeItem('user')
//     setuser(null)
//     window.location.reload()
//   }

//     return(
//         <>

//         <BrowserRouter>
//         {
//             user!==null ?
//             <PostLogin handlelogout={handlelogout}/>
//             :
//             <PreLogin/>
//         }

//         </BrowserRouter>

//         </>
//     )
// }
// export default NavStack;
