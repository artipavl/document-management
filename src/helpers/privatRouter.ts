import { cookies } from "next/headers";

import { authenticate } from "@/api/controllers/user/authenticate";
import { redirect } from "next/navigation";

async function privatRouter() {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return redirect("/login");
  }
}

export default privatRouter;
