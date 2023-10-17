"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createFolder } from "./actions";
import { AiOutlinePlusCircle } from "react-icons/ai";

import styles from "./addFolderForm.module.scss";


const AddForm: React.FC = () => {
  const initialValues: IAddFolder = { name: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Поле 'Додати папку' обов'язкове"),
  });

  const handleSubmit = (
    values: IAddFolder,
    { setSubmitting, setStatus }: any
  ) => {
    createFolder(values)
      .then((response) => {
        setStatus({ message: "Папку успішно створено" });
        // Додати додаткову логіку обробки успішного створення папки
      })
      .catch((error) => {
        setStatus({ message: "Помилка створення папки" });
        // Обробка помилки при створенні папки
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
      <Form className={styles.form}>
        <label htmlFor="name">Додати папку</label>
        <Field type="text" id="name" name="name" required />
        <ErrorMessage name="name" component="div" />

        <button type="submit" className={styles.formBtn}>
          <AiOutlinePlusCircle className={styles.formBtnIcon} />
        </button>

        <p aria-live="polite" className="sr-only">
          {/* Відображення повідомлення про статус форми */}
        </p>
      </Form>
    </Formik>
  );
};

export default AddForm;
