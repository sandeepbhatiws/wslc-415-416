import React from 'react'

// export default function Footer(data) {

//     console.log(data);
//   return (
//     <>
//       <h1>{ data.footer_title }</h1>
//       <p>{ data.children }</p>
//     </>
//   )
// }

export default function Footer({ footer_title, children }) {

  return (
    <>
      <h1>{ footer_title }</h1>
      <p>{ children }</p>
    </>
  )
}
