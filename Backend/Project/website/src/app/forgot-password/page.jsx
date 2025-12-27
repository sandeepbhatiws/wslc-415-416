"use client"
import React, { useState } from 'react'
import "./login-register.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login, register } from '../ReduxToolkit/loginSlice';
import Link from 'next/link';

export default function page() {

    const [forgotButton, setForgotButton] = useState(false);

    const forgotHandler = (event) => {
        event.preventDefault();
        setForgotButton(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/forgot-password`, event.target)
        .then((result) => {
            setForgotButton(false);
            
            if(result.data._status == true){
                event.target.reset();
                toast.success(result.data._message);
            } else {
                toast.error(result.data._message);
            }
        })
        .catch(() => {
            setForgotButton(false);
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
                                <h3>Forgot Password</h3>
                                <ul>
                                    <li><a href="index.html">home</a></li>
                                    <li> {">"}</li>
                                    <li>Forgot Password</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="customer_login">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-3"></div>
                        <div className="col-lg-6 col-md-6">
                            <div className="account_form">
                                <h2>Forgot Password</h2>
                                <form onSubmit={forgotHandler} autoComplete='off'>
                                    <p>
                                        <label>Email <span>*</span></label>
                                        <input type="text" name='email' />
                                    </p>
                                    <div className="login_submit">
                                        
                                        <button type="submit" disabled={ forgotButton ? 'disabled' : '' } >

                                            { forgotButton ? 'Loading...' : 'Forgot Password'  }

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
