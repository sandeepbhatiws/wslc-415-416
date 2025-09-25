import React, { useContext } from 'react'
import { Link } from 'react-router'
import { Context } from '../ContextAPI';
import { ToastContainer } from 'react-toastify';

export default function Header() {

    const { isLogin } = useContext(Context);

    return (
        <>
            <ToastContainer/>
            <div className='container-fluid bg-primary position-sticky top-0 z-2'>
                <div className='container'>
                    <div class="nav-bar">
                        <nav class="navbar navbar-expand-lg navbar-light">
                            <div class="container-fluid">
                                <Link class="navbar-brand" to="/">
                                    <img src='https://www.wscubetech.com/images/ws-cube-white-logo.svg' />
                                </Link>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <div className='d-flex align-items-center justify-content-between w-100'>
                                        <div className='m-auto'>
                                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                                <li class="nav-item">
                                                    <Link to={`/`} class="nav-link active" aria-current="page">Home</Link>
                                                </li>
                                                <li class="nav-item">
                                                    <Link class="nav-link" to="/play-quiz">Play Quiz</Link>
                                                </li>
                                                <li class="nav-item">
                                                    <Link class="nav-link" to="/add-quiz">Add Quiz</Link>
                                                </li>
                                                <li class="nav-item">
                                                    <Link class="nav-link" to="/view-quiz">View Quiz</Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <span class="navbar-text">
                                                {
                                                    isLogin == 1
                                                        ?
                                                        <button type="button" class="btn btn-secondary">Logout</button>
                                                        :
                                                        <>
                                                            <Link to={`/login`}>
                                                                <button type="button" class="btn btn-secondary me-3">Login</button>
                                                            </Link>
                                                            

                                                            <Link to={`/register`}>
                                                                <button type="button" class="btn btn-secondary me-3">Register</button>
                                                            </Link>
                                                            
                                                        </>
                                                }

                                            </span>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
