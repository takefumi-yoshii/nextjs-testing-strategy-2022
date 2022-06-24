import { BasicLayout } from "@/components/layouts/BasicLayout/BasicLayout";
import { Error } from "@/components/templates/Error";
import { Users } from "@/components/templates/Users";
import { auth, combineGssp } from "@/lib/next/gssp";
import { NextPageWithLayout } from "@/lib/next/types";
import { HttpResponse } from "@/services/api.example.com/fetcher/type";
import { getUsers, UsersData } from "@/services/api.example.com/users";

type Props = HttpResponse<UsersData>;

const Page: NextPageWithLayout<Props> = ({ data, err }) =>
  err ? <Error {...err} /> : <Users {...data} />;
Page.getLayout = BasicLayout;

export const getServerSideProps = combineGssp<Props>(auth, async () => ({
  props: await getUsers(),
}));

export default Page;
