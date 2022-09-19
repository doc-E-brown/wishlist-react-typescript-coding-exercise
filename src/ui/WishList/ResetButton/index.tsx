import resetSvg from "assets/reset.svg";
import classNames from "classnames";
import styles from "./ResetButton.module.css";

export const ResetButton = ({
  className,
  ...buttonProps
}: React.ComponentPropsWithoutRef<"button">) => (
  <button
    className={classNames([styles.resetButton, className])}
    {...buttonProps}
  >
    <span className={styles.resetIcon}>
      <img className={styles.resetIconArrow} src={resetSvg} alt="" />
    </span>
    Reset
  </button>
);
