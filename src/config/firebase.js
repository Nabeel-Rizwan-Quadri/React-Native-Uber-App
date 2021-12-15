import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { addDoc, collection, setDoc, doc, getFirestore ,getDocs, query, where } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from '../store/actions/userActions';

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

  await setDoc(doc(db, "drivers", uid), {
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
  console.log("firebase callled")
  const locationRef = doc(db, 'drivers', uid)
  await updateDoc(locationRef, { location: location.coords })
}

async function getAllRequestedTrips(driverData) {
  let dataCopyArray = []

  // const q = query(collection(db, "requestedTrip"))

  // const querySnapshot = await getDocs(q, where("driver.id", "==", driverData.id));
  // querySnapshot.forEach((doc) => {
  //   let dataCopy = doc.data()
  //   dataCopyArray.push({ ...dataCopy, id: doc.id })
  // });

  const q = query(collection(db, "requestedTrip"), where("driver.id", "==", driverData.id));

  const result = onSnapshot(q, (querySnapshot) => {
    const requestedTrip = [];

    querySnapshot.forEach((doc) => {
      requestedTrip.push(doc.data());
      dataCopyArray.push(doc.data())
    });

    console.log("requestedTrips are: ", requestedTrip);
    return requestedTrip
  });

  dataCopyArray.push(result)
  console.log("dataCopyArray: ", dataCopyArray);

  return dataCopyArray
}

export {
  registerUser,
  loginUser,
  logout,
  updateUsersCurrentLocation,
  getAllRequestedTrips
}
