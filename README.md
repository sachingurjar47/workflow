![](https://github.com/xyflow/web/blob/main/assets/codesandbox-header-ts.png?raw=true)

# Payment Workflow Editor

## Description

This project is a payment workflow editor built using Node.js (v18), React (v18) with Vite, and styled with Ant Design. It allows users to visually manage payment providers and workflows, implementing features such as drag-and-drop functionality, undo/redo capabilities, and automatic node layout using Dagre.

## Features

- **Add Payment Providers**: Users can add unique payment provider nodes (e.g., Google Pay, Stripe, Apple Pay) from a dropdown list.
- **Delete Nodes**: Each payment provider node includes a delete button for easy removal.
- **Drag and Drop**: Users can drag and reposition nodes in real-time.
- **Node Resizing**: Nodes can be resized for better customization. When a node is selected, users can click and drag the edges or corners to resize it, allowing for both vertical and horizontal adjustments.
- **Node Connection Validation**: Validates connections between nodes, ensuring logical links. If a connection is invalid, a tooltip is displayed with an error message.
- **Undo/Redo Functionality**: Allows users to revert or redo recent actions on nodes. For this, I used the `use-undoable` hook to implement this feature.
- **Save and Load Workflow**: Workflows can be saved to and loaded from local storage.
- **Validation**: Prevents adding duplicate payment provider nodes and provides error messages when duplicates are attempted.
- **Auto Layout**: Automatically arranges nodes to avoid overlap and clutter using Dagre, which is a recommended library by React Flow.

### Bonus Features

- **Export/Import**: Functionality to export workflows as JSON files and re-import them.
- **Zoom and Pan**: Users can zoom in/out and pan across the canvas for managing larger workflows.
- **Highlight Connected Nodes**: Selecting a node highlights all connected nodes and edges. For this, I created a reusable Edge component that retrieves all the links for the selected node and changes their color accordingly.

## Setup Instructions

**Clone the repository**:

```bash
git clone https://github.com/sachingurjar47/workflow.git
cd workflow
```

Install Dependencies:

```bash
npm install
```

You can start a development server with:

```bash
npm run dev
```

While the development server is running, changes you make to the code will be
automatically reflected in the browser!

## Resources

Links:

- [React Flow - Docs](https://reactflow.dev)
- [Dagrejs - Docs](https://github.com/dagrejs/dagre/wiki)
