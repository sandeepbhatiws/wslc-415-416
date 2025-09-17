import React from 'react'
import Header from './Header'
import BestSelling from './BestSelling'
import TopRated from './TopRated'
import { ToastContainer } from 'react-toastify'
import Footer from './Footer'

export default function Home() {
  return (
    <>
      <BestSelling/>
      <TopRated/>
    </>
  )
}
