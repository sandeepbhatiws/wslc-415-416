import React, { createContext, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import app from '../firebase/config';

const Context = createContext();

export default function ContextAPI({children}) {

  const userLogin  = localStorage.getItem('user_login') ?? 0;

    const [isLogin, setIsLogin] = useState(userLogin);

    const [isGoogleLoading, setIsGoogleLoading] = useState(0);

    const googleLogin = () => {
      setIsGoogleLoading(1);
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setIsGoogleLoading(0)
          toast.success('Login succussfully !')
          setIsLogin(1);
          localStorage.setItem('user_login', 1);
        }).catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setIsGoogleLoading(0);
        });
    }

    const data = { isLogin, setIsLogin, isGoogleLoading, setIsGoogleLoading, googleLogin };

  return (
    <>
        <Context.Provider value={ data }>
            {children}
        </Context.Provider>
    </>
  )
}

export {Context}