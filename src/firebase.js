// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyCz8digLA5DJeWQHZaDHAPeGBwhCBkaNVY",
  authDomain: "netflix-clone-c3a16.firebaseapp.com",
  projectId: "netflix-clone-c3a16",
  storageBucket: "netflix-clone-c3a16.firebasestorage.app",
  messagingSenderId: "716365110572",
  appId: "1:716365110572:web:773b895f3ae13ade8e2089"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup=async(name,email,password)=>{
        try{
           const response = await createUserWithEmailAndPassword(auth,email,password);
           const user=response.user;
           await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
           })
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(" "));

        }
}

const login=async(email,password)=>{
        try {
            await signInWithEmailAndPassword(auth,email,password )
        } catch (error) {
            console.log(error);
           toast.error(error.code.split('/')[1].split('-').join(" "))
        }
}

const logout=()=>
{
    signOut(auth)
}
export {auth,db,login,signup,logout}