import React, { useState } from 'react'
import classes from './navbar.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'
import { logout } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'
import { useEffect } from 'react'
import Option from '../../choose/Option'

const Navbar = () => {
  const [state, setState] = useState({})
  const [photo, setPhoto] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { user, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setState(prev => {
      return {...prev, Area: '', type: ''}
    })
  }, [])
  const scrollToFooter = () => {
    const headerSection = document.getElementById('header-section');
    if (headerSection) {
      headerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  // mobile
  const [showMobileNav, setShowMobileNav] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")
  }


  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setPhoto(null)
    setState({})
  }

  const handleListProperty = async (e) => {
    e.preventDefault()
    let filename = null
    if (photo) {
      const formData = new FormData()
      filename = crypto.randomUUID() + photo.name
      formData.append('filename', filename)
      formData.append('image', photo)

      const options = {
        "Authorization": `Bearer ${token}`,
      }

      await request("/upload/image", 'POST', options, formData, true)
    } else {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2500)
      return
    }


    try {
      if (Object.values(state).some((v) => !v) && Object.values(state).length < 7) {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 2500)
        return
      }

      const options = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json'
      }

      const newProperty = await request("/property", 'POST', options, { ...state, img: filename })

      setShowModal(false)
      setShowForm(false)
      navigate(`/propertyDetail/${newProperty._id}`)
    } catch (error) {
      setError(true)
        setTimeout(() => {
          setError(false)
        }, 2500)
    }
  }


  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <Link to='/' onClick={scrollToTop} className={classes.left}>
          Lumiq Housing <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
          <li onClick={scrollToTop} className={classes.listItem}>
            Home
          </li>
          <li className={classes.listItem}>
          <button onClick={scrollToFooter} className={classes.contactButton}>
            About
          </button>
          </li>
          <li className={classes.listItem}>
            Featured
          </li>
          <li className={classes.listItem}>
            <button onClick={scrollToFooter} className={classes.contactButton}>
              Contacts
            </button>
          </li>
        </ul>
        <div className={classes.right}>
          {!user ?
            <>
              <Link to='/signup'>Sign up</Link>
              <Link to='/signin'>Sign in</Link>
            </>
            :
            <>
              <span className={classes.username} onClick={() => setShowModal(prev => !prev)}>Hello {user.username}!</span>
              {showModal && (
                <div className={classes.userModal}>
                  <AiOutlineClose onClick={() => setShowModal(prev => !prev)} className={classes.userModalClose} />
                  <span className={classes.logoutBtn} onClick={handleLogout}>Logout</span>
                  <Link  to={`/my-profile`} onClick={() => setShowModal(prev => !prev)} className={classes.myProfile}>My Profile</Link>
                  <Link onClick={() => setShowForm(true)} className={classes.list}>List your property</Link>
                  {/* <Link onClick={() => setShowModal(prev => !prev)} className={classes.yachtBtn} to={`/yachts`}>See yachts!</Link>
                  <Link to={`/create-yacht`} onClick={() => setShowModal(prev => !prev)}>List your yacht</Link> */}
                </div>
              )}
            </>
          }
        </div>
      </div>
      {
        // desktop screen
        !showMobileNav && showForm &&
        <div className={classes.listPropertyForm} onClick={handleCloseForm}>
          <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
            <h2>List Property</h2>
            <form onSubmit={handleListProperty}>
              <input value={state?.title} type="text" placeholder='Title' name="title" onChange={handleState} />
              <select value={state?.type} required name='type' onChange={handleState}>
                <Option
                data={[
                  {
                    value: "",
                    name: "Select Type",
                    disabled:true,
                    selected:true 
                  },
                  {
                    value: "1",
                    name: "Builder"
                  },
                  {
                    value: "2",
                    name: "Society"
                  },
                  {
                    value: "3",
                    name: "House"
                  }
                ]}
                ></Option>
                 {/* <option disabled>Select Type</option>
                 <option value='1'>Builder</option>
                 <option value='2'>Society</option>
                 <option value='3'>House</option> */}
              </select>
              <input value={state?.desc} type="text" placeholder='Desc' name="desc" onChange={handleState} />
              <select value={state?.Area} required name='Area' onChange={handleState}>
                 <Option data={[
                  {
                    value: "",
                    name: "Select Area",
                    disabled:true,
                    selected:true 
                  },{
                  value:'1',
                  name:"Noida"
                  },{
                  value:'2',
                  name:"Greater Noida"
                  },{
                  value:'3',
                  name:"Vaishali"
                  },{
                  value:'4',
                  name:"Gaur city"
                }]}></Option>
                 
              </select>
              <input value={state?.price} type="number" placeholder='Price' name="price" onChange={handleState} />
              <input value={state?.sqmeters} type="number" placeholder='Sq. meters' name="sqmeters" onChange={handleState} />
              <input value={state?.beds} type="number" placeholder='Beds' name="beds" step={1} min={1} onChange={handleState} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                <label htmlFor='photo'>Property picture <AiOutlineFileImage /></label>
                <input
                  type="file"
                  id='photo'
                  style={{ display: 'none' }}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {photo && <p>{photo.name}</p>}
              </div>
              <button>List property</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
          </div>
        </div>
      }
      {/* error */}
      {error && (
        <div className={classes.error}>
          <span>All fields must be filled!</span>
        </div>
      )}
    </div>
  )
}

export default Navbar