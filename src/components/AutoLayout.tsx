import React from "react";
import { ApartmentOutlined } from "@ant-design/icons";
import { useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { getLayoutedElements } from "../utils/getLayoutedElements";
import Button from "./Button";
interface AutoLayoutProps {
  isAutoLayout?: boolean;
  handleAutoLayout?: (value: boolean) => void;
}
const AutoLayout: React.FC<AutoLayoutProps> = ({
  handleAutoLayout,
  isAutoLayout = false,
}) => {
  const { setEdges, setNodes } = useReactFlow();
  const oldNodes = useNodes();
  const oldEdges = useEdges();
  const handleClick = () => {
    const { edges, nodes } = getLayoutedElements(
      oldNodes,
      oldEdges,
      isAutoLayout
    );
    setNodes(nodes);
    setEdges(edges);
    handleAutoLayout?.(!isAutoLayout);
  };
  return (
    <Button
      title="Auto Layout"
      onClick={handleClick}
      icon={<ApartmentOutlined />}
      type={isAutoLayout ? "primary" : "default"}
    >
      Auto Layout
    </Button>
  );
};

export default AutoLayout;
