import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css'; 

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrow: true,
  };

  return (
    <div className='flex justify-center'>
      
      <div className='flex overflow-auto w-3/4 justify-center mt-7'>
        {buttonDetails.map((reportName) => (
          <button
            key={reportName}
            title={reportName}
            className='rounded-lg p-2 bg-color-turq hover:bg-color-blue m-2 whitespace-nowrap'
          >
            {reportName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReportPage;
