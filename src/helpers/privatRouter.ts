import { cookies } from "next/headers";

import { authenticate } from "@/api/controllers/user/authenticate";

async function privatRouter(func:Function) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return;
  }

  const user = await authenticate(token.value);

  if (!user) {
    return;
  }
  cookies().set("token", user.token);
  cookies().set("name", user.name);
  cookies().set("_id", user._id.toString());
  cookies().set("email", user.email);
  func();
}
