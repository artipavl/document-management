"use client";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { createDepartment } from "./actions";

import styles from "./addDepartmentForm.module.scss";

interface Props {
  data?: IDepartment;
}

const AddDepartmentForm: React.FC<Props> = ({ data }) => {
  const initialValues: IAddDepartment = {
    name: "",
    email: "",
    phone: "",
    description: "",
    employees: [],
    ...data,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Поле 'Назва' обов'язкове"),
    email: Yup.string()
      .email("Невірний формат пошти")
      .required("Поле 'Пошта' обов'язкове"),
    phone: Yup.string().matches(/^\+?\d+$/, "Невірний формат телефону"),
    description: Yup.string(),
    employees: Yup.array().of(Yup.string()),
  });

  const handleSubmit = (
    values: IAddDepartment,
    { setSubmitting, setStatus, resetForm }: any
  ) => {
    const id = data ? data._id.toString() : undefined;
    createDepartment(values, id)
      .then((response) => {
        setStatus({
          message: data
            ? "Адресата успішно змінено"
            : "Адресата успішно додано",
        });
        !data && resetForm();
      })
      .catch((error) => {
        setStatus({
          message: data
            ? "Помилка змін у адресаті"
            : "Помилка додавання адресата",
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
          <legend className={styles.formLegend}>Додати нового адресата</legend>
          <label className={styles.formLabel} htmlFor="name">
            Назва
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Відділ документообігу"
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
          <label className={styles.formLabel} htmlFor="phone">
            Опис
            <Field
              type="text"
              id="description"
              name="description"
              placeholder="Опис"
              className={styles.formInput}
            />
            <ErrorMessage name="description" component="div" />
          </label>

          {/* <FieldArray
            name="underAddressee"
            render={(arrayHelpers) => (
              <div>
                <p className={styles.formArrayTitle}>Отримувачі</p>
                <ul className={styles.formArrayList}>
                  {props.values.underAddressee.map((friend, index) => (
                    <li key={index} className={styles.formArrayItem}>
                      <label
                        className={styles.formLabel}
                        htmlFor={`underAddressee[${index}].name`}
                      >
                        Назва
                        <Field
                          type="text"
                          id={`underAddressee[${index}].name`}
                          name={`underAddressee[${index}].name`}
                          className={styles.formInput}
                        />
                      </label>
                      <label
                        className={styles.formLabel}
                        htmlFor={`underAddressee[${index}].peopleName`}
                      >
                        ПІБ
                        <Field
                          type="text"
                          id={`underAddressee[${index}].peopleName`}
                          name={`underAddressee[${index}].peopleName`}
                          className={styles.formInput}
                        />
                      </label>
                      <button
                        type="button"
                        className={styles.formArrayItemBtn}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={styles.formBtn}
                  onClick={() =>
                    arrayHelpers.push({ name: "", peopleName: "" })
                  }
                >
                  +
                </button>
              </div>
            )}
          /> */}

          <button type="submit" className={styles.formBtn}>
            {data ? "Зберегти" : "Додати"}
          </button>
          <p aria-live="polite" className="sr-only">
            {props.status && props.status.message}
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default AddDepartmentForm;
