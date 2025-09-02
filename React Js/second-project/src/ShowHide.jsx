import React, { useState } from 'react'

export default function ShowHide() {

    const [showPassword, setShowPassword] = useState(false);

    const hideShowPassword = () => {
        setShowPassword(!showPassword);
    }

  return (
    <>
      <div>
        <input type={ showPassword == 1 ? 'text' : 'password' }/>

        <button onClick={ hideShowPassword }>{ showPassword == 1 ? 'Hide Password' : 'Show Password' } </button>
      </div>
    </>
  )
}
