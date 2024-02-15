import React, {
  FC,
  createContext,
  useState,
  PropsWithChildren,
  useContext,
} from "react";
import { loginDB } from "../api/userApi";

export interface IUser {
  user_id: string;
  user_name: string;
}

interface IContext {
  user: IUser | null;
  loginHandler: (login: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const loginHandler = async (login: string, password: string) => {
    try {
      const result = await loginDB(login, password);
      setUser(result);
    } catch (e) {
      console.log(e);
    }
  };

  const value = { user, loginHandler };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
