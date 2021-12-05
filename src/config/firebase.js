import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { getFirestore, setDoc, doc, updateDoc, collection, query, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAo7-r7tCn8UaVw4UK62Vl_OaUywEkfT3c",
  authDomain: "transport-app-3f4ad.firebaseapp.com",
  projectId: "transport-app-3f4ad",
  storageBucket: "transport-app-3f4ad.appspot.com",
  messagingSenderId: "915697426924",
  appId: "1:915697426924:web:4718de2a11fa10a27720c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore();

async function registerUser(authData, password) {
  const { email, fullName, age, phoneNumber, photoURL } = authData
  const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password)

  await updateProfile(auth.currentUser, {
    displayName: fullName,
  })

  await setDoc(doc(db, "users", uid), {
    fullName, email, age, uid, phoneNumber
  })
}

async function loginUser({ email, password }) {
  const { user: { uid } } = await signInWithEmailAndPassword(auth, email, password)
}

async function logout() {
  try {
    await signOut(auth)
    alert("successfully logged out")
  }
  catch (e) {
    alert(e.message)
  }
}

async function updateUsersCurrentLocation(uid, location) {
  const locationRef = doc(db, 'users', uid)
  await updateDoc(locationRef, { location: location.coords })
}

async function getAllDrivers() {

  let dataCopyArray = []

  const q = query(collection(db, "drivers"))
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    let dataCopy = doc.data()
    dataCopyArray.push({ ...dataCopy, id: doc.id })
  });

  return dataCopyArray
}

function requestTrip() {

}

export {
  registerUser,
  loginUser,
  logout,
  updateUsersCurrentLocation,
  requestTrip,
  getAllDrivers
}
