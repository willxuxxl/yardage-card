<<<<<<< HEAD
import YardageCardMobile from './YardageCardMobile'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <YardageCardMobile />
    </div>
  )
}

export default App 
=======
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import LoginPage from "./LoginPage";
import YardageCardMobile from "./YardageCardMobile";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return user ? (
    <div className="relative">
      <button
        onClick={handleLogout}
        className="absolute top-2 right-4 text-sm bg-red-500 text-white px-2 py-1 rounded"
      >
        Logout
      </button>
      <YardageCardMobile />
    </div>
  ) : (
    <LoginPage onLogin={() => setUser(auth.currentUser)} />
  );
}
>>>>>>> 2e29799594c271cea7e9e671c318e46ad15b9f12
