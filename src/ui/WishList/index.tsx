import { useEffect, useState } from "react";

import defaultBooks from "data/books.json";
import { Book, Books, Visibility } from "types";
import {
  getBooksByVisibility,
  isBooksVisibilityIdentical,
  updateBookVisibility,
} from "./utils";
import { BookList, BookListProps } from "./BookList";
import { WishListHeader } from "./WishListHeader";
import { ResetButton } from "./ResetButton";
import styles from "./WishList.module.css";
import classNames from "classnames";

type WishListProps = {
  books?: Books;
  setBookToDisplay: (book: Book | null) => void;
};

export const WishList = ({
  books: initialBooks = defaultBooks,
  setBookToDisplay,
}: WishListProps) => {
  const [books, setBooks] = useState<Books>(initialBooks);
  const [showResetButton, setShowResetButton] = useState(false);

  useEffect(() => {
    if (isBooksVisibilityIdentical(initialBooks, books)) {
      setShowResetButton(false);
    } else {
      setShowResetButton(true);
    }
  }, [initialBooks, books]);

  const { visible: visibleBooks, hidden: hiddenBooks } =
    getBooksByVisibility(books);

  const resetBooks = () => {
    setBooks(initialBooks);
  };

  const handleItemDragStart: BookListProps["onItemDragStart"] =
    (id: Book["id"]) => (ev) => {
      ev.dataTransfer.setData("book-id", id);
      ev.dataTransfer.effectAllowed = "move";
    };

  const handleZoneDrop =
    (dropZoneEffect: Visibility): BookListProps["onZoneDrop"] =>
    (ev) => {
      ev.preventDefault();

      const bookId = ev.dataTransfer.getData("book-id");
      const book = books.find((book) => book.id === bookId);

      if (!book) {
        return;
      }

      const updateVisibility = updateBookVisibility(books);

      const shouldBookBeUpdatedToHidden =
        dropZoneEffect === Visibility.Hidden && !book.isHidden;

      const shouldBookBeUpdatedToVisible =
        dropZoneEffect === Visibility.Visible && book.isHidden;

      if (!(shouldBookBeUpdatedToHidden || shouldBookBeUpdatedToVisible)) {
        return;
      }

      let updatedBooks: Books = [];

      if (shouldBookBeUpdatedToVisible) {
        updatedBooks = updateVisibility(bookId, false);
        setBooks(updatedBooks);
      } else if (shouldBookBeUpdatedToHidden) {
        updatedBooks = updateVisibility(bookId, true);
        setBooks(updatedBooks);
      }
    };

  const handleZoneDragOver: BookListProps["onZoneDragOver"] = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  const handleItemMouseEnter: BookListProps["onItemMouseEnter"] =
    (book: Book) => () => {
      setBookToDisplay(book);
    };

  const handleItemMouseLeave: BookListProps["onItemMouseLeave"] = () => {
    setBookToDisplay(null);
  };

  return (
    <section className={styles.wishlist}>
      <WishListHeader />
      <BookList
        type={Visibility.Visible}
        books={visibleBooks}
        onItemDragStart={handleItemDragStart}
        onItemMouseEnter={handleItemMouseEnter}
        onItemMouseLeave={handleItemMouseLeave}
        onZoneDrop={handleZoneDrop(Visibility.Visible)}
        onZoneDragOver={handleZoneDragOver}
      />
      <div>
        <h4 className={classNames([styles.hiddenListHeader, "typography--h4"])}>
          Hidden list
        </h4>
        <BookList
          type={Visibility.Hidden}
          books={hiddenBooks}
          onItemDragStart={handleItemDragStart}
          onItemMouseEnter={handleItemMouseEnter}
          onItemMouseLeave={handleItemMouseLeave}
          onZoneDrop={handleZoneDrop(Visibility.Hidden)}
          onZoneDragOver={handleZoneDragOver}
        />
      </div>
      <div className={styles.resetButtonContainer}>
        {showResetButton && <ResetButton onClick={resetBooks} />}
      </div>
    </section>
  );
};
