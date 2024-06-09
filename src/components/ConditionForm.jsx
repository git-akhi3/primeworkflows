import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ConditionForm = ({ onSubmit }) => {
  const [clause, setClause] = useState('');
  const [value, setValue] = useState(new Date());
  const [field, setField] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(clause, value);
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1>Condtions</h1>
        <div>
        <h3>Field</h3>
        <select value={field} onChange={(e) => setField(e.target.value)}>
        <option value="">Select Field</option>
        <option value="user">User</option>
        <option value="ticker">Ticker</option>
        </select>
        </div>
      <h3>Clause</h3>
      <select value={clause} onChange={(e) => setClause(e.target.value)}>
        <option value="">Select Clause</option>
        <option value="is">Is</option>
        <option value="is_not">Is Not</option>
        <option value="contains">Contains</option>
        <option value="greater_than">Greater Than</option>
        <option value="less_than">Less Than</option>
      </select>
      {clause && (
        <div>
          <h3>Value</h3>
          {clause === 'contains' ? (
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          ) : clause === 'greater_than' || clause === 'less_than' ? (
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          ) : (
            <DatePicker selected={value} onChange={(date) => setValue(date)} style={{ width: '100%', height: '40px', fontSize: '16px' }} />
          )}
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ConditionForm;
