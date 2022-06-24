import { setupWorker } from "msw";

// 開発中はブラウザで外部APIをモックする必要がないため空
export const worker = setupWorker();
