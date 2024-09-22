import React, { createContext } from "react";
import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";

interface MessageContextProps {
  messageApi: MessageInstance;
}

export const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={{ messageApi }}>
      {children}
      {contextHolder}
    </MessageContext.Provider>
  );
};
