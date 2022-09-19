import { useState } from "react";

import defaultBooks from "data/books.json";
import { Books } from "types";
import { BookInfoPanel } from "./BookInfoPanel";
import { getBooksByVisibility, updateBooksById } from "./utils";
import { BookList } from "./BookList";

type WishListProps = {
  books?: Books;
};

export const WishList = ({
  books: initialBooks = defaultBooks,
}: WishListProps) => {
  const [books, setBooks] = useState<Books>(initialBooks);

  const { visible: visibleBooks, hidden: hiddenBooks } =
    getBooksByVisibility(books);

  const makeBookNotHidden: React.MouseEventHandler<HTMLButtonElement> = () => {
    const updatedBooks = updateBooksById(books)(
      "189560ed-6efb-401f-a23a-0d17127d4a59",
      {
        isHidden: false,
      }
    );

    setBooks(updatedBooks);
  };

  const resetBooks = () => setBooks(initialBooks);

  return (
    <section>
      <div>
        <hgroup>
          <h1>
            <span>Shopping </span>
            <span>Wish list</span>
          </h1>
          <p>books</p>
        </hgroup>
        <div>
          <BookList books={visibleBooks} />
        </div>
        <div>
          <h4>Hidden list</h4>
          <BookList books={hiddenBooks} />
        </div>
      </div>
      <BookInfoPanel book={initialBooks[0]} />
      <button onClick={makeBookNotHidden}>CHANGE BOOK TO VISIBLE</button>
      <button onClick={resetBooks}>Reset</button>
    </section>
  );
};
