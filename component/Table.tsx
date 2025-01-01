import React from "react";

interface TableProps {
    tableHeader: string[];
    tableData: string[][];
    onRowClick?: (rowData: string[]) => void;
}

const Table: React.FC<TableProps> = ({ tableHeader, tableData }) => {
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
                <div key={rowIndex} style={styles.dataRow}>
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} style={styles.dataCell}>
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        border: '1px solid #ddd',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    headerRow: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#6A9AB0',
    },
    headerCell: {
        flex: 1,
        padding: '10px',
        textAlign: 'center',
        color: '#fff',
    },
    dataRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    dataCell: {
        flex: 1,
        padding: '10px',
        textAlign: 'center',
        borderBottom: '1px solid #ddd',
    },
};

export default Table;