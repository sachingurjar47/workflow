import { NodeProps, Position, useEdges, useReactFlow } from "@xyflow/react";
import { Flex } from "antd";
import Text from "antd/es/typography/Text";
import React, { memo, useEffect } from "react";
import Handle from "./Handle";
import { PaymentInitialzedProps } from "../types/types";
import NodeResizeControl from "./NodeResizeControl";
import { getLinkEdge } from "../utils/getLinkEdge";

const PaymentInitialzedNode: React.FC<NodeProps<PaymentInitialzedProps>> = memo(
  ({ data: { amount }, selected, id }) => {
    const edges = useEdges();
    const { setEdges } = useReactFlow();

    useEffect(() => {
      const linkIds = getLinkEdge(id, edges);
      setEdges((prev) => {
        const newEdges = prev.map((item) => {
          if (linkIds.includes(item.id)) {
            return {
              ...item,
              animated: !selected,
              style: selected ? { stroke: "red" } : {},
            };
          }
          return item;
        });
        return newEdges;
      });
    }, [selected]);
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
  }
);

export default PaymentInitialzedNode;
