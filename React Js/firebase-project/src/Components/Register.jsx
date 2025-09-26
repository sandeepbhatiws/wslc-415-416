import React, { useContext, useEffect, useState } from 'react'
import { Context } from './ContextAPI';
import { useNavigate } from 'react-router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/config';
import { toast } from 'react-toastify';

export default function Register() {

    const {isLogin, setIsLogin, isGoogleLoading, googleLogin} = useContext(Context);

    const navigate = useNavigate(); // Executable function

    useEffect(() => {
        if(isLogin == 1){
            navigate('/');
        }
    },[isLogin])

    const [isLoading, setIsLoading] = useState(0);

    const register = (event) => {
        event.preventDefault();
        setIsLoading(1)

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, event.target.email.value, event.target.password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            // ...
            setIsLoading(0)
            toast.success('Register succussfully !')
            setIsLogin(1);
            localStorage.setItem('user_login', 1);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setIsLoading(0)
        });

    }

  return (
    <>
      <div className='contaniner-fluid py-5'>
                <div className='container'>
                    <div className='row text-center mb-3'>
                        <h1>Register</h1>
                    </div>

                    <div className='row'>
                        <div className='col-3'></div>
                        <div className='col-6'>
                            <form onSubmit={ register } className='border p-3 rounded-3' autoComplete='off'>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" name='email' autoComplete='off' required />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="new-password" name='password' autoComplete='off' required/>
                                </div>
                                <button type="submit" class="btn btn-primary" disabled={isLoading == 1 ? 'disabled' : '' }>
                                    {
                                        isLoading == 1
                                        ?
                                        <>
                                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...
                                        </>
                                        :
                                        'Submit'
                                    }
                                    
                                </button>
                            </form>

                            <button type="button" onClick={googleLogin} class="btn btn-primary" disabled={isGoogleLoading == 1 ? 'disabled' : '' }>
                                    {
                                        isGoogleLoading == 1
                                        ?
                                        <>
                                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...
                                        </>
                                        :
                                        'Google with Login'
                                    }
                                    
                                </button>
                        </div>
                        <div className='col-3'></div>
                    </div>
                </div>
            </div>
    </>
  )
}
