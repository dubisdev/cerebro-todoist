import CerebroRouter from "cerebro-command-router";
import icon from "./icons";
import strings from "./lang";
import { name, keyword } from "./settings";

const plugin = ({ term, display, hide }) => {
  const myRouter = new CerebroRouter({ command: "tds", term, display, hide });

  myRouter.invalidRoute({
    icon: icon,
    title: strings.movedTo,
    getPreview: () => (
      <div>
        <h1>{strings.movedTo}</h1>
        <p>{strings.howToMove0}</p>
        <p>{strings.howToMove1}</p>
        <p>{strings.howToMove2}</p>
      </div>
    ),
  });
};

export { icon, name, keyword, plugin as fn };
