import { HandleProps, Handle as RFHandle } from "@xyflow/react";
import React from "react";

const Handle: React.FC<HandleProps> = (props) => {
  return (
    <RFHandle
      style={{
        width: 8,
        height: 8,
        background: "white",
        border: "2px solid black",
      }}
      {...props}
    />
  );
};

export default Handle;
