import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import 'firebase/compat/analytics';

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
// const analytics = firebase.analytics();

function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header>
                <h1>⚛️ReactChats💬</h1>
                <SignOut />
            </header>

            <section>
                {user ? <ChatRoom /> : <SignIn />}
            </section>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    
    return (
        <><button className='sign-in' onClick={signInWithGoogle}>Sign in with Google</button>
        <p className='warn-msg'>Please follow community guidelines or you will be banned~</p></>
    );
}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    );
}

function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

                <div ref={dummy}></div>
            </main>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder='Type message' />

                <button type='submit' disabled={!formValue}>Send</button>
            </form>
        </>
    );
}

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <>
            <div className={`message ${messageClass}`}>
                <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='user-pfp' />
                <p>{text}</p>
            </div>
        </>
    );
}

export default App;