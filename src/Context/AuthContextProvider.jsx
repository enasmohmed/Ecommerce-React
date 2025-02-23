import React, { createContext, useEffect, useState } from 'react'


export let authContext = createContext()

export default function AuthContextProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"))
    // useEffect( ()=> {
    //     if(localStorage.getItem("token")){
    //         setToken(localStorage.getItem("token"))
    //     }
    // }, [])
    return <authContext.Provider value={{token, setToken}}>
        {children}
    </authContext.Provider>
}
