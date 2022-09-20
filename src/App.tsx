import { BookInfoPanel } from "ui/BookInfoPanel";
import styles from "./App.module.css";
import { WishList } from "./ui/WishList";
import books from "data/books.json";
import { useState } from "react";
import { Book } from "types";

const App = () => {
  const [bookToDisplay, setBookToDisplay] = useState<Book | null>(null);

  return (
    <main className={styles.app}>
      <WishList books={books} setBookToDisplay={setBookToDisplay} />
      {bookToDisplay && <BookInfoPanel book={bookToDisplay} />}
    </main>
  );
};

export default App;
