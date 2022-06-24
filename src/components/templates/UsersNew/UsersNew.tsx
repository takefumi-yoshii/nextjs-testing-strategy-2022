import { Alert } from "@/components/atoms/Alert";
import { usePortalDispatch } from "@/components/layouts/BasicLayout/PortalContextProvider";
import { UserForm } from "@/components/organisms/UserForm";
import { createUser } from "@/services/api/users";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

export const UsersNew = () => {
  const router = useRouter();
  const { showPortal } = usePortalDispatch();
  return (
    <main className={styles.main}>
      <UserForm
        title="ユーザー作成"
        onValid={async (values) => {
          const { data, err } = await createUser(values);
          if (data) {
            showPortal(() => (
              <Alert theme="success">ユーザーの作成に成功しました</Alert>
            ));
            router.push(`/users/${data.user.id}`);
          }
          if (err) {
            showPortal(() => (
              <Alert theme="fail">ユーザーの作成に失敗しました</Alert>
            ));
          }
        }}
      />
    </main>
  );
};
