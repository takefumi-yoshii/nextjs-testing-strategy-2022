import { Button } from "@/components/atoms/Button";
import { TextboxWithTitle } from "@/components/molecules/TextboxWithTitle";
import { UserInputSchema } from "@/services/api/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

type Values = {
  name: string;
  email: string;
};

type Props = {
  title: string;
  initialValues?: Partial<Values>;
  onValid: (values: Values) => Promise<void>;
};

const defaultValues: Values = {
  name: "",
  email: "",
};

export const UserForm = ({ title, initialValues, onValid }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(UserInputSchema),
  });
  const headingId = useId();
  return (
    <form aria-labelledby={headingId} onSubmit={handleSubmit(onValid)}>
      <h2 id={headingId} className={styles.heading}>
        {title}
      </h2>
      <TextboxWithTitle
        className={styles.textbox}
        labelProps={{ children: "ユーザー名" }}
        textboxProps={{
          ...register("name"),
          placeholder: "田中 太郎",
        }}
        error={errors.name?.message}
      />
      <TextboxWithTitle
        className={styles.textbox}
        labelProps={{ children: "メールアドレス" }}
        textboxProps={{
          ...register("email"),
          placeholder: "example@gmail.com",
        }}
        error={errors.email?.message}
      />
      <Button className={styles.button}>送信する</Button>
    </form>
  );
};
