// import { createContext } from "react";


// const AuthContext=createContext();

// export default AuthContext;
import React, { useState ,useEffect} from "react";
//  import { useContext } from 'react';
// import AuthContext from './AuthContext';

// //  export const useAuth = () => {
// //   return useContext(AuthContext);
// // };



const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  Login: (token) => {},
  Logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, settoken] = useState("");
  const [email, setEmail] = useState("");

  const userIsLoggedIn = !!token;

  useEffect(() => {

    const initialToken = localStorage.getItem("token");
    const initialEmail = localStorage.getItem("email");

   if (initialToken && initialEmail){
    settoken(initialToken)
    setEmail(initialEmail)
   }
  }, []);

  const loginHandler = (token, email) => {
    settoken(token);
    setEmail(email);
    
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    settoken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    Login: loginHandler,
    Logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;