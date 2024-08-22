import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '@/firebaseConfig';
import Alert from '../components/alert';
import { BackgroundBeams } from '@/components/ui/background-beams';
import Guru from '@/components/robo';

type Props = {};

export function LandingPage({}: Props) {
  const [email, setEmail] = useState<string>('');
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning'; duration: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset the alert before processing a new submission
    setAlert(null);

    const db = getFirestore(app);
    const emailCollection = collection(db, 'waitlist');

    try {
      await addDoc(emailCollection, { email });
      setAlert({ message: 'You are now on the waitlist.', type: 'success', duration: 5000 });
      setEmail(''); // Clear the email input field after successful submission
    } catch (error) {
      console.error('Error adding email to waitlist: ', error);
      setAlert({ message: 'Failed to add email to waitlist', type: 'error', duration: 5000 });
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased text-gray-50 overflow-hidden">
      {alert && <Alert message={alert.message} type={alert.type} duration={alert.duration} />}
      
      {/* Particle animation overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <BackgroundBeams />
        <div className="absolute inset-0">
          {/* Add particle animation here */}
        </div>
      </div>

     <div className='flex flex-row justify-around items-center'>
       <div className="max-w-3xl mx-auto p-6 relative z-10 animate-fade-in bg-black bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-blue-500 animate-text shadow-lg neon-effect">
            Guru Nimbus
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto my-4 text-sm text-center">
            Building GuruNimbus, an advanced AI-powered RAG chatbot that intelligently guides you in rating and discovering the best professors.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <input
              type="email"
              placeholder="Enter your email..."
              className="rounded-lg p-3 w-full bg-neutral-950 text-gray-300 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transform transition-transform duration-300 hover:scale-105 floating-effect"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 text-white py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:from-indigo-600 hover:via-purple-600 hover:to-blue-700 hover:-translate-y-1 hover:scale-105 shadow-3xl neon-button"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
