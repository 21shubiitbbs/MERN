import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import './App.css';
import Home from './routes/Home';
import Propertiesr from './routes/Propertiesr';
import Editprop from './routes/Editprop';
import Myprofiler from './routes/Myprofiler';
import Updatepf from './routes/Updatepf';
import Error from './routes/Error';

function App() {
  const { user } = useSelector((state) => state.auth)
  const url = useLocation().pathname

  useEffect(() => {
    url && window.scrollTo(0, 0)
  }, [url])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/signin' element={!user ? <Signin /> : <Navigate to='/' />} />
        <Route path='/properties' element={<Propertiesr/>} />
        <Route path='/propertyDetail/:id' element={<Propertiesr/>} />
        <Route path='/editproperty/:id' element={user ?<Editprop/>: <Navigate to='/signin' />} />
        <Route path='/my-profile' element={user ?<Myprofiler/>: <Navigate to='/signin' />} />
        <Route path='/update-profile' element={user ?<Updatepf/>: <Navigate to='/signin' />} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
