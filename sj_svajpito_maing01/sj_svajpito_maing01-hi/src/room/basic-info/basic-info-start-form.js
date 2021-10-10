// template: uu5ComponentCore startForm
// templateVersion: 0.5.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=75612910
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useLsiValues } from "uu5g04-hooks";
import "uu_territoryg01-bricks";

import Config from "../config/config";
import Lsi from "./basic-info-start-form-lsi";
//@@viewOff:imports

const startForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "startForm",
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
      <UU5.Forms.ContextModal
        shown={props.shown}
        header={<Header />}
        footer={<Controls />}
        onClose={props.onCancel}
        size="l"
        mountContent="onFirstOpen"
        overflow
        forceRender
      >
        <Form
          onSave={props.onSave}
          onSaveDone={props.onSaveDone}
          onSaveFail={props.onSaveFail}
          onCancel={props.onCancel}
          inputLsi={inputLsi}
        />
      </UU5.Forms.ContextModal>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
function Header() {
  return (
    <UU5.Forms.ContextHeader
      content={<UU5.Bricks.Lsi lsi={Lsi.header} />}
      info={<UU5.Bricks.Lsi lsi={Lsi.info} params={[]} />}
    />
  );
}

function Form({ onSave, onSaveDone, onSaveFail, onCancel, inputLsi }) {
  return (
    <UU5.Forms.ContextForm
      onSave={onSave}
      onSaveDone={onSaveDone}
      onSaveFail={onSaveFail}
      onCancel={onCancel}
      progressIndicator={<UU5.Bricks.Loading />}
    />
  );
}

function Controls() {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit} /> }}
      controlled={false}
    />
  );
}

//viewOff:helpers

//viewOn:exports
export { startForm };
export default startForm;
//viewOff:exports
