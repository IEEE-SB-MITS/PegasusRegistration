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
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-10">
      {/* Container */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-500 underline">
          Pegasus 3.0 First Round Guidelines
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Welcome to the First round of Pegasus 3.0! This round is designed to shortlist the top  teams who will advance to the final hackathon. Please carefully follow the instructions below to ensure your submission meets the requirements.
        </p>

        <div className="space-y-6">
          {/* Theme */}
          <section className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center text-white underline">
              Theme: Assistive Technology and Innovation
            </h2>
            <p className="text-gray-300 text-sm">
              This is only the first round. Specific problem statements will be provided in the final hackathon.
            </p>
          </section>

          {/* Overview */}
          <section className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-white underline">
              Overview
            </h2>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
              <li>All teams are required to submit their proposed solutions using the attached 4-slide PowerPoint template.</li>
              <li>Submissions outside the template or exceeding the number of slides will be disqualified.</li>
              <li>Team Size: Each team must consist of 1 to 4 members.</li>
            </ul>
          </section>

          {/* Submission Rules */}
          <section className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-white underline">
              Submission Rules
            </h2>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
              <li>
                Template Usage: Use the attached 4-slide PowerPoint template strictly. Each slide corresponds to:
                <ul className="list-disc list-inside pl-6">
                  <li>Slide 1: Team Details (Team Name, Members, Contact Information)</li>
                  <li>Slide 2: Problem Understanding</li>
                  <li>Slide 3: Proposed Solution</li>
                  <li>Slide 4: Feasibility and Impact</li>
                </ul>
              </li>
              <li>No content overflow is allowed; submissions exceeding 4 slides will be disqualified.</li>
              <li>Submission Deadline: <strong className="text-indigo-400">29 December 2024</strong>.</li>
              <li>File Naming: <code className="bg-gray-800 px-1 rounded">Team_Name.pptx</code>.</li>
            </ul>
          </section>

          {/* Shortlisting Process */}
          <section className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-white underline">
              Shortlisting Process
            </h2>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
              <li>Initial Screening: Ensure compliance with the rules.</li>
              <li>Judging Panel: Select top teams based on creativity, relevance, and practicality.</li>
            </ul>
          </section>

          {/* Important Note */}
          <section className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-white underline">
              Important Note
            </h2>
            <p className="text-gray-300 text-sm">
              This First round is a standalone phase. The theme remains the same, but specific problem statements will be given in the final round.
            </p>
            <p className="text-gray-300 text-sm mt-4">
              For assistance, contact us at <span className="text-indigo-400 font-medium">9037002156</span>.
            </p>
          </section>

          {/* Attached Template */}
          <section className="bg-gray-800 rounded-lg p-6 shadow-md text-center">
            <h3 className="text-lg font-medium text-indigo-400 underline pb-6">Attached PPT Template</h3>
            <button
              
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-white font-bold text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] hover:animate-gradient-xy hover:bg-[length:100%] focus:ring-violet-700 transition"
            >
             <a href="https://docs.google.com/presentation/d/1WmTCyeby1MXNkEXdFFN79cqkVphZWHEObXFkelN-flE/edit?usp=sharing">
             Download Template
            </a>
            </button>
          </section>
        </div>

        {/* Agree Checkbox and Button */}
        <div className="mt-8 flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-5 h-5 text-indigo-500 bg-gray-900 border-gray-700 rounded focus:ring-indigo-500"
            />
            <label htmlFor="agree" className="text-gray-300 text-sm">
              I have read and agree to the guidelines.
            </label>
          </div>

          <button
            onClick={handleContinue}
            disabled={!agreed}
            className={`mt-4 px-6 py-2 rounded-md text-sm font-medium transition ${
              agreed
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
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
