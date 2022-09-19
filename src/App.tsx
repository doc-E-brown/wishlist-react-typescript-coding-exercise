import { BookInfoPanel } from "ui/BookInfoPanel";
import "./App.css";
import { WishList } from "./ui/WishList/WishList";
import books from "data/books.json";
import { useState } from "react";
import { Book } from "types";

const App = () => {
  const [bookToDisplay, setBookToDisplay] = useState<Book | null>(null);

  return (
    <div className="App">
      <WishList books={books} setBookToDisplay={setBookToDisplay} />
      {bookToDisplay && <BookInfoPanel book={bookToDisplay} />}
    </div>
  );
};

export default App;
