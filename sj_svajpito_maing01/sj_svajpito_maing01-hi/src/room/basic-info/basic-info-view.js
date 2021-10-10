// template: uu5ComponentCore ModuleInfoView
// templateVersion: 0.4.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=13036900
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";

import UuP from "uu_pg01";
import "uu_pg01-bricks";

import Config from "../config/config";
import { usePlayers } from "../../player/list/context/use-players";
import Lsi from "./basic-info-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  panelHeader: () => Config.Css.css`
  .uu5-bricks-panel-header {
    padding: 0px;
    min-height: 0px;
  }
  .uu5-bricks-panel-body-body{
    padding: 0px;
    font-size: initial;
  }
 `,

  basicInfo: () => Config.Css.css`
    .uup-bricks-basic-info-section {
      margin-right: 0px;
    }
 `,
};
//@@viewOff:css

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BasicInfoView",
  //@@viewOff:statics
};

const BasicInfoView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    room: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    room: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    let players = usePlayers();
    let countOfPlayers = players?.playerList?.length || 0;
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    //@@viewOn:render
    return (
      <UuP.Bricks.BasicInfo className={Css.basicInfo()}>
        <SectionHeader room={props.room} countOfPlayers={countOfPlayers} />
        <UU5.Bricks.Panel bgStyleHeader="transparent" className={Css.panelHeader()} header=" " content={<></>} />
      </UuP.Bricks.BasicInfo>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
function SectionHeader({ room, countOfPlayers }) {
  let updateActions = [];

  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        { label: <UU5.Bricks.Lsi lsi={Lsi.id} />, content: room.id },
        { label: <UU5.Bricks.Lsi lsi={Lsi.name} />, content: room.name },
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.capacity} />,
          content: <span> {countOfPlayers + "/" + room.capacity} </span>,
        },
        { label: <UU5.Bricks.Lsi lsi={Lsi.state} />, content: room.state },
        { label: <UU5.Bricks.Lsi lsi={Lsi.createdBy} />, content: room.createdBy },
      ]}
      actionList={updateActions}
      showSeparator={false}
    />
  );
}
//viewOff:helpers

//viewOn:exports
export { BasicInfoView };
export default BasicInfoView;
//viewOff:exports
