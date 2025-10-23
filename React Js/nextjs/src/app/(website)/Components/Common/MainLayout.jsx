'use client'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Provider } from 'react-redux'
import { reduxToolkit } from '../ReduxToolkit/ReduxToolkit'

export default function MainLayout({children}) {
  return (
    <>
    <Provider store={ reduxToolkit }>
      <Header/>
        {children}
      <Footer/>
    </Provider>
    </>
  )
}
