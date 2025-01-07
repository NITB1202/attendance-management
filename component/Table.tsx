import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CheckBox from "./CheckBox";

interface TableProps {
  tableHeader: any[];
  tableData: any[][];
  itemsPerPage?: number;
  onRowClick?: (rowData: any[]) => void;
  onSelectedRowsChange?: (selectedRows: any[][]) => void;
  showHeaderCheckbox?: boolean;
}

const Table = ({
  tableHeader,
  tableData,
  itemsPerPage = 5,
  onRowClick,
  onSelectedRowsChange,
  showHeaderCheckbox = false,
}: TableProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);

  const totalPages = Math.max(1, Math.ceil(tableData.length / itemsPerPage));

  const handleSelectRow = (row: any[], index: number) => {
    if (onRowClick) {
      setSelectedIndex(index);
      onRowClick(row);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, tableData.length);

    const isPageFullySelected = Array.from({
      length: endIndex - startIndex,
    }).every((_, i) => selectedRows.has(startIndex + i));

    setIsHeaderChecked(isPageFullySelected);
  };

  const handleRowCheckboxClick = (index: number, isChecked: boolean) => {
    const updatedSelectedRows = new Set(selectedRows);
    if (isChecked) {
      updatedSelectedRows.add(index);
    } else {
      updatedSelectedRows.delete(index);
    }
    setSelectedRows(updatedSelectedRows);

    // Cập nhật trạng thái header checkbox
    setIsHeaderChecked(updatedSelectedRows.size === tableData.length);

    // Gửi callback cho component cha
    if (onSelectedRowsChange) {
      const selectedData = Array.from(updatedSelectedRows).map(
        (i) => tableData[i]
      );
      onSelectedRowsChange(selectedData);
    }
  };

  const handleHeaderCheckboxClick = (isChecked: boolean) => {
    const updatedSelectedRows = new Set<number>();

    if (isChecked) {
      tableData.forEach((_, index) => updatedSelectedRows.add(index));
    }

    setSelectedRows(updatedSelectedRows);
    setIsHeaderChecked(isChecked);

    // Gửi callback cho component cha
    if (onSelectedRowsChange) {
      const selectedData = Array.from(updatedSelectedRows).map(
        (i) => tableData[i]
      );
      onSelectedRowsChange(selectedData);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = tableData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={styles.tableContainer}>
      {/* Bảng dữ liệu */}
      <div style={styles.container}>
        <div style={styles.headerRow}>
          {showHeaderCheckbox && (
            <div style={{ ...styles.headerCell, flex: 0.5 }}>
              <CheckBox
                checked={isHeaderChecked}
                onPress={handleHeaderCheckboxClick}
              />
            </div>
          )}
          {tableHeader.map((header, index) => (
            <div key={index} style={styles.headerCell}>
              {header}
            </div>
          ))}
        </div>
        {currentData.length > 0 ? (
          currentData.map((row, rowIndex) => {
            const globalIndex = startIndex + rowIndex;
            return (
              <div
                key={rowIndex}
                style={
                  selectedIndex === globalIndex
                    ? { ...styles.dataRow, border: "3px solid #00B01A" }
                    : styles.dataRow
                }
                onClick={() => handleSelectRow(row, globalIndex)}
              >
                {showHeaderCheckbox && (
                  <div style={{ ...styles.dataCell, flex: 0.5 }}>
                    <CheckBox
                      checked={selectedRows.has(globalIndex)}
                      onPress={(isChecked) =>
                        handleRowCheckboxClick(globalIndex, isChecked)
                      }
                    />
                  </div>
                )}
                {tableHeader.map((_, cellIndex) => (
                  <div key={cellIndex} style={styles.dataCell}>
                    {row[cellIndex] !== undefined ? row[cellIndex] : ""}
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <div
            style={{
              ...styles.dataRow,
              justifyContent: "center",
              padding: "10px",
            }}
          >
            No data available.
          </div>
        )}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div style={styles.paginationContainer}>
          <button
            style={styles.pageButton}
            disabled={currentPage === 1}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            <ChevronLeft strokeWidth={2.5} />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                style={
                  page === currentPage
                    ? {
                        ...styles.pageButton,
                        backgroundColor: "#3A6D8C",
                        color: "#fff",
                      }
                    : styles.pageButton
                }
                onClick={() => handleChangePage(page)}
              >
                {page}
              </button>
            )
          )}
          <button
            style={styles.pageButton}
            disabled={currentPage === totalPages}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            <ChevronRight strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
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
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25px",
  },
  pageButton: {
    borderRadius: "5px",
    padding: "5px 10px",
    margin: "0 5px",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: 600,
  },
};

export default Table;
