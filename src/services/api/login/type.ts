import { z } from "zod";
import { LoginInputSchema } from "./schema";

export type User = {
  id: string;
  name: string;
};

export type LoginData = {
  user: User;
};

export type LoginInput = z.infer<typeof LoginInputSchema>;
