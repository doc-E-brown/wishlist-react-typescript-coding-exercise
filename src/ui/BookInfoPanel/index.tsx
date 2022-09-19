import { Book } from "types";
import styles from "./BookInfoPanel.module.css";

type BookInfoPanelProps = {
  book: Book;
};

export const BookInfoPanel = ({ book }: BookInfoPanelProps) => (
  <article className={styles.bookInfoPanel}>
    <h3>{book.title}</h3>
    <div>{book.author}</div>
    <b>Publisher&apos;s summary</b>
    <p>{book.publisherSummary}</p>
    <img
      src={book.imageUrl}
      alt={`${book.title} book cover`}
      role="presentation"
    />
  </article>
);
