import { Alert } from "@/components/atoms/Alert";
import { usePortalDispatch } from "@/components/layouts/BasicLayout/PortalContextProvider";
import { pageTitle } from "@/components/meta";
import { UserForm } from "@/components/organisms/UserForm";
import { User } from "@/services/api.example.com/users";
import { updateUser } from "@/services/api/users/[id]";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

type Props = {
  user: User;
};

export const UserEdit = ({ user }: Props) => {
  const router = useRouter();
  const { showPortal } = usePortalDispatch();
  return (
    <main className={styles.main}>
      <Head>
        <title>{pageTitle("ユーザー編集")}</title>
      </Head>
      <UserForm
        title="ユーザー編集"
        initialValues={user}
        onValid={async (values) => {
          const { data, err } = await updateUser(user.id, values);
          if (data) {
            showPortal(() => (
              <Alert theme="success">ユーザーの編集に成功しました</Alert>
            ));
            router.push(`/users/${user.id}`);
          }
          if (err) {
            showPortal(() => (
              <Alert theme="fail">ユーザーの編集に失敗しました</Alert>
            ));
          }
        }}
      />
    </main>
  );
};
