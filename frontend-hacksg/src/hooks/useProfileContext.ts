import { ProfileContext } from "../context/ProfileContext";
import { useContext } from "react";

export const useProfileContext: Function = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw Error('useProfileContext must be used within ProfileContextProvider');
  }

  return context;
}