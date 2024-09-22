import { CloseOutlined } from "@ant-design/icons";
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useNodes,
  useReactFlow,
} from "@xyflow/react";
import React from "react";
import Button from "./Button";

const Edge: React.FC<EdgeProps> = (props) => {
  const { id } = props;
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath(props);
  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <Button
          title="Delete Edge"
          aria-label="delete-edge"
          icon={<CloseOutlined />}
          danger
          type="text"
          size="small"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            position: "absolute",
            pointerEvents: "all",
          }}
          onClick={() =>
            setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id))
          }
        />
      </EdgeLabelRenderer>
    </>
  );
};
export default Edge;
