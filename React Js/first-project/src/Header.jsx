import React from 'react'

export default function Header() {

    var status = 1;


  return (
    <div>
      <div style={ { display : `${ status == 1 ? "none" : ''  }` }} >Header</div>
    </div>
  )
}
