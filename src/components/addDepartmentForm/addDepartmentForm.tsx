"use client";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { createDepartment } from "./actions";

import styles from "./addDepartmentForm.module.scss";

interface Props {
  data?: IDepartment;
  dependents: IDepartment[];
}

const AddDepartmentForm: React.FC<Props> = ({ data, dependents }) => {
  const initialValues: IAddDepartment = {
    name: "",
    email: "",
    phone: "",
    description: "",
    employees: [],
    dependent: undefined,
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
    dependent: Yup.string(),
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
          <legend className={styles.formLegend}>{data?"Редагування відділу":"Додати нового відділу"}</legend>
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
          <label className={styles.formLabel} htmlFor="phone">
            Підпорядкований
            <Field
              as="select"
              id="dependent"
              name="dependent"
              placeholder="Підпорядкований"
              className={styles.formInput}
            >
              <option key={0} value={undefined}>
                {}
              </option>
              {dependents.map(
                (dependent) =>
                  data?._id !== dependent._id && (
                    <option key={dependent._id} value={dependent._id}>
                      {dependent.name}
                    </option>
                  )
              )}
            </Field>
            <ErrorMessage name="description" component="div" />
          </label>

          {data && (
            <>
              <p className={styles.formLabel}>Працівники </p>
              <ul>
                {data.employees.map((employee) => (
                  <li key={employee._id}>
                    ПІБ:
                    {" " + employee.name}
                    {" " + employee.surname + " "}
                    {employee.lastName && employee.lastName + " "}
                    Посада:
                    {employee.jobPosition ? " " + employee.jobPosition : " -"}
                  </li>
                ))}
              </ul>
            </>
          )}

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
