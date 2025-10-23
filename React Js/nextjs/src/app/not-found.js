import React from 'react'
import PageNotFound from './(website)/Components/PageNotFound'
import MainLayout from './(website)/Components/Common/MainLayout'
import './globals.css';

export default function notFound() {
  return (
    <>
    <MainLayout>
      <PageNotFound/>
    </MainLayout>
    </>
  )
}
