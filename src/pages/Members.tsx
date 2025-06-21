import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Member } from "../types/Member";

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [message, setMessage] = useState("");

  const fetchMembers = async () => {
    const auth = localStorage.getItem("auth");
    try {
      const res = await fetch("http://localhost:8080/members", {
        headers: { Authorization: "Basic " + auth },
      });
      if (!res.ok) throw new Error("Failed to fetch members");
      const data = await res.json();
      setMembers(data);
    } catch (err: any) {
      setMessage("❌ " + err.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    const auth = localStorage.getItem("auth");

    try {
      const res = await fetch(`http://localhost:8080/members/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Basic " + auth },
      });

      if (!res.ok) throw new Error(await res.text());

      // Refresh list after deletion
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      alert("❌ Failed to delete member: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Members</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}
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
              <td className="border p-2 space-x-4">
                <Link
                  to={`/members/edit/${m.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
