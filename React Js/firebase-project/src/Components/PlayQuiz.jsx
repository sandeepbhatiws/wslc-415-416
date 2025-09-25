import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Context } from './ContextAPI';

export default function PlayQuiz() {

    const {isLogin} = useContext(Context);

    const navigate = useNavigate(); // Executable function

    useEffect(() => {
        if(isLogin == 0){
            navigate('/');
        }
    },[isLogin])

  return (
    <>
      <div className='contaniner-fluid py-5'>
        <div className='container'>
            <div className='row text-center'>
                <h1>Play Quiz</h1>
            </div>
        </div>
      </div>
    </>
  )
}
