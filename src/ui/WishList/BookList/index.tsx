import { Book, Books, Visibility } from "types";
import { BookListItem, BookListItemProps } from "./BookListItem";
import styles from "./BookList.module.css";

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
  type,
  books,
  onItemDragStart,
  onItemMouseEnter,
  onItemMouseLeave,
  onZoneDragOver,
  onZoneDrop,
}: BookListProps) => (
  <ul
    className={styles.bookList}
    onDragOver={onZoneDragOver}
    onDrop={onZoneDrop}
  >
    {books.map((book) => (
      <BookListItem
        type={type}
        key={book.id}
        book={book}
        onDragStart={onItemDragStart(book.id)}
        onMouseEnter={onItemMouseEnter(book)}
        onMouseLeave={onItemMouseLeave}
      />
    ))}
  </ul>
);
