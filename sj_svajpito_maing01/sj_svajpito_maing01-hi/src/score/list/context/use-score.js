//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./score-context";
//@@viewOff:imports

export function useScore() {
  return useContext(Context);
}

export default useScore;
