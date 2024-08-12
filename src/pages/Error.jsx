import React from 'react'
import { useLocation } from 'react-router-dom'

const Error = () => {
    const error = useLocation()

    return (
        <div>
            <h1>Error</h1>
            {/* <p>{error}</p> */}
        </div>
    )
}

export default Error

