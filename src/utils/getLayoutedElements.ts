import { Edge, Node } from "@xyflow/react";
import dagre from "dagre";
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 50;
type Direction = "LR" | "TB" | "BT" | "RL";
export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  isAutoLayout: boolean = false,
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
        x: nodeWithPosition.x + nodeWidth,
        y: nodeWithPosition.y + nodeHeight,
      },
    };

    return newNode;
  });
  const newEdges = edges.map((edge) => ({
    ...edge,
    type: isAutoLayout ? "customEdge" : "smoothStepEdge",
  }));

  return { nodes: newNodes, edges: newEdges };
};
