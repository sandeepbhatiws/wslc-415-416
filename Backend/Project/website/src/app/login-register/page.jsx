"use client"
import React, { useState } from 'react'
import "./login-register.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login, register } from '../ReduxToolkit/loginSlice';

export default function page() {

    const [registerButton, setRegisterButton] = useState(false);
    const [loginButton, setLoginButton] = useState(false);
    const router = useRouter();
    const dispatach = useDispatch();

    const loginHandler = (event) => {
        event.preventDefault();
        setLoginButton(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`, event.target)
        .then((result) => {
            setLoginButton(false);
            
            if(result.data._status == true){
                event.target.reset();
                toast.success(result.data._message);
                Cookies.set('token', result.data._token)
                dispatach(login());
                router.push('/my-dashboard');
            } else {
                toast.error(result.data._message);
            }
        })
        .catch(() => {
            setLoginButton(false);
            toast.error('Something went wrong !')
        })
    }

    const registerHandler = (event) => {
        event.preventDefault();
        setRegisterButton(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`, event.target)
        .then((result) => {
            setRegisterButton(false);
            
            if(result.data._status == true){
                event.target.reset();
                toast.success(result.data._message);
                Cookies.set('token', result.data._token)
                dispatach(register());
                router.push('/my-dashboard');
            } else {
                toast.error(result.data._message);
            }
        })
        .catch(() => {
            setRegisterButton(false);
            toast.error('Something went wrong !')
        })
    }

    return (
        <div>

            <div className="breadcrumbs_area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb_content">
                                <h3>My account</h3>
                                <ul>
                                    <li><a href="index.html">home</a></li>
                                    <li> {">"}</li>
                                    <li>My account</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="customer_login">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-md-6">
                            <div className="account_form">
                                <h2>login</h2>
                                <form onSubmit={loginHandler} autoComplete='off'>
                                    <p>
                                        <label>Email <span>*</span></label>
                                        <input type="text" name='email' />
                                    </p>
                                    <p>
                                        <label>Passwords <span>*</span></label>
                                        <input type="password" name='password' />
                                    </p>
                                    <div className="login_submit">
                                        <a href="#">Lost your password?</a>
                                        
                                        <button type="submit" disabled={ loginButton ? 'disabled' : '' } >

                                            { loginButton ? 'Loading...' : 'Login'  }

                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="account_form register">
                                <h2>Register</h2>
                                <form onSubmit={registerHandler} autoComplete='off'>
                                    <p>
                                        <label>Name  <span>*</span></label>
                                        <input type="text" name='name' />
                                    </p>
                                    <p>
                                        <label>Email address  <span>*</span></label>
                                        <input type="text" name='email' />
                                    </p>
                                    <p>
                                        <label>Passwords <span>*</span></label>
                                        <input type="password" name='password' />
                                    </p>
                                    <div className="login_submit">
                                        <button type="submit" disabled={ registerButton ? 'disabled' : '' } >

                                            { registerButton ? 'Loading...' : 'Register'  }

                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
