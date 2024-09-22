import React from "react";
import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  type OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
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
import { Flex, Upload, UploadProps } from "antd";
import AutoLayout from "./AutoLayout";
import { useAlert } from "../utils/useAlert";
import useUndoable from "use-undoable";
import Button from "./Button";
import {
  DownloadOutlined,
  RedoOutlined,
  SyncOutlined,
  UndoOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import SmoothStepEdge from "./SmoothStepEdge";
import { downloadJson } from "../utils/downloadJson";
import { readJsonFile } from "../utils/readJsonFile";
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
interface Data {
  edges: EdgeType[];
  nodes: Node[];
}
const edgeTypes = {
  customEdge: Edge,
  smoothStepEdge: SmoothStepEdge,
};
const key = "paymentInitialzedNode-and-paymentProviderNode-edge";
const localKey = "payment-workflow";
const { localNodes, localEdges } = JSON.parse(
  localStorage.getItem(localKey) ?? '{"localNodes":[],"localEdges":[]}'
);
interface WorkflowProps {}
const Workflow: React.FC<WorkflowProps> = () => {
  const [
    { edges, nodes },
    setElements,
    { undo, redo, reset, canRedo, canUndo },
  ] = useUndoable<Data>(
    {
      nodes: localNodes?.length ? localNodes : initialNodes,
      edges: localEdges,
    },
    { cloneState: true, historyLimit: "infinity" }
  );
  const alert = useAlert();
  const [isAutoLayout, setIsAutoLayout] = React.useState(false);
  const { setViewport } = useReactFlow();
  const triggerUpdate = useCallback(
    (t: "nodes" | "edges", v: Node[] | EdgeType[]) => {
      setElements((e) => ({
        nodes: t === "nodes" ? (v as Node[]) : e.nodes,
        edges: t === "edges" ? (v as EdgeType[]) : e.edges,
      }));
    },
    [setElements]
  );
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      console.log(changes);

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
      if (
        source?.type === "paymentInitialzedNode" &&
        target?.type !== "paymentProviderNode"
      ) {
        alert.open({
          key,
          type: "error",
          content:
            "Unable to connect to the Payment Initializer. Please ensure the Payment Initializer only connect payment provider try again!",
        });
        return;
      }
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
  const handleSave = () => {
    alert.open({
      key: "workflow-save",
      type: "success",
      content: "Workflow Saved Successfully!",
    });
    localStorage.setItem(
      localKey,
      JSON.stringify({ localNodes: nodes, localEdges: edges })
    );
  };
  const handleTransform = useCallback(() => {
    setViewport({ x: 10, y: 250, zoom: 1 }, { duration: 800 });
  }, [setViewport]);
  const handleAutoLayout = (value: boolean = false) => {
    setIsAutoLayout(value);
  };
  const onUploadChange: UploadProps["onChange"] = async (event) => {
    console.log(event);

    if (event.file) {
      const { edges = [], nodes = [] }: Data = await readJsonFile(
        event?.file?.originFileObj!
      );
      alert.open({
        key: "workflow-uploaded",
        type: "success",
        content: "Workflow Uploaded Successfully!",
      });
      setElements((e) => ({
        nodes,
        edges,
      }));
    }
  };
  const handleDownload = () => {
    alert.open({
      key: "workflow-download",
      type: "success",
      content: "Workflow Downloaded Successfully!",
    });
    downloadJson({ nodes, edges });
  };
  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes as any}
      nodeTypes={nodeTypes as any}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodesDraggable={!isAutoLayout}
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
        <AutoLayout
          handleAutoLayout={handleAutoLayout}
          isAutoLayout={isAutoLayout}
        />
        <Button title="Pan to center" onClick={handleTransform}>
          Pan to center
        </Button>
        <Button
          onClick={undo}
          title="Undo"
          disabled={!canUndo}
          icon={<UndoOutlined />}
        />
        <Button
          onClick={() => reset()}
          title="Reset to Initial State"
          icon={<SyncOutlined />}
        />
        <Button
          onClick={redo}
          disabled={!canRedo}
          title="Redo"
          icon={<RedoOutlined />}
        />
        <Button
          title="Download data as JSON"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
        />
        <Upload
          accept=".json,application/json"
          showUploadList={false}
          onChange={onUploadChange}
        >
          <Button icon={<UploadOutlined />} />
        </Upload>
        <Button onClick={handleSave} type="primary" title="Save">
          Save
        </Button>
      </Flex>
    </ReactFlow>
  );
};

export default Workflow;
