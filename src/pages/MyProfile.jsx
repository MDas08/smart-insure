import React, { useRef, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import ClaimTile from '../components/ClaimTile'
import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/userSlice'
import axios from '../utils/axiosConf'

const ViewUser = () => {
    const user = useLoaderData()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState()
    const [showPassInput, setShowPassInput] = useState(false)
    const userState = useSelector(state => state.user)
    const passwdRef = useRef()
    const navigate = useNavigate()

    function logout() {
        dispatch(removeUser())
        localStorage.removeItem('authToken')
        return navigate('/login')
    }

    const headers = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }

    async function deleteAccount() {
        if (showPassInput === true) {
            setLoading(true)
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/user/delete-account`, {
                "password": passwdRef.current.value
            }, headers)
            setLoading(false)
            if (res.data.err) return alert(res.data.err)
            alert(res.data.msg)
            return navigate('/login')
        } else if (showPassInput === false) {
            setShowPassInput(true)
        }
    }

    return (<>
        {loading && (
            <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                <div className="text-xl font-semibold text-gray-700">
                    Loading...
                </div>
            </div>
        )}
        <div className={`flex justify-center items-center flex-col ${loading && 'blur-sm pointer-events-none'}`}>
            <div>
                <button className='bg-slate-600 p-2 m-2 text-white rounded-md' onClick={logout}>Logout</button>
                <button className='bg-red-700 p-2 m-2 text-white rounded-md' onClick={deleteAccount}>Delete account</button>
                {showPassInput && <div className='flex gap-1'>
                    <div>
                        <label htmlFor="password">Enter password</label>
                        <input className='h-10 w-full' name='password' id='password' type="password" ref={passwdRef} />
                    </div>
                    <button className='border-4 border-slate-400 m-2 p-2 rounded-md' onClick={() => setShowPassInput(false)}>Cancel</button>
                </div>}
                <p>Name</p>
                <p>{user.firstName} {user.lastName}</p>
                <p>Age</p>
                <p>{dayjs().diff(user.dob, 'year')} Years</p>
                <p>Role</p>
                <p>{user.role}</p>
                <p>Adress</p>
                <p>{user.address}</p>
                <p>Phone</p>
                <p>{user.phone}</p>
                {userState.role === "POLICY_HOLDER" && <div>
                    <p>List of all claims I have filed</p>
                    {user.claims.length === 0 ?
                        <p>No claims filed yet</p> :
                        <div>
                            {user.claims.map(claim => <div key={claim.id}>
                                <ClaimTile key={uuid()} {...claim} />
                            </div>)}
                        </div>
                    }
                </div>}
            </div>
        </div>
    </>)
}

export default ViewUser
