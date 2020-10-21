import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [preset, setPreset] = useState("roomToBottom");
  const [enterAnimation, setEnterAnimation] = useState("");
  const [exitAnimation, setExitAnimation] = useState("");

  return (
    <AppContext.Provider
      value={{
        preset
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
