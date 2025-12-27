"use client"
import React, { useEffect, useState } from 'react'
import "./login-register.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login, register } from '../ReduxToolkit/loginSlice';
import Link from 'next/link';

export default function page() {

    const [resetButton, setResetButton] = useState(false);
    const [token , setToken] = useState('');

    const [searchParams] = useSearchParams();

    useEffect(() => {
        setToken(searchParams[1]);
    console.log(searchParams[1]);
    }, [])
    

    const resetHandler = (event) => {
        event.preventDefault();
        setResetButton(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/reset-password`, event.target)
        .then((result) => {
            setResetButton(false);
            
            if(result.data._status == true){
                event.target.reset();
                toast.success(result.data._message);
            } else {
                toast.error(result.data._message);
            }
        })
        .catch(() => {
            setResetButton(false);
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
                                <h3>Reset Password</h3>
                                <ul>
                                    <li><a href="index.html">home</a></li>
                                    <li> {">"}</li>
                                    <li>Reset Password</li>
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
                                <h2>Reset Password</h2>
                                <form onSubmit={resetHandler} autoComplete='off'>

                                    <input type='hidden' name='token' value={token}/>
                                    <p>
                                        <label>New Password <span>*</span></label>
                                        <input type="password" name='new_password' />
                                    </p>
                                    <p>
                                        <label>Confirm Password <span>*</span></label>
                                        <input type="password" name='confirm_password' />
                                    </p>
                                    <div className="login_submit">
                                        
                                        <button type="submit" disabled={ resetButton ? 'disabled' : '' } >

                                            { resetButton ? 'Loading...' : 'Reset Password'  }

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
