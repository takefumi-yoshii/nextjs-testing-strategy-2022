import { defaultPostsHandlers } from "@/services/api.example.com/posts/mock";
import { defaultPostHandlers } from "@/services/api.example.com/posts/[id]/mock";
import { defaultUsersHandlers } from "@/services/api.example.com/users/mock";
import { defaultUserHandlers } from "@/services/api.example.com/users/[id]/mock";

export const handlers = [
  ...defaultPostsHandlers,
  ...defaultPostHandlers,
  ...defaultUsersHandlers,
  ...defaultUserHandlers,
];
