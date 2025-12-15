"use client";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebaseConfig";
import { collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import DialogBox from "./DialogBox";
import exportToExcel from "./exportToExcel";

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const router = useRouter();

  const auth = getAuth();

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "peg4"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedData = data.sort((a, b) =>
        a.teamName.localeCompare(b.teamName)
      );

      setRegistrations(sortedData);
    } catch (error) {
      console.error("Error fetching registrations: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    if (user) fetchRegistrations();
  }, [user]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this registration?")) {
      try {
        await deleteDoc(doc(db, "peg4", id));
        alert("Registration deleted successfully.");
        fetchRegistrations();
      } catch (error) {
        console.error("Error deleting registration:", error);
      }
    }
  };

  const handleConfirm = async (id) => {
    try {
      await updateDoc(doc(db, "peg4", id), { status: "confirmed" });
      alert("Registration shortlisted successfully.");
      fetchRegistrations();
    } catch (error) {
      console.error("Error confirming registration:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateDoc(doc(db, "peg4", id), { status: "rejected" });
      alert("Registration rejected successfully.");
      fetchRegistrations();
    } catch (error) {
      console.error("Error rejecting registration:", error);
    }
  };

  const filteredRegistrations = registrations.filter((registration) =>
    registration.teamName.toLowerCase().includes(search.toLowerCase())
  );

  const DialogOpen = (member) => {
    setDialogOpen(true);
    setSelectedMember(member);
  };

  return (
    <div className="min-h-screen p-4 bg-[#111111] text-white">
      <div className="flex justify-between items-center mb-6 md:flex-row flex-col gap-5 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-red-500">
          Admin Panel - Team Registrations
        </h1>

        <div className="flex gap-5 justify-center items-center">
          <div>
            <button
              onClick={() => exportToExcel(registrations)}
              className="px-4 py-2 bg-green-700 rounded-lg text-white font-semibold hover:bg-green-800 transition duration-300"
            >
              Export to Excel
            </button>
          </div>

          <div className="bg-red-700 text-center py-2 px-2 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-white">
              Count : <span>{registrations.length}</span>
            </p>
          </div>
        </div>

        <span className="animate-bounce py-2 px-2 underline">
          Tap each participant to view more
        </span>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by team name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-full rounded bg-white/70 text-black placeholder-black"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading registrations...</p>
      ) : filteredRegistrations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-white-800">
            <thead>
              <tr className="bg-white-900">
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  Ticket Number
                </th>
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  Team Name
                </th>
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  Track
                </th>
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  Idea Title
                </th>
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  College Name
                </th>
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  Team Leader
                </th>
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  Team Members
                </th>
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  Phone Number
                  <span className="block text-sm text-white font-light">
                    (click to call)
                  </span>
                </th>
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  Abstract
                </th>
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  Status
                </th>
                <th className="border border-white-800 text-red-500 p-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-white-900">
                  <td className="border border-white-800 p-2">
                    {registration.ticketNumber}
                  </td>

                  <td className="border border-white-800 p-2">
                    {registration.teamName}
                  </td>

                  <td className="border border-white-800 p-2">
                    {registration.track}
                  </td>

                  <td className="border border-white-800 p-2">
                    {registration.teamIdeaTitle}
                  </td>

                  <td className="border border-white-800 p-2 capitalize">
                    {registration.teamLeader.clg.toLowerCase()}
                  </td>

                  <td
                    className="border border-white-800 p-2 hover:bg-red-600 cursor-pointer capitalize"
                    onClick={() => DialogOpen(registration.teamLeader)}
                  >
                    {registration.teamLeader.fname.toLowerCase()}{" "}
                    {registration.teamLeader.lname.toLowerCase()}
                  </td>

                  <td className="border border-white-800 p-0">
                    {registration.teamMembers?.length > 0 ? (
                      <table className="w-full">
                        <tbody>
                          {registration.teamMembers.map((member, index) => (
                            <tr
                              key={index}
                              className="hover:bg-red-600 cursor-pointer capitalize"
                              onClick={() => DialogOpen(member)}
                            >
                              <td className="p-2 border-b border-white-800">
                                {member.fname.toLowerCase()}{" "}
                                {member.lname.toLowerCase()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-gray-400 italic">No members</div>
                    )}
                  </td>

                  <td className="border border-white-800 p-2">
                    <a href={`tel:${registration.teamLeader.phone}`}>
                      {registration.teamLeader.phone}
                    </a>
                  </td>

                  <td className="border border-white-800 p-2">
                    <a
                      href={registration.abstractPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 underline"
                    >
                      View Abstract
                    </a>
                  </td>

                  <td
                    className={`border border-white-800 p-2 italic ${
                      registration.status === "pending"
                        ? "text-gray-400"
                        : registration.status === "confirmed"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {registration.status}
                  </td>

                  <td className="border border-white-800 p-2">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleDelete(registration.id)}
                        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition duration-300 text-sm"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleConfirm(registration.id)}
                        className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 transition duration-300 text-sm"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() => handleReject(registration.id)}
                        className="px-3 py-1 bg-yellow-600 rounded hover:bg-yellow-700 transition duration-300 text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No registrations found.</p>
      )}

      {isDialogOpen && (
        <DialogBox
          setDialogOpen={setDialogOpen}
          member={selectedMember}
          setSelectedMember={setSelectedMember}
        />
      )}
    </div>
  );
};

export default AdminPanel;
