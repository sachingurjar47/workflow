import { Edge } from "@xyflow/react";
export const getLinkEdge = (id: string, edges: Edge[] = []): string[] => {
  const findEdgeIds = (
    id: string,
    key: "source" | "target",
    foundEdgeIds = new Set<string>()
  ): string[] => {
    edges.forEach((edge) => {
      if (edge[key] === id && !foundEdgeIds.has(edge.id)) {
        foundEdgeIds.add(edge.id);
        findEdgeIds(
          edge[key === "source" ? "target" : "source"],
          key,
          foundEdgeIds
        );
      }
    });
    return Array.from(foundEdgeIds);
  };

  const targetIds = findEdgeIds(id, "target");
  const sourceIds = findEdgeIds(id, "source");

  return [...sourceIds, ...targetIds];
};
