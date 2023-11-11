import { KeyboardNavItem, KeyboardNav } from "@cerebroapp/cerebro-ui";
import { setFirstUpdateStartToFalse } from "services/startPageAfterUpdate";
import styles from "./styles.module.css";
import lang from "lang";
const strings = lang.afterUpdate;

const updatedPlugin = ({ actions, config }) => {
  const handleClick = (action: "view" | "close") => {
    if (action === "close") {
      setFirstUpdateStartToFalse(config);
      actions.replaceTerm("tds")
    }

    if (action === "view") {
      actions.open("https://github.com/dubisdev/cerebro-todoist/releases")
      actions.hideWindow();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>{strings.pluginUpdated}</h1>
      <KeyboardNav>
        <ul className={styles.list}>
          <KeyboardNavItem
            style={{ justifyContent: "center" }}
            onSelect={() => handleClick("view")}
          >
            {strings.viewChangelog}
          </KeyboardNavItem>

          <KeyboardNavItem
            style={{ justifyContent: "center" }}
            onSelect={() => handleClick("close")}
          >
            {strings.clickToHideWindow}
          </KeyboardNavItem>
        </ul>
      </KeyboardNav>
    </div>
  );
};

export default updatedPlugin;
