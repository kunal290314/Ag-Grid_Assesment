import React from "react";

const ExportButton = ({ onClick }) => {
  return (
    <button
      style={{
        backgroundColor: "#86d17f",
        borderRadius: "5px",
        marginRight: "20px",
        borderColor: "#86d17f",
        cursor: "pointer",
        marginTop: "20px",
      }}
      onClick={onClick}
    >
      Export to CSV
    </button>
  );
};

export default ExportButton;
