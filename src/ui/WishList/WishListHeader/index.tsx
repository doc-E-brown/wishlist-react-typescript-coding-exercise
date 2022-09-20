import classNames from "classnames";
import styles from "./WishListHeader.module.css";

export const WishListHeader = () => (
  <hgroup className={styles.container}>
    <h1 className={styles.header}>
      <span className={classNames(["typography--h4", styles.subheading])}>
        Shopping{" "}
      </span>
      <span className="typography--h3">Wish list</span>
    </h1>
    <div className={styles.pill}>
      <p className="typography--smBold">Books</p>
    </div>
  </hgroup>
);
