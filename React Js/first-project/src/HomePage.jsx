import React from 'react'

export default function HomePage() {

  var userName = "Sandeep Bhati";

  console.log(userName);

  var email = 'sandeep@gmail.com';

  var status = 0;

  return (
    <>
        {
            status == 1
             ? 
            <h1> { userName } </h1>
             : 
            ''
        }

        <h2 className="row" style={{ backgroundColor : 'black', color : 'white' }} > { email } </h2>
    </>
  )
}
