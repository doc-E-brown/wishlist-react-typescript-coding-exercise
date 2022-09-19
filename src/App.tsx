import { BookInfoPanel } from "ui/BookInfoPanel";
import "./App.css";
import { WishList } from "./ui/WishList";
import books from "data/books.json";
import { useState } from "react";
import { Book } from "types";

const App = () => {
  const [bookToDisplay, setBookToDisplay] = useState<Book | null>(null);

  return (
    <main>
      <WishList books={books} setBookToDisplay={setBookToDisplay} />
      {bookToDisplay && <BookInfoPanel book={bookToDisplay} />}
    </main>
  );
};

export default App;
