"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Guidelines() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (agreed) {
      router.push("/register");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-10 font-ProductSans" >
      {/* Container */}
      <div className="bg-[#1A1A1A] rounded-lg shadow-lg p-8 max-w-4xl w-full text-base md:text-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#d71015] underline underline-offset-[6px] uppercase">
          Pegasus 3.0 First Round Guidelines
        </h1>
        <p className="text-[#E2DCD0]  mb-4 md:p-6">
          Welcome to the First round of Pegasus 3.0! This round is designed to shortlist the top  teams who will advance to the final hackathon. Please carefully follow the instructions below to ensure your submission meets the requirements.
        </p>

        <div className="space-y-6">
          {/* Theme */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="text-xl text-start font-semibold mb-4  text-[#d71015] ">
              Theme: Inclusive Technology and Innovation
            </h2>
            <p className="text-[#E2DCD0] text-base">
              This is only the first round. Specific problem statements will be provided in the final hackathon.
            </p>
          </section>

          {/* Overview */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="text-xl text-start font-semibold mb-4  text-[#d71015] ">
              Overview
            </h2>
            <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2">
              <li>Teams can submit solutions to any problems related to the theme in the first round.</li>
              <li>All teams are required to submit their proposed solutions using the attached 4-slide PowerPoint template.</li>
              <li>Submissions outside the template or exceeding the number of slides will be disqualified.</li>
              <li>Team Size: Each team must consist of 1 to 4 members.</li>
              <li>This is only a First round, and specific problem statements will be given in the final hackathon after selection from the first round.</li>
            </ul>
          </section>

          {/* Submission Rules */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="text-xl text-start font-semibold mb-4  text-[#d71015] ">
              Submission Rules
            </h2>
            <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2">
              <li>
                Template Usage: Use the attached 4-slide PowerPoint template
                strictly. Each slide corresponds to:
                <ul className="list-disc list-inside pl-6">
                  <li>Slide 1: Team Details (Team Name, Members, Contact Information)</li>
                  <li>Slide 2: Problem Understanding</li>
                  <li>Slide 3: Proposed Solution</li>
                  <li>Slide 4: Feasibility and Impact</li>
                </ul>
              </li>
              <li>No content overflow is allowed; submissions exceeding 4 slides will be disqualified.</li>
              <li>Submission Deadline: <strong className="text-[#d71015]">29 December 2024</strong>.</li>
              <li>File Naming: <code className="px-1 rounded">Team_Name.pptx</code>.</li>
            </ul>
          </section>

          {/* Shortlisting Process */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="text-xl text-start font-semibold mb-4  text-[#d71015] ">
              Shortlisting Process
            </h2>
            <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2">
              <li>Initial Screening: Ensure compliance with the rules.</li>
              <li>
                Judging Panel: Select top teams based on creativity, relevance,
                and practicality.
              </li>
            </ul>
          </section>

          {/* Important Note */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="text-xl text-start font-semibold mb-4  text-[#d71015] ">
              Important Note
            </h2>
            <p className="text-[#E2DCD0] text-base">
              This First round is a standalone phase. The theme remains the same, but specific problem statements will be given in the final round.
            </p>
            <p className="text-[#E2DCD0] text-base mt-4">
              For assistance, contact us at <span className="text-[#d71015] font-medium">9037002156</span>.
            </p>
          </section>

          {/* Attached Template */}
          <section className="rounded-lg px-6 py-4 text-center">
            <h3 className="text-lg text-[#d71015] font-semibold pb-6">Attached PPT Template</h3>
            <button
              
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-white font-bold text-[14px] px-5 h-[3em] text-center bg-[#d71015] rounded-3xl active:scale-90 transition-all duration-300  ease-in-out"
            >
             <a  href="https://docs.google.com/presentation/d/1IhTA9tm0pbXhKs6XwfbZoFKESNgZ7jkPCbQ5c8uy0EU/edit?usp=sharing">
             Download Template
            </a>
            </button>
          </section>
        </div>

        {/* Agree Checkbox and Button */}
        <div className="flex flex-col items-center">
          <label htmlFor="agree" className="text-[#d71015] text-base py-10 md:px-6 font-medium">
          * By submitting this form, you consent to the use of the collected data for communication purposes and acknowledge that it may be shared with relevant third parties for purposes associated with the event.
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-5 h-5 text-[#d71015] bg-gray-900 border-gray-700 rounded focus:ring-[#d71015]"
            />
            
            <label htmlFor="agree" className="text-[#E2DCD0] text-base">
              I have read and agree to the guidelines.
            </label>
          </div>

          <button
            onClick={handleContinue}
            disabled={!agreed}
            className={`mt-4 px-6 py-2 rounded-md text-base font-medium transition ${
              agreed
                ? "bg-[#d71015] text-white hover:bg-[#B40E13]"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue to Register
          </button>
        </div>
      </div>
    </div>
  );
}
