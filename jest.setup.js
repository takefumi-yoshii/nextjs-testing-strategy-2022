const fetchPolifill = require("whatwg-fetch");

global.fetch = fetchPolifill.fetch;
global.Request = fetchPolifill.Request;
global.Headers = fetchPolifill.Headers;
global.Response = fetchPolifill.Response;

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));

jest.mock("ioredis");
const Redis = require("ioredis");
const RedisMock = require("ioredis-mock");
const redisMock = new RedisMock();
Redis.mockImplementation(() => redisMock);
