"use client";
import { getUrl } from "@/lib/utils/getUrl";
import { Organisation, User } from "@/payload-types";
import { checkRole } from "@/payload/collections/Users/checkRole";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { rest } from "./rest";
import { AuthContext, Login, Logout, ResetPassword } from "./types";
import { setDefaultResultOrder } from "dns";

// Creates auth context with default value as {}
const Context = createContext({} as AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <_AuthProvider>{children}</_AuthProvider>;
};

// AuthProvider component
export const _AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>();

  const fetchMe = async () => {
    const user = await rest(
      `${getUrl()}/api/users/me`,
      {},
      {
        method: "GET",
      }
    );

    // console.log(user?.organisation);

    const response = await fetch(
      `${getUrl()}/api/organisations/${user?.organisation}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    const organisation = await response.json();

    setUser(user);

    // if (!user) return;

    // const res = await fetch(`${getUrl()}/api2/users/me/picture`);
    // const { picture } = await res.json();

    // setUserPicture(picture);
  };

  const isAdmin = useMemo(
    () => (user ? checkRole(["admin"], user) : false),
    [user]
  );

  const login: Login = async (args) => {
    const user = await rest(`${getUrl()}/api/users/login`, args);
    setUser(user);
  };

  const logout: Logout = async () => {
    await rest(`${getUrl()}/api/users/logout`, {}, { method: "POST" });
    setUser(null);
  };

  const resetPassword: ResetPassword = async (args) => {
    const user = await rest(`${getUrl()}/api/users/reset-password`, args);
    setUser(user);
  };

  // On mount, get user and set
  useEffect(() => {
    fetchMe();
  }, [pathname]);

  // Return context provider with user and auth functions
  return (
    <Context.Provider
      value={{
        user,
        isAdmin,
        fetchMe,
        setUser,
        login,
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
