import React, { useState } from 'react'
import Table from './Table'
import Form from './Form'

export default function Home() {

    const [userData, setUserData] = useState([1,1,2]);

    return (
        <>
            
            <Form userData={userData} setUserData={setUserData}/>

            <Table userData={userData}/>
            
        </>
    )
}
