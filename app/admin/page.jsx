"use client";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebaseConfig";
import { collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null); // Track user authentication state
  const router = useRouter(); // Router for redirecting unauthenticated users

  // Firebase Auth instance
  const auth = getAuth();

  // Fetch data from Firestore
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

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if authenticated
      } else {
        setUser(null); // Unset user if not authenticated
        router.push("/admin/login"); // Redirect to login if not authenticated
      }
    });

    // Cleanup the listener
    return () => unsubscribe();
  }, [auth, router]);

  // Fetch data once the user is authenticated
  useEffect(() => {
    if (user) {
      fetchRegistrations();
    }
  }, [user]);

  // Delete a registration
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

  // Confirm a registration
  const handleConfirm = async (id) => {
    try {
      await updateDoc(doc(db, "pegasus_registrations", id), { status: "confirmed" });
      alert("Registration confirmed successfully.");
      fetchRegistrations();
    } catch (error) {
      console.error("Error confirming registration: ", error);
    }
  };

  // Filtered data based on search
  const filteredRegistrations = registrations.filter((registration) =>
    registration.teamName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - Team Registrations</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by team name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-full md:w-1/3 border border-gray-600 rounded bg-gray-800 text-white"
        />
      </div>

      {loading ? (
        <p>Loading registrations...</p>
      ) : filteredRegistrations.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-2">Team Name</th>
              <th className="border border-gray-700 p-2">Idea Title</th>
              <th className="border border-gray-700 p-2">Leader Name</th>
              <th className="border border-gray-700 p-2">Members</th>
              <th className="border border-gray-700 p-2">Phone Number</th>
              <th className="border border-gray-700 p-2">Abstract</th>
              <th className="border border-gray-700 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((registration) => (
              <tr key={registration.id} className="hover:bg-gray-800">
                <td className="border border-gray-700 p-2">{registration.teamName}</td>
                <td className="border border-gray-700 p-2">{registration.teamIdeaTitle}</td>
                <td className="border border-gray-700 p-2">
                  {registration.teamLeader.fname} {registration.teamLeader.lname}
                </td>
                <td className="border border-gray-700 p-2">
                  {registration.teamMembers.length} members
                </td>
                <td className="border border-gray-700 p-2">
                  {registration.teamLeader.phone}
                </td>
                <td className="border border-gray-700 p-2">
                  <a
                    href={registration.abstractPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    View Abstract
                  </a>
                </td>
                <td className="border border-gray-700 p-2">
                  <button
                    onClick={() => handleDelete(registration.id)}
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleConfirm(registration.id)}
                    className="px-4 mx-2 py-2 bg-green-600 rounded hover:bg-green-500"
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No registrations found.</p>
      )}
    </div>
  );
};

export default AdminPanel;
