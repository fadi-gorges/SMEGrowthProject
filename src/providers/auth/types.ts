import { User } from "@/payload-types";

export type IsAdmin = boolean;

export type ResetPassword = (args: {
  password: string;
  passwordConfirm: string;
  token: string;
}) => void;

export type Login = (args: {
  email: string;
  password: string;
}) => Promise<void>;

export type GoogleLogin = () => void;

export type Logout = () => Promise<void>;

export interface AuthContext {
  user?: User | null;
  isAdmin: IsAdmin;
  setUser: (user: User | null) => void;
  logout: Logout;
  login: Login;
  // googleLogin: GoogleLogin;
  resetPassword: ResetPassword;
}
