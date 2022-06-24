import { UnauthorizedError } from "@/errors";
import { getSession } from "@/lib/next-session";
import { HandlerMiddleware } from "../type";

export const auth: HandlerMiddleware = async (...args) => {
  const session = await getSession(args[0], args[1]);
  if (!session.user) throw new UnauthorizedError();
  return [...args, session.user];
};
