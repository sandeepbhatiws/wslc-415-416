import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import ContextAPI from './ContextAPI'

export default function RootLayout() {
  return (
    <>
      <ContextAPI>
        <Header />

        <Outlet />

        <Footer />

      </ContextAPI>


    </>
  )
}
