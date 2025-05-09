import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const defaultClubs = Array.from({ length: 14 }, () => ({
  club: "",
  carry: "",
  total: "",
  clubSpeed: "",
  ballSpeed: ""
}));

export default function YardageCardMobile() {
  const [data, setData] = useState(defaultClubs);
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { name, clubs } = docSnap.data();
        setPlayerName(name || "");
        setData(clubs || defaultClubs);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = field === "club" ? value : parseFloat(value) || "";
    setData(newData);
  };

  const getCarryGap = (index) => {
    if (index >= data.length - 1) return "";
    const currentCarry = data[index].carry;
    const nextCarry = data[index + 1].carry;
    return currentCarry && nextCarry ? currentCarry - nextCarry : "";
  };

  const getRoll = (index) => {
    const { carry, total } = data[index];
    return carry && total ? total - carry : "";
  };

  const saveData = async () => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {
      name: playerName,
      clubs: data
    });
    alert("Yardage card saved successfully.");
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="p-2 w-full max-w-md mx-auto">
      <div className="text-center mb-2">
        <h2 className="font-bold text-xl mb-1">YARDAGE CARD</h2>
        <div className="text-base font-semibold mb-2">
          <input
            className="border-b border-gray-400 text-center font-normal w-40 bg-transparent outline-none"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Player Name"
          />
        </div>
        <div className="text-xs text-gray-500 mb-2">ID: {user?.uid?.slice(0, 8) || "-"}</div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="w-full min-w-[500px] border-separate border-spacing-0 text-center text-[13px] whitespace-nowrap rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="border-2 border-gray-400 px-1 py-2 w-[8%] font-bold">#</th>
              <th className="border-2 border-gray-400 px-1 py-2 w-[18%] font-bold">CLUBS</th>
              <th className="border-2 border-gray-400 px-1 py-2 w-[17%] font-bold">CARRY<br/>(m)</th>
              <th className="border-2 border-gray-400 px-1 py-2 w-[17%] font-bold">TOTAL<br/>(m)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <>
                <tr key={idx} className="">
                  <td className="border-2 border-gray-400 px-1 py-2 bg-gray-50 font-semibold">{idx + 1}</td>
                  <td className="border-2 border-gray-400 px-1 py-2 font-bold italic bg-white">
                    <input
                      className="w-full text-center bg-transparent font-bold italic outline-none"
                      value={row.club}
                      onChange={(e) => handleChange(idx, "club", e.target.value)}
                    />
                  </td>
                  <td className="border-2 border-gray-400 px-1 py-2" style={{ background: '#fff700' }}>
                    <input
                      type="number"
                      className="w-full text-center bg-transparent font-semibold outline-none"
                      value={row.carry}
                      onChange={(e) => handleChange(idx, "carry", e.target.value)}
                    />
                  </td>
                  <td className="border-2 border-gray-400 px-1 py-2" style={{ background: '#fff700' }}>
                    <input
                      type="number"
                      className="w-full text-center bg-transparent font-semibold outline-none"
                      value={row.total}
                      onChange={(e) => handleChange(idx, "total", e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="text-[11px] text-gray-500">
                  <td className="border-2 border-gray-400 px-1 py-1 bg-gray-50"></td>
                  <td className="border-2 border-gray-400 px-1 py-1 bg-white"></td>
                  <td className="border-2 border-gray-400 px-1 py-1 bg-white">{getCarryGap(idx)}</td>
                  <td className="border-2 border-gray-400 px-1 py-1 bg-white">{getRoll(idx)}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={saveData}
          className="bg-green-600 text-white py-2 px-4 rounded shadow-md text-base font-semibold"
        >
          Save Yardage Card
        </button>
      </div>
    </div>
  );
} 