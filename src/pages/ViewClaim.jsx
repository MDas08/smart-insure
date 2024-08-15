import React, { useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import DocViewer from '../components/DocViewer';
import { useSelector } from 'react-redux';
import axios from '../utils/axiosConf';

const ViewClaim = () => {
    const { claimId } = useParams()
    const formRef = useRef()
    const navigate = useNavigate()
    const [claim, setClaim] = useState(useLoaderData())
    const userState = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (claim.err) return navigate('/error', claim.err)
    }, [])

    const headers = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }

    async function handleGenReport() {
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/report/generate/${claim.id}`, headers)
        setLoading(false)
        if (res.data.err) return alert(res.data.err)
        setClaim(prevClaim => ({ ...prevClaim, report: res.data }))
        alert('Report generated for this claim successfully')
    }

    return (<>
        {loading && (
            <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                <div className="text-xl font-semibold text-gray-700">
                    Loading...
                </div>
            </div>
        )}
        <div className={`w-full ${loading && 'blur-sm pointer-events-none'}`}>
            <form ref={formRef}>
                <div className={`flex w-full items-center flex-col`}>
                    <div>
                        <div>
                            <h1>{claim.title}</h1>
                            <h3>{claim.desc}</h3>
                            {userState.role === "POLICY_HOLDER" && <div className='bg-slate-500 text-white m-2 p-2 rounded-md inline-block cursor-pointer' onClick={() => navigate(`/edit-claim/${claimId}`, { claim })}>Edit</div>}
                            {userState.role === "CLAIM_ASSESSOR" && <>
                                {claim.report === null ?
                                    <>
                                        <div className='bg-slate-500 text-white m-2 p-2 rounded-md inline-block cursor-pointer' onClick={handleGenReport}>Generate report </div>
                                    </> :
                                    <>
                                        <div className='bg-slate-500 text-white m-2 p-2 rounded-md inline-block cursor-pointer' onClick={() => navigate(`/view-report/${claim.report.id}`)}>Go to report</div>
                                    </>
                                }
                            </>}
                        </div>
                        <div>
                            <h2>Type of claim</h2>
                            <p>{claim.claimType}</p>
                            <h2>Hospital name</h2>
                            <p>{claim.hospName}</p>
                            <h2>Hospital city</h2>
                            <p>{claim.hospCity}</p>
                            <h2>Hospital code</h2>
                            <p>{claim.hospCode}</p>
                            <h2>Date of Admission</h2>
                            <p>{claim.dateOfAdmission}</p>
                            <h2>Date of Intimation</h2>
                            <p>{claim.dateOfIntimation}</p>
                            <h2>Claim Amount</h2>
                            <p>{claim.claimAmount}</p>
                        </div>
                    </div>
                </div>
            </form>
            <DocViewer editable={false} documents={Array.from(claim.documents)} claimId={claim.id} />
        </div>
    </>);
};

export default ViewClaim;
