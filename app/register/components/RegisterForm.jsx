"use client"
import { db, storage } from '@/utils/firebaseConfig.js';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import MemberOverlay from './MemberOverlay';
import Link from 'next/link';
import MemberPreview from './MemberPreview';

function generateTC() {
  const ticketNumber = Math.floor(100000 + Math.random() * 900000);
  return ticketNumber.toString();
}

async function isTCUnique(ticketNumber) {
  const q = query(collection(db, "pegasus_registrations"), where("ticketNumber", "==", ticketNumber));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}

async function addData(formData) {
  try {
    const docRef = await addDoc(collection(db, "pegasus_registrations"), formData);
    console.log("Document written: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.log("Error adding document: ", error);
    return null;
  }
}

const RegisterForm = () => {
  const router = useRouter();

  const [teamData, setTeamData] = useState({
    teamName: "",
    teamIdeaTitle: "",
    abstractPdfUrl: "",
    status: "pending",
  });

  const [teamLeader, setTeamLeader] = useState({
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

  const [teamMembers, setTeamMembers] = useState([]);
  const [showMemberOverlay, setShowMemberOverlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [abstractFile, setAbstractFile] = useState(null);
  const [isUnique, setIsUnique] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState(null);

  //unique team leader
  const checkUniqueness = async (email) => {
    if (!email) {
      setIsUnique(true);
      return;
    }
    const q = query(
      collection(db, "pegasus_registrations"),
      where("teamLeader.email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    const isUniqueResult = querySnapshot.empty;
    setIsUnique(isUniqueResult);

    if (!isUniqueResult) {
      alert("Team Lead already registered.");
    }
  };

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout); 
    }

    const timeout = setTimeout(() => {
      checkUniqueness(teamLeader.email);
    }, 500); // Debounce: Wait 500ms after typing stops

    setTypingTimeout(timeout);

    return () => clearTimeout(timeout); 
  }, [teamLeader]);



  const handleTeamDataChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setTeamLeader((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAbstractUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setAbstractFile(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const addTeamMember = (member) => {
    if (teamMembers.length < 3) {
      setTeamMembers([...teamMembers, member]);
      setShowMemberOverlay(false);
    } else {
      alert("Maximum 4 team members (including leader) allowed.");
    }
  };

  const removeTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!abstractFile) {
      alert("Please upload an abstract PDF.");
      return;
    }

    let ticketNumber = generateTC();
    let isUnique = await isTCUnique(ticketNumber);

    while (!isUnique) {
      ticketNumber = generateTC();
      isUnique = await isTCUnique(ticketNumber);
    }

    // Upload abstract PDF
    const abstractRef = ref(storage, `abstracts/${teamData.teamName}_${Date.now()}.pdf`);
    await uploadBytes(abstractRef, abstractFile);
    const abstractUrl = await getDownloadURL(abstractRef);

    const fullTeamData = {
      ...teamData,
      abstractPdfUrl: abstractUrl,
      teamLeader: teamLeader,
      teamMembers: teamMembers,
      ticketNumber: ticketNumber,
    };

    const userId = await addData(fullTeamData);
    if (userId) {
      localStorage.setItem("userId", userId);
      alert("Success!");
      setLoading(false);
      router.push("/ticket");
    } else {
      alert("Failed to register. Please try again.");
    }
  };

  const renderMemberForm = (data, onChange, isLeader = false) => (
    <div className="bg-[#1A1A1A] p-4 rounded-lg shadow-md mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#E2DCD0] mb-2">
            First Name<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="fname"
            value={data.fname}
            onChange={onChange}
            className="w-fit p-2 bg-transparent border-b-2  border-[#666262] rounded text-[#E2DCD0]"
            required
          />
        </div>
        <div>
          <label className="block text-[#E2DCD0] mb-2">
            Last Name<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="lname"
            value={data.lname}
            onChange={onChange}
            className="w-fit p-2 bg-transparent border-b-2  border-[#666262] rounded text-[#E2DCD0]"
            required
          />
        </div>
        <div>
          <label className="block text-[#E2DCD0] mb-2">
            Phone No.<span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={onChange}
            className="w-fit p-2 bg-transparent border-b-2  border-[#666262] rounded text-[#E2DCD0]"
            pattern="^\d{10}$"
            title="Phone number must be exactly 10 digits."
            required
          />
        </div>
        <div>
          <label className="block text-[#E2DCD0] mb-2">
            Email Address<span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            className="w-fit p-2 bg-transparent border-b-2  border-[#666262] rounded text-[#E2DCD0]"
            required
          />
        </div>
        <div>
          <label className="block text-[#E2DCD0] mb-2">
            College Name<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="clg"
            value={data.clg}
            onChange={onChange}
            className="w-fit p-2 bg-transparent border-b-2  border-[#666262] rounded text-[#E2DCD0]"
            required
          />
        </div>
        <div>
          <label className="block text-[#E2DCD0] mb-2">
            Branch and Semester<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="branch"
            value={data.branch}
            onChange={onChange}
            className="w-fit p-2 bg-transparent border-b-2  border-[#666262] rounded text-[#E2DCD0]"
            required
          />
        </div>
        <div>
          <label className="block text-[#E2DCD0] mb-2">
            Food Preference<span className="text-red-600">*</span>
          </label>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              name="foodPref"
              value="veg"
              onChange={onChange}
              checked={data.foodPref === "veg"}
              className="mr-2"
              required
            />
            <label className="mr-4 text-[#E2DCD0]">Veg</label>
            <input
              type="radio"
              name="foodPref"
              value="nonveg"
              onChange={onChange}
              checked={data.foodPref === "nonveg"}
              className="mr-2"
              required
            />
            <label className="text-[#E2DCD0]">Non-veg</label>
          </div>
        </div>
        <div>
          <label className="block text-[#E2DCD0] mb-2">
            Are you an IEEE member?<span className="text-red-600">*</span>
          </label>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              name="ieeeMember"
              value="yes"
              onChange={onChange}
              checked={data.ieeeMember === "yes"}
              className="mr-2"
              required
            />
            <label className="mr-4 text-[#E2DCD0]">Yes</label>
            <input
              type="radio"
              name="ieeeMember"
              value="no"
              onChange={onChange}
              checked={data.ieeeMember === "no"}
              className="mr-2"
              required
            />
            <label className="text-[#E2DCD0]">No</label>
          </div>
        </div>
      </div>
      {data.ieeeMember === "yes" && (
        <div className="mt-4">
          <label className="block text-[#E2DCD0] mb-2">
            IEEE Membership ID<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="ieeeID"
            value={data.ieeeID}
            onChange={onChange}
            className="w-fit p-2 bg-transparent border-b-2  border-[#666262] rounded text-[#E2DCD0]"
            required
          />
        </div>
      )}
    </div>
  );

  return (
    <div className='min-h-screen w-full md:w-2/3 flex justify-center items-center flex-col p-8 md:mr-10 overflow-auto'>
      <h2 className="text-2xl md:text-4xl font-bold text-[#D71015] mb-2 ">Team Registration Form</h2>
      <p className='text-white mb-6'>already registered? <Link href='/login' className='text-[#D71015]'>Login</Link></p>
      <form className="w-full max-w-3xl flex flex-col gap-4 text-[#E2DCD0]" onSubmit={handleSubmit}>
        <div className="bg-[#1A1A1A] p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-bold mb-4">Team Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#E2DCD0] mb-2">
                Team Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="teamName"
                value={teamData.teamName}
                onChange={handleTeamDataChange}
                className="w-fit p-2 bg-transparent border-b-2  border-[#666262] rounded text-[#E2DCD0]"
                required
              />
            </div>
            <div>
              <label className="block text-[#E2DCD0] mb-2">
                Team Idea Title<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="teamIdeaTitle"
                value={teamData.teamIdeaTitle}
                onChange={handleTeamDataChange}
                className="w-fit p-2 bg-transparent border-b-2  border-[#666262] rounded text-[#E2DCD0]"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-[#E2DCD0] mb-2">
              Abstract (PPT)<span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleAbstractUpload}
              className="w-fit p-2 bg-transparent border-b-2  border-[#666262] rounded text-[#E2DCD0]"
              required
            />
          </div>
        </div>

        <div className="bg-[#1A1A1A] p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-bold mb-4">Team Leader</h3>
          {renderMemberForm(teamLeader, handleLeaderChange, true)}
        </div>

        <div className="bg-[#1A1A1A] p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-bold mb-4">Team Members</h3>
          {teamMembers.map((member, index) => (
            <MemberPreview key={index} member={member} onRemove={() => removeTeamMember(index)} />
          ))}
          
          {teamMembers.length < 3 && (
            <button
              type="button"
              onClick={() => setShowMemberOverlay(true)}
              className="px-4 py-2 bg-[#D71015] text-white rounded hover:bg-[#B40E13]"
            >
              Add Team Member
            </button>
          )}
        </div>

        <div className='flex justify-center'>
          <button 
            type="submit" 
            className="px-14 py-3 font-bold text-[#E2DCD0] bg-[#D71015] rounded-xl hover:bg-[#B40E13] transition-all duration-300 ease-in-out text-2xl"
            style={{
              boxShadow: "2px 2px 0px rgba(255, 255, 255, 0.7)",
            }}
            >
              {loading ? "Registering..." : "Register Team"}
          </button>
        </div>
      </form>

      {showMemberOverlay && (
        <MemberOverlay onAdd={addTeamMember} onClose={() => setShowMemberOverlay(false)} renderMemberForm={renderMemberForm} />
      )}
    </div>
  )
}

export default RegisterForm

