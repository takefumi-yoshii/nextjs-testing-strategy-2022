import { AnchorButton } from "@/components/atoms/AnchorButton";
import { AnchorText } from "@/components/atoms/AnchorText";
import { pageTitle } from "@/components/meta";
import { HeadGroup } from "@/components/molecules/HeadGroup";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/molecules/Table";
import { User } from "@/services/api.example.com/users";
import Head from "next/head";
import Link from "next/link";
import { useId } from "react";
import styles from "./styles.module.css";

type Props = {
  users: User[];
};

const UserListItem = ({ user }: { user: User }) => {
  const userNameId = useId();
  return (
    <Tr aria-labelledby={userNameId}>
      <Td>{user.id}</Td>
      <Td id={userNameId}>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>
        <Link href={`/users/${user.id}`}>
          <AnchorText hasArrow={true}>詳細</AnchorText>
        </Link>
      </Td>
    </Tr>
  );
};

export const Users = ({ users }: Props) => {
  return (
    <main className={styles.main}>
      <Head>
        <title>{pageTitle("ユーザー一覧")}</title>
      </Head>
      <HeadGroup title="ユーザー一覧">
        <Link href={`/users/new`}>
          <AnchorButton>新規作成</AnchorButton>
        </Link>
      </HeadGroup>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>name</Th>
            <Th>email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </Tbody>
      </Table>
    </main>
  );
};
