"use client";

// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { createFolder } from "./actions";
import { AiOutlinePlusCircle } from "react-icons/ai";

import styles from "./addFolderForm.module.scss";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} className={styles.formBtn}>
      <AiOutlinePlusCircle className={styles.formBtnIcon} />
    </button>
  );
}

export function AddForm() {
  const [state, formAction] = useFormState(createFolder, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <label htmlFor="name">Додати папку</label>
      <input type="name" id="name" name="name" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  );
}
