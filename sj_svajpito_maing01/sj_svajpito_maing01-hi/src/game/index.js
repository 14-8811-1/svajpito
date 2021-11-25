import "phaser";
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useEffect, useRef } from "uu5g04-hooks";

import MainScene from "./scenes/main-scene";
import OpeningScene from "./scenes/opening-scene";

import Config from "./config/config.js";

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Game",
  //@@viewOff:statics
};

export const Game = UU5.Common.Component.memo(
  createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:hooks
      let config = useRef();

      useEffect(() => {
        config.current = {
          type: Phaser.AUTO,
          width: 900,
          height: 600,
          physics: {
            default: "arcade",
            arcade: {
              gravity: { y: 1500 },
              debug: false,
            },
          },
          scale: {
            parent: "game-container",
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
          },
          scene: [MainScene, OpeningScene],
        };
        new Phaser.Game(config.current);
      }, []);
      //@@viewOff:hooks

      //@@viewOn:private
      //@@viewOff:private
      //@@viewOn:interface
      //@@viewOff:interface

      //@@viewOn:render
      const attrs = UU5.Common.VisualComponent.getAttrs(props);
      return (
        <div {...attrs}>
          <div id="phaser-game" />
        </div>
      );
      //@@viewOff:render
    },
  }),
  () => false
);

export default Game;
