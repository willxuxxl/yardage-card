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
  <div className="p-2 text-[13px] w-full max-w-md mx-auto">
    <div className="text-center mb-2">
      <h2 className="font-bold text-lg">
        YARDAGE CARD (
        <input
          className="border-b border-gray-400 text-center font-normal"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />)
      </h2>
    </div>

    <table className="w-full border border-gray-400 text-center text-[13px] whitespace-nowrap">
      <thead className="bg-blue-100">
        <tr>
          <th className="border px-1 py-1 w-[8%]">#</th>
          <th className="border px-1 py-1 w-[18%]">CLUBS</th>
          <th className="border px-1 py-1 w-[17%]">CARRY</th>
          <th className="border px-1 py-1 w-[17%]">TOTAL</th>
          <th className="border px-1 py-1 w-[20%] text-[11px]">CLUB SPEED</th>
          <th className="border px-1 py-1 w-[20%] text-[11px]">BALL SPEED</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <>
            <tr key={idx}>
              <td className="border px-1 py-[3px]">{idx + 1}</td>
              <td className="border px-1 py-[3px] font-bold italic">
                <input
                  className="w-full text-center"
                  value={row.club}
                  onChange={(e) => handleChange(idx, "club", e.target.value)}
                />
              </td>
              <td className="border px-1 py-[3px] bg-yellow-200">
                <input
                  type="number"
                  className="w-full text-center"
                  value={row.carry}
                  onChange={(e) => handleChange(idx, "carry", e.target.value)}
                />
              </td>
              <td className="border px-1 py-[3px] bg-yellow-200">
                <input
                  type="number"
                  className="w-full text-center"
                  value={row.total}
                  onChange={(e) => handleChange(idx, "total", e.target.value)}
                />
              </td>
              <td className="border px-1 py-[3px]">
                <input
                  className="w-full text-center"
                  value={row.clubSpeed}
                  onChange={(e) => handleChange(idx, "clubSpeed", e.target.value)}
                />
              </td>
              <td className="border px-1 py-[3px]">
                <input
                  className="w-full text-center"
                  value={row.ballSpeed}
                  onChange={(e) => handleChange(idx, "ballSpeed", e.target.value)}
                />
              </td>
            </tr>
            <tr className="text-[11px] text-gray-500">
              <td className="border px-1 py-[1px]"></td>
              <td className="border px-1 py-[1px]"></td>
              <td className="border px-1 py-[1px]">{getCarryGap(idx)}</td>
              <td className="border px-1 py-[1px]">{getRoll(idx)}</td>
              <td className="border px-1 py-[1px]"></td>
              <td className="border px-1 py-[1px]"></td>
            </tr>
          </>
        ))}
      </tbody>
    </table>

    <div className="mt-3 text-center">
      <button
        onClick={saveData}
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        Save Yardage Card
      </button>
    </div>
  </div>
);
}