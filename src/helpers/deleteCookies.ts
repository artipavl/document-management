"use server";
import { cookies } from "next/headers";

function deleteCookies() {
  const cookieStore = cookies();
  cookieStore.delete("token");
  cookieStore.delete("name");
  cookieStore.delete("_id");
  cookieStore.delete("email");
}

export default deleteCookies;
