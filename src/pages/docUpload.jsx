import React, { useState } from 'react';
//https://www.youtube.com/watch?v=ijx0Uqlo3NA

function FileItem({ name, index, totalIndex }) {
  if (totalIndex > 14) {
    return null;
  }
  return <li className='flex px-4 py-2 bg-color-teal rounded-lg my-2 w-full overflow-hidden bg-opacity-50' key={index}>{name}</li>
}

function DocUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitted, setSubmitted] = useState(false)
  let uploadedFilesCount = 0
  function handleChange(event) {
    const newFiles = event.target.files;
    const updatedFiles = [...uploadedFiles, ...Array.from(newFiles)];
    const uniqueFiles = [...new Set(updatedFiles.map(file => file.name))].map(name => ({ name }));

    setUploadedFiles(uniqueFiles);
  }

  function handleSubmit(event) {
    event.preventDefault();

    uploadedFilesCount = uploadedFilesCount + uploadedFiles.length;
    console.log(uploadedFiles.length, uploadedFilesCount);

    if (uploadedFilesCount > 15) {
      console.log('too many files');
    }
    else {
      console.log('Uploading files:', uploadedFiles);
      setSubmitted(true)

      //backend integration
    }

  }

  return (
    <div className='flex flex-col items-center'>
      {!isSubmitted &&
        (
          <h1 className='mt-10 text-lg'>Upload your documents below</h1>
        )}

      <form onSubmit={handleSubmit}>
        {!isSubmitted &&
          (
            <div>
              <input type='file' multiple onChange={handleChange} className='mt-6' />
              <p className='mt-3'>Maximum 15 files allowed</p>
            </div>
          )}



        <div className='flex flex-col mt-6 border-4 rounded-lg border-color-turq p-4 h-60 max-w-4xl overflow-y-auto'>
          {uploadedFiles.length > 0 && (
            <ul className='content-center'>
              {uploadedFiles.map((file, index) => (
                <FileItem
                  name={file.name}
                  index={index}
                  totalIndex={uploadedFilesCount + index}
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
          )}

        {isSubmitted &&
          (
            <div className='mt-10'>
              <p>Documents submitted!</p>
              <button className='bg-color-turq text-white p-4 rounded-lg mt-5 hover:bg-color-blue'>Next</button>
            </div>
          )}
      </form>
      
    </div>
  );
}

export default DocUpload;

