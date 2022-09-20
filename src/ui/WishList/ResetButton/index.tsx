import { ReactComponent as ResetSvg } from "assets/reset.svg";
import classNames from "classnames";
import styles from "./ResetButton.module.css";

export const ResetButton = ({
  className,
  ...buttonProps
}: React.ComponentPropsWithoutRef<"button">) => (
  <button
    className={classNames([styles.resetButton, "typography--h4", className])}
    {...buttonProps}
  >
    <span className={styles.resetIcon}>
      <ResetSvg className={styles.resetIconArrow} />
    </span>
    Reset
  </button>
);
