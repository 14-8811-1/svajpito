// template: uu5ComponentCore ProductsLoader
// templateVersion: 0.2.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=74346503
//@@viewOn:revision
// reviewed:
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "../config/config";
import Calls from "calls";
import { RoomsContext } from "./context/context";
//@@viewOff:imports

export const RoomsLoader = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "RoomsLoader",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
    pageSize: UU5.PropTypes.number,
    state: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
    pageSize: undefined,
    state: undefined,
  },
  //@@viewOff:defaultProps
  render({ baseUri, state, pageSize, children }) {
    //@@viewOn:hooks
    const roomDataList = useDataList({
      handlerMap: {
        load: Calls.roomList,
        create: (dtoIn) => Calls.roomCreate({ uri: baseUri, data: dtoIn }),
      },
      initialDtoIn: getLoadDtoIn(baseUri, { state }),
      pageSize: pageSize,
    });
    //@@viewOff:hooks

    //@@viewOn:handlers
    //@@viewOff:handlers

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return <RoomsContext.Provider value={roomDataList}>{children}</RoomsContext.Provider>;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getLoadDtoIn(baseUri, params) {
  let dtoIn = { data: {} };

  for (let key in params) {
    if (params[key]) {
      dtoIn.data[key] = params[key];
    }
  }
  if (baseUri) {
    dtoIn.uri = baseUri;
  }

  return dtoIn;
}
//@@viewOff:helpers

export default RoomsLoader;
