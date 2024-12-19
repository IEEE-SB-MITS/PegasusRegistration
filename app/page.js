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
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center px-6 py-10">
      {/* Container */}
      <div className="bg-[#121212] rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#D61015] underline">
          Pegasus 3.0 First Round Guidelines
        </h1>
        <p className="text-[#E0E0E0] text-center mb-8">
          Welcome to the First round of Pegasus 3.0! This round is designed to
          shortlist the top teams who will advance to the final hackathon. Please
          carefully follow the instructions below to ensure your submission meets
          the requirements.
        </p>

        <div className="space-y-6">
          {/* Theme */}
          <section className="bg-[#1F1F1F] rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center text-[#D61015] underline">
              Theme: Assistive Technology and Innovation
            </h2>
            <p className="text-[#D6D6D6] text-sm">
              This is only the first round. Specific problem statements will be
              provided in the final hackathon.
            </p>
          </section>

          {/* Overview */}
          <section className="bg-[#1F1F1F] rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#D61015] underline">
              Overview
            </h2>
            <ul className="list-disc list-inside text-[#D6D6D6] text-sm space-y-2">
              <li>
                All teams are required to submit their proposed solutions using
                the attached 4-slide PowerPoint template.
              </li>
              <li>
                Submissions outside the template or exceeding the number of
                slides will be disqualified.
              </li>
              <li>Team Size: Each team must consist of 1 to 4 members.</li>
            </ul>
          </section>

          {/* Submission Rules */}
          <section className="bg-[#1F1F1F] rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#D61015] underline">
              Submission Rules
            </h2>
            <ul className="list-disc list-inside text-[#D6D6D6] text-sm space-y-2">
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
              <li>
                No content overflow is allowed; submissions exceeding 4 slides
                will be disqualified.
              </li>
              <li>
                Submission Deadline:{" "}
                <strong className="text-[#D61015]">29 December 2024</strong>.
              </li>
              <li>
                File Naming:{" "}
                <code className="bg-[#020202] px-1 rounded">Team_Name.pptx</code>.
              </li>
            </ul>
          </section>

          {/* Shortlisting Process */}
          <section className="bg-[#1F1F1F] rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#D61015] underline">
              Shortlisting Process
            </h2>
            <ul className="list-disc list-inside text-[#D6D6D6] text-sm space-y-2">
              <li>Initial Screening: Ensure compliance with the rules.</li>
              <li>
                Judging Panel: Select top teams based on creativity, relevance,
                and practicality.
              </li>
            </ul>
          </section>

          {/* Important Note */}
          <section className="bg-[#1F1F1F] rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#D61015] underline">
              Important Note
            </h2>
            <p className="text-[#D6D6D6] text-sm">
              This First round is a standalone phase. The theme remains the same,
              but specific problem statements will be given in the final round.
            </p>
            <p className="text-[#D6D6D6] text-sm mt-4">
              For assistance, contact us at{" "}
              <span className="text-[#D61015] font-medium">9037002156</span>.
            </p>
          </section>

          {/* Attached Template */}
          <section className="bg-[#1F1F1F] rounded-lg p-6 shadow-md text-center">
            <h3 className="text-lg font-medium text-[#D61015] underline pb-6">
              Attached PPT Template
            </h3>
            <a
              href="https://docs.google.com/presentation/d/1WmTCyeby1MXNkEXdFFN79cqkVphZWHEObXFkelN-flE/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-white font-bold text-sm w-[9em] h-[3em] inline-flex items-center justify-center bg-gradient-to-r from-[#D61015] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#D61015] transition-all rounded-lg"
            >
              Download Template
            </a>
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
              className="w-5 h-5 text-[#D61015] bg-[#020202] border-gray-700 rounded focus:ring-[#D61015]"
            />
            <label htmlFor="agree" className="text-[#D6D6D6] text-sm">
              I have read and agree to the guidelines.
            </label>
          </div>

          <button
            onClick={handleContinue}
            disabled={!agreed}
            className={`mt-4 px-6 py-2 rounded-md text-sm font-medium transition ${
              agreed
                ? "bg-[#D61015] text-black hover:bg-[#D4AF37]"
                : "bg-[#2E2E2E] text-[#888] cursor-not-allowed"
            }`}
          >
            Continue to Register
          </button>
        </div>
      </div>
    </div>
  );
}
