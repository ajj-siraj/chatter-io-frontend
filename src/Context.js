import React, { useReducer, createContext } from "react";

const Ctx = createContext();

const { Provider } = Ctx;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case Types.LOADING_START: {
        return  {...state, isLoading: true };
      }

      case Types.LOADING_DONE: {
        return  {...state, isLoading: false };
      }

      //todo: fix this part to show both username and chatroom data
      case Types.SET_USERNAME: {
        return {...state, ...action.payload };
      }

      case Types.SET_CHATROOM: {
        return {...state, ...action.payload };
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
  SET_USERNAME: "SET_USERNAME",
  SET_CHATROOM: "SET_CHATROOM",
};
