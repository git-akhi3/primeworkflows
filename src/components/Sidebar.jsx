import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="dndnode event" onDragStart={(event) => onDragStart(event, 'event')} draggable>
        Event
      </div>
      <div className="dndnode condition" onDragStart={(event) => onDragStart(event, 'condition')} draggable>
        Condition
      </div>
      <div className="dndnode action" onDragStart={(event) => onDragStart(event, 'action')} draggable>
       Action
      </div>
    </aside>
  );
};
