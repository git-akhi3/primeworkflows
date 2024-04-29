import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel
} from 'reactflow';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'react-bootstrap';
import 'reactflow/dist/style.css';
import EventForm from './EventForm';

import Sidebar from './Sidebar';

import '../styles/Flow.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'START'},
    position: { x: 250, y: 5 }
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      setShow(true);
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
        sourcePosition: 'right',
        targetPosition: 'left',
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );
  

  return (
    <div className="dndflow">
      
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header >
        <div className="offcanvasheader">
        <Offcanvas.Title><h1>Events</h1></Offcanvas.Title>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
       <div>
        <EventForm/>
        </div>
      </Offcanvas.Body>
    </Offcanvas>

      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background/>
  
          </ReactFlow>
        </div>
        <Sidebar />
         <SaveRestore />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;

const SaveRestore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setViewport]);

  return (
    <div>
    <ReactFlow
    onInit={setRfInstance}
    >
    <Panel position="top-right">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
        <button onClick={onAdd}>add node</button>
      </Panel>
    </ReactFlow>
    </div>
  );
};