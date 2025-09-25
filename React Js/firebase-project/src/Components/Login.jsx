import React, { useContext, useEffect } from 'react'
import { Context } from './ContextAPI';
import { useNavigate } from 'react-router';

export default function Login() {

    const {isLogin} = useContext(Context);

    const navigate = useNavigate(); // Executable function

    useEffect(() => {
        if(isLogin != 0){
            navigate('/');
        }
    },[isLogin])

    return (
        <>
            <div className='contaniner-fluid py-5'>
                <div className='container'>
                    <div className='row text-center mb-3'>
                        <h1>Login</h1>
                    </div>

                    <div className='row'>
                        <div className='col-3'></div>
                        <div className='col-6'>
                            <form className='border p-3 rounded-3' autoComplete='off'>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" name='email' autoComplete='off' required />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="new-password" name='password' autoComplete='off' required/>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className='col-3'></div>
                    </div>
                </div>
            </div>
        </>
    )
}
