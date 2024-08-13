import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

function ReportPage() {
    const navigate = useNavigate()
    const { reportId } = useParams()
    const userState = useSelector(state => state.user)
    const report = useLoaderData()

    if (report.err) navigate('/error', report.err)

    const summary = JSON.parse(report.combinedSummary).Summary
    const docWiseReport = JSON.parse(report.docWiseReport.text)
    const alternateTreatments = JSON.parse(report.alternateTreatments.text).TreatmentDetails
    const [activeDocReport, setActiveDocReport] = useState(docWiseReport[0].MedicalReportName)
    const treatmentTypes = [...new Set(alternateTreatments.map(at => at.TypeOfTreatment))]
    const [activeTreatmentType, setActiveTreatmentType] = useState(docWiseReport[0].MedicalReportName)

    function handleUpdateReport() {
        const data = { s: summary, dw: docWiseReport, at: alternateTreatments }
        navigate(`/update-report/${reportId}`, data)
    }

    if (!userState.authToken) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            {userState.role === "CLAIM_ASSESSOR" && <button onClick={handleUpdateReport}>Update Report</button>}
            {report.approved !== null && <div>
                <h1>Approved: {report.approved}</h1>
            </div>}

            <h1>Report Wise Summary</h1>
            <div className='flex justify-center'>
                <div className='flex overflow-auto w-3/4 mt-16'>
                    {docWiseReport.map((docReport) => (
                        <button
                            key={uuid()}
                            className={`${docReport.MedicalReportName === activeDocReport.MedicalReportName ? 'bg-color-blue' : 'bg-color-turq'} rounded-lg p-2 m-2 whitespace-nowrap text-white`}
                            onClick={() => setActiveDocReport(docReport)}
                        >
                            {docReport.MedicalReportName}
                        </button>
                    ))}
                </div>
            </div>

            {activeDocReport.hasOwnProperty('Findings') && <div>
                <h2>Findings</h2>
                <p>{activeDocReport.Findings}</p>
                <h2>Clinical Indication</h2>
                <p>{activeDocReport.ClinicalIndication}</p>
                <h2>Type Of Report Uploaded</h2>
                <p>{activeDocReport.TypeOfReportUploaded}</p>
                <h2>Diagnosis</h2>
                <p>{activeDocReport.Diagnosis}</p>
                <h2>Impression</h2>
                <p>{activeDocReport.Impression}</p>
                <h2>Technique</h2>
                <p>{activeDocReport.Technique}</p>
            </div>}

            {activeDocReport.hasOwnProperty('Prognosis') && <div>
                <h2>Prognosis</h2>
                <p>{activeDocReport.Prognosis}</p>
            </div>}

            <div>
                <h1>Consildated Summary</h1>
                <p>{summary}</p>
            </div>
            <div>
                <h2>Notes</h2>
                <p>{report.notes}</p>
            </div>

            <div>
                <h1>Alternate Treatments</h1>
                {treatmentTypes.map(t => (
                    <button key={t} onClick={() => setActiveTreatmentType(t)}>{t}</button>
                ))}
                <div>
                    <h2>Estimated cost: {report.estimatedExpenses}</h2>
                </div>
                <table>
                    <tr>
                        <th>Treatment Description</th>
                        <th>Cost</th>
                    </tr>
                    {alternateTreatments.map(altTreatment => {
                        if (altTreatment.TypeOfTreatment === activeTreatmentType) {
                            return <>
                                <tr key={uuid()}>
                                    <td>{altTreatment.TreatmentDescription}</td>
                                    <td>{altTreatment.Cost}</td>
                                </tr>
                            </>
                        }
                        return <></>
                    })}
                </table>
            </div>
        </div>
    );
}

export default ReportPage;
