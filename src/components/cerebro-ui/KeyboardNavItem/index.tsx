import React from "react";
import styles from "./styles.module.css";

const KeyboardNavItem = ({ children, ...props }) => {
  let className = styles.item;
  className += props.className ? ` ${props.className}` : "";
  const onClick = props.onSelect || null;

  const onKeyDown = (event) => {
    if (props.onKeyDown) props.onKeyDown(event);

    const vimO = event.keyCode === 79 && (event.metaKey || event.ctrlKey);

    if (!event.defaultPrevented && (event.keyCode === 13 || vimO)) {
      onClick?.();
    }
  };
  const itemProps = { className, onClick, onKeyDown, tabIndex: 0 };

  if (!children) return null;

  return (
    <li {...props} {...itemProps} className={styles.item}>
      <div className={styles.centerLayout}>{children}</div>
    </li>
  );
};

export default KeyboardNavItem;
