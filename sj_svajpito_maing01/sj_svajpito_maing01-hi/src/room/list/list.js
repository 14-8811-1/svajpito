// template: uu5ComponentCore List
// templateVersion: 0.5.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=371UuShapesQuadrilateralsCoreSquareList01
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import { useSubApp, useSubAppData } from "uu_plus4u5g01-context";
import UuP from "uu_pg01";
import "uu_pg01-bricks";
import "uu_territoryg01-bricks";
import ListAddRoomForm from "./list-add-room-form";

import ListView from "./list-view";
import { useRooms } from "./context/use-rooms";
import DataListStateResolver from "../../common/data-list-state-resolver";
import DataObjectStateResolver from "../../common/data-object-state-resolver";

import { useRoomPermission } from "../context/use-room-permission";

import Config from "../config/config";
import Lsi from "./list-lsi";
//@@viewOff:imports

// Height of the component wrapper used to maintain
// height of wrapper with different content
const PLACEHOLDER_HEIGHT = 400;

const STATICS = {
  displayName: Config.TAG + "List",
  nestingLevelList: UU5.Environment.getNestingLevelList("bigBox", "inline"),
};

const List = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.string,
    editButtons: UU5.PropTypes.bool,
    borderRadius: UU5.PropTypes.string,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    colorSchema: undefined,
    editButtons: true,
    elevation: "2",
    borderRadius: "4px",
    bgStyle: undefined,
    cardView: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    let roomDataList = useRooms();
    let { data: subAppData } = useSubAppData();
    let subApp = useSubApp();
    const roomPermission = useRoomPermission();

    //controlling opening modals through state and props
    const [showListAddRoomModal, setShowListAddRoomModal] = useState(false);

    //@@viewOff:hooks

    //@@viewOn:private
    let roomList = roomDataList.data;
    console.log(roomDataList);
    let actionList = getActionList(props.editButtons, roomPermission, handleOpenShowListAddRoomForm);

    //@@viewOff:private

    //@@viewOff:handlers
    function handleOpenShowListAddRoomForm() {
      setShowListAddRoomModal(true);
    }

    function handleCloseShowListAddRoomFormDone() {
      setShowListAddRoomModal(false);
    }

    function handleCloseShowListAddRoomForm({ component }) {
      clearForm(component);
      setShowListAddRoomModal(false);
    }
    function handleListAddProtocolSaveFail({ component, dtoOut: e }) {
      console.error(e);
      component.getAlertBus().setAlert({
        content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveError} />} />,
        colorSchema: "danger",
      });
    }
    async function handleListAddProtocolSave({ values, component }) {
      const newData = {
        capacity: values.capacity,
        name: values.name,
      };
      try {
        await roomDataList.handlerMap.create(newData);
      } catch (e) {
        component.saveFail(e);
        return;
      }
      component.saveDone();
    }

    //@@viewOff:handlers

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UuP.Bricks.ComponentWrapper
        {...attrs}
        colorSchema={props.colorSchema}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
        cardView={props.cardView}
        actionList={actionList}
        header={<UU5.Bricks.Lsi lsi={Lsi.listHeader} />}
        help={<UU5.Bricks.Lsi lsi={Lsi.listHelp} />}
        hideCopyComponent
      >
        <DataObjectStateResolver dataObject={subAppData} height={PLACEHOLDER_HEIGHT}>
          <DataListStateResolver dataList={roomDataList} height={PLACEHOLDER_HEIGHT}>
            <>
              <ListAddRoomForm
                baseUri={subApp.baseUri}
                shown={showListAddRoomModal}
                onSave={handleListAddProtocolSave}
                onSaveDone={handleCloseShowListAddRoomFormDone}
                onSaveFail={handleListAddProtocolSaveFail}
                onCancel={handleCloseShowListAddRoomForm}
              />
              <ListView roomList={roomList} baseUri={subApp.baseUri} />
            </>
          </DataListStateResolver>
        </DataObjectStateResolver>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
function getActionList(editButtons, roomPermission, handleOpenListAddRoomForm) {
  let actionList = [];
  // if (editButtons && roomPermission.room.canCreate()) {
  actionList.push({
    content: <UU5.Bricks.Lsi lsi={Lsi.addRoom} />,
    active: true,
    onClick: handleOpenListAddRoomForm,
  });
  // }

  return actionList;
}

function clearForm(form) {
  if (form.reset) form.reset();
  if (form.getAlertBus) form.getAlertBus().clearAlerts();
}

//viewOff:helpers

//viewOn:exports
export { List };
export default List;
//viewOff:exports
