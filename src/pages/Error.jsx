import React from 'react'
import { useLocation } from 'react-router-dom'

const Error = () => {
    const err = useLocation().state

    return (
        <div>
            <h1>Error</h1>
            <p>{err}</p>
        </div>
    )
}

export default Error

