// CourseList.tsx
import React, { useState } from 'react';
import './CourseList.css';

interface CourseListProps {
  isSignedIn: boolean;
  accountName: string;
  apiBaseUrl: string;
}

interface CourseRow {
  crn: string;
  notes: string;
  notifications: boolean;
}

const CourseList: React.FC<CourseListProps> = ({isSignedIn, accountName, apiBaseUrl}) => {

  const [feedback, setFeedback] = useState('');

  const [rows, setRows] = useState<CourseRow[]>([
    { crn: '', notes: '', notifications: false },
  ]);

  const handleAddRow = () => {
    const newRow: CourseRow = { crn: '', notes: '', notifications: false };
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

  const handleCheckboxChange = (index: number, field: 'notifications', value: boolean) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSave = async() => {
    const filteredRows = rows.filter(row => row.crn.trim() !== '');
    console.log(filteredRows)

    // Post call to send rows to server
    try {
      const response = await fetch(`${apiBaseUrl}/update_classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountName, rows: filteredRows }),
      });
      const data = await response.json();
      setFeedback(data.message);
    } catch (error) {
      setFeedback('An error has occured.')
    }
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
              checked={row.notifications}
              onChange={(e) => handleCheckboxChange(index, 'notifications', e.target.checked)}
            />
            Notifications
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
      {feedback && <div className="courselist-feedback">{feedback}</div>}
      
    </div>
  );
};

export default CourseList;
