import React from 'react'
import Navbar from '../components/navbar/Navbar'
import NotFound from '../components/notFound/NotFound'
import Footer from '../components/footer/Footer'

export default function Error() {
  return (
    <div>
      <>
        <Navbar />
        <NotFound />
        <Footer />
      </>
    </div>
  )
}
