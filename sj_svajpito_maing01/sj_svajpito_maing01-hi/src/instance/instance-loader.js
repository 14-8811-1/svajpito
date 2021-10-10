// template: uu5ComponentCore QuadrilateralsLoader
// templateVersion: 0.4.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=70121772
//@@viewOn:revision
// coded: Petr Příhoda, 6.10.2020
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import { SubAppDataProvider } from "uu_plus4u5g01-context";

import Config from "../config/config";
import Calls from "calls";
//@@viewOff:imports

export const InstanceLoader = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "InstanceLoader",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const instanceDataObject = useDataObject({
      handlerMap: {
        load: Calls.instanceLoad,
        // update: handleUpdate,
        // setState: handleSetState,
      },
      initialDtoIn: getInitLoadDtoIn(props.baseUri),
    });
    //@@viewOff:hooks

    //@@viewOn:handlers
    //@@viewOff:handlers

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return <SubAppDataProvider data={instanceDataObject}>{props.children}</SubAppDataProvider>;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getInitLoadDtoIn(baseUri) {
  let dtoIn = { data: {} };
  if (baseUri) {
    dtoIn.uri = baseUri;
  }
  return dtoIn;
}
//@@viewOff:helpers

export default InstanceLoader;
