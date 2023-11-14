"use client";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { createDepartment } from "./actions";

import styles from "./addDocumentForm.module.scss";

interface Props {
  data?: IDocument;
  folders: IFolder[];
  users: IUser[];
}

const AddDocumentForm: React.FC<Props> = ({ data, folders, users }) => {
  const initialValues: IAddDocument = {
    number: "",
    date: "",
    title: "",
    description: "",
    addressee: "",
    addresseeSignature: "",
    documentDate: "",
    documentNumber: "",
    remark: "",
    control: false,
    controlFrequency: "",
    controlExecutor: "",
    folder: "",
    ...data,
  };

  const validationSchema = Yup.object({
    number: Yup.string().required(),
    date: Yup.string().required(),
    title: Yup.string().required(),
    remark: Yup.string().required(),
    control: Yup.boolean(),
    folder: Yup.string().required(),
    description: Yup.string(),
    addressee: Yup.string(),
    addresseeSignature: Yup.string(),
    documentDate: Yup.string(),
    documentNumber: Yup.string(),
    controlFrequency: Yup.string(),
    controlExecutor: Yup.string(),
  });

  const handleSubmit = (
    values: IAddDocument,
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
          <legend className={styles.formLegend}>
            {data ? "Редагування відділу" : "Додати нового відділу"}
          </legend>
          <label className={styles.formLabel} htmlFor="name">
            Номер
            <Field
              type="text"
              id="number"
              name="number"
              className={styles.formInput}
              required
            />
            <ErrorMessage name="number" component="div" />
          </label>

          <label className={styles.formLabel} htmlFor="name">
            Дата створення
            <Field
              type="date"
              id="date"
              name="date"
              className={styles.formInput}
            />
            <ErrorMessage name="date" component="div" />
          </label>

          <label className={styles.formLabel} htmlFor="name">
            Назва
            <Field
              type="text"
              id="title"
              name="title"
              className={styles.formInput}
              required
            />
            <ErrorMessage name="title" component="div" />
          </label>

          <label className={styles.formLabel} htmlFor="name">
            Ремарка
            <Field
              type="text"
              id="remark"
              name="remark"
              className={styles.formInput}
            />
            <ErrorMessage name="remark" component="div" />
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
            Папка
            <Field
              as="select"
              id="folder"
              name="folder"
              placeholder="Папка"
              className={styles.formInput}
            >
              <option key={0} value={undefined}>
                {}
              </option>
              {folders.map(
                (folder) =>
                  data?._id !== folder._id && (
                    <option key={folder._id} value={folder._id}>
                      {folder.name}
                    </option>
                  )
              )}
            </Field>
            <ErrorMessage name="description" component="div" />
          </label>

          <label className={styles.formLabel} htmlFor="name">
            Номер Документу
            <Field
              type="text"
              id="documentNumber"
              name="documentNumber"
              className={styles.formInput}
              required
            />
            <ErrorMessage name="documentNumber" component="div" />
          </label>

          <label className={styles.formLabel} htmlFor="name">
            Дата Документу
            <Field
              type="date"
              id="documentDate"
              name="documentDate"
              className={styles.formInput}
            />
            <ErrorMessage name="documentDate" component="div" />
          </label>

          <label className={styles.formLabel} htmlFor="name">
            Контроль
            <Field
              type="checkbox"
              id="control"
              name="control"
              className={styles.formInput}
            />
            <ErrorMessage name="control" component="div" />
          </label>

          <label className={styles.formLabel} htmlFor="name">
            Періодичність контролю
            <Field
              type="text"
              id="controlFrequency"
              name="controlFrequency"
              className={styles.formInput}
            />
            <ErrorMessage name="controlFrequency" component="div" />
          </label>

          <label className={styles.formLabel}>
            Відповідальний
            <Field
              as="select"
              id="controlExecutor"
              name="controlExecutor"
              className={styles.formInput}
            >
              <option key={0} value={undefined}>
                {}
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {`${user.name} ${user.surname}`}
                </option>
              ))}
            </Field>
            <ErrorMessage name="controlExecutor" component="div" />
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

export default AddDocumentForm;
