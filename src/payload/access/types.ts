import { User } from "@/payload-types";
import { AccessArgs } from "payload/types";

export type AllAccess = (args: AccessArgs<unknown, User>) => boolean;
