import { BasicLayout } from "@/components/layouts/BasicLayout/BasicLayout";
import { Error } from "@/components/templates/Error";
import { Posts } from "@/components/templates/Posts";
import { auth, combineGssp } from "@/lib/next/gssp";
import { NextPageWithLayout } from "@/lib/next/types";
import { HttpResponse } from "@/services/api.example.com/fetcher/type";
import { getPosts, PostsData } from "@/services/api.example.com/posts";

type Props = HttpResponse<PostsData>;

const Page: NextPageWithLayout<Props> = ({ data, err }) =>
  err ? <Error {...err} /> : <Posts {...data} />;
Page.getLayout = BasicLayout;

export const getServerSideProps = combineGssp<Props>(auth, async () => ({
  props: await getPosts(),
}));

export default Page;
