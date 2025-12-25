import { db } from "./config/firebase.js"
import { doc, getDoc } from "firebase/firestore"

export async function fetchrecords(uid) {
    const docRef = doc(db, "users", uid)
    const datarec = (await getDoc(docRef)).data().records
    return datarec
}