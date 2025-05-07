import { useState } from "react";
import { auth } from "./firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginPage({ onLogin }) {
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto text-sm">
      <h2 className="text-lg font-bold text-center mb-4">Login to Yardage Card</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button
        className="w-full p-2 bg-gray-800 text-white rounded mb-2"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
    </div>
  );
}
