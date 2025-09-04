import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function HomeComponent() {
    
  return (
    <>
        <Header header_title="This is a Header" description="This is description" />

        
        {/* <Footer footer_title="Rhis is a Footer"/>  */}


        <Footer footer_title="This is a Footer">
            <h2>This is description</h2>
            <p>This is description</p>
        </Footer>
    </>
  )
}
