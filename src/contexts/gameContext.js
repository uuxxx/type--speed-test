import React, {createContext, useState} from "react";

const defaultValueForGameContext = {
    signsPerMinute: 0,
    accuracy: 0
}

export const GameContext = createContext({})



export const GameContextProvider = ({children}) => {
    const [contextValue, setContextValue] = useState(defaultValueForGameContext)
    const reset = () => setContextValue(prev => ({...prev, signsPerMinute: 0, accuracy: 0}))




    return (
        <GameContext.Provider value={{...contextValue, setContextValue, reset}}>
            {children}
        </GameContext.Provider>
    );
};

