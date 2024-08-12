import axios from '../utils/axiosConf'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const UpdateReport = () => {
    const { s, dw, at } = useLocation()
    const userState = useSelector(state => state.user)
    const [docWise, setDocWise] = useState(dw)
    const [summary, setSummary] = useState(s)
    const [altTreatements, setAltTreatements] = useState(at)
    const [activeDocIdx, setActiveDocIdx] = useState(0)  // store active doc's index number
    const [loading, setLoading] = useState(false)
    const docWiseFormRef = useRef()
    const treatmentsFormRef = useRef()

    if (!userState.authToken) {
        return <Navigate to='/login' />
    }

    const headers = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }

    const listOfObjects = (input) => {
        const result = [];
        Object.keys(input).forEach((key) => {
            const [field, index] = key.split('_');
            const idx = Number(index);

            if (!result[idx]) {
                result[idx] = {};
            }

            result[idx][field] = input[key];
        });
        return result;
    }

    function handleChangeActiveDoc(docIdx) {
        const formData = new FormData(docWiseFormRef.current);
        const data = Object.fromEntries(formData)
        setDocWise(dw => {
            dw[activeDocIdx] = data
            return dw
        })
        setActiveDocIdx(docIdx)
    }

    async function handleDocWiseSubmit() {
        const formData = new FormData(docWiseFormRef.current);
        const data = Object.fromEntries(formData)
        setDocWise(dw => {
            dw[activeDocIdx] = data
            return dw
        })
        setLoading(true)
        const res = await axios.post(``, JSON.stringify(docWise),)
        if (res.data.err) {
            alert(res.data.err)
        }
        setLoading(false)
    }

    async function handleSummarySubmit(val) {
        setSummary(val)
        setLoading(true)
        const res = await axios.post(``, JSON.stringify({ Summary: summary }), headers)
        if (res.data.err) {
            alert(res.data.err)
        }
        setLoading(false)
    }

    async function handleAltTreatmentsSubmit() {
        const formData = new FormData(treatmentsFormRef.current);
        const data = listOfObjects(Object.fromEntries(formData))
        setAltTreatements(data)
        setLoading(true)
        const res = await axios.post(``, JSON.stringify({ TreatmentDetails: altTreatements }), headers)
        if (res.data.err) {
            alert(res.data.err)
        }
        setLoading(false)
    }

    async function handleGenDocWise() {
        setLoading(true)
        const res = await axios.get(``, headers)
        setDocWise(JSON.parse(res.msg))
        setLoading(false)
    }

    async function handleGenSummary() {
        setLoading(true)
        const res = await axios.get(``, headers)
        setSummary(JSON.parse(res.msg))
        setLoading(false)
    }

    async function handleGenAltTreatments() {
        setLoading(true)
        const res = await axios.get(``, headers)
        setAltTreatements(JSON.parse(res.msg))
        setLoading(false)
    }

    if (userState.role !== "CLAIM_ASSESSOR") {
        return (
            <div>404 dont have permission to access this page</div>
        )
    }

    return (<>
        <div>
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="text-xl font-semibold text-gray-700">
                        Loading...
                    </div>
                </div>
            )}
            <div className={`p-8 ${loading ? 'blur-sm pointer-events-none' : ''}`}>
                <div>
                    <h1>Edit Report Wise Summary</h1>
                    <button onClick={handleGenDocWise}>Generate new report wise summary</button>
                </div>
                {docWise.map((doc, i) => <>
                    <button onClick={() => handleChangeActiveDoc(i)}>{doc.MedicalReportName}</button>
                </>)}

                {docWise[activeDocIdx].hasOwnProperty('Findings') && <form ref={docWiseFormRef} onSubmit={handleDocWiseSubmit}>
                    <label htmlFor="Findings"></label>
                    <input type="text" name="Findings" defaultValue={docWise[activeDocIdx].Findings} />
                    <label htmlFor="ClinicalIndication"></label>
                    <input type="text" name="ClinicalIndication" defaultValue={docWise[activeDocIdx].ClinicalIndication} />
                    <label htmlFor="TypeOfReportUploaded"></label>
                    <input type="text" name="TypeOfReportUploaded" defaultValue={docWise[activeDocIdx].TypeOfReportUploaded} />
                    <label htmlFor="Diagnosis"></label>
                    <input type="text" name="Diagnosis" defaultValue={docWise[activeDocIdx].Diagnosis} />
                    <label htmlFor="Impression"></label>
                    <input type="text" name="Impression" defaultValue={docWise[activeDocIdx].Impression} />
                    <label htmlFor="Technique"></label>
                    <input type="text" name="Technique" defaultValue={docWise[activeDocIdx].Technique} />
                    <button type="submit">Submit</button>
                </form>}

                {docWise[activeDocIdx].hasOwnProperty('Prognosis') && <form ref={docWiseFormRef} onSubmit={handleDocWiseSubmit}>
                    <label htmlFor="Prognosis"></label>
                    <input type="text" name="Prognosis" defaultValue={docWise[activeDocIdx].Prognosis} />
                    <button type="submit">Submit</button>
                </form>}
            </div>
            <div>
                <div>
                    <h1>Edit Summary</h1>
                    <button onClick={handleGenSummary}>Generate new report wise summary</button>
                </div>
                <form onSubmit={e => handleSummarySubmit(e.target.summary.value)}>
                    <label htmlFor="summary"></label>
                    <input type="text" name="summary" defaultValue={summary} />
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div>
                <div>
                    <h1>Edit Alternate Treatments</h1>
                    <button onClick={handleGenAltTreatments}>Generate new report wise summary</button>
                </div>
                <form onSubmit={handleAltTreatmentsSubmit} ref={treatmentsFormRef}>
                    {altTreatements.map((altTreatement, idx) => (<>
                        <div>
                            <label htmlFor="TreatmentDescription"></label>
                            <input type="text" name={`TreatmentDescription_${idx}}`} defaultValue={altTreatement.TreatmentDescription} />
                            <label htmlFor="TypeOfTreatment"></label>
                            <input type="text" name={`TypeOfTreatment_${idx}`} defaultValue={altTreatement.TypeOfTreatment} />
                            <label htmlFor="Cost"></label>
                            <input type="number" name={`Cost_${idx}`} defaultValue={altTreatement.Cost} />
                        </div>
                    </>))}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </>)
}
