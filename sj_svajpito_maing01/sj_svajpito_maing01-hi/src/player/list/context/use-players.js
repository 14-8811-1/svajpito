//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./players-context";
//@@viewOff:imports

export function usePlayers() {
  return useContext(Context);
}

export default usePlayers;
