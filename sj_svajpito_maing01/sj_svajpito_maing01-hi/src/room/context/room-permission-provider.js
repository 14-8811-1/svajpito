//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useMemo, useSession } from "uu5g04-hooks";
import Config from "./config/config";
import RoomPermissionContext from "./room-permission-context";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomPermissionProvider",
  //@@viewOff:statics
};

export const RoomPermissionProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    profileList: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    profileList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();

    const room = useMemo(() => {
      const isAuthority = props.profileList.some((profile) => profile === "Authorities");

      function canCreate() {
        return isAuthority;
      }

      function canStart() {
        return isAuthority;
      }

      const room = {
        canCreate,
        canStart,
      };

      return {
        isAuthority,
        room,
      };
    }, [props.profileList, identity]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <RoomPermissionContext.Provider value={room}>
        {typeof props.children === "function" ? props.children(room) : props.children}
      </RoomPermissionContext.Provider>
    );
    //@@viewOff:render
  },
});

export default RoomPermissionProvider;
