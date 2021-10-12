import UU5 from "uu5g04";
import Config from "../../config/config.js";

const TAG = Config.TAG + "Game.";

export default {
  ...Config,

  TAG,
  CSS: Config.CSS + "game-",
  Css: UU5.Common.Css.createCssModule(
    TAG.replace(/\.$/, "")
      .toLowerCase()
      .replace(/\./g, "-")
      .replace(/[^a-z-]/g, ""),
    process.env.NAME + "/" + process.env.OUTPUT_NAME + "@" + process.env.VERSION // this helps preserve proper order of styles among loaded libraries
  ),
};
