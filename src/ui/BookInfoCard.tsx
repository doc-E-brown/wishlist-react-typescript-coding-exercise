import { Book } from "../types";

type BookInfoCardProps = {
  book: Book;
};

export const BookInfoCard = ({ book }: BookInfoCardProps) => (
  <article>
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
