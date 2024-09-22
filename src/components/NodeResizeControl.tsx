import React from "react";
import {
  ResizeControlProps as RFResizeControlProps,
  NodeResizeControl as RFNodeResizeControl,
} from "@xyflow/react";

import { ArrowsAltOutlined } from "@ant-design/icons";
import { IconBaseProps } from "@ant-design/icons/lib/components/Icon";
const controlStyle = {
  background: "transparent",
  border: "none",
};
export interface ResizeControlProps extends RFResizeControlProps {
  iconProps?: Omit<IconBaseProps, "ref">;
}
const NodeResizeControl: React.FC<ResizeControlProps> = ({
  iconProps,
  ...rest
}) => {
  return (
    <RFNodeResizeControl style={controlStyle} {...rest}>
      <ArrowsAltOutlined
        rotate={90}
        {...iconProps}
        style={{
          position: "absolute",
          right: 5,
          bottom: 5,
          fontSize: "small",
          color: "red",
          ...iconProps?.style,
        }}
      />
    </RFNodeResizeControl>
  );
};

export default NodeResizeControl;
