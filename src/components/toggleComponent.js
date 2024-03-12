import React from "react";
import Button from "./buttonComponent";

const ColumnToggle = ({ columnVisibility, toggleColumnVisibility }) => {
  const columns = Object.keys(columnVisibility);

  return (
    <div className="button-container">
      {columns.map((column) => (
        <Button
          key={column}
          label={`${column} ${columnVisibility[column] ? "Hide" : "Show"}`}
          onClick={() => toggleColumnVisibility(column)}
          isActive={columnVisibility[column]}
        />
      ))}
    </div>
  );
};

export default ColumnToggle;
