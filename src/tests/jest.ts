import { AssertsError } from "@/lib/asserts";
import { RequestHandler } from "msw";
import { setupServer } from "msw/node";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next";
import {
  createRequest,
  createResponse,
  RequestOptions,
  ResponseOptions,
} from "node-mocks-http";

export function setupMockServer(...handlers: RequestHandler[]) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

const mockSession = { user: "me", destroy: () => {} };

export const gsspCtx = (
  ctx?: Partial<GetServerSidePropsContext>,
  options?: {
    reqOptions?: RequestOptions;
    resOptions?: ResponseOptions;
  },
  loggedIn = true
): GetServerSidePropsContext => ({
  req: createRequest({
    ...(loggedIn && { session: mockSession }),
    ...options?.reqOptions,
  }),
  res: createResponse(options?.resOptions),
  params: undefined,
  query: {},
  resolvedUrl: "",
  ...ctx,
});

export function assertHasProps<T>(
  res: GetServerSidePropsResult<T>
): asserts res is { props: T } {
  const hasProps =
    typeof res === "object" &&
    (res as any)["props"] &&
    typeof (res as any).props === "object";
  if (!hasProps) throw new AssertsError("no props");
}

export const apiHandlerArgs = (options?: {
  reqOptions?: RequestOptions;
  resOptions?: ResponseOptions;
}) => {
  const req = createRequest(options?.reqOptions);
  const res = createResponse(options?.resOptions);
  return [req, res] as [
    NextApiRequest & ReturnType<typeof createRequest>,
    NextApiResponse & ReturnType<typeof createResponse>
  ];
};

export async function testApiHandler(
  handler: NextApiHandler,
  reqOptions?: RequestOptions,
  loggedIn = true
) {
  const [req] = apiHandlerArgs({
    reqOptions: {
      ...(loggedIn && { session: mockSession }),
      ...reqOptions,
    },
  });
  const status = jest.fn();
  const json = jest.fn();
  const res = {
    status: (s: number) => {
      status(s);
      return { json };
    },
  } as any as NextApiResponse;
  await handler(req, res);
  return { req, res, status, json } as const;
}
