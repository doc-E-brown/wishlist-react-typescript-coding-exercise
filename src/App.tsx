import "./App.css";
import initialBooks from "./data/books.json";
import { notNullish } from "./utils";
import { Book, Books } from "./types";
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
  const { hidden: hiddenBookIds, visible: visibleBookIds } =
    getBookIdsByVisibility(initialBooks);

  const getInitialBooksByIds = getBooksByIds(initialBooks);

  const visibleBooks: Books = getInitialBooksByIds(visibleBookIds);
  const hiddenBooks: Books = getInitialBooksByIds(hiddenBookIds);

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
      </section>
    </div>
  );
};

export default App;
