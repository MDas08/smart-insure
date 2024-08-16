// import React from 'react'


// function ViewClaim({key, createdAt, approved}) {
//     let claimStatus = 'Pending'
//     claimStatus = (approved)?((approved === 'YES')?'Accepted':'Rejected'):'Pending';
    
//     return (
//         <div className='md:w-2/3 lg:w-1/4 bg-color-turq rounded-lg text-white p-4 m-4'>
//             <div className='flex flex-col justify-center  space-y-4  '>
//                 <div className='flex justify-between text-pretty flex-row '>
//                     <h1 className='font-medium text-left text-xl'>Claim {key}</h1>
//                     <p className='text-sm'>Date created: {createdAt}</p>
//                 </div>
//                 <p className='text-right font-light'>Claim Status: <span className='font-medium'>{claimStatus}</span></p>
                
//             </div>
//             <button className='px-2 py-1 bg-color-blue hover:bg-color-dark rounded-lg mt-4'>View Claim</button>
//         </div>
//     );
// }

// export default ViewClaim