import { auth, combineHandlers, handle, methods } from "@/lib/next/api";
import {
  createUser,
  getUsers,
  UserData,
  UsersData,
} from "@/services/api.example.com/users";

export default combineHandlers(
  auth,
  methods({
    GET: handle<UsersData>(() => getUsers()),
    POST: handle<UserData>(({ body }) => createUser(body)),
  })
);
