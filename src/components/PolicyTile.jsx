import React from 'react'

const PolicyTile = ({ policyNumber, patientName, coverageStartDate, id }) => {
    return (
        <div className='inline-block cursor-pointer'>
            <div className='gap-y-3 p-2 border-2 m-3 flex flex-col'>
                <div>Policy number: {policyNumber}</div>
                <div>Patient name: {patientName}</div>
                <div>Coverage start date: {coverageStartDate}</div>
            </div>
        </div>
    )
}

export default PolicyTile
