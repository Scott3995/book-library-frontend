import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface BookCopy {
  id: string;
  status: string;
}

const BookCopies = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [copies, setCopies] = useState<BookCopy[]>([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchCopies = async () => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/books/${isbn}/copies`, {
        headers: {
          Authorization: "Basic " + auth,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch copies");
      const data = await res.json();
      setCopies(data);
    } catch (err: any) {
      if (err.message.includes("401")) {
        localStorage.removeItem("auth");
        navigate("/login");
      } else {
        setMessage("❌ " + err.message);
      }
    }
  };

  useEffect(() => {
    fetchCopies();
  }, [isbn]);

  const handleAddCopy = async () => {
    const auth = localStorage.getItem("auth");
    if (!auth) return navigate("/login");

    try {
      const res = await fetch(`http://localhost:8080/books/${isbn}/copies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + auth,
        },
        // No ID passed — backend generates it
        body: JSON.stringify({}),
      });

      const result = await res.text();

      if (!res.ok) throw new Error(result);

      fetchCopies();
    } catch (err: any) {
      if (err.message.includes("401")) {
        localStorage.removeItem("auth");
        navigate("/login");
      } else {
        setMessage("❌ " + err.message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Manage Copies for ISBN: {isbn}</h2>

      {message && <p className="mb-4 text-red-600">{message}</p>}

      <button
        onClick={handleAddCopy}
        className="bg-green-600 text-white px-4 py-2 mb-4 rounded hover:bg-green-700"
      >
        ➕ Add New Copy
      </button>

      {copies.length === 0 ? (
        <p className="text-gray-600">No copies available.</p>
      ) : (
        <ul className="space-y-2">
          {copies.map((copy) => (
            <li key={copy.id} className="border px-4 py-2 rounded bg-gray-50">
              <span className="font-mono">{copy.id}</span> -{" "}
              <span className="text-sm text-gray-700">{copy.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookCopies;
