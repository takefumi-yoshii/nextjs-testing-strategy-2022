import { auth, combineHandlers, handle, methods } from "@/lib/next/api";
import { num } from "@/lib/next/asserts";
import { UserData } from "@/services/api.example.com/users";
import {
  deleteUser,
  getUser,
  updateUser,
} from "@/services/api.example.com/users/[id]";

export default combineHandlers(
  auth,
  methods({
    GET: handle<UserData>((req) => getUser({ id: num(req.query.id) })),
    PUT: handle<UserData>((req) =>
      updateUser({ id: num(req.query.id) }, req.body)
    ),
    DELETE: handle<{ id: string }>((req) =>
      deleteUser({ id: num(req.query.id) })
    ),
  })
);
