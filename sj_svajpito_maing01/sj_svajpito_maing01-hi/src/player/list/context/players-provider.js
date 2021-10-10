//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useMemo, useSession } from "uu5g04-hooks";
import Config from "./config/config";
import PlayersContext from "./players-context";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PlayersProvider",
  //@@viewOff:statics
};

export const PlayersProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    playerList: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    playerList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();

    const players = useMemo(() => {
      const playerList = props.playerList;

      return {
        playerList,
      };
    }, [props.playerList, identity]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <PlayersContext.Provider value={players}>
        {typeof props.children === "function" ? props.children(players) : props.children}
      </PlayersContext.Provider>
    );
    //@@viewOff:render
  },
});

export default PlayersProvider;
