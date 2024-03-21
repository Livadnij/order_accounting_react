import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// steklolux new DB
const firebaseConfig = {
  apiKey: "AIzaSyA32GpnmcjtQPDmRS4B15VpFJlcCHylUWM",
  authDomain: "steklolux-data.firebaseapp.com",
  projectId: "steklolux-data",
  storageBucket: "steklolux-data.appspot.com",
  messagingSenderId: "747814561079",
  appId: "1:747814561079:web:f981427a8fea08ba27a6b2",
  measurementId: "G-Y7R7T2N9WF"
};


// steklolux old DB
// const firebaseConfig = {
//   apiKey: "AIzaSyCeVffRxXj0UtgBtb-4xFvwWEUOblntnBU",
//   authDomain: "steklolux-try-one.firebaseapp.com",
//   projectId: "steklolux-try-one",
//   storageBucket: "steklolux-try-one.appspot.com",
//   messagingSenderId: "373493876158",
//   appId: "1:373493876158:web:4a68f2e9b573b74a19a5ef",
//   measurementId: "G-H2SLGXC48Z",
// };

// Initialize Firestore & auth
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Getting clients list form clients collection
export default async function getClients(db) {
  const clientsCol = collection(db, "clients");
  const clientsSnapshot = await getDocs(clientsCol);
  const clientsList = clientsSnapshot.docs.map((doc) => doc.data());
  return clientsList;
}

export async function getOrders(db, dbName) {
  const ordersCol = collection(db, dbName);
  const ordersSnapshot = await getDocs(ordersCol);
  const ordersList = ordersSnapshot.docs.map((doc) => doc.data());
  return ordersList;
}

export async function getCollNames(db) {
  const namesCol = collection(db, "CollectionNames");
  const namesSnapshot = await getDocs(namesCol);
  const namesList = namesSnapshot.docs.map((doc) => doc.data());
  return namesList;
}
