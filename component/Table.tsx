import React, { useState } from "react";

interface TableProps {
  tableHeader: any[];

  tableData: any[][];

  onRowClick?: (rowData: any[]) => void;
}

const Table = ({ tableHeader, tableData, onRowClick }: TableProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSelectRow = (row: any[], index: number) => {
    if(onRowClick){
      setSelectedIndex(index);
      onRowClick(row);
    }  
  }

  return (
    <div style={styles.container}>
      {/* Table Header */}
      <div style={styles.headerRow}>
        {tableHeader.map((header, index) => (
          <div key={index} style={styles.headerCell}>
            {header}
          </div>
        ))}
      </div>
      {/* Table Data */}
      {tableData.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={selectedIndex === rowIndex? {...styles.dataRow, border: "3px solid #00B01A"} : styles.dataRow}
          onClick={() => handleSelectRow(row, rowIndex)}
        >
          {tableHeader.map((_, cellIndex) => (
            <div key={cellIndex} style={styles.dataCell}>
              {row[cellIndex] !== undefined ? row[cellIndex] : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "100%",
    minWidth: "fit-content",
    marginTop: "20px",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#6A9AB0",
  },
  headerCell: {
    display: "flex",
    flex: 1,
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontWeight: 700,
    minWidth: 120,
  },
  dataRow: {
    display: "flex",
    flexDirection: "row",
  },
  dataCell: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    minWidth: 120,
  },
};

export default Table;
