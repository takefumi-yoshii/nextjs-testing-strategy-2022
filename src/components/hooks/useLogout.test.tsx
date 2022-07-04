import { errors } from "@/errors";
import { postLogoutHandler } from "@/services/api/logout/mock";
import { setupMockServer } from "@/tests/jest";
import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import { useLogout } from "./useLogout";

describe("src/components/hooks/useLogout.test.tsx", () => {
  const server = setupMockServer(postLogoutHandler());
  test("ログアウトに成功した時、トップに遷移する", async () => {
    const { result } = renderHook(() => useLogout());
    await result.current();
    expect(window.location.href).toBe("http://localhost/");
  });
  test("ログアウトに失敗した時、アラートが表示される", async () => {
    window.alert = jest.fn();
    server.use(postLogoutHandler({ err: errors["INTERNAL_SERVER"] }));
    const { result } = renderHook(() => useLogout());
    await result.current();
    expect(window.alert).toHaveBeenCalledWith("ログアウトに失敗しました");
  });
});
