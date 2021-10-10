// template: UU5Context
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./room-context";
//@@viewOff:imports

export function useRoom() {
  return useContext(Context);
}

export default useRoom;
