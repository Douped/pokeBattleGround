import { useState, useEffect } from "react";
import { wait } from "../helpers/gameLogic";

export const useTypedMessage = (message) => {
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    setTypedMessage("");
    if (message.length) {
      (async () => {
        let visiableMessage = "";

        for (let i = 0; i < message.length; i++) {
          await wait(25);
          visiableMessage = visiableMessage + message[i];
          setTypedMessage(visiableMessage);
        }
      })();
    }
  }, [message]);

  return typedMessage;
};
