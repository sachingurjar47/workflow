import { NodeProps, Position } from "@xyflow/react";
import { Flex } from "antd";
import Text from "antd/es/typography/Text";
import React from "react";
import Handle from "./Handle";
import { PaymentInitialzedProps } from "../types/types";
import NodeResizeControl from "./NodeResizeControl";

const PaymentInitialzedNode: React.FC<NodeProps<PaymentInitialzedProps>> = ({
  data: { amount },
  selected,
}) => {
  return (
    <>
      {selected && <NodeResizeControl minWidth={160} minHeight={50} />}
      <Flex
        vertical
        style={{ border: "1px solid red", minWidth: "160px", height: "100%" }}
      >
        <Flex style={{ background: "red", paddingInline: "1rem" }}>
          <Text strong>Payment Initialzed</Text>
        </Flex>
        <Flex style={{ paddingInline: "1rem" }}>
          <Text>${amount}</Text>
        </Flex>
        <Handle type="source" position={Position.Right} />
      </Flex>
    </>
  );
};

export default PaymentInitialzedNode;
