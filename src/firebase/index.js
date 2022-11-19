import {initializeApp} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword
} from "firebase/auth";

import {
    getBlob,
    getStorage,
    ref,
    uploadString,
    uploadBytes,
    listAll
} from 'firebase/storage';
import FileHandler from "../FileHandler";
import {getRandomIntInRange} from "../utils";


const firebaseConfig = {
    apiKey: "AIzaSyCRfsHAoobuMYOZGksTBB_QmwRddKl37hk",
    authDomain: "typespeed-test.firebaseapp.com",
    databaseURL: "https://typespeed-test-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "typespeed-test",
    storageBucket: "typespeed-test.appspot.com",
    messagingSenderId: "1075914007062",
    appId: "1:1075914007062:web:bf39ea3a90ccc20ac78b37"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

const storage = getStorage(app)

const avatarsBucketRef = ref(storage, 'avatars')

const textsBucketRef = ref(storage, 'testingTexts')

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function signout() {
    return signOut(auth)
}

export function updateProfileUsernameAndPhoto(displayName = '', photoURL = '') {
    return updateProfile(auth.currentUser, {displayName, photoURL})
}

export function uploadProfilePhoto(file) {
    const userRef = ref(avatarsBucketRef, auth.currentUser.uid)
    return uploadString(userRef, file, 'data_url')
}

export function updateProfileEmail(newEmail) {
    return updateEmail(auth.currentUser, newEmail)
}

export function downloadTextAsBlob(filename) {
    return getBlob(ref(textsBucketRef, filename))
}

export async function downloadRandomText() {
    const max = await getAmountOfTextsInDB()
    const fileNumber = getRandomIntInRange(0, max)
    const blob = await downloadTextAsBlob(`file-${fileNumber}`)
    const fileHandler = new FileHandler(blob)
    return await fileHandler.getStringFromBlob()
}

export function uploadText({text}, fileNumber) {
    return new Promise(async (resolve, reject) => {
        const textRef = ref(textsBucketRef, `file-${fileNumber}`)
        const blob = new Blob([JSON.stringify(text)], {type: 'text/plain'})
        uploadBytes(textRef, blob)
            .then(response => resolve(response))
            .catch(e => reject(e.message))
    })
}

export async function getAmountOfTextsInDB() {
    const res = await listAll(textsBucketRef)
    return res.items.length
}


export function updateProfilePassword(newPassword) {
    return updatePassword(auth.currentUser, newPassword)
}


