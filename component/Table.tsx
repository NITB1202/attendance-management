import React from "react";

interface TableProps {
  tableHeader: (string | React.ReactNode)[];

  tableData: any[][];

  onRowClick?: (rowData: any[]) => void;
}

const Table = ({ tableHeader, tableData, onRowClick }: TableProps) => {
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
          style={styles.dataRow}
          onClick={() => onRowClick?.(row)}
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
    flex: 1,
    padding: "10px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    minWidth: 120,
  },
};

export default Table;
