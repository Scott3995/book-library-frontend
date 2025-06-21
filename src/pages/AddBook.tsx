import { useState } from "react";
import type { BookMetadata } from "../types/Book";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState<BookMetadata>({
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    publicationYear: 2025,
    genre: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = localStorage.getItem("auth");

    if (!auth) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + auth,
        },
        body: JSON.stringify(book),
      });

      const result = await res.text();

      if (!res.ok) throw new Error(result);

      setMessage("✅ Book added successfully.");
      setBook({
        isbn: "",
        title: "",
        author: "",
        publisher: "",
        publicationYear: 2025,
        genre: "",
      });
    } catch (err: any) {
      if (err.message.includes("401")) {
        setMessage("🔒 Unauthorized. Please log in.");
        localStorage.removeItem("auth");
        navigate("/login");
      } else {
        setMessage("❌ " + err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>

      {message && <p className="mb-4 text-sm text-blue-700">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["isbn", "title", "author", "publisher", "genre"].map((field) => (
          <input
            key={field}
            name={field}
            value={(book as any)[field]}
            onChange={handleChange}
            placeholder={field.toUpperCase()}
            className="w-full border px-3 py-2 rounded focus:outline-blue-500"
            required
          />
        ))}

        <input
          type="number"
          name="publicationYear"
          value={book.publicationYear}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-blue-500"
          placeholder="Publication Year"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBook;
