import React, { useState } from 'react';

const ActionForm = ({ updateNodeData }) => {
  const [selectedActionType, setSelectedActionType] = useState('');
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [actionBody, setActionBody] = useState(null);

const handleActionTypeChange = (e) => {
    setSelectedActionType(e.target.value); 
  };


  const handleActionSubmit = (e) => {
    e.preventDefault();
    const actionBody = {
      to: to,
      cc: cc,
      bcc: bcc,
      subject: subject,
      content: content
    };
    setActionBody(actionBody); 

    const label = ` Action: ${selectedActionType}, To: ${actionBody.to}, Subject: ${actionBody.subject}`;
    console.log("Action Body:", label);
    updateNodeData(selectedActionType,label);
    
  };

  return (
    <form onSubmit={handleActionSubmit}>
      <h3>Action Types</h3>
      <select value={selectedActionType} onChange={handleActionTypeChange}>
        <option value="">Select Action Type</option>
        <option value="SEND_EMAIL">Send Email</option>
        {/* Add other action types here */}
      </select>
      {selectedActionType === 'SEND_EMAIL' && (
        <div>
          <h3>Action Body</h3>
          <label>To:</label>
          <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
            <br />
          <label>Cc:</label>
          <input type="text" value={cc} onChange={(e) => setCc(e.target.value)} />
          <br />
          <label>Bcc:</label>
          <input type="text" value={bcc} onChange={(e) => setBcc(e.target.value)} />
          <br />
          <label>Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <br />
          <label>Content:</label>
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ActionForm;
