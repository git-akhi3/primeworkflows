// workflowApi.js

import ActionForm from "../components/ActionForm";

const sendWorkflowData = async (workflowData,actionBody) => {
  try {

    const formattedData = formatWorkflowData(workflowData,actionBody);
    console.log('Formatted data:', JSON.stringify(formattedData, null, 2));
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(formattedData),
    };
    
    fetch('/prime/api/workflow/create', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });


    return 'Workflow data sent successfully!';
  } catch (error) {
    
    console.error('Error sending workflow data:', error);
    throw new Error('Error sending workflow data. Please try again later.');
  }
};

//
const formatWorkflowData = (workflowData,actionBody) => {
  const tasks = workflowData.nodes.map((node) => {
    return {
      taskName: node.data.taskName,
      taskType: node.type,
      nextTask: workflowData.edges
        .filter((edge) => edge.source === node.id)
        .reduce((acc, edge) => {
          acc[edge.sourceHandle] = workflowData.nodes.find((node) => node.id === edge.target)?.data.taskName;
          return acc;
        }, {}),
          
    };
  });
  const formattedData = {
   workflows: [
      {
        id: workflowData.nodes[0]?.id,
        workflowId: "123",
        workflowName: "Test Workflow",
        starttask: workflowData.nodes[0]?.data.taskName,
        tasks: [
          { taskName: "Task 1" },
          {taskType: workflowData.taskType},
          { nextTask: workflowData.edges
            .filter((edge) => edge.source === node.id)
            .reduce((acc, edge) => {
              acc[edge.sourceHandle] = workflowData.nodes.find((node) => node.id === edge.target)?.data.taskName;
              return acc;
            }, {}),
          },
        ],
        taskName: workflowData.taskName,
        taskType: workflowData.taskType,
          taskBody: {
            action: ActionForm.selectedActionType,
            actionBody: [
              {
                to: ActionForm.to,
                cc: ActionForm.cc,
                bcc: ActionForm.bcc,
                subject: ActionForm.subject,
                content: ActionForm.content
              },
            ],
        },
        taskName: workflowData.taskName,
        taskType: workflowData.taskType,
          taskBody: {
            action: ActionForm.selectedActionType,
            actionBody: [
              {
                to: ActionForm.to,
                cc: ActionForm.cc,
                bcc: ActionForm.bcc,
                subject: ActionForm.subject,
                content: ActionForm.content
              },
            ],
        },
        taskName: workflowData.taskName,
        taskType: workflowData.taskType,
          taskBody: {
            conditions: [
              {
                conditionName:"test1",
                clause:"CONTAINS",
                targetVariable:"email subject",
                targetValue:"goutham"
              },
            ],
        },
      },
    ],
  };

  return formattedData;
};

export { sendWorkflowData };