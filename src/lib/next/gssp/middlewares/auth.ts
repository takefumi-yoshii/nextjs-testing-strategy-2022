import { getSession } from "@/lib/next-session";
import { RedirectError } from "../error";
import { GsspMiddleware } from "../type";

export const auth: GsspMiddleware = async (...args) => {
  const session = await getSession(args[0].req, args[0].res);
  if (!session.user)
    throw new RedirectError({ permanent: false, destination: "/" });
  return [...args, session.user];
};
