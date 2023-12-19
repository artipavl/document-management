"use client";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { createUser } from "./actions";

import styles from "./recoverUserForm.module.scss";
import Link from "next/link";

interface Props {}

const RecoverUserForm: React.FC<Props> = () => {
  const initialValues: IRecoverUser = {
    name: "",
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Невірний формат пошти")
      .required("Поле 'Пошта' обов'язкове"),
    name: Yup.string().required("Поле 'Імя' обов'язкове"),
  });

  const handleSubmit = (
    values: IRecoverUser,
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
          <legend className={styles.formLegend}>Відновлення паролю</legend>
          <label className={styles.formLabel}>
            Імя
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Петро"
              className={styles.formInput}
              required
            />
            <ErrorMessage name="name" component="div" />
          </label>
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

          <div className="flex items-end">
            <Link href="/login">Увійти</Link>
            <button type="submit" className={styles.formBtn}>
              Відновити
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

export default RecoverUserForm;
