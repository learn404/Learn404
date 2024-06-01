"use client";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

async function getUsers() {
  const res = await fetch("/api/admin/getusers");
  const data = await res.json();
  return data.users;
}

interface User {
  id: number;
  name: string;
  email: string;
  Admin: boolean;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-2 py-1.5 md:px-6 md:py-3">
              ID
            </th>
            <th scope="col" className="px-2 py-1.5 md:px-6 md:py-3">
              NOM
            </th>
            <th scope="col" className="px-2 py-1.5 md:px-6 md:py-3">
              EMAIL
            </th>
            <th scope="col" className="px-2 py-1.5 md:px-6 md:py-3">
              ROLE
            </th>
            <th
              scope="col"
              className="px-2 py-1.5 md:px-6 md:py-3 flex items-center gap-1"
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
        className="hidden md:block px-2 py-1.5 md:px-6 md:py-3 font-medium text-gray-100 whitespace-nowrap "
      >
        {user.id}
      </th>
      <td className="px-2 py-1.5 md:px-6 md:py-3">{user.name}</td>
      <td className="px-2 py-1.5 md:px-6 md:py-3">{user.email}</td>
      <td className="px-2 py-1.5 md:px-6 md:py-3">
        {user.Admin ? "Admin" : "User"}
      </td>
      <td className="px-2 py-1.5 md:px-6 md:py-3 text-right">
        <a href="#" className="font-medium text-blue-600  hover:underline">
          Edit
        </a>
      </td>
    </tr>
  );
}
