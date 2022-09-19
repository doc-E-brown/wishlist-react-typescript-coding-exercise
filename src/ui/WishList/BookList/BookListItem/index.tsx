import { Book } from "types";

type BookListItemProps = {
  book: Book;
};

export const BookListItem = ({ book }: BookListItemProps) => {
  return (
    <li>
      <div>{book.title}</div>
      <div>{book.author}</div>
    </li>
  );
};
