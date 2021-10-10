//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useRef, useEffect } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
import RoomContextResolver from "../room/context/room-context-resolver";
import BasicInfo from "../room/basic-info/basic-info";
import Calls from "../calls";
import PlayersProvider from "../player/list/context/players-provider";
import List from "../player/list/list";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomDetail",
  //@@viewOff:statics
};

export const RoomDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const [waiting, setWaiting] = useState(false);
    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
      poll();
    }, []);

    //@@viewOn:private
    async function poll() {
      setWaiting(true);
      const session = UU5.Environment.getSession().getCallToken();
      const eventSource = new EventSource(
        `${Calls.getCommandUri("room/join")}?roomId=${props.params.id}&access_token=${session.token}`
      );
      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        console.log(eventData);
        if (eventData.identifier === "playerList") {
          setPlayerList(eventData.data);
        }
        // setLastValue((oldValue) => [...oldValue, data.message]);
      };
      eventSource.onopen = (event) => {
        console.log("Open", event);
      };
      eventSource.onerror = (event) => {
        console.log("Error", event);
      };
    }
    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RoomContextResolver id={props.params.id}>
          <PlayersProvider playerList={playerList}>
            <BasicInfo />
            <List />
          </PlayersProvider>
        </RoomContextResolver>
      </div>
    );
    //@@viewOff:render
  },
});

export default RoomDetail;
