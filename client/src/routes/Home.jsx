import Navbar from '../components/navbar/Navbar'
import Newsletter from '../components/newsletter/Newsletter'
import Hero from '../components/hero/Hero'
import Footer from '../components/footer/Footer'
import Services from '../components/services/Services'
import PopularProperties from '../components/popularProperties/PopularProperties'
export default function Home() {
  return (
    <div>
     <>
       <Navbar />
       <Hero />
       <PopularProperties />
       <Services/>
       <Newsletter />
       <Footer />
     </>
      
    </div>
  )
}
