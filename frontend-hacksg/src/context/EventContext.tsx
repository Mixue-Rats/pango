import { createContext, useReducer } from 'react';

export const EventContext = createContext(null);

export const eventReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        events: action.payload,
      };
    case 'ADD_EVENT':
      return {
        events: [...state.events, action.payload],
      };
    case 'DELETE_EVENT':
      return {
        events: state.events.filter((event: { id: string; }) => event.id !== action.payload),
      };
    default:
      return state;
  }
}

export const EventContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(eventReducer, {
    events: null
  });

  return (
      <EventContext.Provider value={{...state, dispatch}}>
          {children}
      </EventContext.Provider>
  );
}