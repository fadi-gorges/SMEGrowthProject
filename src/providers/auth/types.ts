import type { User } from "@/payload-types";

export type ResetPassword = (args: {
  password: string;
  passwordConfirm: string;
  token: string;
}) => void;

export type Login = (args: { email: string; password: string }) => void;

export type GoogleLogin = () => void;

export type Logout = () => void;

export interface AuthContext {
  user?: User | null;
  setUser: (user: User | null) => void;
  logout: Logout;
  login: Login;
  // googleLogin: GoogleLogin;
  resetPassword: ResetPassword;
}
