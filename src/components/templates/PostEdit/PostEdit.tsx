import { Alert } from "@/components/atoms/Alert";
import { usePortalDispatch } from "@/components/layouts/BasicLayout/PortalContextProvider";
import { pageTitle } from "@/components/meta";
import { PostForm } from "@/components/organisms/PostForm/PostForm";
import { PostData } from "@/services/api.example.com/posts";
import { updatePost } from "@/services/api/posts/[id]";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

type Props = PostData;

export const PostEdit = ({ post }: Props) => {
  const router = useRouter();
  const { showPortal } = usePortalDispatch();
  return (
    <main className={styles.main}>
      <Head>
        <title>{pageTitle("投稿編集")}</title>
      </Head>
      <PostForm
        title="投稿編集"
        initialValues={post}
        onValid={async (values) => {
          const { data, err } = await updatePost({ id: post.id }, values);
          if (data) {
            showPortal(() => (
              <Alert theme="success">投稿の編集に成功しました</Alert>
            ));
            router.push(`/posts/${post.id}`);
          }
          if (err) {
            showPortal(() => (
              <Alert theme="fail">投稿の編集に失敗しました</Alert>
            ));
          }
        }}
      />
    </main>
  );
};
