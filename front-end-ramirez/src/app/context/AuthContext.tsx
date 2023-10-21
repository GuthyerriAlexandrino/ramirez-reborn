import React, { 
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState 
} from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useNotify } from "./NotifyContext";
import { ref, storage } from "../utils/keys/firebaseconfig";
import { getDownloadURL } from "firebase/storage";

type User = {
  email: string;
  password: string;
}

type AuthContextProps = {
  verifyTokenExpiration: () => boolean;
  getProfileImage: () => void;
  removeToken: () => void;
  userProfileImage: string;
  handleLogin: (value: User) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [userProfileImage, setUserProfileImage] = useState("");

  const {
      notifySuccess,
      notifyError
  } = useNotify();

  useEffect(() => {
      const cookies = parseCookies();
      const token = cookies['ramirez-user']

      if (token) {
          if (Router.asPath === "/login") {
              Router.push("/search")
          }
          // getProfileImage();
      } 

  }, [])
}

export const useAuthLogin = () => {
  return useContext(AuthContext);
}