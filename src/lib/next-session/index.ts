import RedisStoreFactory from "connect-redis";
import Redis from "ioredis";
import nextSession from "next-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";

export const RedisStore = RedisStoreFactory(expressSession);
export const getSession = nextSession({
  store: promisifyStore(new RedisStore({ client: new Redis() })),
});
