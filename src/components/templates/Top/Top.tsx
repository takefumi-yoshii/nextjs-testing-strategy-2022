import { AnchorText } from "@/components/atoms/AnchorText";
import { pageTitle } from "@/components/meta";
import Head from "next/head";
import Link from "next/link";
import { Panel } from "./Panel";
import styles from "./styles.module.css";

export const Top = () => {
  return (
    <main className={styles.main}>
      <Head>
        <title>{pageTitle("Top")}</title>
      </Head>
      <Panel title="ユーザー一覧">
        <Link href="/users">
          <AnchorText hasArrow>一覧ページへ</AnchorText>
        </Link>
      </Panel>
      <Panel title="投稿一覧">
        <Link href="/posts">
          <AnchorText hasArrow>一覧ページへ</AnchorText>
        </Link>
      </Panel>
    </main>
  );
};
