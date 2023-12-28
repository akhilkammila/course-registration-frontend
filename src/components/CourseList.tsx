// CourseList.tsx
import React, { useState } from 'react';
import './CourseList.css';

interface CourseListProps {
  isSignedIn: boolean;
  accountName: string;
}

interface CourseRow {
  crn: string;
  notes: string;
  waitlist: boolean;
  open: boolean;
}

const CourseList: React.FC<CourseListProps> = ({isSignedIn, accountName}) => {
  const apiBaseUrl = 'http://127.0.0.1:5000'

  const [feedback, setFeedback] = useState('');

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
      {feedback && <div className="courselist-feedback">{feedback}</div>}
      
    </div>
  );
};

export default CourseList;
