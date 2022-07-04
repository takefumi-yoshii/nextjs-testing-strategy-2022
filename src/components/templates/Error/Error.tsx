import { pageTitle } from "@/components/meta";
import { Err } from "@/services/api.example.com/fetcher/type";
import Head from "next/head";

type Props = Err;

export const Error = ({ message, status }: Props) => {
  return (
    <main>
      <Head><title>{pageTitle("エラー")}</title></Head>
      <h2>{status}</h2>
      <p>{message}</p>
    </main>
  );
};
