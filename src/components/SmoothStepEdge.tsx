import { CloseOutlined } from "@ant-design/icons";
import {
  SmoothStepEdge as RFSmoothStepEdge,
  EdgeLabelRenderer,
  SimpleBezierEdgeProps,
  getBezierPath,
  useEdges,
  useNodes,
  useReactFlow,
} from "@xyflow/react";
import React, { useEffect } from "react";
import Button from "./Button";
import { getLinkEdge } from "../utils/getLinkEdge";

const SmoothStepEdge: React.FC<SimpleBezierEdgeProps> = (props) => {
  const { id } = props;
  const { setEdges } = useReactFlow();
  const nodes = useNodes();
  const edges = useEdges();
  const [edgePath, labelX, labelY] = getBezierPath(props);
  const selectedNode = nodes.find((node) => node.selected);

  useEffect(() => {
    const linkIds = getLinkEdge(selectedNode?.id!, edges);
    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        const isLinked = linkIds.includes(edge.id);
        return {
          ...edge,
          animated: isLinked ? !selectedNode?.selected : true,
          style: isLinked && selectedNode?.selected ? { stroke: "red" } : {},
        };
      })
    );
  }, [selectedNode]);

  return (
    <>
      <RFSmoothStepEdge {...props} />
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

export default SmoothStepEdge;
