import { initialize, mswDecorator } from "msw-storybook-addon";
import { RouterContext } from "next/dist/shared/lib/router-context";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    path: "/",
    asPath: "/",
    query: {},
    push(path) {
      console.log(`router push to: ${path}`);
    },
    Provider: RouterContext.Provider,
  },
};

initialize();
export const decorators = [mswDecorator];
