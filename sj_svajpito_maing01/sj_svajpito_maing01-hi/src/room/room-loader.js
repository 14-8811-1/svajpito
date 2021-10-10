// template: uu5ComponentCore RoomLoader
// templateVersion: 0.4.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=51199672
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import { RoomContext } from "./context/room-context";

import Config from "../config/config";
import Calls from "calls";
//@@viewOff:imports

export const RoomLoader = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "RoomLoader",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
    id: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
    id: undefined,
  },
  //@@viewOff:defaultProps

  render({ baseUri, id, children }) {
    //@@viewOn:hooks
    const roomDataObject = useDataObject({
      handlerMap: {
        load: (opt) => (id ? Calls.roomLoad(opt) : null),
        update: handleUpdate,
      },
      initialDtoIn: getInitLoadDtoIn(baseUri, id),
    });
    //@@viewOff:hooks

    //@@viewOn:handlers
    async function handleUpdate(newData) {
      let oldData = roomDataObject.data;
      let dtoInData = {};
      Object.keys(newData).forEach((key) => {
        dtoInData[key] = newData[key];
      });
      let shouldCall = Object.keys(dtoInData).length > 0;

      let result = oldData;
      if (shouldCall) {
        // merge old data with new so we do not lose some important keys e.g.
        // load returns authorizedProfiles but update not
        let partialResult = await Calls.roomUpdate(baseUri, dtoInData);
        let currentFullData = oldData;
        let mergedData = { ...currentFullData, ...partialResult };
        result = { ...mergedData };
      }

      return result;
    }
    //@@viewOff:handlers

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return <RoomContext.Provider value={roomDataObject}>{children}</RoomContext.Provider>;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getInitLoadDtoIn(baseUri, id) {
  let dtoIn = { data: {} };
  if (id) {
    dtoIn.data.id = id;
  }
  if (baseUri) {
    dtoIn.uri = baseUri;
  }
  return dtoIn;
}
//@@viewOff:helpers

export default RoomLoader;
