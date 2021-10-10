// template: RectangleContextResolver
// templateVersion: 0.4.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=UuShapesQuadrilateralsRectangleRectangleContextResolver
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useMemo } from "uu5g04-hooks";
import { useSubAppData } from "uu_plus4u5g01-context";

import Config from "../config/config";
import useRoom from "./use-room";
import RoomPermissionProvider from "./room-permission-provider";
import RoomLoader from "../room-loader";
//@@viewOff:imports

const RoomContextResolver = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "RoomContextResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    id: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    id: undefined,
  },
  //@@viewOff:defaultProps

  render({ id, children }) {
    //@@viewOn:hooks
    const roomDataObject = useRoom();
    const { data: subAppData } = useSubAppData();

    const shouldLoadData = useMemo(() => checkDataOnContext(roomDataObject, id), [roomDataObject, id]);
    //@@viewOff:hooks

    //@@viewOn:private
    let subApp = subAppData.data;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    let child = children;

    if (shouldLoadData) {
      child = (
        <RoomPermissionProvider profileList={subApp?.authorizedProfileList}>
          <RoomLoader baseUri={subApp.baseUri} id={id}>
            {children}
          </RoomLoader>
        </RoomPermissionProvider>
      );
    }

    return child;
    //@@viewOff:render
  },
});

//viewOn:helpers
function checkDataOnContext(protocolDataObject, propsId) {
  let shouldLoadData = false;
  // context is empty
  if (!protocolDataObject || (protocolDataObject && !Object.keys(protocolDataObject).length)) {
    shouldLoadData = true;
  }
  // context is not empty but contains wrong protocolDataObject
  // it means that it is loading or it has already loaded request
  // with different id than we want
  let contextId;
  switch (protocolDataObject.state) {
    case "ready":
    case "pending":
    case "error":
      contextId = protocolDataObject.data.id;
      break;
    case "pendingNoData":
      contextId = protocolDataObject.pendingData.dtoIn.data.id;
      break;
    case "errorNoData":
      contextId = protocolDataObject.errorData.dtoIn.data.id;
      break;
    default:
      contextId = propsId;
  }

  if (propsId !== contextId) shouldLoadData = true;

  return shouldLoadData;
}
//viewOff:helpers

//viewOn:exports
export { RoomContextResolver };
export default RoomContextResolver;
//viewOff:exports
