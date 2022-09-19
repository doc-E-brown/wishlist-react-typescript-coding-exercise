import { Books } from "types";
import { BookListItem } from "./BookListItem";

type BookListProps = {
  books: Books;
};

export const BookList = ({ books }: BookListProps) => {
  return (
    <ul>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </ul>
  );
};
