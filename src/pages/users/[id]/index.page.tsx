import { BasicLayout } from "@/components/layouts/BasicLayout/BasicLayout";
import { Error } from "@/components/templates/Error";
import { User } from "@/components/templates/User";
import { num } from "@/lib/next/asserts";
import { auth, combineGssp } from "@/lib/next/gssp";
import { NextPageWithLayout } from "@/lib/next/types";
import { HttpResponse } from "@/services/api.example.com/fetcher/type";
import { UserData } from "@/services/api.example.com/users";
import { getUser } from "@/services/api.example.com/users/[id]";

type Props = HttpResponse<UserData>;

const Page: NextPageWithLayout<Props> = ({ data, err }) =>
  err ? <Error {...err} /> : <User {...data} />;
Page.getLayout = BasicLayout;

export const getServerSideProps = combineGssp<Props>(
  auth,
  async ({ query }) => ({ props: await getUser({ id: num(query.id) }) })
);

export default Page;
