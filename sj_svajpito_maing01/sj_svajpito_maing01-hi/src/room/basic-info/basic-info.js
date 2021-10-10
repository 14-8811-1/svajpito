// template: uu5ComponentCore Button
// templateVersion: 0.5.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=22606949
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useMemo } from "uu5g04-hooks";
import { useSubAppData, useSubApp } from "uu_plus4u5g01-context";

import UuP from "uu_pg01";
import "uu_pg01-bricks";
import UuTerritory from "uu_territoryg01";
import "uu_territoryg01-bricks";

import { useRoom } from "../context/use-room";
import BasicInfoView from "./basic-info-view";
import DataObjectStateResolver from "../../common/data-object-state-resolver";
import BasicInfoStartForm from "./basic-info-start-form";

import Config from "../config/config";
import Lsi from "./basic-info-lsi";
//@@viewOff:imports

const STATICS = {
  displayName: Config.TAG + "BasicInfo",
  nestingLevelList: UU5.Environment.getNestingLevelList("bigBox", "inline"),
};

const BasicInfo = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    id: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.string,
    borderRadius: UU5.PropTypes.string,
    cardView: UU5.PropTypes.bool,
    editButtons: UU5.PropTypes.bool,
    expand: UU5.PropTypes.bool,
    expandButton: UU5.PropTypes.bool,
    eventSource: UU5.PropTypes.any,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
    id: undefined,
    colorSchema: undefined,
    elevation: "2",
    borderRadius: "4px",
    cardView: true,
    editButtons: true,
    expand: false,
    expandButton: true,
    eventSource: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    let roomDataObject = useRoom();

    //controlling opening modals through state and props
    const [showStartModal, setShowStartModal] = useState(false);

    let actionList = useMemo(() => getDefaultActionList(roomDataObject.state, handleOpenStartForm, props.eventSource), [
      roomDataObject.state,
      props.eventSource,
    ]);
    //@@viewOff:hooks

    //@@viewOn:private
    let room = roomDataObject.data;
    //@@viewOff:private

    //@@viewOff:handlers
    function handleOpenStartForm() {
      setShowStartModal(true);
    }

    function handleCloseStartForm({ component }) {
      clearForm(component);
      setShowStartModal(false);
    }

    async function handleSetStartSave(opt) {
      const newData = {
        id: room?.id,
      };

      try {
        await roomDataObject.handlerMap.start(newData);
      } catch (e) {
        opt.component.saveFail(e);
        return;
      }
      opt.component.saveDone();
    }

    function handleSetStartSaveDone() {
      setShowStartModal(false);
    }

    function handleSetStartSaveFail({ component, dtoOut: e }) {
      console.error(e);
      component.getAlertBus().addAlert({
        content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveError} />} />,
        colorSchema: "danger",
      });
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
        header={<UU5.Bricks.Lsi lsi={Lsi.basicInfoHeader} />}
        help={<UU5.Bricks.Lsi lsi={Lsi.basicInfoHelp} />}
        hideCopyComponent
      >
        <DataObjectStateResolver dataObject={roomDataObject}>
          <BasicInfoStartForm
            shown={showStartModal}
            name={room?.name}
            state={room?.name}
            createdBy={room?.createdBy}
            capacity={room?.capacity}
            onSave={handleSetStartSave}
            onSaveDone={handleSetStartSaveDone}
            onSaveFail={handleSetStartSaveFail}
            onCancel={handleCloseStartForm}
          />
          <BasicInfoView
            room={room}
            onOpenSetBasicAttributesForm={handleOpenStartForm}
            editButtons={props.editButtons}
            productInfoMask={props.productInfoMask}
          />
        </DataObjectStateResolver>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
function getDefaultActionList(dataObjectState, handleOpenStartForm, eventSource) {
  let actionList = [];
  if (dataObjectState === "ready" && eventSource?.current?.close) {
    actionList.push({
      content: "Start",
      active: true,
      onClick: handleOpenStartForm,
    });
    actionList.push({
      content: "Leave",
      active: true,
      onClick: () => {
        eventSource.current.close();
        UU5.Environment.setRoute("rooms");
      },
      colorSchema: "danger",
    });
  }
  return actionList;
}

function clearForm(form) {
  if (form.reset) form.reset();
  if (form.getAlertBus) form.getAlertBus().clearAlerts();
}
//viewOff:helpers

//viewOn:exports
export { BasicInfo };
export default BasicInfo;
//viewOff:exports
