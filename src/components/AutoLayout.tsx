import React from "react";
import { ApartmentOutlined } from "@ant-design/icons";
import { useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { getLayoutedElements } from "../utils/getLayoutedElements";
import Button from "./Button";

const AutoLayout = () => {
  const { setEdges, setNodes } = useReactFlow();
  const oldNodes = useNodes();
  const oldEdges = useEdges();
  const handleClick = () => {
    const { edges, nodes } = getLayoutedElements(oldNodes, oldEdges);
    setNodes(nodes);
    setEdges(edges);
  };
  return (
    <Button
      title="Auto Layout"
      onClick={handleClick}
      icon={<ApartmentOutlined />}
    >
      Auto Layout
    </Button>
  );
};

export default AutoLayout;
