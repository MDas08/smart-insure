import React from 'react'
import { removeUser } from '../store/userSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {
  const navigate = useNavigate()
  const userState = useSelector(state => state.user)
  const [userLoggedIn, setLogin] = useState(userState.authToken?true:false)

  const headers = {
    headers: {
      Authorization: `Bearer ${userState.authToken}`
    }
  }

  const dispatch = useDispatch()
  
  function logout() {
    dispatch(removeUser())
    localStorage.removeItem('authToken')
    return navigate('/home')
  }

  return (

    <div>
      <div className='flex bg-color-blue h-14 justify-end' >
        <ul className='flex flex-row justify-end text-white mr-8'>

          <li><button className='py-4 px-8 bg-transparent hover:bg-color-dark'
            onClick={() => navigate(`/home`)}
            key={"home"}>Home</button></li>

          <li><button className='p-4 bg-transparent hover:bg-color-dark'
            onClick={() => navigate(`/`)}
            key={"dashboard"}>Dashboard</button></li>

          <li><button className='p-4 bg-transparent hover:bg-color-dark'
            onClick={() => navigate(`/my-profile`)}
            key={"profile"}>Profile</button></li>
          {userState.authToken?
          <li><button className='p-4 bg-transparent hover:bg-color-dark'
                onClick={logout}>Log Out</button></li>
            :<button className='p-4 bg-transparent hover:bg-color-dark'
            onClick={() => navigate(`/login`)}>Log In</button>}
          
        </ul>
      </div>
    </div>
  )
}

export default Navbar

//<li><button className='p-4 bg-transparent hover:bg-color-dark'
//onClick={logout}>Log Out</button></li>