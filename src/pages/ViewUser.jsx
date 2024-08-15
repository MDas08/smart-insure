import React, { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import ClaimTile from '../components/ClaimTile'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import axios from '../utils/axiosConf'

const ViewUser = () => {
    const [user, setUser] = useState(useLoaderData())
    const { userId } = useParams()
    const [loading, setLoading] = useState(false)
    const userState = useSelector(state => state.user)

    const headers = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }

    async function handlePromoteToCA() {
        setLoading(true)
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/user/promote-to-claim-assessor/${userId}`, {}, headers)
        setLoading(false)
        if (res.data.err) return alert(res.data.err)
        setUser(usr => ({ ...usr, role: "CLAIM_ASSESSOR" }))
        alert(res.data.msg)
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
                {user.role === "POLICY_HOLDER" && <button className='bg-color-dark p-2 m-2 text-white rounded-md' onClick={handlePromoteToCA}>Promote to Claim Assessor</button>}
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
                <div>
                    <p>List of all claims filed by user</p>
                    {user.claims.length === 0 ?
                        <p>This user has filed no claims yet</p> :
                        <div>
                            {user.claims.map(claim => <div key={uuid()}>
                                <ClaimTile {...claim} />
                            </div>)}
                        </div>
                    }
                </div>
            </div>
        </div>
    </>)
}

export default ViewUser
