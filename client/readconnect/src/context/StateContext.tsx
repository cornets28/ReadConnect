import { createContext, useReducer, ReactNode, useContext } from "react";

type ReducerType = (state: any, action: any) => any; 
interface StateProviderProps {
  initialState: any; 
  reducer: ReducerType;
  children: ReactNode;
}

export const StateContext = createContext<any>(null);

export const StateProvider = ({
  initialState,
  reducer,
  children
}: StateProviderProps) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);