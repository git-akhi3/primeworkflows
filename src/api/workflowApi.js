// workflowApi.js

import axios from 'axios';

const sendWorkflowData = async (workflowData) => {
  try {

    const formattedData = formatWorkflowData(workflowData);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // or specify the origin of your frontend application
      },
      body: JSON.stringify(formattedData),
    };
    
    fetch('http://localhost:8080/prime/workflow/api/events/all', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful response
        console.log(data);
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
    // await axios.post('http://localhost:8080/prime/workflow/api/events/all', formattedData);


    return 'Workflow data sent successfully!';
  } catch (error) {
    
    console.error('Error sending workflow data:', error);
    throw new Error('Error sending workflow data. Please try again later.');
  }
};

//
const formatWorkflowData = (workflowData) => {
  const formattedData = {
    workflowId: workflowData.id,
    nodes: workflowData.nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    })),
    edges: workflowData.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      data: edge.data,
    })),
  };

  return formattedData;
};

export { sendWorkflowData };

