import classes from './footer.module.css'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { BsTwitter} from "react-icons/bs";
const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
        <h2 style={{fontSize:"20px"}} className="text-blue-700 text-lg sm-450:text-2xl font-bold">About the app</h2>
          <p>
          Welcome to Lumiq Housing!
          <br />Lumiq Housing is a disruptive real-estate platform that makes it possible to buy/sell/rent a house without paying any brokerage
          <br /> If you are landlord post your property for rent
          <br /> If you are tenent go and search for best property 
          </p>
        </div>
        <div className={classes.col}>
        <h2 style={{fontSize:"20px"}} className="text-blue-700 text-lg sm-450:text-2xl font-bold">Contact</h2><h2>Contacts</h2>
          <span>Phone: +91-7017550146</span>
          <span>Gmail: lumiqhousing@gmail.com</span>
        </div>
        <div className={classes.col}>
        <h2 style={{fontSize:"20px"}} className="text-blue-700 text-lg sm-450:text-2xl font-bold">Location</h2>
          <span>Country: India</span>
          <span>State: Uttarpradesh</span>
          <span>Current Location: 9th flooroida one sector 62</span>
        </div>
        <div>
          <h2 style={{fontSize:"20px"}} className="text-blue-700 text-lg sm-450:text-2xl font-bold">Social Media Handles</h2>
          <ul style={{fontSize:"14px"}} className="mx-5 ">
            <li><Link to={`/`}  className="flex items-center"><BsFacebook className="mr-2"/> Facebook</Link></li>
            <li ><Link to={`/About`} className="flex items-center"><BsTwitter className="mr-2"/>Twitter</Link></li>
            <li ><Link to={`/Menu`} className="flex items-center"><BsLinkedin className="mr-2"/>Linkedin</Link></li>
            <li ><Link to={`/Menu`} className="flex items-center"><BsInstagram className="mr-2"/>Instagram</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )

}

export default Footer