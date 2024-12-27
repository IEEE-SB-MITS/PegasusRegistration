"use client";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebaseConfig";
import { collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import DialogBox from "./DialogBox";

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
      const querySnapshot = await getDocs(collection(db, "pegasus_registrations"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRegistrations(data);
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
    if (user) {
      fetchRegistrations();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this registration?")) {
      try {
        await deleteDoc(doc(db, "pegasus_registrations", id));
        alert("Registration deleted successfully.");
        fetchRegistrations();
      } catch (error) {
        console.error("Error deleting registration: ", error);
      }
    }
  };

  const handleConfirm = async (id) => {
    try {
      await updateDoc(doc(db, "pegasus_registrations", id), { status: "confirmed" });
      alert("Registration confirmed successfully.");
      fetchRegistrations();
    } catch (error) {
      console.error("Error confirming registration: ", error);
    }
  };

  const filteredRegistrations = registrations.filter((registration) =>
    registration.teamName.toLowerCase().includes(search.toLowerCase())
  );

  const DialogOpen = (member) =>{
    setDialogOpen(true);
    setSelectedMember(member);
  }

  return (
    <div className="min-h-screen p-4 bg-[#111111] text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-red-500">Admin Panel - Team Registrations</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by team name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-full border border-red-700 rounded bg-red-900 text-white focus:outline-none focus:border-red-500"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading registrations...</p>
      ) : filteredRegistrations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-white-800">
            <thead>
              <tr className="bg-white-900">
              <th className="border border-white-800 text-red-500 p-2 text-left">Ticket Number</th>
                <th className="border border-white-800 text-red-500 p-2 text-left">Team Name</th>
                <th className="border border-white-800 text-red-500 p-2 text-left">Idea Title</th>
                <th className="border border-white-800 text-red-500 p-2 text-left">Team Leader</th>
                <th className="border border-white-800 text-red-500 p-2 text-left">Team Members</th>
                <th className="border border-white-800 text-red-500 p-2 text-left">Phone Number</th>
                <th className="border border-white-800 text-red-500 p-2 text-left">Abstract</th>
                <th className="border border-white-800 text-red-500 p-2 text-left">Status</th>
                <th className="border border-white-800 text-red-500 p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-white-900">
                  <td className="border border-white-800 p-2">{registration.ticketNumber}</td>
                  <td className="border border-white-800 p-2">{registration.teamName}</td>
                  <td className="border border-white-800 p-2">{registration.teamIdeaTitle}</td>
                  <td className="border border-white-800 p-2 hover:bg-red-600  cursor-pointer capitalize"
                    onClick={()=> DialogOpen(registration.teamLeader)}>
                    {registration.teamLeader.fname.toLowerCase()} {registration.teamLeader.lname}
                  </td>
                  <td className="border border-white-800 p-0">
                    {registration.teamMembers && registration.teamMembers.length > 0 ? (
                      <table className="w-full">
                        <tbody>
                          {registration.teamMembers.map((member, index) => (
                            <tr
                              key={index}
                              className="hover:bg-red-600 cursor-pointer capitalize"
                              onClick={() =>DialogOpen(member)}
                            >
                              <td className="p-2 border-b border-white-800">
                                {member.fname.toLowerCase()} {member.lname.toLowerCase()}
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
                    {registration.teamLeader.phone}
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
                  <td className="border border-white-800 p-2 text-gray-400 italic">{registration.status}</td>
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
                        Confirm
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

      {isDialogOpen && <DialogBox setDialogOpen={setDialogOpen} member={selectedMember} setSelectedMember={setSelectedMember}/>}
    </div>
  );
};

export default AdminPanel;

