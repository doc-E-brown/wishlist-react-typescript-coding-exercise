import { BookInfoPanel } from "ui/BookInfoPanel";
import "./App.css";
import { WishList } from "./ui/WishList/WishList";
import books from "data/books.json";

const App = () => {
  return (
    <div className="App">
      <WishList books={books} />
      <BookInfoPanel book={books[0]} />
    </div>
  );
};

export default App;
