import crypto from "crypto";

Object.defineProperty(global.self, "crypto", {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
  },
});
