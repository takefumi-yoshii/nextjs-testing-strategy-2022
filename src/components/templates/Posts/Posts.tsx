import { AnchorButton } from "@/components/atoms/AnchorButton";
import { AnchorText } from "@/components/atoms/AnchorText";
import { HeadGroup } from "@/components/molecules/HeadGroup";
import { Post } from "@/services/api.example.com/posts";
import Link from "next/link";
import { useId } from "react";
import styles from "./styles.module.css";

type Props = {
  posts: Post[];
};

const PostListItem = ({ post }: { post: Post }) => {
  const postTitleId = useId();
  return (
    <tr className={styles.row} aria-labelledby={postTitleId}>
      <td>{post.id}</td>
      <td id={postTitleId}>{post.title}</td>
      <td>{post.publishedAt}</td>
      <td>
        <Link href={`/posts/${post.id}`}>
          <AnchorText hasArrow={true}>詳細</AnchorText>
        </Link>
      </td>
    </tr>
  );
};

export const Posts = ({ posts }: Props) => {
  return (
    <main className={styles.main}>
      <HeadGroup title="投稿一覧">
        <Link href={`/posts/new`}>
          <AnchorButton>新規作成</AnchorButton>
        </Link>
      </HeadGroup>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            <th>ID</th>
            <th>title</th>
            <th>publishedAt</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </main>
  );
};
