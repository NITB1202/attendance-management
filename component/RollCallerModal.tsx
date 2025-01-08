"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, List } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Dropdown from "./Dropdown";
import Input from "./Input";
import RoundedButton from "./RoundedButton";

interface RollCaller {
  name: string;
  code: string;
}

interface RollCallerModalProps {
  open: boolean;
  onClose: () => void;
  rollCallers?: RollCaller[]; // Có thể truyền từ ngoài hoặc dùng mock data
  absent?: string[]; // Có thể truyền từ ngoài hoặc dùng mock data
}

const RollCallerModal: React.FC<RollCallerModalProps> = ({
  open,
  onClose,
  rollCallers = [
    { name: "Nguyen Van A", code: "A001" },
    { name: "Tran Thi B", code: "B002" },
    { name: "Le Van C", code: "C003" },
  ], // Mock data mặc định
  absent = ["Morton Hamsey", "Jack Tarco", "Alice Smith", "John Doe"], // Mock data mặc định
}) => {
  const [rollCallerName, setRollCallerName] = useState(
    rollCallers[0]?.name || ""
  ); // Giá trị mặc định
  const [studentCode, setStudentCode] = useState(rollCallers[0]?.code || ""); // Giá trị mặc định

  // Cập nhật mã số sinh viên khi thay đổi tên người điểm danh
  useEffect(() => {
    const defaultRollCaller = rollCallers.find(
      (caller) => caller.name === rollCallerName
    );
    setStudentCode(defaultRollCaller ? defaultRollCaller.code : "");
  }, [rollCallerName, rollCallers]);

  const handleDropdownChange = (value: React.SetStateAction<string>) => {
    setRollCallerName(value);
    const selectedRollCaller = rollCallers.find(
      (caller) => caller.name === value
    );
    setStudentCode(selectedRollCaller ? selectedRollCaller.code : "");
  };

  const [absentList, setAbsentList] = useState<string[]>([]); // Danh sách vắng mặt
  const [filteredAbsent, setFilteredAbsent] = useState<string[]>(absent); // Lọc những người chưa thêm vào danh sách vắng mặt
  const [newAbsentee, setNewAbsentee] = useState<string>(absent[0] || ""); // Giá trị mặc định là phần tử đầu tiên

  // Cập nhật filteredAbsent khi absentList thay đổi
  useEffect(() => {
    const updatedFilteredAbsent = absent.filter(
      (name) => !absentList.includes(name)
    );
    setFilteredAbsent(updatedFilteredAbsent);

    if (updatedFilteredAbsent.length > 0) {
      setNewAbsentee(updatedFilteredAbsent[0]);
    } else {
      setNewAbsentee(""); // Không còn người nào để chọn
    }
  }, [absentList, absent]);

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
            <Input
              title="Student code"
              defaultValue={studentCode}
              disable={true}
              style={{ ...styles.fullWidth, fontSize: 16 }}
            />
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
};

export default RollCallerModal;
