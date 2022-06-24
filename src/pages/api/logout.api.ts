import { getSession } from "@/lib/next-session";
import { combineHandlers, handle, methods } from "@/lib/next/api";
import { LogoutData } from "@/services/api/logout";

export default combineHandlers(
  methods({
    POST: handle<LogoutData>(async (req, res) => {
      const session = await getSession(req, res);
      await session.destroy();
      return { data: { message: "logout" }, err: null, status: 200 };
    }),
  })
);
