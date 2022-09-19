import { Book, Books, Visibility } from "types";
import { BookListItem } from "./BookListItem";

type BookListProps = {
  type: Visibility;
  books: Books;
  onItemDragStart: (id: Book["id"]) => React.DragEventHandler<HTMLLIElement>;
  onZoneDragOver: React.DragEventHandler<HTMLUListElement>;
  onZoneDrop: React.DragEventHandler<HTMLUListElement>;
};

export const BookList = ({
  books,
  onItemDragStart,
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
        />
      ))}
    </ul>
  );
};
