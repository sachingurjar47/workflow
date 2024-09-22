import React from "react";
import { Dropdown, MenuProps, Space } from "antd";
import GoogleIcon from "../assets/icons/GoogleIcon";
import AppleIcon from "../assets/icons/AppleIcon";
import PaypalIcon from "../assets/icons/PaypalIcon";
import AmazonIcon from "../assets/icons/AmazonIcon";
import StripeIcon from "../assets/icons/StripeIcon";
import { useNodes, useReactFlow } from "@xyflow/react";
import { useAlert } from "../utils/useAlert";
import { DownOutlined } from "@ant-design/icons";
import Button from "./Button";
export const Icons: Record<string, React.ReactNode> = {
  stripe: <StripeIcon />,
  "google-pay": <GoogleIcon />,
  "apple-pay": <AppleIcon />,
  paypal: <PaypalIcon />,
  "amazon-pay": <AmazonIcon />,
};

const keyAlert = "add-payment-provider";
const items = [
  { label: "Stripe", key: "stripe", icon: <StripeIcon /> },
  { label: "Google Pay", key: "google-pay", icon: <GoogleIcon /> },
  { label: "Apple Pay", key: "apple-pay", icon: <AppleIcon /> },
  { label: "Paypal", key: "paypal", icon: <PaypalIcon /> },
  { label: "Amazon Pay", key: "amazon-pay", icon: <AmazonIcon /> },
];
const PaymentProviderSelect = () => {
  const { setNodes } = useReactFlow();
  const alert = useAlert();
  const nodes = useNodes();

  const lastNode = nodes?.[nodes.length - 1];
  const onClick: MenuProps["onClick"] = ({ key }) => {
    const alreadyExists = nodes
      ?.map((item) => item?.data)
      ?.some((item) => item?.key === key);
    if (alreadyExists) {
      alert.open({
        key: keyAlert,
        type: "error",
        content: "Payment Provider already exists!",
      });
      return;
    }
    const data = items.find((item) => item?.key === key);
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `${nodes?.length + 1}`,
        type: "paymentProviderNode",
        position: {
          x: lastNode.position.x ?? 0,
          y: lastNode.position.y + (lastNode?.measured?.height ?? 0) + 20,
        },
        data: {
          label: data?.label,
          key: data?.key,
        },
      },
    ]);
  };
  return (
    <Dropdown trigger={["click"]} menu={{ items, onClick }}>
      <Button
        style={{
          maxWidth: "350px",
          width: "100%",
          background: "lightgray",
          height: "40px",
          borderRadius: "1rem",
        }}
        title="Add Payment Provider"
      >
        <Space>
          Add Payment Provider
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default PaymentProviderSelect;
