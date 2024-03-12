import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../App.css";

const Grid = ({ rowData, columnDefs, onGridReady }) => {

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  return (
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      onGridReady={onGridReady}
      rowSelection="multiple"
      suppressRowClickSelection={true}
      pagination={true}
      paginationPageSize={50}
      paginationPageSizeSelector={[50, 100, 200, 500, 1000]}
    />
  );
};

export default Grid;
