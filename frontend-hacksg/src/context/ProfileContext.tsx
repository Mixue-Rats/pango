import { createContext, useReducer } from 'react';

export const ProfileContext = createContext(null);

export const profileReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        profile: action.payload,
      };
    case 'CHANGE_PROFILE':
      return {
        profile: {
          openingHours: action.payload.openingHours,
          ...state.profile,
        }
      }
    default:
      return state;
  }
};

export const ProfileContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(profileReducer, {
    profile: null
  });

  return (
      <ProfileContext.Provider value={{...state, dispatch}}>
          {children}
      </ProfileContext.Provider>
  );
}