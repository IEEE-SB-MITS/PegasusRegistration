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
          Pegasus 4.0 Guidelines
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
              <li>Open to Undergraduate (UG) and Postgraduate (PG) students.</li>
              <li>Students from any branch or field of study can participate.</li>
              <li>Each participant can be part of only one team.</li>
              <li>Team Size: Each team must consist of 2 to 4 members.</li>
            </ul>
          </section>

          {/* Submission Rules */}
          <section className="rounded-lg md:px-6 py-4">
            <h2 className="font-ITCMedium text-2xl text-start font-semibold mb-4  text-[#d71015] ">
              Submission Rules
            </h2>
            <ul className="list-disc list-inside text-[#E2DCD0] text-base space-y-2">
              <li>All teams must use the given 6-slide PPT template.</li>
              <li>Extra slides result in direct disqualification.</li>
              <li>Submission Deadline: <strong className="text-[#d71015]">13 January 2026</strong>.</li>
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
              <h2 className="font-ITCMedium text-xl font-semibold text-[#d71015] mb-4">
                Software Track
              </h2>

              {/* 1. First Round */}
              <h3 className="font-ITCMedium text-lg font-semibold text-[#d71015] mb-2">
                1. First Round (Idea Submission)
              </h3>

              <p className="text-[#E2DCD0] mb-3 text-base">
                <strong>Objective:</strong><br />
                This round evaluates your ability to identify a real-world software problem and
                propose an innovative solution.
              </p>

              <p className="text-[#E2DCD0] font-medium mb-2 text-base">
                <strong>Evaluation Criteria:</strong>
              </p>

              <ul className="list-disc list-inside text-[#E2DCD0] space-y-2 pl-4 text-base">
                <li>Creativity & Innovation</li>
                <li>Problem understanding</li>
                <li>Relevance to Open Innovation Theme</li>
                <li>Feasibility of implementation</li>
                <li>Impact & usefulness</li>
              </ul>

              <p className="text-[#E2DCD0] font-medium mb-2 mt-4 text-base">
                <strong>Important Notes:</strong>
              </p>

              <ul className="list-disc list-inside text-[#E2DCD0] space-y-2 pl-4 text-base">
                <li>This round evaluates ideas only, not coding.</li>
                <li>Shortlisted teams will proceed to the 24-hour Final Software Hackathon.</li>
              </ul>

              {/* 2. Final Round */}
              <h3 className="font-ITCMedium text-lg font-semibold text-[#d71015] mt-6 mb-2">
                2. Final Round Theme
              </h3>

              <ul className="list-disc list-inside text-[#E2DCD0] space-y-2 pl-4 text-base">
                <li>The specific problem statements will be revealed on the day of the hackathon.</li>
                <li>
                  Bonus point: Final solutions must be hosted/deployed or provided via a
                  demo-accessible environment.
                </li>
              </ul>
            </div>


            {/* Hardware Track */}
            <div>
              <h2 className="font-ITCMedium text-xl font-semibold text-[#d71015] mb-4 mt-14">
                Hardware Track
              </h2>

              {/* 1. First Round */}
              <h3 className="font-ITCMedium text-lg font-semibold text-[#d71015] mb-2">
                1. First Round (Idea Submission)
              </h3>

              <p className="text-[#E2DCD0] mb-3 text-base">
                <strong>Objective:</strong><br />
                Identify a real-world hardware problem and propose a meaningful, buildable
                hardware concept.
              </p>

              <p className="text-[#E2DCD0] font-medium mb-2 text-base">
                <strong>Evaluation Criteria:</strong>
              </p>

              <ul className="list-disc list-inside text-[#E2DCD0] space-y-2 pl-4 text-base">
                <li>Creativity & Innovation</li>
                <li>Clarity of problem understanding</li>
                <li>Practical feasibility</li>
                <li>Electronics/mechanical approach clarity</li>
                <li>Potential impact</li>
              </ul>

              {/* 2. Final Hardware Build Round */}
              <h3 className="font-ITCMedium text-lg font-semibold text-[#d71015] mt-6 mb-2">
                2. Final Hardware Build Round
              </h3>

              {/* 2.1 Build From Scratch */}
              <p className="text-[#E2DCD0] font-medium mb-2 text-base">
                <strong>1. Build From Scratch Rule</strong>
              </p>

              <p className="text-[#E2DCD0] text-base mb-2">
                Teams must assemble and build their hardware entirely on-site.
              </p>

              <p className="text-[#E2DCD0] font-medium text-base mb-2">
                Strictly NOT allowed:
              </p>

              <ul className="list-disc list-inside text-[#E2DCD0] space-y-2 pl-4 text-base">
                <li>Pre-assembled or partially assembled hardware</li>
                <li>Pre-soldered or pre-wired circuits</li>
                <li>Pre-programmed MCUs or boards</li>
                <li>Pre-loaded firmware</li>
              </ul>

              <p className="text-[#E2DCD0] text-base mt-2">
                Pre-assembled hardware projects will be immediately disqualified. Judges will
                inspect all components before the round starts.
              </p>

              {/* 2.2 Allowed to Bring */}
              <p className="text-[#E2DCD0] font-medium mt-4 mb-2 text-base">
                <strong>2. Allowed to Bring</strong>
              </p>

              <ul className="list-disc list-inside text-[#E2DCD0] space-y-2 pl-4 text-base">
                <li>Raw electronic components</li>
                <li>Modules, sensors, MCUs, motors, actuators</li>
                <li>Breadboards, wires, soldering tools</li>
                <li>Hand tools (screwdrivers, cutters, pliers)</li>
                <li>
                  Laptops with empty code editors or firmware templates (no prewritten code)
                </li>
              </ul>

              {/* 2.3 Final Round Theme Release */}
              <p className="text-[#E2DCD0] font-medium mt-4 mb-2 text-base">
                <strong>3. Final Round Theme Release</strong>
              </p>

              <ul className="list-disc list-inside text-[#E2DCD0] space-y-2 pl-4 text-base">
                <li>
                  Hardware track final problem statements will be given 3 days before the event.
                </li>
                <li>
                  Gives time to plan and buy components, but no pre-building.
                </li>
              </ul>

              {/* 2.4 Final Evaluation */}
              <p className="text-[#E2DCD0] font-medium mt-4 mb-2 text-base">
                <strong>4. Final Round Evaluation Criteria</strong>
              </p>

              <ul className="list-disc list-inside text-[#E2DCD0] space-y-2 pl-4 text-base">
                <li>Functionality of the prototype</li>
                <li>Electronics + mechanical implementation</li>
                <li>Robustness & practicality</li>
                <li>Innovation in hardware design</li>
              </ul>
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
              For assistance, contact us at{" "}
              <a
                href="tel:7907214758"
                className="text-[#d71015] font-medium hover:underline"
              >
                7907214758 (Gayathri M S)
              </a>{" "}
              or{" "}
              <a
                href="tel:9995353403"
                className="text-[#d71015] font-medium hover:underline"
              >
                9995353403 (Basil Mathews Biju)
              </a>
              .
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
             <a  href="/Pegasus4_Template.pptx" download>
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
