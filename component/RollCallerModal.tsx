"use client";
import React, { useEffect, useState } from "react";
import { Modal, List } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Dropdown from "./Dropdown";
import RoundedButton from "./RoundedButton";
import CustomSelect from "./CustomSelect";
import { Colors } from "../constant/Colors";

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
  const [studentCode, setStudentCode] = useState(rollCallers[0].code);
  const absent = ["Morton Hamsey", "Jack Tarco", "Alice Smith", "John Doe"];

  const [absentList, setAbsentList] = useState<string[]>([]);
  const [filteredAbsent, setFilteredAbsent] = useState<string[]>(() =>
    absent.filter((name) => !absentList.includes(name))
  );
  const [newAbsentee, setNewAbsentee] = useState<string>(() =>
    absent.length > 0 ? absent[0] : ""
  );

  useEffect(() => {
    const updatedFilteredAbsent = absent.filter(
      (name) => !absentList.includes(name)
    );

    if (
      JSON.stringify(updatedFilteredAbsent) !== JSON.stringify(filteredAbsent)
    ) {
      setFilteredAbsent(updatedFilteredAbsent);
    }

    if (updatedFilteredAbsent.length > 0 && newAbsentee !== updatedFilteredAbsent[0]) {
      setNewAbsentee(updatedFilteredAbsent[0]);
    } else if (updatedFilteredAbsent.length === 0 && newAbsentee !== "") {
      setNewAbsentee("");
    }
  }, [absentList, absent, filteredAbsent, newAbsentee]);

  const handleDropdownChange = (index: number) => {
    const selectRollCaller = rollCallers.at(index);
    setRollCallerName(selectRollCaller?.name? selectRollCaller.name : "");
    setStudentCode(selectRollCaller?.code? selectRollCaller.code : "");
  };

  const handleAddAbsentee = () => {
    if (newAbsentee && !absentList.includes(newAbsentee)) {
      setAbsentList([...absentList, newAbsentee]);
    }
  };

  const handleRemoveAbsentee = (name: string) => {
    setAbsentList(absentList.filter((item) => item !== name));
  };

  const handleSave = () => {
    console.log("Attendance status updated", { rollCallerName, absentList });
    onClose();
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title={null} width={500}>
      <div style={styles.modalContent}>
        <div style={styles.label}>Roll Caller</div>
        <div style={styles.row}>
          <div style={styles.item}>
            <CustomSelect
              title="Roll-caller name"
              textStyle={{fontWeight: 500}}
              options={rollCallers.map((caller) => caller.name)}
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
          <label style={{...styles.label, marginTop: 20}}>Absent with permission</label>
          <List
            dataSource={absentList}
            renderItem={(item) => (
              <List.Item style={styles.listItem}>
                <button
                  onClick={() => handleRemoveAbsentee(item)}
                  style={{
                    marginRight: 10,
                    tabSize: 24,
                    fontSize: 18,
                    padding: 5,
                    borderRadius: 3,
                  }}>
                    <MinusCircleOutlined size={24} color = "white"/>
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
              tabSize: 26,
              fontSize: 18,
              marginTop: 8,
              padding: 5,
              borderRadius: 3,
            }}>
              <PlusCircleOutlined  size={30} color="white"/>
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
  );
};


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
  butttonText:{
    fontSize: 20,
  },
   title:{
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
  inputText:{
      fontFamily: "Roboto, sans-serif",
      fontSize: "16px",
  },
  titleInputContainer:{
      display: "flex",
      flexDirection: "column",
      gap: 10
  }
};

export default RollCallerModal;
