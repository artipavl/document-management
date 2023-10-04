import { getUsers } from "@/api/controllers/user/getUsers";
import Title from "@/components/title/title";

export default async function Home() {
  const users = await getUsers();
  console.log(users);
  return (
    <div className="container">
      <Title title="Домашня" />
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
