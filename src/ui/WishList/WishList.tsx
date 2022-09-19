import { useState } from "react";

import defaultBooks from "data/books.json";
import { Book, Books, Visibility } from "types";
import { BookInfoPanel } from "./BookInfoPanel";
import { getBooksByVisibility, updateBookVisibility } from "./utils";
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

  const resetBooks = () => setBooks(initialBooks);

  const handleItemDragStart =
    (id: Book["id"]): React.DragEventHandler<HTMLLIElement> =>
    (ev) => {
      ev.dataTransfer.setData("book-id", id);
      ev.dataTransfer.effectAllowed = "move";
    };

  const handleDrop =
    (dropZoneEffect: Visibility): React.DragEventHandler<HTMLUListElement> =>
    (ev) => {
      ev.preventDefault();

      const bookId = ev.dataTransfer.getData("book-id");
      const book = books.find((book) => book.id === bookId);

      if (!book) {
        return;
      }

      const updateVisibility = updateBookVisibility(books);

      if (dropZoneEffect === Visibility.Visible && book.isHidden) {
        const updatedBooks = updateVisibility(bookId, false);
        setBooks(updatedBooks);
        return;
      }

      if (dropZoneEffect === Visibility.Hidden && !book.isHidden) {
        const updatedBooks = updateVisibility(bookId, true);
        setBooks(updatedBooks);
        return;
      }
    };

  const handleDragover: React.DragEventHandler<HTMLUListElement> = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

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
          <BookList
            type={Visibility.Visible}
            books={visibleBooks}
            onItemDragStart={handleItemDragStart}
            onZoneDrop={handleDrop(Visibility.Visible)}
            onZoneDragOver={handleDragover}
          />
        </div>
        <div>
          <h4>Hidden list</h4>
          <BookList
            type={Visibility.Hidden}
            books={hiddenBooks}
            onItemDragStart={handleItemDragStart}
            onZoneDrop={handleDrop(Visibility.Hidden)}
            onZoneDragOver={handleDragover}
          />
        </div>
      </div>
      <BookInfoPanel book={initialBooks[0]} />
      <button onClick={resetBooks}>Reset</button>
    </section>
  );
};
