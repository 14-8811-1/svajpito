// template: ListContextResolver
// templateVersion: 0.2.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=UuShapesQuadrilateralsSquareListContextResolver
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useMemo } from "uu5g04-hooks";
import { useSubAppData } from "uu_plus4u5g01-context";
import Config from "./config/config";
import usePlayers from "./use-players";
import PlayersLoader from "../players-loader";
//@@viewOff:imports

const ListContextResolver = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ListContextResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    pageSize: UU5.PropTypes.number,
    state: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    pageSize: undefined,
    state: undefined,
  },
  //@@viewOff:defaultProps

  render({ pageSize, state, children }, ...other) {
    //@@viewOn:hooks
    const playerDataList = usePlayers();
    // consume baseUri
    const { data: subAppData } = useSubAppData();

    const shouldLoadData = useMemo(() => checkDataOnContext(playerDataList), [playerDataList]);
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
        <PlayersLoader baseUri={subApp.baseUri} pageSize={pageSize} state={state}>
          {children}
        </PlayersLoader>
      );
    }

    return child;
    //@@viewOff:render
  },
});

//viewOn:helpers
function checkDataOnContext(roomDataList) {
  let shouldLoadData = false;
  // context is empty
  if (!roomDataList || !Object.keys(roomDataList).length) {
    shouldLoadData = true;
  }

  return shouldLoadData;
}
//viewOff:helpers

//viewOn:exports
export { ListContextResolver };
export default ListContextResolver;
//viewOff:exports
