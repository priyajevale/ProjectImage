import React, { useState } from 'react'
import AuthContext from './AuthContext';

const AuthProvider = (props) => {

    const[isLogin,setIsLogin]=useState(false);
    const [inputEmail, setInputEmail] = useState("");

    const initialToken=localStorage.getItem("token");
    const [token,setToken]=useState(initialToken);

    const loginHandler=(token)=>{
      setToken(token);
      setIsLogin(true);
      localStorage.setItem("token",token);
    }



  return (
    <AuthContext.Provider value={{setIsLogin,isLogin,token,loginHandler,inputEmail, setInputEmail}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider


// import React, { useState } from 'react';
// import AuthContext from './AuthContext';

// const AuthProvider = (props) => {
//     const [isLogin, setIsLogin] = useState(false);
//     const [token, setToken] = useState("");
//     const [inputEmail, setInputEmail] = useState("");

//     const loginHandler = (token) => {
//       setToken(token);
//       setIsLogin(true);
//       localStorage.setItem("token", token);
//     }

//     return (
//       <AuthContext.Provider value={{ isLogin, token, loginHandler, inputEmail, setInputEmail }}>
//           {props.children}
//       </AuthContext.Provider>
//     );
// }

// export default AuthProvider;