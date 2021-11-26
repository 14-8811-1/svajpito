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
          if (cellProps.data.data.name) {
            return <span> {cellProps.data.data.name} </span>;
          } else {
            return null;
          }
        },
        header: <UU5.Bricks.Lsi lsi={Lsi.columns.name} />,
        sorterKey: "name",
        minWidth: "s",
      },
      {
        cell: (cellProps) => {
          if (cellProps.data.data.capacity) {
            return <span> {cellProps.data.data.capacity} </span>;
          } else {
            return null;
          }
        },
        header: <UU5.Bricks.Lsi lsi={Lsi.columns.capacity} />,
        sorterKey: "capacity",
        minWidth: "s",
      },
      {
        cell: (cellProps) => {
          if (cellProps.data.data.id) {
            return (
              <UU5.Bricks.Link
                onClick={(c) => {
                  UU5.Environment.setRoute("roomdetail", { id: cellProps.data.data.id });
                }}
              >
                Join
              </UU5.Bricks.Link>
            );
          } else {
            return null;
          }
        },
        header: <UU5.Bricks.Lsi lsi={Lsi.columns.joinGame} />,
        sorterKey: "joinGame",
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
function getStateIcon(state) {
  let result = Config.PROTOCOL_STATE_LIST.find((x) => x.code === state)?.icon || null;
  return result;
}

function handleClick(e, baseUri, isHome, useCase, params) {
  if (isHome) {
    UU5.Environment.setRoute(useCase, params);
    e.preventDefault();
  } else {
    window.open(getLink(baseUri, useCase, params));
    e.preventDefault();
  }
}
function getLink(baseUri, useCase, params) {
  let link = Uri.UriBuilder.parse(baseUri).setUseCase(useCase).setParameters(params).toString();
  return link;
}
function addProtocolIdToUri(uri, protocolData) {
  uri.parameters = { id: protocolData.id };

  return uri.toString();
}
//viewOff:helpers

//viewOn:exports
export { DetailView };
export default DetailView;
//viewOff:exports
