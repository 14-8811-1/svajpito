// template: uu5ComponentCore DataPending
// templateVersion: 0.2.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=23544164
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";

import Config from "../config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  placeholder: (height) => Config.Css.css`
    height: ${height}px;
  `,
};
//@@viewOff:css

const STATICS = {
  displayName: Config.TAG + "DataPending",
  nestingLevelList: UU5.Environment.getNestingLevelList("bigBox", "inline"),
};

const DataPending = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    height: UU5.PropTypes.number,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    height: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    let attrs = UU5.Common.VisualComponent.getAttrs(props);
    const className = props.height ? Css.placeholder(props.height) : "";
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    let child;

    if (!currentNestingLevel || currentNestingLevel === "inline") {
      child = <UU5.Bricks.Loading inline />;
    } else {
      child = (
        <UU5.Bricks.Div {...attrs} className={className}>
          <UU5.Bricks.Loading />
        </UU5.Bricks.Div>
      );
    }

    return child;
    //@@viewOff:render
  },
});

//viewOn:helpers
//viewOff:helpers

//viewOn:exports
export { DataPending };
export default DataPending;
//viewOff:exports
