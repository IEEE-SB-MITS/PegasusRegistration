import React, { useState } from 'react';

const MemberOverlay = ({ onAdd, onClose,renderMemberForm }) => {
  const [member, setMember] = useState({
    fname: "",
    lname: "",
    branch: "",
    clg: "",
    foodPref: "veg",
    phone: "",
    email: "",
    ieeeMember: "",
    ieeeID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(member);
  };

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-[#E2DCD0]">Add Team Member</h3>
        <form onSubmit={handleSubmit}>
          {renderMemberForm(member, handleChange)}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#D71015] text-white rounded hover:bg-[#B40E13] mr-2"
            >
              Add Member
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberOverlay;

