import React, { useRef } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DocViewer from '../components/DocViewer';

const ViewClaim = () => {
    const formRef = useRef()
    const navigate = useNavigate()
    const claim = useLoaderData()

    if (claim.err) return navigate('/error', claim.err)

    console.log(claim)

    return (<>
        <form ref={formRef}>
            <div className={`flex justify-center items-center flex-col}`}>
                <div>
                    <div>
                        <h1>{claim.title}</h1>
                        <h3>{claim.desc}</h3>
                        <button onClick={() => navigate('/edit-claim', { claim })}>Edit</button>
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
            <DocViewer editable={false} documents={Array.from(claim.documents)} claimId={claim.id} />
        </form>
    </>);
};

export default ViewClaim;
