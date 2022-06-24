import { AnchorButton } from "@/components/atoms/AnchorButton";
import { HeadGroup } from "@/components/molecules/HeadGroup";
import { User as IUser } from "@/services/api.example.com/users";
import Link from "next/link";
import styles from "./styles.module.css";

type Props = {
  user: IUser;
};

export const User = ({ user }: Props) => {
  return (
    <main className={styles.main}>
      <HeadGroup title="ユーザー詳細">
        <Link href={`/users/${user.id}/edit`}>
          <AnchorButton>編集する</AnchorButton>
        </Link>
      </HeadGroup>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.row}>
            <th>ID</th>
            <td>{user.id}</td>
          </tr>
          <tr className={styles.row}>
            <th>name</th>
            <td>{user.name}</td>
          </tr>
          <tr className={styles.row}>
            <th>email</th>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};
