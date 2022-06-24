import { PortalContextProvider } from "@/components/layouts/BasicLayout/PortalContextProvider";
import { DecoratorFn } from "@storybook/react";
import type { RequestHandler } from "msw";

export function storyHandlers(story: any): RequestHandler[] {
  return story.parameters.msw.handlers;
}

export const PortalContextDecorator: DecoratorFn = (Story) => (
  <PortalContextProvider>
    <Story />
  </PortalContextProvider>
);
