// template: uu5ComponentCore SpaContext
// templateVersion: 0.4.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=28401939
//@@viewOn:revision
// coded: Petr Příhoda, 20.10.2020
//@@viewOff:revision

//@@viewOn:imports
import { createVisualComponent } from "uu5g04-hooks";
import { useSubApp, SubAppDataContext } from "uu_plus4u5g01-context";

import Config from "./config/config";
import InstanceLoader from "../instance/instance-loader";
import DataObjectStateResolver from "../common/data-object-state-resolver";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SpaContext",
  //@@viewOff:statics
};

export const SpaContext = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let subApp = useSubApp();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <InstanceLoader baseUri={subApp.baseUri}>
        <SubAppDataContext.Consumer>
          {({ data }) => {
            return (
              <DataObjectStateResolver dataObject={data}>
                {props.children}
              </DataObjectStateResolver>
            );
          }}
        </SubAppDataContext.Consumer>
      </InstanceLoader>
    );
    //@@viewOff:render
  },
});

export default SpaContext;
