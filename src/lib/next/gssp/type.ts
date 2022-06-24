import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export type GsspMiddlewareArgs = [GetServerSidePropsContext, ...unknown[]];

export type GsspMiddleware = (
  ...args: GsspMiddlewareArgs
) => Promise<GsspMiddlewareArgs>;

export type GetServerSideProps<T, Q, D> = (
  ...args: GsspMiddlewareArgs
) => Promise<GetServerSidePropsResult<T>>;
