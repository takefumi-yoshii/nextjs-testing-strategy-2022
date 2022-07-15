const fetchPolifill = require("whatwg-fetch");
const { setGlobalConfig } = require("@storybook/testing-react");
const globalStorybookConfig = require("./.storybook/preview");

setGlobalConfig(globalStorybookConfig);

global.fetch = fetchPolifill.fetch;
global.Request = fetchPolifill.Request;
global.Headers = fetchPolifill.Headers;
global.Response = fetchPolifill.Response;

const crypto = require("crypto");
Object.defineProperty(global.self, "crypto", {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));

jest.mock("ioredis");
const Redis = require("ioredis");
const RedisMock = require("ioredis-mock");
const redisMock = new RedisMock();
Redis.mockImplementation(() => redisMock);
