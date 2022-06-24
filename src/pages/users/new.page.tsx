import { BasicLayout } from "@/components/layouts/BasicLayout/BasicLayout";
import { UsersNew } from "@/components/templates/UsersNew/UsersNew";
import { auth, combineGssp } from "@/lib/next/gssp";
import { NextPageWithLayout } from "@/lib/next/types";
import { HttpResponse } from "@/services/api.example.com/fetcher/type";

type Props = HttpResponse<{}>;

const Page: NextPageWithLayout<Props> = ({ data }) => <UsersNew {...data} />;
Page.getLayout = BasicLayout;

export const getServerSideProps = combineGssp<Props>(auth, async () => ({
  props: Promise.resolve({ data: {}, err: null, status: 200 }),
}));

export default Page;
