import { Button } from "@/components/atoms/Button";
import { TextareaWithTitle } from "@/components/molecules/TextareaWithTitle";
import { TextboxWithTitle } from "@/components/molecules/TextboxWithTitle";
import { PostInput, PostInputSchema } from "@/services/api.example.com/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

type Values = PostInput;

type Props = {
  title: string;
  initialValues?: Partial<Values>;
  onValid: (values: Values) => Promise<void>;
};

const defaultValues: Values = {
  body: "",
  title: "",
  author: "",
  published: true,
  publishedAt: "",
};

export const PostForm = ({ title, initialValues, onValid }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(PostInputSchema),
  });
  const headingId = useId();
  return (
    <form aria-labelledby={headingId} onSubmit={handleSubmit(onValid)}>
      <h2 id={headingId} className={styles.heading}>
        {title}
      </h2>
      <TextboxWithTitle
        className={styles.textbox}
        labelProps={{ children: "タイトル" }}
        textboxProps={{
          ...register("title"),
          placeholder: "タイトルを入力",
        }}
        error={errors.title?.message}
      />
      <TextboxWithTitle
        className={styles.textbox}
        labelProps={{ children: "著者" }}
        textboxProps={{
          ...register("author"),
          placeholder: "著者を入力",
        }}
        error={errors.author?.message}
      />
      <TextareaWithTitle
        className={styles.textbox}
        labelProps={{ children: "本文" }}
        textareaProps={{
          ...register("body"),
          placeholder: "本文を入力",
          rows: 10,
        }}
        error={errors.body?.message}
      />
      <div>
        <label>
          公開
          <input type="checkbox" {...register("published")} />
        </label>
      </div>
      <Button className={styles.button}>送信する</Button>
    </form>
  );
};
