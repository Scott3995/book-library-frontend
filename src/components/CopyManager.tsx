import { useEffect, useState } from "react";
import type { BookCopy } from "../types/BookCopy";

interface Props {
  isbn: string;
}

const CopyManager = ({ isbn }: Props) => {
  const [copies, setCopies] = useState<BookCopy[]>([]);
  const [error, setError] = useState("");

  const fetchCopies = async () => {
    try {
      const res = await fetch(`http://localhost:8080/books/${isbn}/copies`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setCopies(data);
    } catch (err: any) {
      setError("Failed to fetch copies: " + err.message);
    }
  };

  const handleAddCopy = async () => {
    try {
      const res = await fetch(`http://localhost:8080/books/${isbn}/copies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "AVAILABLE" }),
      });
      if (!res.ok) throw new Error(await res.text());
      fetchCopies();
    } catch (err: any) {
      setError("Failed to add copy: " + err.message);
    }
  };

  useEffect(() => {
    fetchCopies();
  }, [isbn]);

  return (
    <div className="border mt-4 p-4 rounded bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Manage Copies</h3>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        onClick={handleAddCopy}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Add New Copy
      </button>

      {copies.length === 0 ? (
        <p className="text-sm text-gray-500 mt-4">No copies yet.</p>
      ) : (
        <ul className="space-y-2 mt-4">
          {copies.map((copy) => (
            <li
              key={copy.id}
              className="bg-white px-4 py-2 border rounded flex justify-between"
            >
              <span>Copy #{copy.id}</span>
              <span className="text-sm text-gray-500">{copy.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CopyManager;
