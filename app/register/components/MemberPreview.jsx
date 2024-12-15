import React from 'react';

const MemberPreview = ({ member, onRemove }) => {
  return (
    <div className="bg-[#2A2A2A] p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
      <div>
        <h4 className="text-lg font-semibold text-[#E2DCD0]">{member.fname} {member.lname}</h4>
        <p className="text-[#E2DCD0]">{member.email}</p>
        <p className="text-[#E2DCD0]">{member.clg}</p>
      </div>
      <button
        onClick={onRemove}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default MemberPreview;

