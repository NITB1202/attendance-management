"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, List } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Dropdown from "./Dropdown";
import Input from "./Input";
import RoundedButton from "./RoundedButton";

interface RollCallerModalProps {
  open: boolean;
  onClose: () => void;
  rollCallers?: { name: string; code: string }[];
  absent?: string[];
}

const RollCallerModal: React.FC<RollCallerModalProps> = ({ open, onClose }) => {
  const rollCallers = [
    { name: "Nguyen Van A", code: "A001" },
    { name: "Tran Thi B", code: "B002" },
    { name: "Le Van C", code: "C003" },
  ];

  const [rollCallerName, setRollCallerName] = useState(rollCallers[0].name);
  const [studentCode, setStudentCode] = useState("");
  useEffect(() => {
    const defaultRollCaller = rollCallers.find(
      (caller) => caller.name === rollCallerName
    );
    setStudentCode(defaultRollCaller ? defaultRollCaller.code : "");
  }, [rollCallerName]);

  const handleDropdownChange = (value: React.SetStateAction<string>) => {
    setRollCallerName(value);
    const selectedRollCaller = rollCallers.find(
      (caller) => caller.name === value
    );
    setStudentCode(selectedRollCaller ? selectedRollCaller.code : "");
  };

  const absent = ["Morton Hamsey", "Jack Tarco", "Alice Smith", "John Doe"];

  const [absentList, setAbsentList] = useState<string[]>([]);
  const [filteredAbsent, setFilteredAbsent] = useState<string[]>(absent);
  const [newAbsentee, setNewAbsentee] = useState<string>(
    filteredAbsent[0] || ""
  );

  useEffect(() => {
    const updatedFilteredAbsent = absent.filter(
      (name) => !absentList.includes(name)
    );
    setFilteredAbsent(updatedFilteredAbsent);
    if (
      !updatedFilteredAbsent.includes(newAbsentee) &&
      updatedFilteredAbsent.length > 0
    ) {
      setNewAbsentee(updatedFilteredAbsent[0]);
    }
  }, [absentList]);

  const handleAddAbsentee = () => {
    if (newAbsentee && !absentList.includes(newAbsentee)) {
      setAbsentList([...absentList, newAbsentee]);
      setFilteredAbsent(filteredAbsent.filter((name) => name !== newAbsentee));
      setNewAbsentee("");
    }
  };

  const handleRemoveAbsentee = (name: string) => {
    setAbsentList(absentList.filter((item) => item !== name));
    setFilteredAbsent([...filteredAbsent, name]);
  };

  const handleSave = () => {
    console.log("Attendance status updated", { rollCallerName, absentList });
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={null}
      width={500}
    >
      <div style={styles.modalContent}>
        <div style={styles.label}>Roll Caller</div>
        <div style={styles.row}>
          <div style={styles.item}>
            <Dropdown
              title="Roll-caller name"
              options={rollCallers.map((caller) => caller.name)}
              style={styles.fullWidth}
              onChange={handleDropdownChange}
            />
          </div>
          <div style={styles.item}>
            <div style={styles.inputContainer}>
              <label style={styles.title}>Student code</label>
              <div style={{ ...styles.input, fontSize: 16 }}>{studentCode}</div>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Absent with permission</label>
          <List
            dataSource={absentList}
            renderItem={(item) => (
              <List.Item style={styles.listItem}>
                <Button
                  type="primary"
                  danger
                  icon={<MinusCircleOutlined />}
                  onClick={() => handleRemoveAbsentee(item)}
                  style={{
                    marginRight: 10,
                    tabSize: 24,
                    fontSize: 18,
                  }}
                />
                <span>{item}</span>
              </List.Item>
            )}
          />
        </div>

        <div style={styles.row1}>
          <Dropdown
            title=""
            options={filteredAbsent}
            style={styles.fullWidthA}
            onChange={(value) => setNewAbsentee(value)}
          />
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={handleAddAbsentee}
            disabled={!newAbsentee}
            style={{
              tabSize: 24,
              fontSize: 18,
              backgroundColor: "#00B01A",
              color: "white",
              marginTop: 8,
            }}
          />
        </div>

        <RoundedButton
          title="CONFIRM"
          style={styles.saveButton}
          onClick={handleSave}
        />
      </div>
    </Modal>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  modalContent: {
    padding: "20px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "15px",
    display: "block",
  },
  fullWidth: {
    width: "100%",
  },
  fullWidthA: {
    width: 203,
  },
  title: {
    fontSize: 16,
  },
  listItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "5px 0",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    justifyContent: "flex-start",
  },
  input: {
    display: "flex",
    justifyContent: "center",
    borderRadius: "5px",
    borderWidth: "1px",
    borderColor: "grey",
    padding: "8px",
    width: "100%",
    marginTop: 10,
  },
  row1: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "space-between",
    width: 250,
  },
  section: {
    marginBottom: "20px",
  },

  flex: {
    flex: 1,
  },
  item: {
    flex: 1,
  },
  saveButton: {
    marginTop: 25,
    width: "100%",
  },
};

export default RollCallerModal;
