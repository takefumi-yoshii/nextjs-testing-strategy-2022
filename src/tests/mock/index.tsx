if (typeof window === "undefined") {
  (async () => {
    const { server } = await import("./server");
    server.listen({ onUnhandledRequest: "bypass" });
  })();
} else {
  (async () => {
    const { worker } = await import("./browser");
    worker.start({ onUnhandledRequest: "bypass" });
  })();
}
export {};
