"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { getUser } from "@/actions/auth/getUser";
import { logoutAction } from "@/actions/auth/logout";
import { getUrl } from "@/lib/utils/getUrl";
import { usePathname } from "next/navigation";
import { rest } from "./rest";
import {
  AuthContext,
  Login,
  Logout,
  ResetPassword,
  UserWithPicture,
} from "./types";
import { loginUser } from "@/actions/auth/loginUser";

// Creates auth context with default value as {}
const Context = createContext({} as AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    // <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
    <_AuthProvider>{children}</_AuthProvider>
    // </GoogleOAuthProvider>
  );
};

// AuthProvider component
export const _AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<UserWithPicture | null>();

  // useGoogleOneTapLogin({
  //   onSuccess: ({ credential }) => googleLoginSuccess({ credential }),
  //   disabled: user !== null,
  // });

  // const googleLoginSuccess = async ({
  //   access_token,
  //   credential,
  // }: {
  //   access_token?: string;
  //   credential?: string;
  // }) => {
  //   const res = await googleLoginAction({ access_token, credential });

  //   if (!res.success) return;

  //   setUser(res.user);
  //   toast.success("You have logged in successfully.");
  // };

  // const googleLogin: GoogleLogin = useGoogleLogin({
  //   onSuccess: ({ access_token }) => googleLoginSuccess({ access_token }),
  // });

  const login: Login = async (args) => {
    const res = await loginUser(args);

    if (res.success) {
      setUser(res.user);
    }

    return res;
  };

  const logout: Logout = async () => {
    logoutAction();
    setUser(null);
  };

  const resetPassword: ResetPassword = async (args) => {
    await rest(`${getUrl()}/api/users/reset-password`, args);
    const user = await getUser();
    setUser(user);
  };

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      const user = await getUser();
      setUser(user);
    };

    fetchMe();
  }, [pathname]);

  // Return context provider with user and auth functions
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        // googleLogin,
        logout,
        resetPassword,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Function to receive user and auth functions
export const useAuth = () => useContext(Context);
