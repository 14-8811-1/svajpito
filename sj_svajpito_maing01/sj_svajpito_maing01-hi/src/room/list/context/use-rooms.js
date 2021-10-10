//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./rooms-context";
//@@viewOff:imports

export function useRooms() {
  return useContext(Context);
}

export default useRooms;
