import { postLogout } from "@/services/api/logout";
import { useCallback } from "react";

export function useLogout() {
  const logout = useCallback(async () => {
    const { data, err } = await postLogout();
    if (data && data.message) {
      window.location.href = "/";
    }
    if (err) {
      window.alert("ログアウトに失敗しました");
    }
  }, []);
  return logout;
}
