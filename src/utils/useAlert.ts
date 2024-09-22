import { useContext } from "react";
import { MessageContext } from "./Alert/AlertContext";

export const useAlert = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a MessageProvider");
  }
  return context.messageApi;
};
