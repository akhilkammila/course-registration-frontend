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
        </div>
      ))}
      <button onClick={handleAddRow}>Add Row</button>
    </div>
  );
};

export default CourseList;
