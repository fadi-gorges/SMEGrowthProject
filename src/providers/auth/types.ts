import { ActionError } from "@/lib/utils/actionError";
import type { ProfilePicture, User } from "@/payload-types";

export type UserWithPicture = User & { picture: ProfilePicture };

export type IsAdmin = boolean;

export type ResetPassword = (args: {
  password: string;
  passwordConfirm: string;
  token: string;
}) => void;

export type Login = (args: {
  email: string;
  password: string;
}) => Promise<{ success: true; user: UserWithPicture } | ActionError>;

export type GoogleLogin = () => void;

export type Logout = () => void;

export interface AuthContext {
  user?: UserWithPicture | null;
  isAdmin: IsAdmin;
  setUser: (user: UserWithPicture | null) => void;
  logout: Logout;
  login: Login;
  // googleLogin: GoogleLogin;
  resetPassword: ResetPassword;
}
