import React from 'react'

// export default function Header(props) {

//     console.log(props);

//   return (
//     <>
//       <h1>{props.header_title}</h1>
//       <p>{ props.description }</p>
//     </>
//   )
// }


export default function Header({ header_title, description  }) {


  return (
    <>
      <h1>{header_title}</h1>
      <p>{ description }</p>
    </>
  )
}
