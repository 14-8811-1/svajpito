// template: uu5ComponentCore View
// templateVersion: 0.2.0
// documentation: https://uuapp.plus4u.net/uu-bookkit-maing01/ce07c990d31f4917b5b4d75a3a99c2c9/book/page?code=73944067
//@@viewOn:revision
//@@viewOff:revision

//@@viewOn:imports
import UU5 from "uu5g04";
import Plus4U5 from "uu_plus4u5g01";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";

import Config from "../../config/config";
import Lsi from "../list-lsi";
//@@viewOff:imports

//@@viewOn:css
//@@viewOff:css

const DetailView = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "DetailView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    //@@viewOff:hooks

    //@@viewOn:private
    const columns = [
      {
        cell: (cellProps) => {
          if (cellProps.data.data.uuIdentity) {
            return <span> {cellProps.data.data.uuIdentity} </span>;
          } else {
            return null;
          }
        },
        header: <UU5.Bricks.Lsi lsi={Lsi.columns.uuIdentity} />,
        sorterKey: "uuIdentity",
        minWidth: "m",
      },
      {
        cell: (cellProps) => {
          if (cellProps.data.data.score) {
            return <span> {cellProps.data.data.score} </span>;
          } else {
            return null;
          }
        },
        header: <UU5.Bricks.Lsi lsi={Lsi.columns.score} />,
        sorterKey: "score",
        minWidth: "s",
      },
    ];
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    //@@viewOn:render
    return (
      <>
        <Uu5Tiles.List
          columns={columns}
          height="auto"
          rowPadding="4px 16px"
          tileRowSpacing={8}
          tileListPadding="8px 16px"
          alternateRowBackground
        />
      </>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
//viewOff:helpers

//viewOn:exports
export { DetailView };
export default DetailView;
//viewOff:exports
