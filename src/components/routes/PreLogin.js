import { Route, Routes } from "react-router-dom"
import Login from "../login";
import Signup from "../registatration";
import Error from "../Errorpage";


const PreLogin=()=>{
    return(
        <>
        <Routes>
         <Route path="/" Component={Login}></Route>
         <Route path="/login" Component={Login}></Route>
         <Route path="/signup" Component={Signup}></Route>
         <Route path="*" Component={Error}></Route>
        </Routes>
        </>
    )
}
export default PreLogin;