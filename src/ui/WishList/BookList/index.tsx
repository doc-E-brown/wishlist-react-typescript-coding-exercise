import { Book, Books, Visibility } from "types";
import { BookListItem, BookListItemProps } from "./BookListItem";

export type BookListProps = {
  type: Visibility;
  books: Books;
  onItemDragStart: (id: Book["id"]) => BookListItemProps["onDragStart"];
  onItemMouseEnter: (book: Book) => BookListItemProps["onMouseEnter"];
  onItemMouseLeave: BookListItemProps["onMouseLeave"];
  onZoneDragOver: React.DragEventHandler<HTMLUListElement>;
  onZoneDrop: React.DragEventHandler<HTMLUListElement>;
};

export const BookList = ({
  books,
  onItemDragStart,
  onItemMouseEnter,
  onItemMouseLeave,
  onZoneDragOver,
  onZoneDrop,
}: BookListProps) => {
  return (
    <ul onDragOver={onZoneDragOver} onDrop={onZoneDrop}>
      {books.map((book) => (
        <BookListItem
          key={book.id}
          book={book}
          onDragStart={onItemDragStart(book.id)}
          onMouseEnter={onItemMouseEnter(book)}
          onMouseLeave={onItemMouseLeave}
        />
      ))}
    </ul>
  );
};
