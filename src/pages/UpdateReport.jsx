import React from 'react'
import { useSelector } from 'react-redux'
import { useLoaderData, useParams } from 'react-router-dom'
import UpdateSummary from '../components/UpdateSummary'
import UpdateTreatments from '../components/UpdateTreatments'
import UpdateDocwise from '../components/UpdateDocwise'

const UpdateReport = () => {
    const { reportId } = useParams()
    const userState = useSelector(state => state.user)
    const report = useLoaderData()

    const headers = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }

    return (<>
        <div>
            <UpdateDocwise report={report} reportId={reportId} headers={headers} />
            <hr />
            <UpdateSummary report={report} reportId={reportId} headers={headers} />
            <hr />
            <UpdateTreatments report={report} reportId={reportId} headers={headers} />
        </div>
    </>)
}

export default UpdateReport
