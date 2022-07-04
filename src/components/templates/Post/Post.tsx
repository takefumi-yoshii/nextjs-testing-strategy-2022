import { AnchorButton } from "@/components/atoms/AnchorButton";
import { pageTitle } from "@/components/meta";
import { HeadGroup } from "@/components/molecules/HeadGroup";
import { Table, Tbody, Td, Th, Tr } from "@/components/molecules/Table";
import { PostData } from "@/services/api.example.com/posts";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.css";

type Props = PostData;

export const Post = ({ post }: Props) => {
  return (
    <main className={styles.main}>
      <Head>
        <title>{pageTitle("投稿詳細")}</title>
      </Head>
      <HeadGroup title="投稿詳細">
        <Link href={`/posts/${post.id}/edit`}>
          <AnchorButton>編集する</AnchorButton>
        </Link>
      </HeadGroup>
      <Table>
        <Tbody>
          <Tr>
            <Th>ID</Th>
            <Td>{post.id}</Td>
          </Tr>
          <Tr>
            <Th>title</Th>
            <Td>{post.title}</Td>
          </Tr>
          <Tr>
            <Th>publishedAt</Th>
            <Td>{post.publishedAt}</Td>
          </Tr>
        </Tbody>
      </Table>
    </main>
  );
};
