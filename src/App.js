import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyAcjqxbmcHzmihAXEuR2s8W8GBKbkomRS8",
    authDomain: "superchat-2051b.firebaseapp.com",
    projectId: "superchat-2051b",
    storageBucket: "superchat-2051b.appspot.com",
    messagingSenderId: "14509811362",
    appId: "1:14509811362:web:0a1433c5721874de9119fb",
    measurementId: "G-W39LQMHK0N"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header>
                <h1>⚛️🔥💬</h1>
                <SignOut />
                 <section>
                    {user ? <ChatRoom /> : <SignIn />}
                 </section>
            </header>
        </div>
    );
}

function SignIn() {
    return ;
}

function SignOut() {
    return ;
}

function ChatRoom() {
    return ;
}

export default App;