"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createFolder } from "./actions";
import { AiOutlinePlusCircle } from "react-icons/ai";

import styles from "./addAddresseeForm.module.scss";


const AddAddresseeForm: React.FC = () => {
  const initialValues: IAddAddressee = { name: "", email: "", phone: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Поле 'Назва' обов'язкове"),
    email: Yup.string().email("Невірний формат пошти").required("Поле 'Пошта' обов'язкове"),
    phone: Yup.string().matches(/^\+?\d+$/, "Невірний формат телефону"),
  });

  const handleSubmit = (values: IAddAddressee, { setSubmitting, setStatus,resetForm }: any) => {
    createFolder(values)
      .then((response) => {
        setStatus({ message: "Адресата успішно додано" });
        // Додати додаткову логіку обробки успішного додавання адресата
        resetForm()
      })
      .catch((error) => {
        setStatus({ message: "Помилка додавання адресата" });
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
        <legend className={styles.formLegend}>Додати нового адресата</legend>
        <label className={styles.formLabel} htmlFor="name">
          Назва
          <Field
            type="text"
            id="name"
            name="name"
            placeholder="ТОВ ПХУ"
            className={styles.formInput}
            required
          />
          <ErrorMessage name="name" component="div" />
        </label>
        <label className={styles.formLabel} htmlFor="email">
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
        <label className={styles.formLabel} htmlFor="phone">
          Телефон
          <Field
            type="tel"
            id="phone"
            name="phone"
            placeholder="+380978058751"
            className={styles.formInput}
          />
          <ErrorMessage name="phone" component="div" />
        </label>
        <button type="submit" className={styles.formBtn}>
          <AiOutlinePlusCircle className={styles.formBtnIcon} />
          Додати
        </button>
        <p aria-live="polite" className="sr-only">
          {/* Відображення повідомлення про статус форми */}
        </p>
      </Form>
    </Formik>
  );
};

export default AddAddresseeForm;
