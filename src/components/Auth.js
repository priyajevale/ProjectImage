// import React, { useContext, useEffect, useState } from "react";
// import AuthContext from "./AuthContext";
// import { useNavigate } from "react-router-dom";

// const Auth = () => {

//   let { setIsLogin, loginHandler, inputEmail, setInputEmail } = useContext(AuthContext)

//   const [inputPass, setInputPass] = useState("");
//   const [btn, setBtn] = useState({});
//   const navigate = useNavigate();

//   function handleAuth(e) {
//     e.preventDefault();
//     setBtn({ inputEmail, inputPass })
//   }

//   useEffect(() => {
//     if (Object.keys(btn).length > 0) {
//       handleLogIn(btn);
//     }
//   }, [btn, navigate, handleLogIn]);

//   async function handleLogIn(btn) {
//     try {
//       const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1IXLN20_EreGYaxaaP4J9YTyTAH5OvwI`, {
//         method: "POST",
//         body: JSON.stringify({
//           email: btn.inputEmail,
//           password: btn.inputPass,
//           returnSecureToken: true,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       const data = await response.json();
//       setIsLogin(true);
//       loginHandler(data.idToken)
//       setBtn({});
//       navigate("/Product")
//     }
//     catch (err) {
//       console.log(err.message);
//     }
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleAuth}>
//         <label>Email: </label>
//         <input
//           type="email"
//           onChange={(e) => setInputEmail(e.target.value)}
//           value={inputEmail}
//         />

//         <label>Password: </label>
//         <input
//           type="password"
//           onChange={(e) => setInputPass(e.target.value)}
//           value={inputPass}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Auth;
import { useState, useRef, useContext, Fragment } from "react";
import { useNavigate } from "react-router";
import AuthContext from "./AuthContext";
// import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext); // login will get called in this context now

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //Adding Validation
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1IXLN20_EreGYaxaaP4J9YTyTAH5OvwI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1IXLN20_EreGYaxaaP4J9YTyTAH5OvwI";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        setIsLoading(false);

        if (res.ok) {
          //console.log("user is succesfully signed up");
          return res.json();
        } else {
          await res.json();
          let errorMessage = "Authentication failed";
          /* if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    } */
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        const replacedEmailId = enteredEmail.replace("@", "").replace(".", "");
        authCtx.Login(data.idToken, replacedEmailId);

        navigate("/store", { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Fragment>
      <section >
        <form onSubmit={submitHandler}>
          <div >
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div >
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <p>Sending Request...</p>}
            <button
              type="button"
              
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};
export default AuthForm;