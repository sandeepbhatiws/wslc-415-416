import React, { useState } from 'react'
import Table from './Table'
import Form from './Form'

export default function Home() {

    var userDatas = localStorage.getItem('userData');
    var userDatas = JSON.parse(userDatas);

    // const [userData, setUserData] = useState(userDatas ? userDatas : []);
    const [userData, setUserData] = useState(userDatas ?? []);

    return (
        <>  
            <Form userData={userData} setUserData={setUserData}/>

            <Table userData={userData} setUserData={setUserData}/>
            
        </>
    )
}
