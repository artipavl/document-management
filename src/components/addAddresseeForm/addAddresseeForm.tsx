"use client";

// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { createFolder } from "./actions";
import { AiOutlinePlusCircle } from "react-icons/ai";

import styles from "./addAddresseeForm.module.scss";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending} className={styles.formBtn}>
      Додати
    </button>
  );
}

export function AddAddresseeForm() {
  const [state, formAction] = useFormState(createFolder, initialState);
  return (
    <form action={formAction} className={styles.form}>
       <legend className={styles.formLegend } >Додати нового адресата</legend>
      <label className={styles.formLable} htmlFor="name">
        Назва
        <input
          className={styles.formInput}
          type="name"
          id="name"
          name="name"
          placeholder="ТОВ ПХУ"
          required
        />
      </label>
      <label className={styles.formLable} htmlFor="email">
        Пошта
        <input
          className={styles.formInput}
          type="email"
          id="email"
          name="email"
          placeholder="pxy@gmail.com"
          required
        />
      </label>
      <label className={styles.formLable} htmlFor="phone">
        Телефон
        <input
          className={styles.formInput}
          type="phone"
          id="phone"
          name="phone"
          placeholder="+380978058751"
        />
      </label>
      <SubmitButton />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  );
}
