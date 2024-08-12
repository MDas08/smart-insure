import axios from '../utils/axiosConf';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { redirect, useNavigate, useParams } from 'react-router-dom';

function FileItem({ name, index, totalIndex, maxUploads }) {
    if (totalIndex > maxUploads - 1) {
        return null;
    }
    return <li className='flex px-4 py-2 bg-color-teal rounded-lg my-2 w-full overflow-hidden bg-opacity-50' key={index}>{name}</li>
}

function DocUpload() {
    const { claimId } = useParams()
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isSubmitted, setSubmitted] = useState(false)
    const [maxUploads, setMaxUploads] = useState(15)
    const [loading, setLoading] = useState(false)
    const userState = useSelector(state => state.user)
    const navigate = useNavigate()

    const headers = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/document/count/${claimId}`, headers)
            if (res.data.err) alert(res.data.err)
            setLoading(false)
            setMaxUploads(15 - res.data.msg)
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleFileInputChange(event) {
        const newFiles = event.target.files;
        const updatedFiles = [...uploadedFiles, ...Array.from(newFiles)];
        const fileNames = []
        const uniqueFiles = []
        updatedFiles.forEach(file => {
            if (!(file.name in fileNames)) {
                fileNames.push(file.name)
                uniqueFiles.push(file)
            }
        })
        setUploadedFiles(uniqueFiles)
    }

    async function handleFileInputSubmit(event) {
        event.preventDefault();
        if (uploadedFiles.length > maxUploads) {
            alert('too many files');
        }
        const data = new FormData()
        uploadedFiles.forEach(file => data.append('files', file))
        setLoading(true)
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/document/upload/${claimId}`, data, headers)
        setLoading(false)
        if (res.data.err) {
            alert(res.data.err)

        }
        setSubmitted(true)
    }

    return (
        <div>
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="text-xl font-semibold text-gray-700">
                        Loading...
                    </div>
                </div>
            )}
            <div className={`p-8 ${loading ? 'blur-sm pointer-events-none' : ''} flex flex-col items-center`}>
                {!isSubmitted &&
                    (
                        <h1 className='mt-10 text-lg'>Upload your documents below</h1>
                    )
                }

                <form onSubmit={handleFileInputSubmit}>
                    {!isSubmitted &&
                        (
                            <div>
                                <input type='file' name='files' multiple className='mt-6' onChange={handleFileInputChange} />
                                <p className='mt-3'>Maximum {maxUploads} files allowed</p>
                            </div>
                        )
                    }

                    <div className='flex flex-col mt-6 border-4 rounded-lg border-color-turq p-4 h-60 max-w-4xl overflow-y-auto'>
                        {uploadedFiles.length > 0 && (
                            <ul className='content-center'>
                                {uploadedFiles.map((file, index) => (
                                    <FileItem
                                        name={file.name}
                                        index={index}
                                        totalIndex={uploadedFiles.length + index}
                                        maxUploads={maxUploads}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className='flex flex-col mt-6 border-4 rounded-lg border-color-turq p-6 h-40 max-w-4xl overflow-y-auto bg-color-teal bg-opacity-50'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    {!isSubmitted &&
                        (
                            <button type="submit" className='bg-color-turq text-white p-4 rounded-lg mt-5 hover:bg-color-blue'>Upload</button>
                        )
                    }

                    {isSubmitted &&
                        (
                            <div className='mt-10'>
                                <p>Documents submitted!</p>
                                <button onClick={() => navigate('/')} className='bg-color-turq text-white p-4 rounded-lg mt-5 hover:bg-color-blue'>Dashboad</button>
                            </div>
                        )
                    }
                </form>

            </div>
        </div>
    );
}

export default DocUpload;

