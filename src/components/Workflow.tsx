import React from "react";
import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from "@xyflow/react";
import type { Connection, Edge as EdgeType, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import PaymentProviderSelect from "./PaymentProviderSelect";
import Edge from "./Edge";
import PaymentInitialzedNode from "./PaymentInitialzedNode";
import PaymentProviderNode from "./PaymentProviderNode";
import PaymentCountryNode from "./PaymentCountryNode";
import { Button, Flex, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
const nodeTypes = {
  paymentInitialzedNode: PaymentInitialzedNode,
  paymentCountryNode: PaymentCountryNode,
  paymentProviderNode: PaymentProviderNode,
};
export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { amount: 10 },
    type: "paymentInitialzedNode",
  },
  {
    id: "2",
    data: { currency: "$", country: "United States", countryCode: "US" },
    position: { x: 300, y: 20 },
    type: "paymentCountryNode",
  },
  {
    id: "3",
    data: { currency: "£", country: "England", countryCode: "GB" },
    position: { x: 300, y: 200 },
    type: "paymentCountryNode",
  },
  {
    id: "4",
    data: { label: "Google Pay", key: "google-pay" },
    position: { x: 550, y: -50 },
    type: "paymentProviderNode",
  },
  {
    id: "5",
    data: { label: "Stripe", key: "stripe" },
    position: { x: 550, y: 125 },
    type: "paymentProviderNode",
  },
  {
    id: "6",
    data: { label: "Apple Pay", key: "apple-pay" },
    position: { x: 550, y: 325 },
    type: "paymentProviderNode",
  },
];
const edgeTypes = {
  customEdge: Edge,
};
const Workflow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [title, setTitle] = React.useState("");
  const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeType>([]);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const source = nodes.find((item) => item.id === connection?.source);
      const target = nodes.find((item) => item.id === connection?.target);
      const edge: EdgeType = {
        ...connection,
        animated: true,
        id: `${source?.id}-${target?.id}`,
        type: "customEdge",
      };
      setEdges((prevEdges: EdgeType[]) =>
        addEdge(edge, prevEdges as EdgeType[])
      );
    },
    [edges]
  );
  return (
    <>
      <Flex
        align="center"
        style={{ padding: "1rem", background: "#dddddd" }}
        justify="space-between"
      >
        <FormItem label="WorkFlow Title">
          <Input value={title} onChange={(e) => setTitle(e?.target?.value)} />
        </FormItem>
        <Button type="primary">Save</Button>
      </Flex>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
        <PaymentProviderSelect />
      </ReactFlow>
    </>
  );
};

export default Workflow;
