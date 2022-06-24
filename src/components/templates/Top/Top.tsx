import { AnchorText } from "@/components/atoms/AnchorText";
import { HeadGroup } from "@/components/molecules/HeadGroup";
import Link from "next/link";
import styles from "./styles.module.css";

export const Top = () => {
  return (
    <main className={styles.main}>
      <HeadGroup title="ユーザー一覧">
        <Link href="/users">
          <AnchorText hasArrow>一覧ページへ</AnchorText>
        </Link>
      </HeadGroup>
      <HeadGroup title="投稿一覧">
        <Link href="/posts">
          <AnchorText hasArrow>一覧ページへ</AnchorText>
        </Link>
      </HeadGroup>
    </main>
  );
};
