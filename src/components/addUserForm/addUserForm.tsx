"use client";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { createUser } from "./actions";

import styles from "./addUserForm.module.scss";

interface Props {
  data?: IUser;
  departments: IDepartment[];
}

const AddUserForm: React.FC<Props> = ({ data, departments }) => {
  const initialValues: IAddUser = {
    name: "",
    surname: "",
    lastName: "",
    jobPosition: "",
    email: "",
    phone: "",
    birthday: "",
    startWork: "",
    finishWork: "",
    department: undefined,
    ...data,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Поле 'Ім'я' обов'язкове"),
    surname: Yup.string().required("Поле 'Прізвище' обов'язкове"),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Невірний формат пошти")
      .required("Поле 'Пошта' обов'язкове"),
    phone: Yup.string().matches(/^\+?\d+$/, "Невірний формат телефону"),
    description: Yup.string(),
    employees: Yup.array().of(Yup.string()),
    dependent: Yup.string(),
    birthday: Yup.date(),
    startWork: Yup.date(),
    finishWork: Yup.date(),
  });

  const handleSubmit = (
    values: IAddUser,
    { setSubmitting, setStatus, resetForm }: any
  ) => {
    const id = data ? data._id.toString() : undefined;
    createUser(values, id)
      .then((response) => {
        setStatus({
          message: data
            ? "Користувач успішно змінено"
            : "Користувача успішно додано",
        });
        !data && resetForm();
      })
      .catch((error) => {
        setStatus({
          message: data
            ? "Помилка змін у користувачі"
            : "Помилка додавання користувача",
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
          <legend className={styles.formLegend}>
            {data ? "Редагування користувача" : "Додати нового Користувача"}
          </legend>
          <label className={styles.formLabel} htmlFor="name">
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
          <label className={styles.formLabel} htmlFor="name">
            Прізвище
            <Field
              type="text"
              id="surname"
              name="surname"
              placeholder="Петров"
              className={styles.formInput}
              required
            />
            <ErrorMessage name="surname" component="div" />
          </label>
          <label className={styles.formLabel} htmlFor="name">
            По батькові
            <Field
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Петрович"
              className={styles.formInput}
            />
            <ErrorMessage name="lastName" component="div" />
          </label>

          <label className={styles.formLabel} htmlFor="name">
            Дата народження
            <Field
              type="date"
              id="birthday"
              name="birthday"
              className={styles.formInput}
            />
            <ErrorMessage name="birthday" component="div" />
          </label>
          <label className={styles.formLabel} htmlFor="name">
            Почав працювати
            <Field
              type="date"
              id="startWork"
              name="startWork"
              className={styles.formInput}
            />
            <ErrorMessage name="startWork" component="div" />
          </label>
          <label className={styles.formLabel} htmlFor="name">
            Звільнення
            <Field
              type="date"
              id="finishWork"
              name="finishWork"
              className={styles.formInput}
            />
            <ErrorMessage name="finishWork" component="div" />
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

          <label className={styles.formLabel} htmlFor="name">
            Посада
            <Field
              type="text"
              id="jobPosition"
              name="jobPosition"
              placeholder="Головний спеціаліст"
              className={styles.formInput}
            />
            <ErrorMessage name="jobPosition" component="div" />
          </label>

          <label className={styles.formLabel} htmlFor="phone">
            Працює у
            <Field
              as="select"
              id="department"
              name="department"
              className={styles.formInput}
            >
              <option key={0} value={undefined}>
                {}
              </option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="description" component="div" />
          </label>

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

export default AddUserForm;
