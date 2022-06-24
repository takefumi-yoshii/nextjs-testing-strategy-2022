import { AnchorText } from "@/components/atoms/AnchorText";
import { useLogout } from "@/components/hooks/useLogout";
import Link from "next/link";
import { memo } from "react";
import styles from "./styles.module.css";

const Nav = () => {
  return (
    <nav aria-label="メインナビゲーション">
      <ul className={styles.list} role="presentation">
        <li role="presentation">
          <Link href={"/"}>
            <a className={styles.link}>Top</a>
          </Link>
        </li>
        <li role="presentation">
          <Link href={"/users"}>
            <a className={styles.link}>Users</a>
          </Link>
        </li>
        <li role="presentation">
          <Link href={"/posts"}>
            <a className={styles.link}>Posts</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Logout = () => {
  const logout = useLogout();
  return (
    <AnchorText
      className={styles.logout}
      hasArrow
      theme="white"
      size={12}
      onClick={logout}
    >
      ログアウト
    </AnchorText>
  );
};

export const BasicAside = memo(function BasicAsideBase() {
  return (
    <aside className={styles.aside}>
      <Nav />
      <Logout />
    </aside>
  );
});
