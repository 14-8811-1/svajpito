// template: uu5ComponentCore DataObjectStateResolver
// templateVersion: 0.2.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=61776333
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import DataError from "./data-error";
import DataPending from "./data-pending";

import Config from "../config/config";
import Lsi from "./error-lsi";
//@@viewOff:imports

export const DataObjectStateResolver = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "DataObjectStateResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataObject: UU5.PropTypes.object,
    height: UU5.PropTypes.number,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    dataObject: {},
    height: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    //@@viewOff:hooks

    //@@viewOn:handlers
    //@@viewOff:handlers

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    let child = null;
    switch (props.dataObject.state) {
      case "ready":
      case "error":
      case "pending": {
        child = props.children;
        break;
      }
      case "readyNoData": {
        child = <UU5.Bricks.Block background colorSchema="warning" content={<UU5.Bricks.Lsi lsi={Lsi.noData} />} />;
        break;
      }
      case "errorNoData": {
        child = <DataError height={props.height} moreInfo errorData={props.dataObject.errorData} />;
        break;
      }
      case "pendingNoData": {
        child = <DataPending height={props.height} />;
        break;
      }
      default: {
        child = <DataError height={props.height} errorLsi={Lsi.dataObjectError} />;
      }
    }

    return child;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

export default DataObjectStateResolver;
