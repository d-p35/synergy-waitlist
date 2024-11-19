import React, { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "@/firebaseConfig";
import Alert from "../components/alert";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";

type Props = {};

export function LandingPage({}: Props) {
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    duration: number;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setIsSubmitting(true);

    const db = getFirestore(app);
    const emailCollection = collection(db, "waitlist");

    // Function to check if the email exists in the Firestore collection
    const checkIfEmailExists = async (email: string) => {
      try {
        // Create a query to find documents where the email field matches the provided email
        const q = query(emailCollection, where("email", "==", email));

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Check if any document was returned
        if (querySnapshot.empty) {
          console.log("Email does not exist.");
          return false; // Email does not exist
        } else {
          console.log("Email already exists.");
          return true; // Email exists
        }
      } catch (error) {
        console.error("Error checking email:", error);
        return false; // In case of error, consider the email as non-existing
      }
    };

    try {
      // Logic to not add duplicate emails to the waitlist
      // if (await checkIfEmailExists(formData.email)) {
      //   setAlert({
      //     message: "Email already exists in the waitlist.",
      //     type: "error",
      //     duration: 5000,
      //   });
      //   setFormData({ fullName: "", email: "" }); // Reset the form
      //   setIsSubmitting(false);
      //   return;
      // }

      const docRef = await addDoc(emailCollection, formData);
      setAlert({
        message: "You are now on the waitlist.",
        type: "success",
        duration: 5000,
      });
      setFormData({ fullName: "", email: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding to waitlist: ", error);
      setAlert({
        message: "Failed to add to waitlist",
        type: "error",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-neutral-950 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background Beams */}
      <div className="absolute inset-0 z-0">
        <BackgroundBeams />
      </div>

      {/* Alert Component */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          duration={alert.duration}
        />
      )}

      {/* Form and Text */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-4">
          <img
            src="/syn.png"
            alt="Synergy Logo"
            className="h-24 w-24 mx-auto rounded-full shadow-lg bg-neutral-900 p-2"
          />
        </div>
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Synergy
        </h1>
        <p className="text-gray-400 mt-3 max-w-md mx-auto">
          Join the waitlist for Synergy and experience psychology-backed
          compatibility matching.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 max-w-md mx-auto"
        >
          {/* Full Name Input */}
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full py-3 px-4 bg-neutral-900 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-neutral-800 placeholder:text-gray-500"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full py-3 px-4 bg-neutral-900 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-neutral-800 placeholder:text-gray-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium text-white transform transition-transform ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 hover:scale-105"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Adding...</span>
              </div>
            ) : (
              "Join Waitlist"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">
          Designed by Synergy. Built to connect.
        </p>
      </div>
    </div>
  );
}
