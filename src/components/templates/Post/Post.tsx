import { AnchorButton } from "@/components/atoms/AnchorButton";
import { HeadGroup } from "@/components/molecules/HeadGroup";
import { PostData } from "@/services/api.example.com/posts";
import Link from "next/link";
import styles from "./styles.module.css";

type Props = PostData;

export const Post = ({ post }: Props) => {
  return (
    <main className={styles.main}>
      <HeadGroup title="投稿詳細">
        <Link href={`/posts/${post.id}/edit`}>
          <AnchorButton>編集する</AnchorButton>
        </Link>
      </HeadGroup>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.row}>
            <th>ID</th>
            <td>{post.id}</td>
          </tr>
          <tr className={styles.row}>
            <th>title</th>
            <td>{post.title}</td>
          </tr>
          <tr className={styles.row}>
            <th>publishedAt</th>
            <td>{post.publishedAt}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};
