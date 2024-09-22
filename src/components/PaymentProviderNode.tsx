import { CloseOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import Text from "antd/es/typography/Text";
import React from "react";
import Handle from "./Handle";
import { Position, useReactFlow } from "@xyflow/react";
import { PaymentProvider } from "../types/types";
import { Icons } from "./PaymentProviderSelect";
import NodeResizeControl from "./NodeResizeControl";
import Button from "./Button";
const controlStyle = {
  background: "transparent",
  border: "none",
};
const PaymentProviderNode: React.FC<PaymentProvider> = ({
  data: { label, key },
  selected,
  id,
}) => {
  const { setNodes } = useReactFlow();

  return (
    <>
      {selected && (
        <NodeResizeControl
          iconProps={{ style: { right: 0, bottom: 0, borderRadius: "25px" } }}
          style={controlStyle}
          minHeight={35}
          minWidth={200}
        />
      )}
      <Flex
        style={{
          border: "2px solid blue",
          borderRadius: "25px",
          minHeight: "30px",
          paddingInline: "1rem",
          minWidth: "160px",
          height: "100%",
          background: "white",
        }}
        align="center"
        gap={"1rem"}
      >
        <Flex>{Icons[key]}</Flex>
        <Flex flex={1}>
          <Text strong>{label}</Text>
        </Flex>
        <Flex>
          <Button
            title="Delete Payment Provider"
            aria-label="Delete Payment Provider"
            icon={<CloseOutlined />}
            size="small"
            danger
            type="text"
            onClick={() =>
              setNodes((prevNodes) =>
                prevNodes.filter((node) => node.id !== id)
              )
            }
          />
        </Flex>
        <Handle type="target" position={Position.Left} />
      </Flex>
    </>
  );
};

export default PaymentProviderNode;
