// src/components/BookCard.tsx
import type { BookMetadata } from "../types/Book";


type Props = {
  book: BookMetadata;
};

const BookCard = ({ book }: Props) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md">
      <h2 className="font-bold text-lg">{book.title}</h2>
      <p className="text-sm text-gray-700">{book.author}</p>
      <p className="text-sm">{book.genre} • {book.publicationYear}</p>
      <p className="text-xs text-gray-500">Published by {book.publisher}</p>
    </div>
  );
};

export default BookCard;
