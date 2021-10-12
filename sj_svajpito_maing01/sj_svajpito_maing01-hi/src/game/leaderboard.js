import { useSelector } from "react-redux";
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";

import Config from "./config/config.js";
const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Leaderboard",
  //@@viewOff:statics
};

export const Leaderboard = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const score = useSelector((state) => state.score);
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div {...attrs} className="score-box">
        <div className="your-score">
          <h2>Your Score: {score}</h2>
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

export default Leaderboard;
