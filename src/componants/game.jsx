import { useState, useEffect } from "react"
import {db} from "./../config/firebase"
import { useAuth } from "./authcontext"
import { doc, setDoc } from "firebase/firestore"
import { fetchrecords } from "../firestoremanager"



function Game() {
  const [records, setRecords] = useState()
  const [loading, setLoading] = useState(true)
  const {user} = useAuth()

  useEffect(() => {
   
    if(!user) {
        setRecords({})
        setLoading(false)
        return
    }

    const fetch = async () => {
      try {
        const data = await fetchrecords(user.uid)
        setRecords(data)
      } catch(e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [user])

  if (loading) return (<p className="loading">loading...</p>)

 
 
  return <ActiveGame user={user} initialRecords={records} />
}


function Ring({level}) {
  return(
    <div className='ring' style={{height: 20+level*4, width: 100+level*20}}>
      <p className='number'>{level}</p>
    </div>
  )
}

function Column({arrayData, index: indexColumn, color, onColumnClick}) {
  return(
      <button className='column' onClick={() => onColumnClick(indexColumn)}>
        <div className='stick' style={{backgroundColor: color}}></div>
        {arrayData.map((ring, indexRing) => (
          <Ring key={indexRing} level={ring} />
        ))}
      </button>
  )
}


function ActiveGame({user, initialRecords}) {
  const [dataGame, setDataGame] = useState([[1],[],[]])
  const [lifting, setLifting] = useState(null)
  const [level, setLevel] = useState(1)
  const [timer, setTimer] = useState(0)
  const [duration, setDuration] = useState([])

  const lift = (index) => {
    if(dataGame[index].length === 0)
      return
    const ring = dataGame[index][0]
    setLifting(ring)
    setDataGame((prev) => {
      const newData = [...prev]
      newData[index] = prev[index].slice(1)
      return newData
    })
}

  const place = (index) => {
    if(lifting < dataGame[index][0] || dataGame[index].length === 0) {
        setDataGame((prev) => {
          const newData = [...prev]
          newData[index] = [lifting, ...prev[index]]
          return newData
        })
        setLifting(null)
    }
  }

  const handleClickColumn = (index) => {
    if(![0,1,2].includes(index))
      return
    if(lifting) {place(index)}
    else {lift(index)}
  }

  const levelComplated = async (level, duration) => {
    if(!user) return
    const docRef = doc(db, "users", user.uid)
    const currentRecord = initialRecords?.[level]
    if(currentRecord > duration || currentRecord === undefined) {
        try {
            if(user) {
              await setDoc(docRef, {records: {[level]: duration}}, {merge: true})
            }
            setDuration((prev) => [...prev, {timer: timer, recordBroken: true}])
        } catch (error) {
            console.log(error)
        }
    } else {
      setDuration((prev) => [...prev, {timer: timer, recordBroken: false}])
    }
  }
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = parseInt(event.key-1)
      handleClickColumn(key)
    } 
    window.addEventListener("keydown", handleKeyDown)
    return() => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [dataGame])

  useEffect(() => {
    if(upLevel()) {
      levelComplated(level, timer)
      const newLevel = level+1
      setLevel(newLevel)
      setDataGame((prev) => {
        const newData = [...prev]
        const targetIndex = dataGame[0].length === 0 ? 0 : 1
        newData[targetIndex] = [newLevel]
        return newData
      })
      console.log(duration)
      setTimer(0)
  }}, [dataGame])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => prev+1)
    }, 10);
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const displayNum = (num) => {
    const second = Math.floor(num/100)
    const hundredths = String(num % 100).padStart(2, "0")
    return (
      `${second}.${hundredths}`
    )
  }

  return (
    <div className="cont">

      <div className="wraptimer">
        <div className="timer">{displayNum(timer)}</div>
        {duration.map((record, index) =>
          <div key={index}>level {index}: {displayNum(record.timer)} {record.recordBroken && <span>sb</span>}</div>
        )}
      </div>
      <div className="cont-game">
        <h1>towers of hanoi</h1>
        <div className='lifting'><div>{lifting && <Ring level={lifting}/>}</div></div>
        <div className='columns'>
          {
            Array(3).fill(null).map((_, index) => (
              <Column key={index} arrayData={dataGame[index]} index={index} color={"red"} onColumnClick={handleClickColumn}/>
            ))
          }
        </div>
      </div>
    </div>
  )


  function upLevel() {
    return (
    (dataGame[0].length === 0 && dataGame[1].length === 0 ||
      dataGame[0].length === 0 && dataGame[2].length === 0 ||
      dataGame[1].length === 0 && dataGame[2].length === 0) &&
      lifting === null
    )
  }
}

export default Game