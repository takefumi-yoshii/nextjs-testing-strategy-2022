import { AnchorButton } from "@/components/atoms/AnchorButton";
import { AnchorText } from "@/components/atoms/AnchorText";
import { pageTitle } from "@/components/meta";
import { HeadGroup } from "@/components/molecules/HeadGroup";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/molecules/Table";
import { Post } from "@/services/api.example.com/posts";
import Head from "next/head";
import Link from "next/link";
import { useId } from "react";
import styles from "./styles.module.css";

type Props = {
  posts: Post[];
};

const PostListItem = ({ post }: { post: Post }) => {
  const postTitleId = useId();
  return (
    <Tr aria-labelledby={postTitleId}>
      <Td>{post.id}</Td>
      <Td id={postTitleId}>{post.title}</Td>
      <Td>{post.publishedAt}</Td>
      <Td>
        <Link href={`/posts/${post.id}`}>
          <AnchorText hasArrow={true}>詳細</AnchorText>
        </Link>
      </Td>
    </Tr>
  );
};

export const Posts = ({ posts }: Props) => {
  return (
    <main className={styles.main}>
      <Head>
        <title>{pageTitle("投稿一覧")}</title>
      </Head>
      <HeadGroup title="投稿一覧">
        <Link href={`/posts/new`}>
          <AnchorButton>新規作成</AnchorButton>
        </Link>
      </HeadGroup>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>title</Th>
            <Th>publishedAt</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </Tbody>
      </Table>
    </main>
  );
};
