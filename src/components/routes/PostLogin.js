import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../HomePage";
import { useContext } from "react";
import { AuthContext } from "./NavStack/NavStack";
import Error from "../Errorpage";

const PostLogin = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default PostLogin;





// import HomePage from "../HomePage";
// import ProductPage from "../ProductPage";
// import Error from "../Errorpage";

// const PostLogin=()=>{
//     return(
//         <>
//         <Routes>
//          <Route path='/' Component={HomePage}></Route> 
//          <Route path="/product/:id" Component={ProductPage}></Route>
//          <Route path="*" Component={Error}></Route>
//         </Routes>
//         </>
//     )
// }
// export default PostLogin;