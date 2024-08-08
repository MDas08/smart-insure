import React from 'react';
import ReportTabs from '../components/reportTabs';

function ReportPage() {
  const buttonDetails = [
    "Mammography Report",
    "Ultrasound Report",
    "Biopsy Report",
    "Pathology Report",
    "MRI Report",
    "PET Scan Report",
    "Surgical Consultation Report",
    "Radiation Oncology Consultation Report",
    "Medical Oncology Consultation Report",
    "Genetic Testing Report",
    "Surgical Pathology Report",
    "Radiation Treatment Plan Report",
    "Chemotherapy Treatment Plan Report",
    "Hormonal Therapy Treatment Plan Report",
    "Blood Work Reports",
    "Tumor Marker Reports",
    "Oncology Follow-up Reports",
    "Imaging Follow-up Reports",
    "Physical Therapy Reports",
    "Psycho-oncology Reports"
  ];

  return (
    // <ReportTabs buttonNames={buttonDetails}/>
    <div>
    <div className='flex justify-center'>
      
      <div className='flex overflow-auto w-3/4 mt-16'>
        {buttonDetails.map((reportName) => (
          <button
            key={reportName}
            title={reportName}
            className='rounded-lg p-2 bg-color-turq hover:bg-color-blue m-2 whitespace-nowrap text-white'
          >
            {reportName}
          </button>
        ))}
      </div>
    </div>

    <div className='flex border-2 border-color-turq rounded-lg mx-24 mt-5 justify-center md:justify-start'>
      <div className='flex flex-col md:items-start space-y-3 m-5'>
        <h2>Type of Report Uploaded</h2>
        <p>X-Ray</p>
        <h2>Technique</h2>
        <p>X-Ray of PNS</p>
        <h2>Findings</h2>
        <p>Clouding of bilateral maxillary sinuses</p>
        <h2>Impression</h2>
        <p>Sinusitis is present</p>
        <h2>Clinical Indication</h2>
        <p>To evaluate the cause of the patient’s facial pain</p>
        <h2>Diagnosis</h2>
        <p>Sinusitis</p>
      </div>
    </div>

    <button className='bg-color-turq text-white p-4 rounded-lg mt-5 hover:bg-color-blue'>Next</button>
    </div>
  );
}

export default ReportPage;
