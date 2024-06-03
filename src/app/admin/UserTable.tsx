import prisma from "@/lib/prisma";
import { User } from "lucide-react";

async function getServerSideProps() {
  const res = await prisma.user.findMany();
  const users = res.map((user) => ({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    admin: user?.admin,
  }));
  return users;
}
interface User {
  id: number | string;
  name: string | null;
  email: string | null;
  admin: boolean;
}

export default async function UserTable() {
  const users = await getServerSideProps();

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="hidden px-2 md:block md:px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-2 md:px-6 py-3">
              NOM
            </th>
            <th scope="col" className="px-2  md:px-6 py-3">
              EMAIL
            </th>
            <th scope="col" className="px-2  md:px-6 py-3">
              ROLE
            </th>
            <th
              scope="col"
              className="px-2  md:px-6 py-3 flex items-center gap-1"
            >
              <User size={16} />
              <span>{users.length}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function TableRow({ user }: { user: User }) {
  return (
    <tr className="hover:bg-white/5">
      <th
        scope="row"
        className="hidden md:block px-2 md:px-6 py-3 font-medium text-gray-100 whitespace-nowrap"
      >
        {user.id}
      </th>
      <td className="px-2 md:px-6 py-3">{user.name}</td>
      <td className="px-2 md:px-6 py-3">{user.email}</td>
      <td className="px-2 md:px-6 py-3">{user.admin ? "Admin" : "User"}</td>
      <td className="px-2 md:px-6 py-3 text-right">
        <a href="#" className="font-medium text-blue-600 hover:underline">
          Edit
        </a>
      </td>
    </tr>
  );
}