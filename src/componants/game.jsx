import { useState, useEffect, useContext, useRef } from "react"
import {db} from "./../config/firebase"
import { useAuth } from "./authcontext"
import { doc, setDoc } from "firebase/firestore"
import { fetchrecords } from "../firestoremanager"

function Ring({level}) {
  return(
    <div className='ring' style={{height: 20+level*4, width: 100+level*20}}>
      <p className='number'>{level}</p>
    </div>
  )
}
function Column({arrayData, index, color, onColumnClick}) {
  return(
      <button className='column' onClick={() => onColumnClick(index)}>
        <div className='stick' style={{backgroundColor: color}}></div>
        {arrayData.map((ring, index) => (
          <Ring key={index} level={ring} />
        ))}
      </button>
  )
}

function Game() {
  const [dataGame, setDataGame] = useState([[1],[],[]])
  const [lifting, setLifting] = useState(null)
  const [level, setLevel] = useState(1)
  const [timer, setTimer] = useState(0)
  const [duration, setDuration] = useState([])
  const [records, setRecords] = useState()
  const {user, loading, change} = useAuth()

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
      if(user)
        newRecord(level, timer)
      const newLevel = level+1
      setLevel(newLevel)
      setDataGame((prev) => {
        const newData = [...prev]
        const targetIndex = dataGame[0].length === 0 ? 0 : 1
        newData[targetIndex] = [newLevel]
        return newData
      })
      setDuration([...duration, timer])
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

  useEffect(() => {
        if(!user) {
            setRecords({})
            return
        }

        const fetch = async () => {
          const data = await fetchrecords(user.uid)
          setRecords(data)
        }
        fetch()
    }, [user])

  const newRecord = async (level, newRecord) => {
          if(!user) return
          const docRef = doc(db, "users", user.uid)
          const currentRecord = records?.[level]
          if(currentRecord > newRecord || currentRecord === undefined) {
              try {
                  await setDoc(docRef, {records: {[level]: newRecord}}, {merge: true})
              } catch (error) {
                  console.log(error)
              }
          }  
      }

  const displayNum = (num) => {
    const second = Math.floor(num/100)
    const hundredths = String(num % 100).padStart(2, "0")
    return (
      `${second}.${hundredths}`
    )
  }

  return (
    <div className="cont">
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
      <div className="wraptimer">
          <div className="timer">{displayNum(timer)}</div>
          {duration.map((time, index) =>
            <p key={index}>level {index}: {displayNum(time)}</p>
          )}
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