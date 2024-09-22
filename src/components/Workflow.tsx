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
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import type {
  Connection,
  Edge as EdgeType,
  Node,
  OnEdgesChange,
  OnNodesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import PaymentProviderSelect from "./PaymentProviderSelect";
import Edge from "./Edge";
import PaymentInitialzedNode from "./PaymentInitialzedNode";
import PaymentProviderNode from "./PaymentProviderNode";
import PaymentCountryNode from "./PaymentCountryNode";
import { Flex, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import AutoLayout from "./AutoLayout";
import { useAlert } from "../utils/useAlert";
import useUndoable from "use-undoable";
import Button from "./Button";
import { RedoOutlined, SyncOutlined, UndoOutlined } from "@ant-design/icons";
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
const key = "paymentInitialzedNode-and-paymentProviderNode-edge";
const Workflow = () => {
  const [
    { edges, nodes },
    setElements,
    { undo, redo, reset, canRedo, canUndo },
  ] = useUndoable<{
    edges: EdgeType[];
    nodes: Node[];
  }>({
    nodes: initialNodes,
    edges: [],
  });
  const [title, setTitle] = React.useState("");
  const alert = useAlert();
  const triggerUpdate = useCallback(
    (t: "nodes" | "edges", v: Node[] | EdgeType[]) => {
      setElements((e) => ({
        nodes: t === "nodes" ? (v as Node[]) : e.nodes,
        edges: t === "edges" ? (v as EdgeType[]) : e.edges,
      }));
    },
    [setElements]
  );
  console.log(nodes);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      triggerUpdate("nodes", applyNodeChanges(changes, nodes));
    },
    [triggerUpdate, nodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      triggerUpdate("edges", applyEdgeChanges(changes, edges));
    },
    [triggerUpdate, edges]
  );
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const source = nodes.find((item) => item.id === connection?.source);
      const target = nodes.find((item) => item.id === connection?.target);
      // if (
      //   source?.type === "paymentInitialzedNode" &&
      //   target?.type !== "paymentProviderNode"
      // ) {
      //   alert.open({
      //     key,
      //     type: "error",
      //     content:
      //       "Unable to connect to the Payment Initializer. Please ensure the Payment Initializer only connect payment provider try again!",
      //   });
      //   return;
      // }
      const edge: EdgeType = {
        ...connection,
        animated: true,
        id: `${source?.id}-${target?.id}`,
        type: "customEdge",
      };
      triggerUpdate("edges", addEdge(edge, edges));
    },
    [triggerUpdate, edges]
  );
  console.log({ canRedo, canUndo });

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
        <Button type="primary" title="Save">
          Save
        </Button>
      </Flex>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes as any}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
        <Flex
          style={{
            position: "absolute",
            zIndex: 4,
            width: "100%",
            padding: "1rem",
          }}
          justify="center"
          align="center"
          gap="1rem"
        >
          <PaymentProviderSelect />
          <AutoLayout />
          <Button onClick={() => undo()} title="Undo" icon={<UndoOutlined />} />
          <Button
            onClick={() => reset()}
            title="Reset to Initial State"
            icon={<SyncOutlined />}
          />
          <Button onClick={() => redo()} title="Redo" icon={<RedoOutlined />} />
        </Flex>
      </ReactFlow>
    </>
  );
};

export default Workflow;
