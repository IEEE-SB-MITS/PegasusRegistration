"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from 'lucide-react';
import peg from '@/app/assets/peg.png'
import PunchCircles from "./component/PunchCircles";

const Ticket = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          router.push("/");
          return;
        }

        const docRef = doc(db, "pegasus_registrations", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document in Firestore!");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [db, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-10 h-10 animate-spin text-[#d71015]" />
        <p className="mt-4 text-lg text-white font-pressstart">Loading...</p>
      </div>
    );
  }

  const { teamLeader, teamMembers = [], teamName, abstractPdfUrl, teamIdeaTitle, ticketNumber } = userDetails;

  const allMembers = [
    { ...teamLeader, name: `${teamLeader.fname} ${teamLeader.lname} (Leader)`, role: 'Leader' },
    ...teamMembers.map(member => ({
      ...member,
      name: `${member.fname} ${member.lname}`,
      role: 'Member'
    }))
  ];

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 font-pressstart flex  justify-center items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="bg-white border-4 border-[#d71015] shadow-lg rounded-none overflow-hidden">
          <div className="bg-black text-white py-4 px-6 border-b-4 border-[#d71015]">
            <h1 className="text-2xl font-bold text-center">PEGASUS EVENT TICKET</h1>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:border-r-2 border-dashed border-black">
              <div className="bg-black rounded-xl w-full h-full relative p-4 flex flex-col justify-center items-center">
                <Image src={peg} alt="pegasus" width={300} height={300} className="object-contain mx-auto" />
                <h2 className="absolute right-3 bottom-3 text-white text-md">JAN 10</h2>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-[#d71015]">TICKET DETAILS</h2>
              <InfoItem label="TEAM NAME" value={teamName} />
              <InfoItem label="TEAM IDEA TITLE" value={teamIdeaTitle} />
              {allMembers.map((member, index) => (
                <InfoItem key={index} label={`${member.role.toUpperCase()} NAME`} value={member.name} />
              ))}
              <InfoItem label="LEADER PHONE NO" value={`+91 ${teamLeader.phone}`} />
              <InfoItem label="LEADER EMAIL" value={teamLeader.email} />
              <InfoItem label="FOOD PREFERENCE" value={teamLeader.foodPref} />
              
              <div className="mt-6 flex md:flex-row flex-col space-y-2 md:space-y-0 justify-between items-center">
                <a
                  href={abstractPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#d71015] text-white text-xs hover:bg-[#b60d12] transition-colors"
                >
                  DOWNLOAD ABSTRACT PDF
                </a>
                <p className="text-sm text-[#d71015]">No.{ticketNumber}</p>
              </div>
              
              <div className="mt-4 text-center">
                <span className={`${userDetails.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-full`}>
                  {userDetails.status || 'PENDING'}
                </span>
              </div>
            </div>
          </div>



        <PunchCircles/>

        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="mb-2 text-xs">
    <span className="font-bold">{label}:</span>{" "}
    <span className="text-gray-800">{value}</span>
  </div>
);

export default Ticket;

