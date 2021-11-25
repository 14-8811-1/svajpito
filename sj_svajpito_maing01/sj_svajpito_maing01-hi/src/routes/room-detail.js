//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useRef, useEffect } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import { onEvent, triggerEvent } from "../common/communication-helper";

import Config from "./config/config.js";
import RoomContextResolver from "../room/context/room-context-resolver";
import Calls from "../calls";

import Game from "../game/index";
import BasicInfo from "../room/basic-info/basic-info";
import PlayersProvider from "../player/list/context/players-provider";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomDetail",
  //@@viewOff:statics
};

export const RoomDetail = createVisualComponent({
  ...STATICS,

  render(props) {
    const [playerList, setPlayerList] = useState([]);
    let moveNumber = useRef();
    let eventSourceRef = useRef();

    useEffect(() => initCommunication(), []);

    //@@viewOn:private

    /**
     * Init the communication with server through eventSource
     * @returns {Promise<void>}
     */
    async function initCommunication() {
      moveNumber.current = 0;
      setTimeout(() => {
        let uuIdentity = UU5.Environment.getSession().getIdentity().getUuIdentity();
        console.log(uuIdentity, "join");

        const session = UU5.Environment.getSession().getCallToken();
        const eventSource = new EventSource(
          `${Calls.getCommandUri("room/join")}?roomId=${props.params.id}&access_token=${session.token}`
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

        registerEventsToCallServer();
      }, 2000);
    }

    /**
     * Events which should call server based on the triggered event from Phaser
     */
    function registerEventsToCallServer() {
      onEvent("playerMovement", async (data) => {
        data.gameId = props.params.id;
        moveNumber.current += 1;
        await Calls.updatePlayerPosition(data, moveNumber);
      });

      onEvent("starCollected", async (data = {}) => {
        data.gameId = props.params.id;
        let response = await Calls.updateStar(data);
        processMessages(response.identifier, response.data);
      });

      onEvent("newBullet", async (data = {}) => {
        data.gameId = props.params.id;
        await Calls.newBullet(data);
      });

      onEvent("playerDead", async (data = {}) => {
        data.gameId = props.params.id;
        await Calls.playerDead(data);
      });

      onEvent("playerShot", async (data = {}) => {
        data.gameId = props.params.id;
        await Calls.playerShot(data);
      });
    }

    /**
     * Process Messages from server and propagate them to the Phaser
     * @param identifier
     * @param data
     */
    function processMessages(identifier, data) {
      // console.log(identifier, data);
      if (identifier === "currentPlayers") {
        setPlayerList(data);
      } else if (identifier === "newPlayer") {
        setPlayerList((playerList) => [...playerList, data]);
      } else if (identifier === "disconnect") {
        setPlayerList((playerList) => [...playerList.filter((p) => p.uuIdentity !== data.uuIdentity)]);
      }

      triggerEvent(identifier, data);
    }

    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RoomContextResolver id={props.params.id}>
          <PlayersProvider playerList={playerList}></PlayersProvider>
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
