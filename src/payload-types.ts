/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    organisations: Organisation;
    enterprises: Enterprise;
    engagements: Engagement;
    searchProfiles: SearchProfile;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  roles?: ('admin' | 'user')[] | null;
  firstName: string;
  lastName: string;
  mobileNumber?: string | null;
  jobTitle?: string | null;
  organisation?: (string | null) | Organisation;
  userType?: ('university' | 'vet' | 'rto' | 'non-profit' | 'government' | 'rdi' | 'industry') | null;
  notificationFrequency?: ('off' | 'daily' | 'weekly') | null;
  signupComplete?: boolean | null;
  paymentSuccessful?: boolean | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "organisations".
 */
export interface Organisation {
  id: string;
  name: string;
  members: string[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "enterprises".
 */
export interface Enterprise {
  id: string;
  name: string;
  abn?: string | null;
  numEmployees?: number | null;
  website?: string | null;
  suburb?: string | null;
  industrySector?: string | null;
  description?: string | null;
  growthPotential?: number | null;
  postCode?: number | null;
  manufacturer?: boolean | null;
  sme?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "engagements".
 */
export interface Engagement {
  id: string;
  user: string | User;
  enterprise: string | Enterprise;
  contacted?: boolean | null;
  connected?: boolean | null;
  engaged?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "searchProfiles".
 */
export interface SearchProfile {
  id: string;
  name: string;
  user: string | User;
  searchQuery?: string | null;
  manufacturer?: boolean | null;
  employeesRange?: string | null;
  growthPotentialRange?: string | null;
  postcode?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}