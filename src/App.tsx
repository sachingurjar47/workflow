import Workflow from "./components/Workflow";
import { MessageProvider } from "./utils/Alert/AlertContext";

export default function App() {
  return (
    <MessageProvider>
      <Workflow />
    </MessageProvider>
  );
}
