import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { useAuth } from "../authcontext";
import { doc, setDoc } from "firebase/firestore";
import { fetchrecords } from "../../firestoremanager";
import medal from "../icons/medal.svg";

function Game() {
  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setRecords({});
      setLoading(false);
      return;
    }

    const fetch = async () => {
      try {
        const data = await fetchrecords(user.uid);
        setRecords(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  if (loading) return <p className="text-4xl text-center mt-10">טוען...</p>;

  return <ActiveGame user={user} initialRecords={records} />;
}

function Ring({ level }) {
  return (
    <div
      className="flex items-center justify-center bg-black/70 text-white rounded-[15px] z-10 shrink-0"
      style={{ height: 20 + level * 4, width: 100 + level * 20 }}
    >
      <p className="m-0">{level}</p>
    </div>
  );
}

function Column({ arrayData, index: indexColumn, color, onColumnClick }) {
  return (
    <button
      className="relative flex flex-col justify-end items-center h-[250px] sm:h-[350px] w-full max-w-[200px] mx-1 sm:mx-4 border border-transparent hover:border-black bg-[#faebd7] p-0 transition-colors focus:outline-none"
      onClick={() => onColumnClick(indexColumn)}
    >
      <div
        className="absolute bottom-0 h-[220px] sm:h-[300px] w-[20px] sm:w-[30px] z-0"
        style={{ backgroundColor: color }}
      ></div>
      {arrayData.map((ring, indexRing) => (
        <Ring key={indexRing} level={ring} />
      ))}
    </button>
  );
}

function ActiveGame({ user, initialRecords }) {
  const [dataGame, setDataGame] = useState([[1], [2], []]);
  const [lifting, setLifting] = useState(null);
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(0);
  const [duration, setDuration] = useState([]);

  const lift = (index) => {
    if (dataGame[index].length === 0) return;
    const ring = dataGame[index][0];
    setLifting(ring);
    setDataGame((prev) => {
      const newData = [...prev];
      newData[index] = prev[index].slice(1);
      return newData;
    });
  };

  const place = (index) => {
    if (lifting < dataGame[index][0] || dataGame[index].length === 0) {
      setDataGame((prev) => {
        const newData = [...prev];
        newData[index] = [lifting, ...prev[index]];
        return newData;
      });
      setLifting(null);
    }
  };

  const handleClickColumn = (index) => {
    if (![0, 1, 2].includes(index)) return;
    if (lifting) {
      place(index);
    } else {
      lift(index);
    }
  };

  const levelComplated = async (level, duration) => {
    if (!user) {
      setDuration((prev) => [...prev, { level, timer, recordBroken: false }]);
      return;
    }
    const docRef = doc(db, "users", user.uid);
    const currentRecord = initialRecords?.[level];
    if (currentRecord > duration || currentRecord === undefined) {
      try {
        await setDoc(
          docRef,
          { records: { [level]: duration } },
          { merge: true },
        );
        setDuration((prev) => [...prev, { level, timer, recordBroken: true }]);
      } catch (error) {
        console.log(error);
      }
    } else {
      setDuration((prev) => [...prev, { level, timer, recordBroken: false }]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = parseInt(event.key - 1);
      handleClickColumn(key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dataGame]);

  useEffect(() => {
    if (upLevel()) {
      levelComplated(level, timer);
      const newLevel = level + 1;
      setLevel(newLevel);
      setDataGame((prev) => {
        const newData = [...prev];
        const targetIndex = dataGame[0].length === 0 ? 0 : 1;
        newData[targetIndex] = [newLevel + 1];
        return newData;
      });
      setTimer(0);
    }
  }, [dataGame]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 10);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const displayNum = (num) => {
    const second = Math.floor(num / 100);
    const hundredths = String(num % 100).padStart(2, "0");
    return `${second}.${hundredths}`;
  };

  function upLevel() {
    return (
      ((dataGame[0].length === 0 && dataGame[1].length === 0) ||
        (dataGame[0].length === 0 && dataGame[2].length === 0) ||
        (dataGame[1].length === 0 && dataGame[2].length === 0)) &&
      lifting === null
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto items-center lg:items-start gap-8 mt-8 px-4">
      {/* אזור הטיימר והשיאים */}
      <div className="w-full lg:w-[200px] flex flex-col items-center lg:items-start order-2 lg:order-1">
        <div className="text-5xl font-mono mb-4">{displayNum(timer)}</div>
        <table className="w-full max-w-[300px] text-left text-lg">
          <tbody>
            {duration.map((record, index) => (
              <tr key={index}>
                <th className="py-1 pr-2 font-normal">רמה {record.level}:</th>
                <td className="py-1 px-2">{displayNum(record.timer)}</td>
                <td className="py-1 pl-2">
                  {record.recordBroken && (
                    <img
                      src={medal}
                      alt="שיא חדש"
                      className="w-6 h-6 inline-block"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* אזור המשחק המרכזי */}
      <div
        dir="ltr"
        className="flex-1 flex flex-col items-center w-full order-1 lg:order-2"
      >
        <h1 className="text-4xl md:text-[3.2em] leading-[1.1] font-bold mb-8 text-center capitalize">
          מגדלי האינוי
        </h1>

        {/* אזור הטבעת המורמת */}
        <div className="h-[100px] w-full flex items-center justify-center mb-4">
          {lifting && <Ring level={lifting} />}
        </div>

        {/* העמודות */}
        <div className="flex justify-center items-end w-full max-w-3xl">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <Column
                key={index}
                arrayData={dataGame[index]}
                index={index}
                color={"red"}
                onColumnClick={handleClickColumn}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
