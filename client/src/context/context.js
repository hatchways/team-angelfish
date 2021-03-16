import React, { createContext, useContext, useReducer, useEffect } from "react";

import { userReducer, initialState } from "./reducer";

const StateContext = createContext();
const DispatchContext = createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const loadUser = () => {
      try {
        fetch("/api/users/auth")
          .then((res) => res.json())
          .then((data) => {
            if (data.user) {
              dispatch({ type: "AUTHENTICATED", payload: data });
            } else {
              dispatch({ type: "UNAUTHENTICATED" });
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    loadUser();
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export const useDispatchContext = () => useContext(DispatchContext);
