import { Button } from "@/components/atoms/Button";
import { pageTitle } from "@/components/meta";
import { TextboxWithTitle } from "@/components/molecules/TextboxWithTitle";
import { postLogin } from "@/services/api/login";
import { LoginInputSchema } from "@/services/api/login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

const defaultValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues,
    resolver: zodResolver(LoginInputSchema),
  });
  return (
    <main className={styles.main}>
      <Head>
        <title>{pageTitle("ログイン")}</title>
      </Head>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit(async (values) => {
          const { data, err } = await postLogin(values);
          if (data && data.user) {
            window.location.href = "/";
          }
          if (err) {
            window.alert("ログインに失敗しました");
          }
        })}
      >
        <TextboxWithTitle
          labelProps={{ children: "メールアドレス" }}
          textboxProps={register("email")}
          error={formState.errors.email?.message}
        />
        <TextboxWithTitle
          labelProps={{ children: "パスワード" }}
          textboxProps={{ ...register("password"), type: "password" }}
          error={formState.errors.password?.message}
        />
        <Button>ログイン</Button>
      </form>
    </main>
  );
};
