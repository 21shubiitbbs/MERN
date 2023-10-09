import React from 'react'
import { Link } from 'react-router-dom'
import classes from './popularProperties.module.css'
import img1 from '../../assets/builder.jpg'
import img2 from '../../assets/flat.jpg'
import img3 from '../../assets/house.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'

const PopularProperties = () => {
  const [builderfloor, setbuilderfloor] = useState(0)
  const [society, setsociety] = useState(0)
  const [house, sethouse] = useState(0)

  useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/property/find/types', 'GET')

         setbuilderfloor(data.builder)
         setsociety(data.society)
         sethouse(data.house)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPropertiesNumber()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of properties</h5>
          <h2>Best type of properties for you</h2>
        </div>
        <div className={classes.properties}>
          <Link to={`/properties?type=Builder floor&Area=0&priceRange=1`} className={classes.property}>
            <img src={img1} />
            <div className={classes.quantity}>{builderfloor} properties</div>
            <h5>Builder floor</h5>
          </Link>
          <Link to={`/properties?type=Society&Area=1&priceRange=1`} className={classes.property}>
            <img src={img2} />
            <div className={classes.quantity}>{society} properties</div>
            <h5>Society</h5>
          </Link>
          <Link to={`/properties?type=House&Area=2&priceRange=1`} className={classes.property}>
            <img src={img3} />
            <div className={classes.quantity}>{house} properties</div>
            <h5>House</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties