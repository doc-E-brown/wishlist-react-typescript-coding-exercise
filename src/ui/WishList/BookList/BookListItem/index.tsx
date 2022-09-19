import { Book } from "types";

type BookListItemProps = {
  book: Book;
  onDragStart: React.DragEventHandler<HTMLLIElement>;
};

export const BookListItem = ({ book, onDragStart }: BookListItemProps) => {
  return (
    <li draggable={true} onDragStart={onDragStart}>
      <div>{book.title}</div>
      <div>{book.author}</div>
    </li>
  );
};
