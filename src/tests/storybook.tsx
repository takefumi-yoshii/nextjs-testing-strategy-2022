import { PortalContextProvider } from "@/components/layouts/BasicLayout/PortalContextProvider";
import { DecoratorFn } from "@storybook/react";

export const PortalContextDecorator: DecoratorFn = (Story) => (
  <PortalContextProvider>
    <Story />
  </PortalContextProvider>
);
