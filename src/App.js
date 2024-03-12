import React, { useState, useEffect, useRef } from "react";
import Grid from "./components/gridComponent";
import ColumnToggle from "./components/toggleComponent";
import ExportButton from "./components/exportComponent";
import "./App.css";

function App() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    blockNumber: true,
    hash: true,
    to: true,
    value: true,
    gas: true,
    gasPrice: true,
    gasUsed: true,
    functionName: true,
  });

  console.log("columnVisibility", columnVisibility);
  const gridApiRef = useRef(null); // useRef allow us to access the api methods across different lifecycle methods and this is am using for unnecessary renders
  console.log("gridApiRef", gridApiRef);
  useEffect(() => {
    fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=0x6Fb447Ae94F5180254D436A693907a1f57696900&startblock=16689267&endblock=18982605&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        console.log(typeof data.result);
        setRowData(data.result);
        setColumnDefs([
          {
            headerName: "Block Number",
            field: "blockNumber",
            flex: 2,
            hide: !columnVisibility.blockNumber,
          },
          {
            headerName: "Hash",
            field: "hash",
            flex: 1,
            hide: !columnVisibility.hash,
          },
          {
            headerName: "To",
            field: "to",
            flex: 1,
            hide: !columnVisibility.to,
          },
          {
            headerName: "Value",
            field: "value",
            flex: 1,
            hide: !columnVisibility.value,
          },
          {
            headerName: "Gas",
            field: "gas",
            flex: 1,
            hide: !columnVisibility.gas,
          },
          {
            headerName: "Gas Price",
            field: "gasPrice",
            flex: 1,
            hide: !columnVisibility.gasPrice,
          },
          {
            headerName: "Gas Used",
            field: "gasUsed",
            flex: 1,
            hide: !columnVisibility.gasUsed,
          },
          {
            headerName: "Function Name",
            field: "functionName",
            flex: 1,
            hide: !columnVisibility.functionName,
          },
        ]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [columnVisibility]);

  const onGridReady = (params) => {
    console.log("params", params);
    gridApiRef.current = params.api;
  };

  const toggleColumnVisibility = (columnName) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));

    // Hide or show the column using the column API
    gridApiRef.current.setColumnVisible(
      columnName,
      columnVisibility[columnName]
    );
  };

  const exportToCsv = () => {
    gridApiRef.current.exportDataAsCsv();
  };

  return (
    <div className="app-container">
      <div className="export-button-container">
        <ExportButton onClick={exportToCsv} />
      </div>
      <div
        className="ag-theme-quartz"
        style={{ height: "500px", width: "100%" }}
      >
        <ColumnToggle
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
        />
        <Grid
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}

export default App;
