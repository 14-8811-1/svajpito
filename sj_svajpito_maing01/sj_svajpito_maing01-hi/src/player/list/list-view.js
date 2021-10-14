// template: uu5ComponentCore ListView01
// templateVersion: 0.5.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=UuShapesQuadrilateralsCoreSquareListView01
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import { useSelector } from "react-redux";
import DetailsView from "./view/detail-view";

import Config from "../config/config";
//@@viewOff:imports

//@@viewOn:css
//@@viewOff:css

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ListView01",
  //@@viewOff:statics
};
const ListView01 = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    playerList: UU5.PropTypes.array,
    uuBtBaseUri: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    playerList: [],
    uuBtBaseUri: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const playerDataList = useSelector((state) => {
      return state.playerList;
    });

    console.log(playerDataList);
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider data={playerDataList}>
        <Uu5Tiles.FilterBar />
        <Uu5Tiles.InfoBar sortable={false} />
        <DetailsView baseUri={props.baseUri} />
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
//viewOff:helpers

//viewOn:exports
export { ListView01 };
export default ListView01;
//viewOff:exports
