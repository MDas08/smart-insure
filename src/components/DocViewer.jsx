import React, { useState } from 'react'
import mime from 'mime-types'
import axios from '../utils/axiosConf'
import { useSelector } from 'react-redux'
import PdfViewer from './PdfViewer'

const DocViewer = ({ documents, editable, claimId, setClaim = () => {} }) => {
    const [loading, setLoading] = useState(false)
    const [docs, setDocs] = useState(documents)
    const userState = useSelector(state => state.user)

    if (documents === '' || documents.length === 0) {
        return <h1>No documents uploaded for the claim yet</h1>
    }

    const headers = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }

    async function onDeleteDocHandle(docId) {
        setLoading(true)
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN}/document/delete/${docId}`, headers)
        setLoading(false)
        if (res.data.err) {
            alert(res.data.err)
            return
        }
        setClaim(claim => ({ ...claim, documents: docs.filter(doc => doc.id !== docId) }))
        setDocs(docs => docs.filter(doc => doc.id !== docId))
    }

    async function onDeleteAllDocsHandle() {
        setLoading(true)
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN}/document/delete/claim/${claimId}`, headers)
        setLoading(false)
        if (res.data.err) {
            alert(res.data.err)
            return
        }
        setClaim(claim => ({ ...claim, documents: [] }))
        setDocs([])
    }

    return (<>
        {loading && (
            <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                <div className="text-xl font-semibold text-gray-700">
                    Loading...
                </div>
            </div>
        )}
        <h1>List of all documents uploaded for the claim</h1>
        {editable && <button className='bg-red-500 m-2 p-2 text-white' onClick={onDeleteAllDocsHandle}>Delete all documents</button>}
        {docs.map(doc => (<>
            <div className={`${loading && 'pointer-events-none'}`} key={doc.id}>
                {mime.lookup(doc.name).startsWith('image') && <>
                    <div>
                        <h2>{doc.originalName}</h2>
                        <img className='h-64' src={doc.url} alt={doc.originalName} />
                        {editable && <button className='bg-red-500 m-2 p-2 text-white' onClick={() => onDeleteDocHandle(doc.id)}>Delete</button>}
                    </div>
                </>}

                {mime.lookup(doc.name) === ('application/pdf') && <>
                    <div>
                        <h2>{doc.originalName}</h2>
                        <PdfViewer url={doc.url} />
                        {editable && <button className='bg-red-500 m-2 p-2 text-white' onClick={() => onDeleteDocHandle(doc.id)}>Delete</button>}
                    </div>
                </>}
            </div>
        </>))}
    </>)
}

export default DocViewer;
