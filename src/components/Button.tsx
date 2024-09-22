import React from "react";
import {
  Button as AntButton,
  Tooltip,
  ButtonProps as AntButtonProps,
  TooltipProps,
} from "antd";
interface ButtonProps extends Omit<AntButtonProps, "title"> {
  title?: TooltipProps["title"];
  tooltipProps?: Omit<TooltipProps, "title">;
}
const Button: React.FC<ButtonProps> = ({
  title = "",
  tooltipProps,
  ...rest
}) => {
  return (
    <Tooltip {...tooltipProps} title={title}>
      <AntButton {...rest} />
    </Tooltip>
  );
};

export default Button;
