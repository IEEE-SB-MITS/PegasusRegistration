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
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 text-[#d71015] underline underline-offset-[6px] uppercase font-ITCMedium ">
          Pegasus 4.0 First Round Guidelines
        </h1>
        <p className="text-[#E2DCD0]  mb-4 md:p-6">
          Welcome to the First round of Pegasus 4.0! This round is designed to shortlist the top  teams who will advance to the final hackathon. Please carefully follow the instructions below to ensure your submission meets the requirements.
        </p>

        <div className="space-y-6">
          {/* Theme */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="font-ITCMedium text-2xl text-start font-semibold mb-4  text-[#d71015] ">
              Theme: Open Innovation
            </h2>
            <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2">
              <li>Participants are free to propose any innovative idea, across any domain, that showcases creativity, problem understanding, and feasible implementation.</li>
              <li>This round is the Idea Submission Round for both <b>Software and Hardware tracks</b>.</li>
              <li>Only shortlisted teams will qualify for the Final Hackathon.</li>
            </ul>
          </section>

          {/* Overview */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="font-ITCMedium text-2xl text-start font-semibold mb-4  text-[#d71015] ">
              Overview
            </h2>
            <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2">
              <li>All teams are required to submit their proposed solutions using the attached 4-slide PowerPoint template.</li>
              <li>Team Size: Each team must consist of 2 to 4 members.</li>
              <li>Extra slides or modified templates result in direct disqualification.</li>
            </ul>
          </section>

          {/* Submission Rules */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="font-ITCMedium text-2xl text-start font-semibold mb-4  text-[#d71015] ">
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
              <li>Submission Deadline: <strong className="text-[#d71015]">31 December 2025</strong>.</li>
              <li>File Naming: <code className="px-1 rounded">Team_Name.pptx</code>.</li>
            </ul>
          </section>


          {/* Track-wise Guidelines */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="font-ITCMedium text-2xl text-start font-semibold mb-2 text-[#d71015]">
              Track-wise Guidelines
            </h2>

            {/* Software Track */}
            <div className="mb-8">
              <h2 className="font-ITCMedium text-xl font-semibold text-[#d71015] mb-3">
                Software Track – First Round (Idea Submission)
              </h2>

              <p className="text-[#E2DCD0] mb-3 text-base">
                This round evaluates your ability to identify a real-world software problem and propose an innovative and feasible solution.
              </p>

              <p className="text-[#E2DCD0] font-medium mb-2 text-base"><strong>Evaluation Criteria:</strong></p>
              <ul className="list-disc list-inside text-[#E2DCD0] space-y-2 pl-4 text-base">
                <li>Creativity & Innovation</li>
                <li>Relevance to Open Innovation theme</li>
                <li>Feasibility of implementation</li>
                <li>Problem understanding</li>
                <li>Impact & usefulness</li>
                <li>Clarity of slides</li>
              </ul>

              <p className="text-[#E2DCD0] text-base mt-4">
                <strong>Note:</strong> This round is purely idea-based. Shortlisted teams will advance to the 24-hour Final Software Hackathon.
              </p>
              <p className="text-[#E2DCD0] text-base mt-2">
                <strong>Final Round Theme:</strong> The specific problem statements will be revealed on the day of the hackathon.
              </p>
              <p className="text-[#E2DCD0] text-base mt-2">
                <strong>Bonus Advantage:</strong> Final solutions that are hosted, deployed or demo-accessible.
              </p>
            </div>

            {/* Hardware Track */}
            <div>
              <h2 className="font-ITCMedium text-xl font-semibold text-[#d71015] mb-3">
                Hardware Track – First Round (Idea Submission)
              </h2>

              <p className="text-[#E2DCD0] text-base mb-3">
                Participants must identify a real-world hardware problem and propose a meaningful, buildable hardware solution.
              </p>

              <p className="text-[#E2DCD0] text-base font-medium mb-2"><strong>Evaluation Criteria:</strong></p>
              <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2 pl-4">
                <li>Creativity & innovation</li>
                <li>Clarity of problem understanding</li>
                <li>Practical feasibility</li>
                <li>Electronics/mechanical approach clarity</li>
                <li>Potential impact</li>
                <li>Realistic execution plan</li>
              </ul>

              <p className="text-[#E2DCD0] text-base mt-4">
                <strong>Final Hardware Build Round Rules:</strong>
              </p>

              <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2 pl-4 mt-2">
                <li>All hardware must be built entirely on-site from scratch.</li>
                <li>Pre-assembled or partially assembled hardware is strictly prohibited.</li>
                <li>No pre-soldered circuits, pre-wired boards, or pre-loaded firmware allowed.</li>
                <li>Judges will inspect all components before the build begins.</li>
              </ul>

              <p className="text-[#E2DCD0] text-base mt-4 font-medium"><strong>Allowed to Bring:</strong></p>
              <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2 pl-4">
                <li>Raw electronic components, sensors, modules, MCUs</li>
                <li>Breadboards, wires, soldering tools</li>
                <li>Hand tools (screwdrivers, pliers, cutters)</li>
                <li>Laptops with empty code editors or firmware templates (no prewritten code)</li>
              </ul>

              <p className="text-[#E2DCD0] text-base mt-4">
                Final hardware problem statements will be released <strong>3 days before the event</strong> to allow planning (no pre-building).
              </p>
            </div>
          </section>

          {/* Shortlisting Process */}
          {/* <section className="rounded-lg md:px-6 py-4">
            <h2 className="font-ITCMedium text-2xl text-start font-semibold mb-4  text-[#d71015] ">
              Shortlisting Process
            </h2>
            <p className="text-[#E2DCD0] text-base mb-2">Judges will evaluate based on:</p>
            <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2 pl-6">
              <li>Innovation & creativity</li>
              <li>Relevance to theme (Open Innovation)</li>
              <li>Quality of problem definition</li>
              <li>Feasibility of approach</li>
              <li>Innovation & creativity</li>
              <li>Clarity & completeness of the 4-slide PPT</li>
            </ul>
            <p className="text-[#E2DCD0] text-base mt-2">Top-performing teams across both tracks will be shortlisted for the Final Hackathon</p>
          </section> */}

          {/* Important Note */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="font-ITCMedium text-2xl text-start font-semibold mb-4  text-[#d71015] ">
              Important Note
            </h2>
            <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2">
              <li>Round 1 is purely idea-based.</li>
              <li>Final rounds require real implementation and demonstration.</li>
              <li>Teams attempting to use pre-built hardware projects will be instantly disqualified.</li>
            </ul>
            <p className="text-[#E2DCD0] text-base mt-4">
              For assistance, contact us at <span className="text-[#d71015] font-medium">7907214758</span> or <span className="text-[#d71015] font-medium">9995353403</span>.
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
