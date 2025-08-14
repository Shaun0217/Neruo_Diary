// src/AdminRoute.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import AdminPanel from "./AdminPanel";

const allowedEmail = "you@yourdomain.com"; // CHANGE THIS

export default function AdminRoute() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="mb-4 text-lg font-bold">Admin Login</h2>
        <button
          onClick={() => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  if (user.email !== allowedEmail) {
    return (
      <div className="p-6 text-center">
        <p>Access denied.</p>
        <button
          onClick={() => signOut(auth)}
          className="px-4 py-2 mt-4 bg-red-500 text-white rounded-lg"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end p-4">
        <button
          onClick={() => signOut(auth)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Sign out
        </button>
      </div>
      <AdminPanel />
    </div>
  );
}
