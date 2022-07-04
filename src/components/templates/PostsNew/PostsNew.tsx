import { Alert } from "@/components/atoms/Alert";
import { usePortalDispatch } from "@/components/layouts/BasicLayout/PortalContextProvider";
import { pageTitle } from "@/components/meta";
import { PostForm } from "@/components/organisms/PostForm/PostForm";
import { createPost } from "@/services/api/posts";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

export const PostsNew = () => {
  const router = useRouter();
  const { showPortal } = usePortalDispatch();
  return (
    <main className={styles.main}>
      <Head>
        <title>{pageTitle("投稿作成")}</title>
      </Head>
      <PostForm
        title="投稿作成"
        onValid={async (values) => {
          const { data, err } = await createPost(values);
          if (data) {
            showPortal(() => (
              <Alert theme="success">投稿の作成に成功しました</Alert>
            ));
            router.push(`/posts/${data.post.id}`);
          }
          if (err) {
            showPortal(() => (
              <Alert theme="fail">投稿の作成に失敗しました</Alert>
            ));
          }
        }}
      />
    </main>
  );
};
