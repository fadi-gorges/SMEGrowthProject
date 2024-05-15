import { Organisation, User } from "@/payload-types";

export type FullUser = User & { organisation: string };

export type IsAdmin = boolean;

export type FetchMe = () => Promise<void>;

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
  fetchMe: FetchMe;
  setUser: (user: FullUser | null) => void;
  logout: Logout;
  login: Login;
  resetPassword: ResetPassword;
}
