import { BasicLayout } from "@/components/layouts/BasicLayout/BasicLayout";
import { Error } from "@/components/templates/Error";
import { PostEdit } from "@/components/templates/PostEdit/PostEdit";
import { num } from "@/lib/next/asserts";
import { auth, combineGssp } from "@/lib/next/gssp";
import { NextPageWithLayout } from "@/lib/next/types";
import { HttpResponse } from "@/services/api.example.com/fetcher/type";
import { PostData } from "@/services/api.example.com/posts";
import { getPost } from "@/services/api.example.com/posts/[id]";

type Props = HttpResponse<PostData>;

const Page: NextPageWithLayout<Props> = ({ data, err }) =>
  err ? <Error {...err} /> : <PostEdit {...data} />;
Page.getLayout = BasicLayout;

export const getServerSideProps = combineGssp<Props>(
  auth,
  async ({ query }) => ({ props: await getPost({ id: num(query.id) }) })
);

export default Page;
