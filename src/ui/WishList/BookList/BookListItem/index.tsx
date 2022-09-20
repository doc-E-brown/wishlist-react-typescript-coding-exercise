import classNames from "classnames";
import { Book, Visibility } from "types";
import styles from "./BookListItem.module.css";
import { ReactComponent as EyeSvg } from "assets/eye.svg";
import { ReactComponent as CrossEyeSvg } from "assets/cross-eye.svg";

export type BookListItemProps = {
  type: Visibility;
  book: Book;
  onDragStart: React.DragEventHandler<HTMLLIElement>;
  onMouseEnter: React.MouseEventHandler<HTMLLIElement>;
  onMouseLeave: React.MouseEventHandler<HTMLLIElement>;
};

export const BookListItem = ({
  type,
  book,
  onDragStart,
  onMouseEnter,
  onMouseLeave,
}: BookListItemProps) => (
  <li
    className={classNames([
      styles.bookListItem,
      type === Visibility.Hidden
        ? styles["bookListItem--hidden"]
        : styles["bookListItem--visible"],
    ])}
    draggable={true}
    onDragStart={onDragStart}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {type === Visibility.Hidden ? (
      <CrossEyeSvg className={styles.visibilityIcon} />
    ) : (
      <EyeSvg className={styles.visibilityIcon} />
    )}
    <div>
      <div>{book.title}</div>
      <div>{book.author}</div>
    </div>
  </li>
);
