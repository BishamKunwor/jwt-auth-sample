import { createContext, useContext } from "react";

const AuthContext = createContext<
  | {
      accessToken: string | undefined;
      setToken: (token: string) => void;
    }
  | undefined
>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth Should be Called Inside AuthProvider");
  }

  return authContext;
};

export const AuthContextProvider = AuthContext.Provider;
