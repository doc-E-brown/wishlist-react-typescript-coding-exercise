import "./App.css";
import initialBooks from "./data/books.json";
import { notNullish } from "./utils";

type Books = typeof initialBooks;
type Book = Books[number];

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
              {visibleBooks.map((book) => {
                return (
                  <li>
                    <div>{book.title}</div>
                    <div>{book.author}</div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4>Hidden list</h4>
            <ul>
              {hiddenBooks.map((book) => {
                return (
                  <li>
                    <div>{book.title}</div>
                    <div>{book.author}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <article>
          <h3>{initialBooks[0].title}</h3>
          <div>{initialBooks[0].author}</div>
          <b>Publisher&apos;s summary</b>
          <p>{initialBooks[0].publisherSummary}</p>
          <img
            src={initialBooks[0].imageUrl}
            alt={`${initialBooks[0].title} book cover`}
            role="presentation"
          />
        </article>
      </section>
    </div>
  );
};

export default App;
