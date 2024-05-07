import { User } from "@/payload-types";

// export type FullUser = User & { picture?: ProfilePicture };

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
  // userPicture?: ProfilePicture | null;
  isAdmin: IsAdmin;
  fetchMe: FetchMe;
  setUser: (user: User | null) => void;
  logout: Logout;
  login: Login;
  // googleLogin: GoogleLogin;
  resetPassword: ResetPassword;
}
