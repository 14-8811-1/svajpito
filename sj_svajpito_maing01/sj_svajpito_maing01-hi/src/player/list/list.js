// template: uu5ComponentCore List
// templateVersion: 0.5.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=371UuShapesQuadrilateralsCoreSquareList01
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import { useSelector } from "react-redux";
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import { useSubApp, useSubAppData } from "uu_plus4u5g01-context";
import UuP from "uu_pg01";
import "uu_pg01-bricks";
import "uu_territoryg01-bricks";

import ListView from "./list-view";
import { usePlayers } from "./context/use-players";
// import DataListStateResolver from "../../common/data-list-state-resolver";
import DataObjectStateResolver from "../../common/data-object-state-resolver";

import Config from "../config/config";
import Lsi from "./list-lsi";
//@@viewOff:imports

// Height of the component wrapper used to maintain
// height of wrapper with different content
const PLACEHOLDER_HEIGHT = 400;

const STATICS = {
  displayName: Config.TAG + "List",
  nestingLevelList: UU5.Environment.getNestingLevelList("bigBox", "inline"),
};

const List = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.string,
    editButtons: UU5.PropTypes.bool,
    borderRadius: UU5.PropTypes.string,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    colorSchema: undefined,
    editButtons: true,
    elevation: "2",
    borderRadius: "4px",
    bgStyle: undefined,
    cardView: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    let players = usePlayers();
    // let { data: subAppData } = useSubAppData();
    let subApp = useSubApp();

    // let playerDataList = players?.playerList;
    // console.log(playerDataList);

    // const playerDataList = useSelector((state) => {
    //   return state.playerList;
    // });
    // const score = useSelector((state) => {
    //   return state.score;
    // });
    // console.log()
    //controlling opening modals through state and props
    // useEffect(() => {
    //
    // }, [score]);
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOff:handlers
    //@@viewOff:handlers

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UuP.Bricks.ComponentWrapper
        {...attrs}
        colorSchema={props.colorSchema}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
        cardView={props.cardView}
        header={<UU5.Bricks.Lsi lsi={Lsi.listHeader} />}
        help={<UU5.Bricks.Lsi lsi={Lsi.listHelp} />}
        hideCopyComponent
      >
        {/*<DataObjectStateResolver dataObject={subAppData} height={PLACEHOLDER_HEIGHT}>*/}
        {/*<>*/}
        {/*{playerDataList && playerDataList[0]?.score}*/}
        {/*{score}*/}
        <ListView
          // playerList={playerDataList}
          baseUri={subApp.baseUri} />
        {/*</>*/}
        {/*</DataObjectStateResolver>*/}
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
//viewOff:helpers

//viewOn:exports
export { List };
export default List;
//viewOff:exports
