// template: uu5ComponentCore ModuleInfoDeleteBasicAttributesForm
// templateVersion: 0.5.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=86924478
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5richtextg01";
import { createVisualComponent, useLsiValues } from "uu5g04-hooks";

import Config from "../config/config";
import Lsi from "./list-add-room-form-lsi";
//@@viewOff:imports

const ListAddRoomForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ListAddRoomForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    onSave: UU5.PropTypes.func,
    onSaveDone: UU5.PropTypes.func,
    onSaveFail: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shown: false,
    onSave: () => {},
    onSaveDone: () => {},
    onSaveFail: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const inputLsi = useLsiValues(Lsi);
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOn:interface

    //@@viewOn:handlers
    //@@viewOff:handlers
    //@@viewOn:render
    return (
      <>
        <UU5.Forms.ContextModal
          shown={props.shown}
          header={<Header lsiHeader={Lsi.header} lsiInfo={Lsi.info} />}
          footer={<Controls lsiSubmit={Lsi.submit} />}
          onClose={props.onCancel}
          size="l"
          mountContent="onFirstOpen"
          overflow
          forceRender
        >
          <Form
            inputLsi={inputLsi}
            onSave={props.onSave}
            onSaveDone={props.onSaveDone}
            onSaveFail={props.onSaveFail}
            onCancel={props.onCancel}
          />
        </UU5.Forms.ContextModal>
      </>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
function Controls(props) {
  return (
    <UU5.Forms.ContextControls
      controlled={false}
      buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={props.lsiSubmit} /> }}
    />
  );
}

function Header(props) {
  return (
    <UU5.Forms.ContextHeader
      content={<UU5.Bricks.Lsi lsi={props.lsiHeader} />}
      info={<UU5.Bricks.Lsi lsi={props.lsiInfo} />}
    />
  );
}

function Form({ onSave, onSaveDone, onSaveFail, onCancel, inputLsi }) {
  return (
    <UU5.Forms.ContextForm
      onSave={(opt) => {
        onSave(opt);
      }}
      onSaveDone={onSaveDone}
      onSaveFail={onSaveFail}
      onCancel={onCancel}
      progressIndicator={<UU5.Bricks.Loading />}
    >
      <UU5.Bricks.Row>
        <UU5.Bricks.Column colWidth="s-6 xs-12">
          <UU5.Forms.Text
            controlled={false}
            name="name"
            label={inputLsi.name}
            key="name"
            placeholder="Best Room ever"
            required
          />
        </UU5.Bricks.Column>
        <UU5.Forms.Number min={2} max={20} name="capacity" label={inputLsi.capacity} controlled={false} required />
      </UU5.Bricks.Row>
    </UU5.Forms.ContextForm>
  );
}
//viewOff:helpers

//viewOn:exports
export { ListAddRoomForm };
export default ListAddRoomForm;
//viewOff:exports
