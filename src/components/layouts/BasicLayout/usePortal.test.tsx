import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { usePortal } from "./usePortal";

describe("src/components/layouts/BasicLayout/usePortal.test.ts", () => {
  test("showPortal・hidePortal 関数で、isShowPortal を切り替えできるtこと", async () => {
    const { result } = renderHook(() => usePortal());
    expect(result.current.isShowPortal).toEqual(false);
    act(() => {
      result.current.showPortal(() => null);
    });
    expect(result.current.isShowPortal).toEqual(true);
    act(() => {
      result.current.hidePortal();
    });
    expect(result.current.isShowPortal).toEqual(false);
  });
});
