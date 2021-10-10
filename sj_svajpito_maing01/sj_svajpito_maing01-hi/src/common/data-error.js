// template: uu5ComponentCore DataError
// templateVersion: 0.2.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=87395258
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import Config from "../config/config";
import Lsi from "./error-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  placeholder: (height) => Config.Css.css`
    height: ${height}px;
    overflow: scroll
  `,
};
//@@viewOff:css

const STATICS = {
  displayName: Config.TAG + "DataError",
  nestingLevelList: UU5.Environment.getNestingLevelList("bigBox", "inline"),
};

export const DataError = createComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    moreInfo: UU5.PropTypes.bool,
    errorData: UU5.PropTypes.object,
    height: UU5.PropTypes.number,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    moreInfo: false,
    errorData: undefined,
    height: undefined,
  },
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    let attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const className = props.height ? Css.placeholder(props.height) : "";

    return (
      <Plus4U5.Bricks.Error
        {...attrs}
        className={className}
        moreInfo={props.moreInfo}
        errorData={props.errorData}
        inline={currentNestingLevel === "inline"}
      >
        <UU5.Bricks.Lsi lsi={getProperLsiError(props.errorData)} />
      </Plus4U5.Bricks.Error>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
function getProperLsiError(errorData) {
  let lsi = Lsi.error;
  if (errorData?.error?.status === 403) {
    lsi = Lsi.forbidden;
  }

  return lsi;
}
//viewOff:helpers

export default DataError;
