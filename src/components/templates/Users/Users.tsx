import { AnchorButton } from "@/components/atoms/AnchorButton";
import { AnchorText } from "@/components/atoms/AnchorText";
import { HeadGroup } from "@/components/molecules/HeadGroup";
import { User } from "@/services/api.example.com/users";
import Link from "next/link";
import { useId } from "react";
import styles from "./styles.module.css";

type Props = {
  users: User[];
};

const UserListItem = ({ user }: { user: User }) => {
  const userNameId = useId();
  return (
    <tr className={styles.row} aria-labelledby={userNameId}>
      <td>{user.id}</td>
      <td id={userNameId}>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link href={`/users/${user.id}`}>
          <AnchorText hasArrow={true}>詳細</AnchorText>
        </Link>
      </td>
    </tr>
  );
};

export const Users = ({ users }: Props) => {
  return (
    <main className={styles.main}>
      <HeadGroup title="ユーザー一覧">
        <Link href={`/users/new`}>
          <AnchorButton>新規作成</AnchorButton>
        </Link>
      </HeadGroup>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            <th>ID</th>
            <th>name</th>
            <th>email</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </main>
  );
};
