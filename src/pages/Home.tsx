import type { BookMetadata } from "../types/Book";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState<BookMetadata[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/books", {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch.");
        }
        return res.json();
      })
      .then(setBooks)
      .catch((err) => {
        console.error(err);
        setError("🔒 Unauthorized. Please login.");
        localStorage.removeItem("auth");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">📚 All Books</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {books.length === 0 ? (
        <p className="text-gray-500">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.isbn}
              className="bg-white p-4 border rounded shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-700">{book.author}</p>
              <p className="text-xs text-gray-500">
                {book.genre} • {book.publicationYear}
              </p>
              <p className="text-xs text-gray-400">Publisher: {book.publisher}</p>
              <Link
                to={`/copies/${book.isbn}`}
                className="text-blue-600 text-sm mt-2 inline-block hover:underline"
              >
                ➕ Manage Copies
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
