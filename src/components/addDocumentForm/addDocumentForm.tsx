"use client";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { createDepartment } from "./actions";

import styles from "./addDocumentForm.module.scss";
import { useState } from "react";

interface Props {
  data?: IDocument;
  folders: IFolder[];
  users: IUser[];
  addressees: IAddressee[];
}

const AddDocumentForm: React.FC<Props> = ({
  data,
  folders,
  users,
  addressees,
}) => {
  const [page, setPage] = useState<number>(0);
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
    resolutions: [],
    letters: [],
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
    resolutions: Yup.array(),
    letters: Yup.array(),
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
          <ul className={styles.formNav}>
            <li>
              <button
                type="button"
                onClick={() => setPage(0)}
                className={
                  page === 0
                    ? styles.formNavLink + " " + styles.formNavLinkActive
                    : styles.formNavLink
                }
              >
                Документ
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setPage(1)}
                className={
                  page === 1
                    ? styles.formNavLink + " " + styles.formNavLinkActive
                    : styles.formNavLink
                }
              >
                Контоль
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setPage(2)}
                className={
                  page === 2
                    ? styles.formNavLink + " " + styles.formNavLinkActive
                    : styles.formNavLink
                }
              >
                Листування
              </button>
            </li>
          </ul>
          {page === 0 && (
            <div className={styles.formContainer}>
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
            </div>
          )}
          {page === 1 && (
            <div className={styles.formContainer}>
              <FieldArray
                name="resolutions"
                render={(arrayHelpers) => (
                  <div>
                    <p className={styles.formArrayTitle}>Резолюції</p>
                    <ul className={styles.formArrayList}>
                      {props.values.resolutions.map((friend, index) => (
                        <li key={index} className={styles.formArrayItem}>
                          <label
                            className={styles.formLabel}
                            htmlFor={`resolutions[${index}].text`}
                          >
                            Повідомлення
                            <Field
                              type="text"
                              id={`resolutions[${index}].text`}
                              name={`resolutions[${index}].text`}
                              className={styles.formInput}
                            />
                          </label>

                          <label className={styles.formLabel}>
                            Підписав
                            <Field
                              as="select"
                              id={`resolutions[${index}].signature`}
                              name={`resolutions[${index}].signature`}
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
                            <ErrorMessage
                              name={`resolutions[${index}].signature`}
                              component="div"
                            />
                          </label>

                          <label className={styles.formLabel} htmlFor="name">
                            Дата
                            <Field
                              type="date"
                              id={`resolutions[${index}].date`}
                              name={`resolutions[${index}].date`}
                              className={styles.formInput}
                            />
                            <ErrorMessage
                              name={`resolutions[${index}].date`}
                              component="div"
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
              />
            </div>
          )}
          {page === 2 && (
            <div className={styles.formContainer}>
              <FieldArray
                name="letters"
                render={(arrayHelpers) => (
                  <div>
                    <p className={styles.formArrayTitle}>Резолюції</p>
                    <ul className={styles.formArrayList}>
                      {props.values.letters.map((letter, index) => (
                        <li key={index} className={styles.formArrayItem}>
                          <label
                            className={styles.formLabel}
                            htmlFor={`letters[${index}].text`}
                          >
                            Текст
                            <Field
                              type="text"
                              id={`letters[${index}].text`}
                              name={`letters[${index}].text`}
                              className={styles.formInput}
                            />
                          </label>

                          <label className={styles.formLabel}>
                            Підписав
                            <Field
                              as="select"
                              id={`letters[${index}].signature`}
                              name={`letters[${index}].signature`}
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
                            <ErrorMessage
                              name={`letters[${index}].signature`}
                              component="div"
                            />
                          </label>

                          <label className={styles.formLabel} htmlFor="name">
                            Дата підпису
                            <Field
                              type="date"
                              id={`letters[${index}].date`}
                              name={`letters[${index}].date`}
                              className={styles.formInput}
                            />
                            <ErrorMessage
                              name={`letters[${index}].date`}
                              component="div"
                            />
                          </label>
                          <label className={styles.formLabel} htmlFor="name">
                            Дата відправлення
                            <Field
                              type="date"
                              id={`letters[${index}].dateShipment`}
                              name={`letters[${index}].dateShipment`}
                              className={styles.formInput}
                            />
                            <ErrorMessage
                              name={`letters[${index}].dateShipment`}
                              component="div"
                            />
                          </label>

                          <label className={styles.formLabel}>
                            Адресат
                            <Field
                              as="select"
                              id={`letters[${index}].addressee`}
                              name={`letters[${index}].addressee`}
                              className={styles.formInput}
                            >
                              <option key={0} value={undefined}>
                                {}
                              </option>
                              {addressees.map((addressee) => (
                                <option
                                  key={addressee._id}
                                  value={addressee._id}
                                >
                                  {`${addressee.name}`}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name={`letters[${index}].addressee`}
                              component="div"
                            />
                          </label>

                          <label className={styles.formLabel}>
                            Адресат +
                            <Field
                              as="select"
                              id={`letters[${index}].addresseeSignature`}
                              name={`letters[${index}].addresseeSignature`}
                              className={styles.formInput}
                            >
                              <option key={0} value={undefined}>
                                {}
                              </option>
                              {letter.addressee &&
                                addressees
                                  .find(
                                    (addressee) =>
                                      addressee._id === letter.addressee
                                  )
                                  ?.underAddressee?.map((under, index) => (
                                    <option key={index} value={under._id}>
                                      {`${under.peopleName}`}
                                    </option>
                                  ))}
                            </Field>
                            <ErrorMessage
                              name={`letters[${index}].addresseeSignature`}
                              component="div"
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
              />
            </div>
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

export default AddDocumentForm;
