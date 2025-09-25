import React from 'react'
import Header from './Common/Header'
import { Outlet } from 'react-router'
import Footer from './Common/Footer'
import ContextAPI from './ContextAPI'

export default function RootLayout() {
  return (
    <>

    <ContextAPI>
      <Header/>

      <Outlet/>


      <Footer/>
    </ContextAPI>
      
    </>
  )
}
