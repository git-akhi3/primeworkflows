import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import EventForm from './EventForm';

import Sidebar from './Sidebar';

import '../styles/Flow.css';
import { sendWorkflowData } from '../api/workflowApi';

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
  const [nodes, setNodes,onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges,onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [show, setShow] = useState(false);
  const [lastNodeId, setLastNodeId] = useState(null);

  const handleClose = () => setShow(false);

  useEffect(() => {
    // Set initial nodes
    setNodes(initialNodes);
  }, []);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY - 40,
      });
      const newNodeId = getId();
      const newNode = {
        id: newNodeId,
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((ns) => ns.concat(newNode));
      setLastNodeId(newNodeId);
      setShow(true);
      },
    [reactFlowInstance,setShow]
  );
  const updateNodeData = useCallback((eventData) => {

    const updatedNodes = nodes.map(node => {
      if (node.id === lastNodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            label: `${eventData.type}: ${eventData.name}`
          }
        };
      }
      return node;
    });
  
    setNodes(updatedNodes);
    handleClose();
  }, [nodes, lastNodeId, handleClose]);

  const handleSaveWorkflow = () => {
    
    const workflowData = {
      nodes: nodes,
      edges: edges,
      
    };

    
    sendWorkflowData(workflowData)
      .then((response) => {
        console.log(response); 
        
      })
      .catch((error) => {
        console.error('Error saving workflow data:', error); 
        
      });
  };


  return (
    <div className="dndflow">
      
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header >
        <div className="offcanvasheader">
        <Offcanvas.Title><h1>Events</h1></Offcanvas.Title>
        <Button variant="secondary" onClick={handleClose}>X</Button>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <div>
        <EventForm  updateNodeData={updateNodeData}/>
        <button onClick={handleSaveWorkflow}>save workflow</button>

        </div>
      </Offcanvas.Body>
    </Offcanvas>

      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            elements={nodes.concat(edges)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onLoad={setReactFlowInstance}
            fitView
          >
            <Controls />
            <Background/>
          </ReactFlow>
        </div>
        <Sidebar />
      
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;