import { User } from "next-auth";

declare type LoginResponse = {
    token: string;
    user: User['user'];
}
