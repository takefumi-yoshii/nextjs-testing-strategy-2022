import { BasicLayout } from "@/components/layouts/BasicLayout/BasicLayout";
import { Error } from "@/components/templates/Error";
import { Login } from "@/components/templates/Login";
import { Top } from "@/components/templates/Top";
import { assertBoolean } from "@/lib/asserts";
import { combineGssp } from "@/lib/next/gssp";
import { checkLogin } from "@/lib/next/gssp/middlewares/checkLogin";
import { NextPageWithLayout } from "@/lib/next/types";
import { HttpResponse } from "@/services/api.example.com/fetcher/type";

type Props = HttpResponse<{ isLogin: boolean }>;

const Page: NextPageWithLayout<Props> = ({ data, err }) =>
  err ? <Error {...err} /> : data.isLogin ? <Top /> : <Login />;
Page.getLayout = BasicLayout;

export const getServerSideProps = combineGssp<Props>(
  checkLogin,
  async (_, isLogin) => {
    assertBoolean(isLogin);
    return { props: { data: { isLogin }, err: null, status: 200 } };
  }
);

export default Page;
