import { Role } from "./role";

export class User {
  id?: string;
  userName?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  roles?: Role[];
  isVerified?: boolean;
  jwToken?: string;
  applicant?: any;
  profilePicture?: string;
}