import { Err } from "@/services/api.example.com/fetcher/type";

type Props = Err;

export const Error = ({ message, status }: Props) => {
  return (
    <main>
      <h2>{status}</h2>
      <p>{message}</p>
    </main>
  );
};
