import React from 'react'
import { useNavigate } from 'react-router-dom'

const ClaimTile = ({ title, claimType, user, id }) => {
    const navigate = useNavigate()

    return (<>
        <div className='inline-block cursor-pointer'>
            <div className='gap-x-4 p-2 border-2 m-3 flex' onClick={() => navigate(`/view-claim/${id}`)}>
                <div>{title}</div>
                <div>{claimType}</div>
                <div>By {user.firstName} {user.lastName}</div>
            </div>
        </div>
    </>)
}

export default ClaimTile
