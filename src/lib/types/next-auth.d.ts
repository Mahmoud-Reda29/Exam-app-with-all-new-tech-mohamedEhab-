import { ISODateString, User } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: "user" | "admin" | "editor";
      isVerified: boolean;
      createdAt: ISODateString;
    };
  }

  interface Session {
    user: User["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    accessToken: string;
    user: User["user"];
  }
}
