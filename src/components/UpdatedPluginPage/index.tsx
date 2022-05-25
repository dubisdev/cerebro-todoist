import { KeyboardNavItem, KeyboardNav } from "../";
import { setFirstUpdateStartToFalse } from "../../services/startPageAfterUpdate";
import styles from "./styles.module.css";
import lang from "../../lang";
const strings = lang.afterUpdate;

const updatedPlugin = ({ actions, config }) => {
  const handleClick = (action) => {
    action === "view"
      ? actions.open("https://github.com/dubisdev/cerebro-todoist/releases")
      : null;
    setFirstUpdateStartToFalse(config);
    actions.hideWindow();
  };

  return (
    <div className={styles.wrapper}>
      <h1>{strings.pluginUpdated}</h1>
      <KeyboardNav>
        <ul className={styles.list}>
          <KeyboardNavItem onSelect={() => handleClick("view")}>
            {strings.viewChangelog}
          </KeyboardNavItem>

          <KeyboardNavItem onSelect={() => handleClick("close")}>
            {strings.clickToHideWindow}
          </KeyboardNavItem>
        </ul>
      </KeyboardNav>
    </div>
  );
};

export default updatedPlugin;
