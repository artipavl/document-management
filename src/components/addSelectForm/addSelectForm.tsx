"use client";

import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikConfig,
  FormikValues,
} from "formik";
import * as Yup from "yup";
import { addSelect } from "./actions";
import { AiOutlinePlusCircle } from "react-icons/ai";

import styles from "./addSelectForm.module.scss";

interface addSelectFormProps {
  selectName: "folder" | "periodicity" | "execution" | "importance";
  title: string;
  data?: ISelect;
}

const AddSelectForm: React.FC<addSelectFormProps> = ({
  selectName,
  title,
  data,
}) => {
  const initialValues = { name: data ? data.name : "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Поле обов'язкове"),
  });

  const handleSubmit = (
    values: IAddSelect,
    { setSubmitting, setStatus, resetForm }: any
  ) => {
    addSelect({ selectName, name: values.name, data: data })
      .then((response) => {
        setStatus({ message: data ? "Успішно змінено" : "Успішно створено" });
        resetForm();
      })
      .catch((error) => {
        setStatus({
          message: data ? "Змінени не застосовані" : "Помилка створення",
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
      <Form className={styles.form}>
        <label htmlFor="name">{title}</label>
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

export default AddSelectForm;
