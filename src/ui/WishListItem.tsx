import { Book } from "../types";

type WishListItemProps = {
  book: Book;
};

export const WishListItem = ({ book }: WishListItemProps) => {
  return (
    <li>
      <div>{book.title}</div>
      <div>{book.author}</div>
    </li>
  );
};
