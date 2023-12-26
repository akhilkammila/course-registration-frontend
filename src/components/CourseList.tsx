// CourseList.tsx
import React, { useState } from 'react';
import './CourseList.css';

interface CourseRow {
  crn: string;
  notes: string;
  waitlist: boolean;
  open: boolean;
}

const CourseList: React.FC = () => {
  const [rows, setRows] = useState<CourseRow[]>([
    { crn: '', notes: '', waitlist: false, open: false },
  ]);

  const handleAddRow = () => {
    const newRow: CourseRow = { crn: '', notes: '', waitlist: false, open: false };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (index: number) => {
    const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(newRows);
  };

  const handleTextChange = (index: number, field: 'crn' | 'notes', value: string) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleCheckboxChange = (index: number, field: 'waitlist' | 'open', value: boolean) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSave = () => {
    // Implement your save logic here
    // For demonstration, we're just logging the current state to the console
    console.log('Saving rows:', rows);
    // If saving to server, you would make an API call here
  };

  return (
    <div className="course-list">
      {rows.map((row, index) => (
        <div key={index} className="row">
          <input
            type="text"
            placeholder="CRN"
            value={row.crn}
            onChange={(e) => handleTextChange(index, 'crn', e.target.value)}
          />
          <input
            type="text"
            placeholder="Notes"
            value={row.notes}
            onChange={(e) => handleTextChange(index, 'notes', e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={row.waitlist}
              onChange={(e) => handleCheckboxChange(index, 'waitlist', e.target.checked)}
            />
            Waitlist Notifications
          </label>
          <label>
            <input
              type="checkbox"
              checked={row.open}
              onChange={(e) => handleCheckboxChange(index, 'open', e.target.checked)}
            />
            Open Notifications
          </label>
          <button onClick={() => handleRemoveRow(index)} className="remove-row-button">
            Remove
          </button>
        </div>
      ))}
      <div className="row-controls">
        <button onClick={handleAddRow} className="add-row-button">Add Row</button>
        <button onClick={handleSave} className="save-button">Save</button>
      </div>
      
    </div>
  );
};

export default CourseList;
