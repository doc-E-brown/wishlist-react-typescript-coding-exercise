import initialBooks from "./data/books.json";

export type Books = typeof initialBooks;
export type Book = Books[number];
export type BookWithoutId = Omit<Book, "id">;
