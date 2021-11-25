import * as UU5 from "uu5g04";

export function onEvent(id, callback) {
  UU5.Environment.EventListener.registerEvent(id, UU5.Common.Tools.generateUUID(16), (data) => {
    // console.log(`event called ${id}`, data);
    callback(data);
  });
}

export function triggerEvent(id, data = {}) {
  // console.log(`event triggered ${id}`, data);
  UU5.Environment.EventListener.triggerEvent(id, data);
}
