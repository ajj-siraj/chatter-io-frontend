import React, { useReducer, createContext } from "react";

const Ctx = createContext();

const { Provider } = Ctx;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case Types.LOADING_START: {
        return [{ ...state, isLoading: true }];
      }

      case Types.LOADING_DONE: {
        return [{ ...state, isLoading: false }];
      }

      case Types.SET_STAGE: {
        return [{ ...state, stage: action.payload }];
      }

      default:
        throw new Error("Action does not exist.");
    }
  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { Ctx, StateProvider };

export const Types = {
  LOADING_START: "LOADING_START",
  LOADING_DONE: "LOADING_DONE",
  SET_STAGE: "SET_STAGE",
};
