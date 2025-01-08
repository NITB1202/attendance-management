"use client";
import React, { useEffect, useState } from "react";
import { Modal, List } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Dropdown from "./Dropdown";
import RoundedButton from "./RoundedButton";
import CustomSelect from "./CustomSelect";
import { Colors } from "../constant/Colors";
import ErrorMessage from "./ErrorMessage";

interface RollCallerModalProps {
  open: boolean;
  onClose: () => void;
  students: any[][];
  sessionId: number;
  rollCaller: { name: string; code: string };
}

const RollCallerModal: React.FC<RollCallerModalProps> = ({
  open,
  onClose,
  students,
  sessionId,
  rollCaller,
}) => {
  const filteredStudentsList = filterList(rollCaller.code, students);

  const [rollCallerName, setRollCallerName] = useState(rollCaller.name);
  const [studentCode, setStudentCode] = useState(rollCaller.code);
  const absent = students.map((item) => item.at(3));

  const [absentList, setAbsentList] = useState<string[]>([]);
  const [filteredAbsent, setFilteredAbsent] = useState<string[]>([]);
  const [newAbsentee, setNewAbsentee] = useState<string>(
    absent.length > 0 ? absent[0] : ""
  );
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const updatedFilteredAbsent = absent.filter(
      (name) => !absentList.includes(name)
    );
    if (
      JSON.stringify(updatedFilteredAbsent) !== JSON.stringify(filteredAbsent)
    ) {
      setFilteredAbsent(updatedFilteredAbsent);
    }
  }, [absentList, absent, filteredAbsent]);

  const handleDropdownChange = (index: number) => {
    const selectRollCaller = filteredStudentsList.at(index);
    setRollCallerName(selectRollCaller?.at(3));
    setStudentCode(selectRollCaller?.at(2));
  };

  const handleAddAbsentee = () => {
    if (newAbsentee && !absentList.includes(newAbsentee)) {
      setAbsentList((prevList) => [...prevList, newAbsentee]);
    }
  };

  const handleRemoveAbsentee = (name: string) => {
    setAbsentList((prevList) => prevList.filter((item) => item !== name));
  };

  const handleSave = () => {
    if (absentList.includes(rollCallerName)) {
      setShowError(true);
      return;
    }

    const selectedStudents = students.filter((item) =>
      absentList.includes(item.at(3))
    );
    const studentIds = selectedStudents.map((item) => item.at(0));

    console.log(studentIds);
    // onClose();
  };

  useEffect(() => {
    const updatedFilteredAbsent = absent.filter(
      (name) => !absentList.includes(name)
    );
    if (
      updatedFilteredAbsent.length > 0 &&
      !updatedFilteredAbsent.includes(newAbsentee)
    ) {
      setNewAbsentee(updatedFilteredAbsent[0]);
    } else if (updatedFilteredAbsent.length === 0 && newAbsentee !== "") {
      setNewAbsentee("");
    }
  }, [absentList, absent, newAbsentee]);

  return (
    <div>
      {showError ? (
        <ErrorMessage
          title="Invalid roll caller"
          description="The roll caller cannot be included in the absent student list."
          setOpen={setShowError}
        />
      ) : (
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
                <CustomSelect
                  title="Roll-caller name"
                  textStyle={{ fontWeight: 500 }}
                  options={filteredStudentsList.map((caller) => caller.at(3))}
                  style={styles.fullWidth}
                  onSelect={handleDropdownChange}
                />
              </div>
              <div style={styles.item}>
                <div style={styles.titleInputContainer}>
                  <label style={styles.title}>Student code</label>
                  <div style={styles.inputContainer}>
                    <h1 style={styles.inputText}>{studentCode}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <label style={{ ...styles.label, marginTop: 20 }}>
                Absent with permission
              </label>
              <List
                dataSource={absentList}
                renderItem={(item) => (
                  <List.Item style={styles.listItem}>
                    <button
                      onClick={() => handleRemoveAbsentee(item)}
                      style={{
                        marginRight: 10,
                        fontSize: 18,
                        padding: 5,
                        borderRadius: 3,
                      }}
                    >
                      <MinusCircleOutlined size={24} color="white" />
                    </button>
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
              <button
                onClick={handleAddAbsentee}
                disabled={!newAbsentee}
                style={{
                  fontSize: 18,
                  marginTop: 8,
                  padding: 5,
                  borderRadius: 3,
                }}
              >
                <PlusCircleOutlined size={30} color="white" />
              </button>
            </div>

            <RoundedButton
              title="CONFIRM"
              style={styles.saveButton}
              textStyle={styles.butttonText}
              onClick={handleSave}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

function filterList(code: string, students: any[][]) {
  const selected = students.find((item) => item.at(2) === code);
  const remaining = students.filter((item) => item.at(2) !== code);
  return selected ? [selected, ...remaining] : students;
}

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  modalContent: {
    padding: "20px",
  },
  label: {
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: "15px",
    display: "block",
  },
  fullWidth: {
    width: "100%",
  },
  fullWidthA: {
    width: 203,
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
    gap: "10px",
    justifyContent: "flex-start",
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
  butttonText: {
    fontSize: 20,
  },
  title: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 20,
  },
  inputContainer: {
    borderRadius: "5px",
    borderWidth: "1px",
    borderColor: Colors.gray,
    height: 44,
    background: Colors.disable,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px",
  },
  inputText: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
  },
  titleInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
};

export default RollCallerModal;
