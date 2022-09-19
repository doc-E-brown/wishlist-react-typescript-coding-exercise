import { Book, Books, BookWithoutId } from "types";

type BooksByVisibility = {
  visible: Books;
  hidden: Books;
};

export const getBooksByVisibility = (books: Books): BooksByVisibility =>
  books.reduce<BooksByVisibility>(
    ({ visible, hidden }, book) =>
      book.isHidden
        ? {
            visible,
            hidden: hidden.concat(book),
          }
        : {
            visible: visible.concat(book),
            hidden,
          },
    {
      visible: [],
      hidden: [],
    }
  );

const updateBooksById =
  (books: Books) =>
  (id: Book["id"], newBookValues: Partial<BookWithoutId>): Books => {
    const bookIndex = books.findIndex((book) => book.id === id);
    return Object.assign([], books, {
      [bookIndex]: { ...books[bookIndex], ...newBookValues },
    });
  };

export const updateBookVisibility =
  (books: Books) =>
  (id: Book["id"], isHidden: Book["isHidden"]): Books =>
    updateBooksById(books)(id, { isHidden });
