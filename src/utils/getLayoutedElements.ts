import { ConnectionLineType, Edge, Node } from "@xyflow/react";
import dagre from "dagre";
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 50;
type Direction = "LR" | "TB" | "BT" | "RL";
export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: Direction = "LR"
) => {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      position: {
        x: nodeWithPosition.x + nodeWidth / 2,
        y: nodeWithPosition.y + nodeHeight / 2,
      },
    };

    return newNode;
  });
  const newEdges = edges.map((edge) => ({
    ...edge,
    type: ConnectionLineType.SmoothStep,
  }));

  return { nodes: newNodes, edges: newEdges };
};
