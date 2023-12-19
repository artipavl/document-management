"use client";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { createUser } from "./actions";

import styles from "./loginUserForm.module.scss";
import Link from "next/link";

interface Props {}

const LoginUserForm: React.FC<Props> = () => {
  const initialValues: ILoginUser = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Невірний формат пошти")
      .required("Поле 'Пошта' обов'язкове"),
    password: Yup.string().required("Поле 'Пороль' обов'язкове"),
  });

  const handleSubmit = (
    values: ILoginUser,
    { setSubmitting, setStatus, resetForm }: any
  ) => {
    createUser(values)
      .then((response) => {
        setStatus({
          message: "Користувач успішно авотризований",
        });
        resetForm();
      })
      .catch((error) => {
        setStatus({
          message: "Помилка авторизації",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className={styles.form}>
          <legend className={styles.formLegend}>Авторизація</legend>

          <label className={styles.formLabel}>
            Пошта
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="pxy@gmail.com"
              className={styles.formInput}
              required
            />
            <ErrorMessage name="email" component="div" />
          </label>

          <label className={styles.formLabel}>
            Пароль
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Пароль"
              className={styles.formInput}
              required
            />
            <ErrorMessage name="password" component="div" />
          </label>

          <div className="flex items-end">
            <Link href="/reset-password">Забув пароль</Link>
            <button type="submit" className={styles.formBtn}>
              Увійти
            </button>
          </div>

          <p aria-live="polite" className="sr-only">
            {props.status && props.status.message}
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default LoginUserForm;
