import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LendBook() {
  const [members, setMembers] = useState([]);
  const [copies, setCopies] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedCopy, setSelectedCopy] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
    fetchCopies();
  }, []);

  const fetchMembers = async () => {
    const auth = localStorage.getItem("auth");
    const res = await fetch("http://localhost:8080/members", {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data = await res.json();
    setMembers(data);
  };

  const fetchCopies = async () => {
    const auth = localStorage.getItem("auth");
    try {
      const res = await fetch("http://localhost:8080/book-copies/available", {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error fetching copies: ${text}`);
      }

      const data = await res.json();
      console.log("📦 Copies fetched:", data);
      setCopies(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLend = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = localStorage.getItem("auth");
  
    try {
      const res = await fetch("http://localhost:8080/lending/lend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          memberId: selectedMember,
          bookCopyId: selectedCopy, // ✅ this must match backend naming
        }),
      });
  
      if (!res.ok) throw new Error(await res.text());
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Lend Book</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLend} className="space-y-4">
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Member</option>
          {members.map((member: any) => (
            <option key={member.id} value={member.id}>
              {member.fullName}
            </option>
          ))}
        </select>

        <select
          value={selectedCopy}
          onChange={(e) => setSelectedCopy(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Book Copy</option>
          {copies.map((copy: any) => (
            <option key={copy.id} value={copy.id}>
              Copy #{copy.id} — {copy.metadata?.isbn}
            </option>
          ))}
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
