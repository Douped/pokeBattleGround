import React from "react";
import { useTypedMessage } from "../../hooks/useTypedmessage";

const BattleAnnouncer = ({ message }) => {
  // const typedMessage = useTypedMessage(message);

  return (
    <div className="flex flex-wrap flex-row gap-3 justify-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
      <h1>
        {/* <strong>{typedMessage}</strong> */}
      </h1>
    </div>
  );
};

export default BattleAnnouncer;
