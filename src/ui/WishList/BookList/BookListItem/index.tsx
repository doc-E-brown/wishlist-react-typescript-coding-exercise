import { Book } from "types";

export type BookListItemProps = {
  book: Book;
  onDragStart: React.DragEventHandler<HTMLLIElement>;
  onMouseEnter: React.MouseEventHandler<HTMLLIElement>;
  onMouseLeave: React.MouseEventHandler<HTMLLIElement>;
};

export const BookListItem = ({
  book,
  onDragStart,
  onMouseEnter,
  onMouseLeave,
}: BookListItemProps) => {
  return (
    <li
      draggable={true}
      onDragStart={onDragStart}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>{book.title}</div>
      <div>{book.author}</div>
    </li>
  );
};
