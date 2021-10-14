//@@viewOn:imports
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
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

// import store from "../game/store";
import Game from "../game/index";
import Leaderboard from "../game/leaderboard";
import store, { UPDATE_PLAYER_LIST, ADD_TO_PLAYER_LIST, SET_PLAYER_LIST, REMOVE_FROM_PLAYER_LIST } from "../game/store";

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
    // const [playerList, setPlayerList] = useState([]);
    // const [playerScore, setPlayerScore] = useState(0);
    let eventSourceRef = useRef();
    const playerList = useSelector((state) => {
      return state.playerList;
    });

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
      eventSourceRef.current = eventSource;

      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        console.log(eventData);
        if (eventData.identifier === "playerList") {
          //TODO
          // setPlayerList(eventData.data);
          store.dispatch({ type: SET_PLAYER_LIST, playerList: eventData.data });
        } else if (eventData.identifier === "playerAdd") {
          store.dispatch({ type: ADD_TO_PLAYER_LIST, player: eventData.data });
        } else if (eventData.identifier === "playerUpdate") {
          console.log("here");
          // let playerData = eventData.data;
          // let players = [...playerList];
          // let playerIndex = players.findIndex((p) => p.uuIdentity === playerData.uuIdentity);
          // players[playerIndex] = playerData;
          // store.dispatch({ type: UPDATE_PLAYER_LIST, playerList: players });
          let { updatedPlayerList, player } = updatePlayerListValue(eventData.data);
          store.dispatch({ type: UPDATE_PLAYER_LIST, playerList: updatedPlayerList });
        } else if (eventData.identifier === "playerDelete") {
          store.dispatch({ type: REMOVE_FROM_PLAYER_LIST, player: eventData.data });
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

    function updatePlayerListValue(playerData) {
      let updatedPlayerList = playerList || [];
      let searchUuIdentity = playerData?.uuIdentity || UU5.Environment.getSession().getIdentity().getUuIdentity();
      let playerIndex = playerList.findIndex((p) => p.uuIdentity === searchUuIdentity);
      if (!playerIndex) {
        return { updatedPlayerList };
      }

      if (playerData) {
        updatedPlayerList[playerIndex] = playerData;
      } else {
        updatedPlayerList[playerIndex].score += 10;
      }

      console.log({ updatedPlayerList, player: updatedPlayerList[playerIndex] });
      return { updatedPlayerList, player: updatedPlayerList[playerIndex] };
    }

    async function updateScore(newScore) {
      if (playerList.length > 0) {
        // let oldScore = playerScore;
        if (newScore !== 0) {
          let { updatedPlayerList, player } = updatePlayerListValue();
          //TODO
          // setPlayerList((playerList) => {
          //   // setPlayerScore((oldScore) => newScore);
          //   let players = playerList;
          //   let player = playerList.find(
          //     (p) => p.uuIdentity === UU5.Environment.getSession().getIdentity().getUuIdentity()
          //   );
          //   if (!player) {
          //     return;
          //   }
          //   player.score += 10;
          //
          //   return players;
          // });

          const newMessage = {
            gameId: props.params.id,
            identifier: "playerUpdate",
            data: player,
          };

          console.log(newMessage);
          Calls.updatePlayerList(newMessage);

          store.dispatch({ type: UPDATE_PLAYER_LIST, playerList: updatedPlayerList });
        }
      }
    }
    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RoomContextResolver id={props.params.id}>
          {/*<Provider store={store}>*/}
          <PlayersProvider playerList={playerList}>
            <BasicInfo eventSource={eventSourceRef} />
            <List />
          </PlayersProvider>
          <div>
            <div id="game-container">
              <Game />
            </div>
            <div className="content">
              <Leaderboard updateScore={updateScore} />
            </div>
          </div>
          {/*</Provider>*/}
        </RoomContextResolver>
      </div>
    );
    //@@viewOff:render
  },
});

export default RoomDetail;
