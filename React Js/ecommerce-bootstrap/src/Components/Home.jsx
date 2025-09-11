import React from 'react'
import Header from './Header'
import BestSelling from './BestSelling'
import TopRated from './TopRated'
import { ToastContainer } from 'react-toastify'

export default function Home() {
  return (
    <>
      <Header/>
      <BestSelling/>
      <TopRated/>
    </>
  )
}
