import { getSession } from "@/lib/next-session";
import { GsspMiddleware } from "../type";

export const checkLogin: GsspMiddleware = async (...args) => {
  const session = await getSession(args[0].req, args[0].res);
  return [...args, !!session.user];
};
