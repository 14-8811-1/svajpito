//@@viewOn:imports
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useRef, useEffect } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
import RoomContextResolver from "../room/context/room-context-resolver";
// import BasicInfo from "../room/basic-info/basic-info";
import Calls from "../calls";
// import PlayersProvider from "../player/list/context/players-provider";
// import List from "../player/list/list";

// import store from "../game/store";
import Game from "../game-2/index";
import BasicInfo from "../room/basic-info/basic-info";
import List from "../player/list/list";
import PlayersProvider from "../player/list/context/players-provider";
// import Leaderboard from "../game/leaderboard";
// import store, { UPDATE_PLAYER_LIST, ADD_TO_PLAYER_LIST, SET_PLAYER_LIST, REMOVE_FROM_PLAYER_LIST } from "../game/store";

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
    // const [waiting, setWaiting] = useState(false);
    const [playerList, setPlayerList] = useState([]);
    // const [playerScore, setPlayerScore] = useState(0);
    let moveNumber = useRef();
    let eventSourceRef = useRef();

    // const playerList = useSelector((state) => {
    //   return state.playerList;
    // });

    useEffect(() => {
      poll();
    }, []);

    //@@viewOn:private
    async function poll() {
      moveNumber.current = 0;
      setTimeout(() => {
        let uuIdentity = UU5.Environment.getSession().getIdentity().getUuIdentity();
        console.log(uuIdentity, "join");

        // setWaiting(true);
        const session = UU5.Environment.getSession().getCallToken();
        const eventSource = new EventSource(
          `${Calls.getCommandUri("room/join2")}?roomId=${props.params.id}&access_token=${session.token}`
        );
        eventSourceRef.current = eventSource;

        eventSource.onmessage = (event) => {
          const eventData = JSON.parse(event.data);
          if (Array.isArray(eventData)) {
            eventData.forEach((eventData) => {
              processMessages(eventData.identifier, eventData.data);
            });
          } else {
            processMessages(eventData.identifier, eventData.data);
          }
        };
        eventSource.onopen = (event) => {
          console.log("Open", event);
        };
        eventSource.onerror = (event) => {
          console.log("Error", event);
        };

        UU5.Environment.EventListener.registerEvent("playerMovement", UU5.Common.Tools.generateUUID(16), (data) => {
          data.gameId = props.params.id;

          moveNumber.current += 1;
          if (moveNumber.current % 3 === 0 || moveNumber < 10) {
            Calls.update({
              identifier: "playerMovement",
              data,
            });
          }
        });
      }, 2000);
    }

    function processMessages(identifier, data) {
      console.log(identifier, data);

      if (identifier === "currentPlayers") {
        setPlayerList(data);
        // console.log("newPlayerList", data);
      } else if (identifier === "newPlayer") {
        setPlayerList((playerList) => [...playerList, data]);
      } else if (identifier === "disconnect") {
        // let newPlayerList = [...playerList.filter((p) => p.uuIdentity !== data.uuIdentity)];
        // console.log("newPlayerList", newPlayerList, data);
        setPlayerList((playerList) => [...playerList.filter((p) => p.uuIdentity !== data.uuIdentity)]);
      }

      UU5.Environment.EventListener.triggerEvent(identifier, data);
      // currentPlayers
      // starLocation
      // newPlayer
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
            <BasicInfo eventSource={eventSourceRef} />
          </PlayersProvider>
          <div id="game-container">
            <Game />
          </div>
        </RoomContextResolver>
      </div>
    );
    //@@viewOff:render
  },
});

export default RoomDetail;
