import { AppPropsWithLayout } from "@/lib/next/types";
import "../../public/css/reset.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../tests/mock");
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
