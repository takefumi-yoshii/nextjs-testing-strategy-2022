import { z } from "zod";
import { UserInputSchema } from "./schema";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserData = {
  user: User;
};

export type UsersData = {
  users: User[];
};

export type UserInput = z.infer<typeof UserInputSchema>;
