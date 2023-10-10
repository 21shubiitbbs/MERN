import React from 'react'
import icon1 from '../../assets/icon-1.png'
import icon2 from '../../assets/icon-2.png'
import icon3 from '../../assets/icon-3.png'
import icon4 from '../../assets/icon-4.png'
import icon5 from '../../assets/icon-5.png'
import icon6 from '../../assets/icon-6.png'

export default function Services() {
  return (
    <div id="service-section">
        <section className="services">
          <h1 className="text-lg flex justify-center py-7">Our Services</h1>
          <div className="flex flex-row items-center justify-around">
              <div className="flex flex-col items-center cursor-pointer justify-center">
                  <img src={icon1} alt="" />
                  <h3 className='mt-2 font-semibold text-lg'>Buy House</h3>
              </div>
              <div className="flex flex-col items-center cursor-pointer justify-center">
                  <img src={icon2} alt="" />
                  <h3 className='mt-2 font-semibold text-lg'>Rent House</h3>
              </div>
              <div className="flex flex-col items-center cursor-pointer justify-center">
                  <img src={icon3} alt="" />
                  <h3 className='mt-2 font-semibold text-lg'>Sell House</h3>
              </div>
              <div className="flex flex-col items-center cursor-pointer justify-center">
                  <img src={icon4} alt="" />
                  <h3 className='mt-2 font-semibold text-lg'>Flats and Buildings</h3>
              </div>
              <div className="flex flex-col items-center cursor-pointer justify-center">
                  <img src={icon5} alt="" />
                  <h3 className='mt-2 font-semibold text-lg'>Shops and Malls</h3>
              </div>
              <div className="flex flex-col items-center cursor-pointer justify-center">
                  <img src={icon6} alt="" />
                  <h3 className='mt-2 font-semibold text-lg'>24/7 Service</h3>
              </div>
          </div>
        </section>
    </div>
  )
}

