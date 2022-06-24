import { assertBySchema } from "@/lib/asserts";
import { getSession } from "@/lib/next-session";
import { combineHandlers, handle, methods } from "@/lib/next/api";
import { LoginData, LoginInputSchema } from "@/services/api/login";

export default combineHandlers(
  methods({
    POST: handle<LoginData>(async (req, res) => {
      const session = await getSession(req, res);
      assertBySchema(req.body, LoginInputSchema);
      // WIP:
      const user = { id: req.body.email, name: "example.user" };
      session.user = user;
      return { data: { user }, err: null, status: 200 };
    }),
  })
);
