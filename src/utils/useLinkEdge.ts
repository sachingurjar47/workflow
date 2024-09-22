import { useEdges } from "@xyflow/react";
import React from "react";

export const useLinkEdge = (id: string): string[] => {
  const [edgeIds, setEdgeIds] = React.useState<string[]>([]);
  const edges = useEdges();

  const findEdgeIds = (
    id: string,
    key: "source" | "target",
    foundEdgeIds = new Set<string>()
  ): string[] => {
    edges.forEach((edge) => {
      if (edge[key] === id && !foundEdgeIds.has(edge.id)) {
        foundEdgeIds.add(edge.id);
        findEdgeIds(edge[key], key, foundEdgeIds);
      }
    });
    return Array.from(foundEdgeIds);
  };

  React.useEffect(() => {
    const sourceIds = findEdgeIds(id, "source");
    const targetIds = findEdgeIds(id, "target");

    setEdgeIds([...sourceIds, ...targetIds]);
  }, [id, edges]);

  return edgeIds;
};
