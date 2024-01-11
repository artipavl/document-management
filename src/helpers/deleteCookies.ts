import { cookies } from "next/headers";

function deleteCookies() {
    cookies().delete("token");
    cookies().delete("name");
    cookies().delete("_id");
    cookies().delete("email");
}

export default deleteCookies