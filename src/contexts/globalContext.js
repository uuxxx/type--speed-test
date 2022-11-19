import React, {createContext, useState, useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";


export const GlobalContext = createContext({})


export const GlobalContextProvider = ({children}) => {
    const [state, setState] = useState({alert: null, currentUser: null})
    const setAlert = alert => setState(prev => ({...prev, alert}))

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setState(prev => ({...prev, currentUser: user}))
        })
        return unsubscribe
    }, [])


    return (
        <GlobalContext.Provider value={{...state, setAlert}}>
            {children}
        </GlobalContext.Provider>
    )
}