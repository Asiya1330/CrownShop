import React, { createContext, useEffect, useState } from 'react'
import { authStateChangeListner, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'

//context is 2 things
// 1. it is actual storage which we access in components
// it contain, default value
// 2. itss Provider comeponent, which wraps arround app to acces it to child components

// set default Value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = authStateChangeListner(async (user) => {
            if (user) await createUserDocumentFromAuth(user);
            setCurrentUser(user)
        })

        //for any memory leak, unsubs, auth Listner
        return unsubscribe
    }, [])

    const value = { currentUser, setCurrentUser }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
