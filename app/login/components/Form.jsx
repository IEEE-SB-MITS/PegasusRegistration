'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '@/utils/firebaseConfig'; // Ensure this path is correct

const LoginPage = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const db = getFirestore(app);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const q = query(
        collection(db, 'pegasus_registrations'),
        where('ticketNumber', '==', ticketNumber),
        where('teamLeader.email', '==', email)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Invalid ticket number or email. Please try again.');
      } else {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        localStorage.setItem('userId', userId);
        router.push('/ticket');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full md:w-3/4 mx-auto flex items-center justify-center bg-[#070707] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-6 sm:p-10 rounded-xl shadow-lg flex flex-col justify-center items-center">
        <div>
          <h2 className="mt-6 text-center text-3xl sm:text-4xl font-extrabold text-[#D71015] mb-6">
            Login to Pegasus
          </h2>
        </div>
        <form className="mt-8 space-y-6 flex flex-col justify-center items-center w-full" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px w-full">
            <div className="mb-4">
              <label htmlFor="ticket-number" className="block text-white text-sm font-medium mb-2">
                Ticket Number<span className="text-red-600">*</span>
              </label>
              <input
                id="ticket-number"
                name="ticket-number"
                type="text"
                required
                className="w-full p-3 border bg-[#1A1A1A] border-[#666262] rounded focus:ring-2 focus:ring-[#D71015] focus:border-transparent transition duration-200 text-white"
                placeholder="#00000"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email-address" className="block text-white text-sm font-medium mb-2">
                Team Leader's Email address<span className="text-red-600">*</span>
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full p-3 border bg-[#1A1A1A] border-[#666262] rounded focus:ring-2 focus:ring-[#D71015] focus:border-transparent transition duration-200 text-white"
                placeholder="someone@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative px-8 sm:px-14 py-3 font-bold text-[#E2DCD0] group bg-[#D71015] rounded-xl hover:bg-[#B40E13] transition-all duration-300 ease-in-out w-full sm:w-auto"
              style={{
                boxShadow: "2px 2px 0px rgba(255, 255, 255, 0.7)",
              }}
            >
              <span className="relative text-xl sm:text-2xl">{isLoading ? 'Logging in...' : 'Log in'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

