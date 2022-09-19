import { useState } from "react";

import "./App.css";
import initialBooks from "./data/books.json";
import { notNullish } from "./utils";
import { Book, Books, BookWithoutId } from "./types";
import { WishListItem } from "./ui/WishListItem";
import { BookInfoCard } from "./ui/BookInfoCard";

type BookIdsByVisibility = {
  visible: Book["id"][];
  hidden: Book["id"][];
};

const getBookIdsByVisibility = (books: Books): BookIdsByVisibility =>
  books.reduce<BookIdsByVisibility>(
    ({ visible, hidden }, book) =>
      book.isHidden
        ? {
            visible,
            hidden: hidden.concat(book.id),
          }
        : {
            visible: visible.concat(book.id),
            hidden,
          },
    {
      visible: [],
      hidden: [],
    }
  );

const getBookById =
  (books: Books) =>
  (id: Book["id"]): Book | undefined =>
    books.find((book) => book.id === id);

const getBooksByIds =
  (books: Books) =>
  (ids: Book["id"][]): Books =>
    ids.map(getBookById(books)).filter<Book>(notNullish);

const App = () => {
  const [books, setBooks] = useState<Books>(initialBooks);

  const { hidden: hiddenBookIds, visible: visibleBookIds } =
    getBookIdsByVisibility(books);

  const visibleBooks: Books = getBooksByIds(books)(visibleBookIds);
  const hiddenBooks: Books = getBooksByIds(books)(hiddenBookIds);

  const updateBooksById = (
    books: Books,
    id: Book["id"],
    newBook: Partial<BookWithoutId>
  ): Books => {
    const bookIndex = books.findIndex((book) => book.id === id);
    return Object.assign([], books, {
      [bookIndex]: { ...books[bookIndex], ...newBook },
    });
  };

  const makeBookHidden: React.MouseEventHandler<HTMLButtonElement> = () => {
    const updatedBooks = updateBooksById(
      books,
      "189560ed-6efb-401f-a23a-0d17127d4a59",
      {
        isHidden: false,
      }
    );

    setBooks(updatedBooks);
  };

  const resetBooks = () => setBooks(initialBooks);

  return (
    <div className="App">
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
            <ul>
              {visibleBooks.map((book) => (
                <WishListItem key={book.id} book={book} />
              ))}
            </ul>
          </div>
          <div>
            <h4>Hidden list</h4>
            <ul>
              {hiddenBooks.map((book) => (
                <WishListItem key={book.id} book={book} />
              ))}
            </ul>
          </div>
        </div>
        <BookInfoCard book={initialBooks[0]} />
        <button onClick={makeBookHidden}>CHANGE BOOK TO VISIBLE</button>
        <button onClick={resetBooks}>Reset</button>
      </section>
    </div>
  );
};

export default App;
