import { AnchorButton } from "@/components/atoms/AnchorButton";
import { pageTitle } from "@/components/meta";
import { HeadGroup } from "@/components/molecules/HeadGroup";
import { Table, Tbody, Td, Th, Tr } from "@/components/molecules/Table";
import { User as IUser } from "@/services/api.example.com/users";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.css";

type Props = {
  user: IUser;
};

export const User = ({ user }: Props) => {
  return (
    <main className={styles.main}>
      <Head>
        <title>{pageTitle("ユーザー詳細")}</title>
      </Head>
      <HeadGroup title="ユーザー詳細">
        <Link href={`/users/${user.id}/edit`}>
          <AnchorButton>編集する</AnchorButton>
        </Link>
      </HeadGroup>
      <Table>
        <Tbody>
          <Tr>
            <Th>ID</Th>
            <Td>{user.id}</Td>
          </Tr>
          <Tr>
            <Th>name</Th>
            <Td>{user.name}</Td>
          </Tr>
          <Tr>
            <Th>email</Th>
            <Td>{user.email}</Td>
          </Tr>
        </Tbody>
      </Table>
    </main>
  );
};
