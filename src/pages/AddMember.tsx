import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddMember() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    status: "ACTIVE",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = localStorage.getItem("auth");
    console.log("Submitting:", form);
    try {
      const res = await fetch("http://localhost:8080/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + auth,
        },
        body: JSON.stringify(form),
      });

      const data = await res.text();

      if (!res.ok) throw new Error(data);
      navigate("/members");
    } catch (err: any) {
      console.error("Error adding member:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Member</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["fullName", "email", "phone"].map((field) => (
          <input
            key={field}
            name={field}
            value={(form as any)[field]}
            onChange={handleChange}
            placeholder={field.toUpperCase()}
            className="w-full border px-3 py-2 rounded"
            required
          />
        ))}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
