import React from 'react'
import Header from './Common/Header'
import Footer from './Common/Footer'
import { Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <div>
      <Header/>

        <Outlet/>

      <Footer/>
    </div>
  )
}
