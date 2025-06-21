import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Member } from "../types/Member";

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    fetch("http://localhost:8080/members", {
      headers: {
        "Authorization": "Basic " + auth,
      },
    })
      .then((res) => res.json())
      .then(setMembers)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Members</h2>
      <Link
        to="/members/new"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        ➕ Add Member
      </Link>
      <table className="w-full table-auto border mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td className="border p-2">{m.fullName}</td>
              <td className="border p-2">{m.email}</td>
              <td className="border p-2">{m.phone}</td>
              <td className="border p-2">{m.status}</td>
              <td className="border p-2">
                <Link
                  to={`/members/edit/${m.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}