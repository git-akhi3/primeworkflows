import React, { useState, useCallback } from 'react';
import ReactFlow, {
  useReactFlow,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
const flowKey = 'example-flow';
const SaveRestore = () => {
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setViewport]);
  return (
    <ReactFlow
      onInit={setRfInstance}
    >
      <Panel position="top-right">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
      </Panel>
    </ReactFlow>
  );
};

export default SaveRestore;