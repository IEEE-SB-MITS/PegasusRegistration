import React from 'react'

const DialogBox = ({setDialogOpen, member, setSelectedMember}) => {

    const DialogClose = ()=>{
        setDialogOpen(false);
        setSelectedMember(null);
      }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white text-black p-6 rounded shadow-lg w-11/12 max-w-lg">
      <h2 className="text-2xl text-red-600 font-bold mb-6 text-center">Team Member Details</h2>
      <div className='space-y-4'>
      <p><strong className='mr-2'>Name:</strong> {member.fname} {member.lname}</p>
      <p><strong className='mr-2'>Email:</strong> {member.email}</p>
      <p><strong className='mr-2'>College:</strong> {member.clg}</p>
      <p><strong className='mr-2'>Food Pref:</strong> {member.foodPref}</p>
      <p><strong className='mr-2'>IEEE ID:</strong> {member.ieeeID ?member.ieeeID : " -"}</p>
      </div>
      
      <div className="mt-6 flex justify-end">
          <button
            onClick={DialogClose}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
          >
            Close
          </button>
        </div>
    </div>
  </div>
  )
}

export default DialogBox