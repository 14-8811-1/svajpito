//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./room-permission-context";
//@@viewOff:imports

export function useRoomPermission() {
  return useContext(Context);
}

export default useRoomPermission;
