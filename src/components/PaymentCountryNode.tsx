import { Flex } from "antd";
import Text from "antd/es/typography/Text";
import React, { memo } from "react";
import Handle from "./Handle";
import ReactCountryFlag from "react-country-flag";
import { Position, NodeProps } from "@xyflow/react";
import { CountryProps } from "../types/types";
import NodeResizeControl from "./NodeResizeControl";

const PaymentCountryNode: React.FC<NodeProps<CountryProps>> = memo(
  ({ data: { country, countryCode, currency }, selected }) => {
    return (
      <Flex
        style={{
          border: "2px solid gray",
          height: "100%",
          borderRadius: "8px",
          paddingInline: "1rem",
          background: "#dddddd",
        }}
        align="center"
        gap="1rem"
      >
        <Flex>
          <ReactCountryFlag
            countryCode={countryCode}
            svg
            aria-label={country}
            style={{ fontSize: "3em", lineHeight: "2em" }}
          />
        </Flex>
        <Flex vertical>
          <Text strong>{country}</Text>
          <Text>{currency}</Text>
        </Flex>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
        {selected && <NodeResizeControl minHeight={50} minWidth={190} />}
      </Flex>
    );
  }
);

export default PaymentCountryNode;
