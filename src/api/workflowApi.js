// workflowApi.js

import ActionForm from "../components/ActionForm";

const sendWorkflowData = async (workflowData,actionBody) => {
  try {

    const formattedData = formatWorkflowData(workflowData,actionBody);
    console.log(JSON.stringify(formattedData, null, 2));
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body:(formattedData),
    };
    
    fetch('/prime/api/workflow/create', requestOptions)
      .then(response => {
        console.log(requestOptions);
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
        starttask: "task1",
        tasks: [
          {
          taskName: "task1" ,
          taskType: "event",
          nextTask: workflowData.edges
            .filter((edge) => edge.source === node.id)
            .reduce((acc, edge) => {
          acc[edge.sourceHandle] = workflowData.nodes.find((node) => node.id === edge.target)?.data.taskName;
            return acc;
            }, {}),
          },
        {
        taskName: "task2",
        taskType: "action",
          taskBody: {
            action: "SEND_EMAIL",
            actionBody: 
              {
                to: "goutham@ezynest.com",
                cc: "madhu@eazynest.com",
                bcc: "vamshi@ezynest.com",
                subject: "test email success",
                content: "condition is true"
              }
            
        }
        },
        {
        taskName: "task3",
        taskType:"action",
          taskBody: {
            action: "SEND_EMAIL",
            actionBody: 
              {
                to: "goutham@ezynest.com",
                cc: "madhu@eazynest.com",
                bcc: "vamshi@ezynest.com",
                subject: "test email success",
                content: "condition is flase"
              }
        }
      },
      {
        taskName: "task4",
        taskType: "condition",
          taskBody: {
            conditions: [
              {
                conditionName:"test1",
                clause:"CONTAINS",
                targetVariable:"email subject",
                targetValue:"goutham"
              }
            ]
        },
        nextTask:{
          "true":["task3"],
          "false":["task2"]
        }
      }
    ],
        user:"null",
        differentiator:"null",
      }
   ]
  }

  return formattedData;
};

export { sendWorkflowData };

