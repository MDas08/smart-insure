import React from 'react';
import { useState } from 'react';

const ClaimInit = () => {
  function submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("dateOfIntimation");

    console.log(`${query}`);

  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <form onSubmit={submit}>
      <div className='flex justify-center items-center flex-col'>
        <div id='title' className='text-2xl bg-color-turq rounded-2xl w-4/5 h-16 content-center my-6'>
          <h1 className='pl-6 text-left text-white'>Claim Initiation</h1>
        </div>
        <div className='flex md:flex-row flex-col w-4/5 justify-center items-center md:items-start space-y-4 md:space-y-0'>
          <div className="flex flex-col w-11/12 space-y-4 md:mr-2">
            <label className='mr-auto'>Date of Admission</label>
            <input  name="dateOfAdmission" type='date'/>
            <label className='mr-auto'>Claim Description</label>
            <textarea  name="desc" />
          </div>
          <div className="flex flex-col w-11/12 space-y-4 md:mr-2">
          <label className='mr-auto'>Claim Amount</label>
            <input  name="claimAmount" type='number' />
            <div className="relative">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-color-turq hover:bg-color-blue rounded-lg px-5 py-1.5 text-center inline-flex items-center w-full"
                type="button"
                onClick={toggleDropdown}
              >
                Claim Type
                <div className='flex justify-end'>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg></div>
              </button>

              <div id="dropdown" className={`absolute ${isOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Cashless
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Re-imbursement
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id='title' className='text-2xl bg-color-turq rounded-2xl w-4/5 h-16 content-center my-6'>
          <h1 className='pl-6 text-left text-white'>Patient Details</h1>
        </div>
        <div className='flex md:flex-row flex-col w-4/5 justify-center items-center md:items-start space-y-4 md:space-y-0'>
          <div className="flex flex-col w-11/12 space-y-4 md:mr-2">
          <label className='mr-auto'>Policy Number</label>
            <input  name="policyNumber" type='number' />
            <label className='mr-auto'>Date of Birth</label>
            <input  name="dateOfBirth" type='date'/>
            <label className='mr-auto'>Date of Intimation</label>
            <input  name="dateOfIntimation" type='date'/>
          </div>
          <div className="flex flex-col w-11/12 space-y-4 md:mr-2">
          <label className='mr-auto'>Patient Name</label>
          <input  name="patientName" type='text' />
          <label className='mr-auto'>Coverage Start Date</label>
          <input  name="coverageStartDate" type='date'/>
             
          </div>
        </div>

        <div id='title' className='text-2xl bg-color-turq rounded-2xl w-4/5 h-16 content-center my-6'>
          <h1 className='pl-6 text-left text-white'>Hospital Details</h1>
        </div>
        <div className='flex md:flex-row flex-col w-4/5 justify-center items-center md:items-start space-y-4 md:space-y-0'>
          <div className="flex flex-col w-11/12 space-y-4 md:mr-2">
          <label className='mr-auto'>Hospital Name</label>
            <input  name="hospitalName" type='text' />
            <label className='mr-auto'>Hospital City</label>
            <input  name="hospitalCity" type='text'/>
          </div>
          <div className="flex flex-col w-11/12 space-y-4 md:mr-2">
          <label className='mr-auto'>Hospital Code</label>
          <input  name="hospitalCode" type='number' />
          </div>
        </div>




        <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>Continue</button>

      </div>
    </form>
  );
};

export default ClaimInit;
