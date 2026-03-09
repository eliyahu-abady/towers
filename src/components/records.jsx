import { useEffect, useState } from "react";
import { useAuth } from "./authcontext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { fetchrecords } from "../firestoremanager";

function Records() {
  const [records, setRecords] = useState();
  const { user } = useAuth();

  const resetRecords = async () => {
    try {
      setRecords({});
      await setDoc(
        doc(db, "users", user.uid),
        { records: {} },
        { merge: true },
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      setRecords({});
      return;
    }

    const fetch = async () => {
      const data = await fetchrecords(user.uid);
      setRecords(data);
    };
    fetch();
  }, [user]);

  if (!user) return <p className="text-[40px] mt-20">signin to save records</p>;
  if (!records) return <p className="text-[40px] mt-20">loading...</p>;
  if (Object.keys(records).length === 0)
    return <p className="text-2xl mt-20">play to create records</p>;

  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        hello {user ? user.email : ""}
      </h1>
      <h2 className="text-2xl mb-8">records</h2>

      <table className="w-full max-w-xs text-xl mb-10 mx-auto">
        <tbody>
          {Object.entries(records).map(([key, value]) => (
            <tr key={key} className="border-b border-black/10 last:border-0">
              <th className="py-3 text-right pr-4 font-normal">level {key}:</th>
              <td className="py-3 text-left pl-4 font-mono">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => resetRecords()}
        className="px-6 py-2 bg-red-100 text-red-600 border border-red-200 rounded hover:bg-red-200 transition-colors"
      >
        reset records
      </button>
    </div>
  );
}

export default Records;
