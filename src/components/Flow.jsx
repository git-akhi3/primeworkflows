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
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import EventForm from './EventForm';
import ConditionForm from './ConditionForm';
import ActionForm  from './ActionForm';

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
const getId = () => `${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes,onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges,onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [lastNodeId, setLastNodeId] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showActionForm, setShowActionForm] = useState(false);
  const [showConditionForm, setShowConditionForm] = useState(false);
  const handleCloseEventForm = () => setShowEventForm(false);
  const handleCloseActionForm = () => setShowActionForm(false);
  const handleCloseConditionForm = () => setShowConditionForm(false);
  const [isSaveWorkflowClicked, setIsSaveWorkflowClicked] = useState(false);
  const [workflowName, setWorkflowName] = useState('');


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
      if (type === 'event') {
        setShowEventForm(true);
      } else if (type === 'action') {
        setShowActionForm(true);
      } else if (type === 'condition') {
        setShowConditionForm(true);
      }
      const position = reactFlowInstance.project({
        x: event.clientX ,
        y: event.clientY,
      });
      const newNodeId = getId();
      const newNode = {
        id: newNodeId,
        type,
        position,
        data: { label: `${type} `,
        taskName: `Node ${lastNodeId + 1}`
      },
      };
      setNodes((ns) => ns.concat(newNode));
      setLastNodeId(newNodeId);
    },
    [reactFlowInstance]
  );
  const updateNodeData = useCallback(( nodeType, label) => {
    console.log("Updating node data with label:", label);
    const updatedNodes = nodes.map(node => {
      if (node.id === lastNodeId ) {
        return {
          ...node,
          data: {
            ...node.data,
            label: label
          }
        };
      }
      return node;
    });
    setNodes(updatedNodes);
  }, [nodes, lastNodeId]);

  
  const [actionBody, setActionBody] = useState(null);
  const handleActionSubmit = (actionData) => {
    setActionBody(actionData);
  };
  const handleSaveWorkflow = () => {
    const workflowData = {
      nodes: nodes,
      edges: edges,
      actionBody: actionBody
    };
    setIsSaveWorkflowClicked(true);
    sendWorkflowData(workflowData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error saving workflow data:', error);
      });
  };
  const handleWorkflowNameChange = (e) => {
    setWorkflowName(e.target.value);
  };

  return (
    <div className="dndflow">
      
    <Offcanvas show={showEventForm} onHide={handleCloseEventForm}>
      <Offcanvas.Header >
        <div className="offcanvasheader">
        <Offcanvas.Title><h1>Events</h1></Offcanvas.Title>
        <Button variant="secondary" onClick={handleCloseEventForm}>X</Button>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <div>
        <EventForm updateNodeData={updateNodeData}/>
        </div>
      </Offcanvas.Body>
    </Offcanvas>


    <Offcanvas show={showConditionForm} onHide={handleCloseConditionForm}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Condition Form</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
          <ConditionForm onSubmit={(data) => { setConditionFormData(data); handleCloseConditionForm(); }} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>

    <Offcanvas show={showActionForm} onHide={handleCloseActionForm}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Action Form</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ActionForm onSubmit={handleActionSubmit} updateNodeData={updateNodeData} setActionBody={setActionBody} />
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
            <Panel>
            <button onClick={handleSaveWorkflow}>save workflow</button>
            {isSaveWorkflowClicked && (
          <div>
          <input
            type="text"
            placeholder="Workflow Name"
            value={workflowName}
            onChange={handleWorkflowNameChange}
          />
        </div>
      )}
            </Panel>
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